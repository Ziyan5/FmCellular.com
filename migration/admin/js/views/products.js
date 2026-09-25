import { listDevices, listParts, allFinishes } from "../db.js";
import { $, $$, esc, money, photoSrc, PLACEHOLDER, debounce } from "../ui.js";
import { cardPhoto } from "../photos.js";

const remember = (k, v) => { try { v === undefined ? 0 : sessionStorage.setItem("fm." + k, JSON.stringify(v)); } catch (e) {} };
const recall = (k, d) => { try { const v = sessionStorage.getItem("fm." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };

/* ---------------- phones & devices ---------------- */

const CATEGORY_ORDER = ["iPhone", "iPad", "Apple Watch", "Samsung", "Google", "MacBook", "Accessories"];

export async function renderDevices(params) {
  const view = $("#view");
  const state = recall("devices", { cat: "All", filter: "all", q: "" });
  if (params && params.get("filter")) state.filter = params.get("filter");

  view.innerHTML =
    '<div class="page-head"><div><p class="eyebrow">Catalogue</p><h1>Phones &amp; devices</h1>' +
    '<p class="sub">Click any product to change its prices, stock, colours and photos.</p></div></div>' +
    '<div class="toolbar"><div class="chips" id="cats"></div></div>' +
    '<div class="toolbar"><div class="chips" id="filters"></div><span class="grow"></span>' +
    '<input type="search" id="dq" placeholder="Filter by model…" aria-label="Filter by model"></div>' +
    '<div class="pgrid" id="grid">' + '<div class="card skeleton" style="aspect-ratio:.8"></div>'.repeat(8) + "</div>";

  const [items, finishes] = await Promise.all([listDevices(), allFinishes()]);
  items.forEach((p) => { p.photo = cardPhoto(p.model, finishes[p.id]); });

  const counts = { All: items.length };
  items.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
  const cats = ["All", ...CATEGORY_ORDER.filter((c) => counts[c]), ...Object.keys(counts).filter((c) => c !== "All" && !CATEGORY_ORDER.includes(c))];

  const filters = [["all", "Everything"], ["unpriced", "Missing prices"], ["soldout", "Has sold-out options"], ["hidden", "Hidden from site"]];
  const q = $("#dq");
  q.value = state.q;

  function draw() {
    remember("devices", state);
    $("#cats").innerHTML = cats.map((c) => '<button class="chip' + (state.cat === c ? " on" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + '<span class="n">' + counts[c] + "</span></button>").join("");
    $("#filters").innerHTML = filters.map(([k, t]) => '<button class="chip' + (state.filter === k ? " on" : "") + '" data-f="' + k + '">' + t + "</button>").join("");
    const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    const shown = items.filter((p) =>
      (state.cat === "All" || p.category === state.cat) &&
      (state.filter === "all" || (state.filter === "unpriced" && p.unpriced) || (state.filter === "soldout" && p.soldOut) || (state.filter === "hidden" && !p.active)) &&
      words.every((w) => p.model.toLowerCase().includes(w)));
    $("#grid").innerHTML = shown.length ? shown.map(card).join("") :
      '<div class="card empty" style="grid-column:1/-1">Nothing matches. Try another filter.</div>';
  }
  $("#cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; draw(); } });
  $("#filters").addEventListener("click", (e) => { const b = e.target.closest("[data-f]"); if (b) { state.filter = b.dataset.f; draw(); } });
  q.addEventListener("input", debounce(() => { state.q = q.value.trim(); draw(); }, 120));
  draw();
}

function card(p) {
  const badges = [];
  if (!p.active) badges.push('<span class="pill plain">Hidden</span>');
  if (p.unpriced) badges.push('<span class="pill warn">' + p.unpriced + " without price</span>");
  const price = p.from === null ? '<span class="muted">No prices yet</span>' :
    (p.from === p.to ? money(p.from) : "from " + money(p.from));
  return '<a class="card pcard' + (p.active ? "" : " off") + '" href="#/product/' + p.id + '">' +
    '<div class="shot">' + (p.photo ? '<img loading="lazy" alt="" src="' + esc(photoSrc(p.photo)) + '">' : PLACEHOLDER) +
    '<div class="badges">' + badges.join("") + "</div></div>" +
    '<div class="info"><b>' + esc(p.model) + "</b><small>" + esc(p.category) + " · " + p.options + " option" + (p.options === 1 ? "" : "s") +
    '</small><span class="price num">' + price + "</span></div></a>";
}

/* ---------------- parts ---------------- */

const GROUPS = [["all", "All parts"], ["screens", "Screens"], ["apple", "Apple parts"], ["samsung", "Samsung parts"]];

export async function renderParts(params) {
  const view = $("#view");
  const state = recall("parts", { group: "all", q: "", page: 0, filter: "all" });
  if (params && params.get("q")) { state.q = params.get("q"); state.page = 0; }

  view.innerHTML =
    '<div class="page-head"><div><p class="eyebrow">Catalogue</p><h1>Parts</h1>' +
    '<p class="sub">Screens, batteries, cameras and every other part. Search by model and part — for example “14 Pro screen”.</p></div></div>' +
    '<div class="toolbar"><div class="chips" id="groups"></div><span class="grow"></span>' +
    '<input type="search" id="pq" placeholder="Search model or part…" aria-label="Search parts" style="max-width:320px"></div>' +
    '<section class="card"><div class="table-wrap"><table class="list"><thead><tr><th></th><th>Model</th><th>Part</th><th>Fits</th><th>Options</th><th>Price</th><th>Status</th></tr></thead>' +
    '<tbody id="rows"><tr><td colspan="7"><div class="skeleton" style="height:220px"></div></td></tr></tbody></table></div></section>' +
    '<div class="pager"><button class="btn ghost small" id="prev">Previous</button><span id="pinfo" class="num"></span><button class="btn ghost small" id="next">Next</button></div>';

  const q = $("#pq");
  q.value = state.q;
  let token = 0;

  async function load() {
    remember("parts", state);
    $("#groups").innerHTML = GROUPS.map(([k, t]) => '<button class="chip' + (state.group === k ? " on" : "") + '" data-g="' + k + '">' + t + "</button>").join("") +
      '<button class="chip' + (state.filter === "hidden" ? " on" : "") + '" data-hidden="1">Hidden only</button>';
    const mine = ++token;
    const { rows, count } = await listParts({ group: state.group, q: state.q, page: state.page, filter: state.filter });
    if (mine !== token) return;
    const pages = Math.max(1, Math.ceil(count / 50));
    $("#pinfo").textContent = count.toLocaleString() + " parts · page " + (state.page + 1) + " of " + pages;
    $("#prev").disabled = state.page === 0;
    $("#next").disabled = state.page + 1 >= pages;
    $("#rows").innerHTML = rows.length ? rows.map((p) => {
      const status = !p.active ? '<span class="pill plain">Hidden</span>' :
        p.unpriced === p.options ? '<span class="pill warn">No price</span>' :
        p.soldOut === p.options ? '<span class="pill bad">Sold out</span>' : '<span class="pill good">On sale</span>';
      const price = p.from === null ? '<span class="muted">—</span>' : p.from === p.to ? money(p.from) : money(p.from) + "–" + money(p.to);
      return '<tr class="clickable" data-id="' + p.id + '"><td style="width:10px"></td><td><b>' + esc(p.model) + "</b></td><td>" + esc(p.part || p.category) +
        '</td><td class="muted">' + esc(p.family) + '</td><td class="num">' + p.options + '</td><td class="num">' + price + "</td><td>" + status + "</td></tr>";
    }).join("") : '<tr><td colspan="7"><div class="empty">No parts match “' + esc(state.q) + '”.</div></td></tr>';
  }
  $("#groups").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.hidden) state.filter = state.filter === "hidden" ? "all" : "hidden";
    else state.group = b.dataset.g;
    state.page = 0; load();
  });
  $("#rows").addEventListener("click", (e) => { const tr = e.target.closest("tr[data-id]"); if (tr) location.hash = "#/product/" + tr.dataset.id; });
  $("#prev").addEventListener("click", () => { state.page = Math.max(0, state.page - 1); load(); });
  $("#next").addEventListener("click", () => { state.page++; load(); });
  q.addEventListener("input", debounce(() => { state.q = q.value.trim(); state.page = 0; load(); }, 250));
  await load();
}
