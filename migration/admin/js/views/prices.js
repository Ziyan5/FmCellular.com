// The price sheet: every listing on the website on one page, with its
// retail, wholesale and purchase price side by side. Phones show one row per
// model and storage, and a block of columns per grade. Type straight in;
// nothing is written until Save.

import { sb, priceRows, savePrices, setSetting, log, me } from "../db.js";
import { $, $$, esc, money, toast, readNumber, debounce } from "../ui.js";
import { setLeaveCheck } from "../main.js";
import { mirrorSoon } from "../mirror.js";

const GRADES = ["New", "Mint", "Good", "Fair"];
const CATEGORY_ORDER = ["iPhone", "iPad", "Apple Watch", "Samsung", "Google", "MacBook", "Accessories", "Add-ons"];
const KINDS = [
  ["price", "Retail price", "What a shopper pays on the website"],
  ["trade", "Wholesale price", "What a trade customer pays in the wholesale portal"],
  ["purchase", "Purchase price", "What the shop paid. Never shown on the website"]
];
const PAGE = 150;

const remember = (v) => { try { sessionStorage.setItem("fm.prices", JSON.stringify(v)); } catch (e) {} };
const recall = () => { try { return JSON.parse(sessionStorage.getItem("fm.prices")) || {}; } catch (e) { return {}; } };

export async function renderPrices() {
  const view = $("#view");
  const owner = me.role === "owner";
  const kinds = KINDS.filter(([k]) => k !== "purchase" || me.seePurchase);
  const canEdit = (f) => f !== "purchase" || owner;
  const state = Object.assign({ cat: "All", q: "", show: { price: true, trade: true, purchase: true }, page: 0 }, recall());

  view.innerHTML =
    '<div class="page-head"><div><p class="eyebrow">Catalogue</p><h1>Price sheet</h1>' +
    '<p class="sub">Every price on the website in one place. Click a number, type the new one, press Save — the website and the Google Sheet both update.</p></div>' +
    '<div class="ps-head-tools">' +
    (owner ? '<label class="switch" title="Lets staff see the Purchase price column. They can never change it."><input type="checkbox" id="ps-staff"><span class="track"></span>Staff can see purchase prices</label>' : "") +
    '<button class="btn ghost small" id="ps-csv" type="button"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>Download</button></div></div>' +
    '<div class="toolbar"><div class="chips" id="ps-cats"></div></div>' +
    '<div class="toolbar"><div class="ps-legend" id="ps-show"></div><span class="grow"></span>' +
    '<input type="search" id="ps-q" placeholder="Find a model…" aria-label="Find a model"></div>' +
    '<section class="card ps-card"><div class="ps-box" id="ps-box"><div class="skeleton" style="height:420px;margin:16px"></div></div></section>' +
    '<div class="pager" id="ps-pager" hidden><button class="btn ghost small" id="ps-prev">Previous</button><span id="ps-info" class="num"></span><button class="btn ghost small" id="ps-next">Next</button></div>' +
    '<div id="savebar"></div>';

  /* ---------- data ---------- */
  // rows[kind] = [{ key, productId, category, model, sub, hidden, order, cells: { grade: cell } }]
  // cell = { id, price, trade, purchase, was: { price, trade, purchase }, active }
  const rows = { devices: null, parts: null };
  const dirty = new Set();                       // "kind|row|grade|field"
  const cellOf = (v) => ({ id: v.id, price: v.price, trade: v.trade, purchase: v.purchase, active: v.active,
    msrp: v.msrp, was: { price: v.price, trade: v.trade, purchase: v.purchase } });
  const emptyCell = () => ({ id: null, price: null, trade: null, purchase: null, active: true, msrp: null,
    was: { price: null, trade: null, purchase: null } });

  async function load(kind) {
    const list = await priceRows(kind);
    if (kind === "parts") {
      rows.parts = list.map((v) => ({
        key: v.id, productId: v.productId, category: v.category, model: v.model,
        sub: [v.part, v.storage, v.condition].filter(Boolean).join(" · "), hidden: !v.productActive || !v.active,
        order: 0, cells: { _: cellOf(v) }
      })).sort((a, b) => a.model.localeCompare(b.model, "en", { numeric: true }) || a.sub.localeCompare(b.sub));
      return;
    }
    const by = new Map();
    list.forEach((v) => {
      const key = v.productId + "|" + v.storage;
      let r = by.get(key);
      if (!r) by.set(key, r = { key, productId: v.productId, category: v.category, model: v.model, sub: v.storage,
        hidden: !v.productActive, order: v.order ?? 99999, last: v.order, cells: {}, other: 0 });
      if (GRADES.includes(v.condition) && !r.cells[v.condition]) r.cells[v.condition] = cellOf(v);
      else r.other++;
      r.order = Math.min(r.order, v.order ?? 99999);
      r.last = Math.max(r.last ?? 0, v.order ?? 0);
    });
    const rank = (c) => { const i = CATEGORY_ORDER.indexOf(c); return i < 0 ? 99 : i; };
    rows.devices = [...by.values()].sort((a, b) => rank(a.category) - rank(b.category) || a.order - b.order);
    rows.devices.forEach((r) => GRADES.forEach((g) => { if (!r.cells[g]) r.cells[g] = emptyCell(); }));
  }

  const kindNow = () => (state.cat === "Parts" ? "parts" : "devices");
  const shownKinds = () => kinds.filter(([k]) => state.show[k] !== false);

  /* ---------- drawing ---------- */
  function drawChips() {
    const counts = {};
    (rows.devices || []).forEach((r) => { counts[r.category] = (counts[r.category] || 0) + 1; });
    const cats = ["All", ...CATEGORY_ORDER.filter((c) => counts[c]), ...Object.keys(counts).filter((c) => !CATEGORY_ORDER.includes(c)), "Parts"];
    if (!cats.includes(state.cat)) state.cat = "All";
    $("#ps-cats").innerHTML = cats.map((c) => '<button class="chip' + (state.cat === c ? " on" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>").join("");
    $("#ps-show").innerHTML = '<span class="muted">Show</span>' + kinds.map(([k, t, tip]) =>
      '<button class="ps-key k-' + k + (state.show[k] !== false ? " on" : "") + '" data-show="' + k + '" title="' + esc(tip) + '"><i></i>' + t + "</button>").join("");
  }

  function matches() {
    const kind = kindNow();
    const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    const out = [];
    (rows[kind] || []).forEach((r, i) => {
      if (kind === "devices" && state.cat !== "All" && r.category !== state.cat) return;
      const hay = (r.model + " " + r.sub).toLowerCase();
      if (words.every((w) => hay.includes(w))) out.push(i);
    });
    return out;
  }

  function cellHtml(kind, i, g, f, cell) {
    const v = cell[f];
    const changed = v !== cell.was[f];
    const cls = "pc k-" + f + (changed ? " changed" : "") + (cell.id && !cell.active ? " off" : "");
    if (!canEdit(f)) return '<td class="' + cls + '"><span class="num">' + (v === null ? "" : money(v)) + "</span></td>";
    return '<td class="' + cls + '"><input type="text" inputmode="decimal" autocomplete="off" data-i="' + i + '" data-g="' + g + '" data-f="' + f +
      '" value="' + (v === null || Number.isNaN(v) ? "" : v) + '" aria-label="' + (g === "_" ? "" : g + " ") + f + '"></td>';
  }

  function draw() {
    remember({ cat: state.cat, q: state.q, show: state.show });
    drawChips();
    const kind = kindNow();
    const box = $("#ps-box");
    if (!rows[kind]) {
      box.innerHTML = '<div class="skeleton" style="height:420px;margin:16px"></div>';
      load(kind).then(draw).catch((err) => { box.innerHTML = '<div class="empty">' + esc(err.message) + "</div>"; });
      return;
    }
    const shown = shownKinds();
    const hits = matches();
    const pages = Math.max(1, Math.ceil(hits.length / PAGE));
    state.page = Math.min(state.page, pages - 1);
    const slice = kind === "parts" ? hits.slice(state.page * PAGE, state.page * PAGE + PAGE) : hits;
    $("#ps-pager").hidden = kind !== "parts" || pages < 2;
    $("#ps-info").textContent = hits.length.toLocaleString() + " listings · page " + (state.page + 1) + " of " + pages;
    $("#ps-prev").disabled = state.page === 0;
    $("#ps-next").disabled = state.page + 1 >= pages;

    if (!shown.length) { box.innerHTML = '<div class="empty">Pick at least one price to show.</div>'; return; }
    if (!slice.length) { box.innerHTML = '<div class="empty">Nothing matches “' + esc(state.q) + "”.</div>"; return; }

    const grades = kind === "parts" ? ["_"] : GRADES;
    const sub = shown.map(([k, t]) => '<th class="k-' + k + '">' + t + "</th>").join("");
    const head = kind === "parts"
      ? '<tr><th class="c-model">Model</th><th class="c-sub">Part</th>' + sub + "</tr>"
      : '<tr class="h1"><th class="c-model" rowspan="2">Model</th><th class="c-sub" rowspan="2">Storage</th>' +
        grades.map((g) => '<th class="grade g-start" colspan="' + shown.length + '">' + g + "</th>").join("") + "</tr>" +
        '<tr class="h2">' + grades.map(() => sub.replace('<th class="', '<th class="g-start ')).join("") + "</tr>";

    let lastModel = null;
    const body = slice.map((i) => {
      const r = rows[kind][i];
      const first = r.model !== lastModel;
      lastModel = r.model;
      return '<tr class="' + (first ? "first" : "") + (r.hidden ? " hid" : "") + '">' +
        '<th class="c-model" scope="row">' + (first || kind === "parts"
          ? '<a href="#/product/' + r.productId + '" tabindex="-1">' + esc(r.model) + "</a>" + (r.hidden ? ' <span class="pill plain nodot">Hidden</span>' : "")
          : '<span class="ditto">' + esc(r.model) + "</span>") + "</th>" +
        '<td class="c-sub">' + esc(r.sub || "—") + "</td>" +
        grades.map((g) => shown.map(([f], n) => cellHtml(kind, i, g, f, r.cells[g]).replace('<td class="', '<td class="' + (n === 0 ? "g-start " : ""))).join("")).join("") +
        "</tr>";
    }).join("");
    box.innerHTML = '<table class="psheet' + (kind === "parts" ? " flat" : "") + '"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
  }

  /* ---------- typing ---------- */
  const box = $("#ps-box");
  box.addEventListener("input", (e) => {
    const el = e.target;
    if (!el.dataset.f) return;
    const kind = kindNow(), f = el.dataset.f;
    const cell = rows[kind][Number(el.dataset.i)].cells[el.dataset.g];
    cell[f] = readNumber(el.value);
    const bad = Number.isNaN(cell[f]);
    el.setCustomValidity(bad ? "Numbers only" : "");
    const td = el.closest("td");
    td.classList.toggle("bad", bad);
    const changed = bad || cell[f] !== cell.was[f];
    td.classList.toggle("changed", changed);
    const key = [kind, el.dataset.i, el.dataset.g, f].join("|");
    changed ? dirty.add(key) : dirty.delete(key);
    refreshBar();
  });
  box.addEventListener("focusin", (e) => { if (e.target.dataset.f) e.target.select(); });
  // Enter and the up/down arrows move along a column, like a spreadsheet.
  box.addEventListener("keydown", (e) => {
    const el = e.target;
    if (!el.dataset.f || !["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const col = $$('input[data-g="' + el.dataset.g + '"][data-f="' + el.dataset.f + '"]', box);
    const next = col[col.indexOf(el) + (e.key === "ArrowUp" || (e.key === "Enter" && e.shiftKey) ? -1 : 1)];
    if (next) next.focus();
  });

  /* ---------- filters ---------- */
  $("#ps-cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; state.page = 0; draw(); } });
  $("#ps-show").addEventListener("click", (e) => {
    const b = e.target.closest("[data-show]"); if (!b) return;
    state.show[b.dataset.show] = state.show[b.dataset.show] === false;
    draw();
  });
  const q = $("#ps-q");
  q.value = state.q;
  q.addEventListener("input", debounce(() => { state.q = q.value.trim(); state.page = 0; draw(); }, 140));
  $("#ps-prev").addEventListener("click", () => { state.page = Math.max(0, state.page - 1); draw(); box.scrollTop = 0; });
  $("#ps-next").addEventListener("click", () => { state.page++; draw(); box.scrollTop = 0; });

  if (owner) {
    const sw = $("#ps-staff");
    sb.from("app_settings").select("value").eq("key", "staff_see_purchase").maybeSingle()
      .then(({ data }) => { sw.checked = !!data && data.value === "yes"; });
    sw.addEventListener("change", async () => {
      try {
        await setSetting("staff_see_purchase", sw.checked ? "yes" : "no");
        await log(sw.checked ? "let staff see" : "hid from staff", "purchase prices");
        toast(sw.checked ? "Staff can now see purchase prices." : "Purchase prices are hidden from staff.", "good");
      } catch (err) { sw.checked = !sw.checked; toast(err.message, "bad"); }
    });
  }

  $("#ps-csv").addEventListener("click", () => {
    const kind = kindNow();
    const grades = kind === "parts" ? ["_"] : GRADES;
    const shown = shownKinds();
    const head = ["Category", "Model", kind === "parts" ? "Part" : "Storage"];
    grades.forEach((g) => shown.forEach(([, t]) => head.push((g === "_" ? "" : g + " ") + t)));
    const lines = [head];
    matches().forEach((i) => {
      const r = rows[kind][i];
      const line = [r.category, r.model, r.sub];
      grades.forEach((g) => shown.forEach(([f]) => line.push(r.cells[g][f] ?? "")));
      lines.push(line);
    });
    const csv = "﻿" + lines.map((l) => l.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "fm-cellular-prices-" + (state.cat === "All" ? "all" : state.cat.toLowerCase().replace(/\s+/g, "-")) + ".csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });

  /* ---------- saving ---------- */
  setLeaveCheck(() => dirty.size > 0);
  function refreshBar() {
    const bar = $("#savebar");
    const n = dirty.size;
    if (!n) { bar.innerHTML = ""; return; }
    if (!$("#ps-save")) {
      bar.innerHTML = '<div class="savebar"><span><b id="ps-n"></b></span><span style="display:flex;gap:10px">' +
        '<button class="btn ghost" id="ps-discard" type="button">Discard</button><button class="btn accent" id="ps-save" type="button">Save changes</button></span></div>';
      $("#ps-discard").onclick = () => {
        [...dirty].forEach((key) => { const [kind, i, g, f] = key.split("|"); const c = rows[kind][Number(i)].cells[g]; c[f] = c.was[f]; });
        dirty.clear(); draw(); refreshBar();
      };
      $("#ps-save").onclick = save;
    }
    $("#ps-n").textContent = n + " unsaved price" + (n === 1 ? "" : "s");
  }

  async function save() {
    const btn = $("#ps-save");
    const jobs = { retail: [], trade: [], purchase: [], create: [] };
    const made = new Map();
    const lines = [];
    let reload = false;
    try {
      for (const key of dirty) {
        const [kind, i, g, f] = key.split("|");
        const r = rows[kind][Number(i)], c = r.cells[g];
        if (Number.isNaN(c[f])) throw new Error(r.model + " " + r.sub + ": that price is not a number.");
        const name = r.model + (r.sub ? " " + r.sub : "") + (g === "_" ? "" : " " + g);
        const label = { price: "retail", trade: "wholesale", purchase: "purchase price" }[f];
        // What the shop paid stays out of the activity list, which staff can read.
        lines.push(name + ": " + (f === "purchase" ? "purchase price changed" : label + " " + money(c.was[f]) + " → " + money(c[f])));
        if (!c.id) {
          if (!made.has(c)) {
            const mate = GRADES.map((x) => r.cells[x]).find((x) => x.id);
            made.set(c, true);
            jobs.create.push({ productId: r.productId, storage: r.sub, condition: g, price: c.price, trade: c.trade,
              purchase: me.role === "owner" ? c.purchase : null, msrp: mate ? mate.msrp : null, order: r.last ?? null });
            reload = true;
          }
        } else jobs[f === "price" ? "retail" : f].push({ id: c.id, price: c[f] });
      }
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Saving…';
      await savePrices(jobs);
      const n = dirty.size;
      await log("updated", "Price sheet", { summary: n + " price" + (n === 1 ? "" : "s") + " changed", lines: lines.slice(0, 40) });
      [...dirty].forEach((key) => { const [kind, i, g, f] = key.split("|"); const c = rows[kind][Number(i)].cells[g]; c.was[f] = c[f]; });
      dirty.clear();
      mirrorSoon();
      toast("Saved. The website and the Google Sheet update within about a minute.", "good");
      if (reload) rows.devices = null;
      const top = box.scrollTop;
      refreshBar(); draw();
      box.scrollTop = top;
    } catch (err) {
      toast(err.message, "bad");
      btn.disabled = false; btn.textContent = "Save changes";
    }
  }

  await load("devices");
  draw();
}
