// One product: its options (price, trade price, stock, status), its colours
// and photos. Nothing is written until Save; the bar at the bottom counts
// what is waiting.

import { getProduct, saveProduct, log, upload } from "../db.js";
import { $, $$, esc, money, photoSrc, toast, modal, confirmBox, readNumber, PLACEHOLDER } from "../ui.js";
import { coloursFor, builtinHex, preparePhoto, acceptFiles, pickFiles, sortable, move } from "../photos.js";
import { setLeaveCheck } from "../main.js";
import { mirrorSoon } from "../mirror.js";

const GRIP = '<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';
const PLUS = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
const STATUS = [["sale", "On sale"], ["soldout", "Sold out"], ["hidden", "Hidden"]];

export async function renderProduct(id) {
  const data = await getProduct(id);
  const p = data.product;
  const isPart = p.item_type === "part";
  const hasColours = !isPart;

  /* ---------- working state ---------- */
  const st = {
    active: p.is_active,
    options: data.variants.map((v) => ({ ...v, status: statusOf(v) })),
    orig: {},
    added: [],
    selected: new Set(),
    colours: hasColours ? coloursFor(p.model, data.finishes) : [],
    coloursDirty: false,
    photos: data.images.filter((i) => !i.variant_id).map((i) => i.url),
    listingPhotos: data.images.filter((i) => i.variant_id).length,
    photosDirty: false,
    uploading: 0
  };
  st.options.forEach((o) => { st.orig[o.id] = { ...o }; });
  const cutOut = { on: true };

  const labels = isPart ? { a: "Listing", b: "Fits" } : { a: "Storage", b: "Grade" };
  const back = isPart ? "#/parts" : "#/devices";
  const view = $("#view");

  view.innerHTML =
    '<a class="back" href="' + back + '">← ' + (isPart ? "All parts" : "All phones & devices") + "</a>" +
    '<div class="page-head"><div><p class="eyebrow">' + esc(p.category) + (p.brand ? " · " + esc(p.brand) : "") + "</p>" +
    "<h1>" + esc(p.model) + (p.part_name ? ' <span class="muted" style="font-weight:600">— ' + esc(p.part_name) + "</span>" : "") + "</h1>" +
    '<p class="sub" id="summary"></p></div>' +
    '<label class="switch"><input type="checkbox" id="active"' + (st.active ? " checked" : "") + '><span class="track"></span><span id="active-label"></span></label></div>' +

    (hasColours
      ? '<section class="card" id="colours-card"><div class="card-head"><div><h2>Colours &amp; photos</h2>' +
        "<p>Drag pictures from your computer onto a colour. Drag photos to reorder them — the first one is the main photo. Drag the dots to reorder colours.</p></div>" +
        '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><label class="switch" title="Cuts the product off a plain background and sizes it like every other photo on the site"><input type="checkbox" id="cutout" checked><span class="track"></span>Remove background</label>' +
        '<button class="btn ghost small" id="add-colour">' + PLUS + "Add colour</button></div></div>" +
        '<div class="card-body"><div class="finishes" id="finishes"></div></div></section>'
      : '<section class="card" id="photos-card"><div class="card-head"><div><h2>Photos</h2>' +
        "<p>Drag pictures in, or click the + tile. Drag to reorder — the first one is the main photo." +
        (st.listingPhotos ? " Some listings below also have their own photo from the supplier catalogue." : "") + "</p></div>" +
        '<label class="switch"><input type="checkbox" id="cutout" checked><span class="track"></span>Remove background</label></div>' +
        '<div class="card-body"><div class="shots" id="pshots"></div></div></section>') +

    '<section class="card" id="options-card"><div class="card-head"><div><h2>Prices &amp; stock</h2>' +
    "<p>Type straight into the table. Leave Stock empty if you don't count it. Tick rows to change several at once.</p></div>" +
    '<button class="btn ghost small" id="add-option">' + PLUS + "Add option</button></div>" +
    '<div class="card-body"><div id="bulk"></div><div class="table-wrap"><table class="list ogrid"><thead><tr>' +
    '<th class="sel"><input type="checkbox" id="sel-all" aria-label="Select all"></th><th>' + labels.a + "</th><th>" + labels.b + "</th>" +
    (hasColours ? "<th>Colour</th>" : "") + "<th>Price</th><th>Trade price</th><th>Stock</th><th>Status</th></tr></thead>" +
    '<tbody id="opts"></tbody></table></div></div></section>' +
    '<div id="savebar"></div>';

  $("#cutout").addEventListener("change", (e) => { cutOut.on = e.target.checked; });
  $("#active").addEventListener("change", (e) => { st.active = e.target.checked; paintActive(); refreshBar(); });
  function paintActive() {
    $("#active-label").textContent = st.active ? "Visible on the website" : "Hidden from the website";
  }
  paintActive();

  /* ---------- options table ---------- */
  function statusOf(o) { return !o.active ? "hidden" : o.available === false ? "soldout" : "sale"; }
  const fields = ["storage", "condition", "color", "price", "trade", "qty", "status"];
  function changed(o, f) {
    const was = st.orig[o.id];
    if (!was) return false;
    const a = o[f], b = was[f];
    return !(a === b || ((a === null || a === "") && (b === null || b === "")));
  }
  function optionRow(o, i, isNew) {
    const key = isNew ? "n" + i : o.id;
    const cell = (f, inner, cls = "") => '<td class="' + cls + (!isNew && changed(o, f) ? " changed" : "") + '">' + inner + "</td>";
    const txt = (f, ph) => '<input type="text" data-k="' + key + '" data-f="' + f + '" value="' + esc(o[f]) + '" placeholder="' + ph + '">';
    const num = (f, int) => '<input type="number" inputmode="decimal" min="0" step="' + (int ? "1" : "0.01") + '" data-k="' + key + '" data-f="' + f + '" value="' + (o[f] === null || o[f] === undefined ? "" : o[f]) + '" placeholder="' + (f === "qty" ? "—" : "") + '">';
    return '<tr class="' + (isNew ? "new" : "") + (o.status === "hidden" ? " off" : "") + '">' +
      '<td class="sel">' + (isNew ? "" : '<input type="checkbox" data-sel="' + o.id + '"' + (st.selected.has(o.id) ? " checked" : "") + ">") + "</td>" +
      cell("storage", txt("storage", isPart ? "Listing" : "e.g. 256GB")) +
      cell("condition", txt("condition", isPart ? "e.g. iPhone" : "e.g. Mint")) +
      (hasColours ? cell("color", txt("color", "Any")) : "") +
      cell("price", '<span class="money">' + num("price") + "</span>") +
      cell("trade", '<span class="money">' + num("trade") + "</span>") +
      cell("qty", num("qty", true)) +
      cell("status", '<select data-k="' + key + '" data-f="status">' + STATUS.map(([v, t]) => '<option value="' + v + '"' + (o.status === v ? " selected" : "") + ">" + t + "</option>").join("") + "</select>", "act") +
      "</tr>";
  }
  function drawOptions() {
    $("#opts").innerHTML = st.options.map((o, i) => optionRow(o, i, false)).join("") +
      st.added.map((o, i) => optionRow(o, i, true)).join("") ||
      '<tr><td colspan="8"><div class="empty">No options yet. Add one to start selling this.</div></td></tr>';
    $("#sel-all").checked = st.options.length > 0 && st.selected.size === st.options.length;
    drawBulk();
    drawSummary();
  }
  function findOpt(key) { return key[0] === "n" && !/-/.test(key) ? st.added[Number(key.slice(1))] : st.options.find((o) => o.id === key); }
  $("#opts").addEventListener("input", (e) => {
    const el = e.target, key = el.dataset.k, f = el.dataset.f;
    if (!key || !f) return;
    const o = findOpt(key);
    if (f === "price" || f === "trade") o[f] = readNumber(el.value);
    else if (f === "qty") o[f] = readNumber(el.value, { int: true });
    else o[f] = el.value;
    if (Number.isNaN(o[f])) { el.setCustomValidity("Numbers only"); el.reportValidity(); return; }
    el.setCustomValidity("");
    const td = el.closest("td");
    if (!key.startsWith("n") || /-/.test(key)) td.classList.toggle("changed", changed(o, f));
    if (f === "status") el.closest("tr").classList.toggle("off", o.status === "hidden");
    refreshBar(); drawSummary();
  });
  $("#opts").addEventListener("change", (e) => {
    const el = e.target;
    if (el.dataset.sel) {
      el.checked ? st.selected.add(el.dataset.sel) : st.selected.delete(el.dataset.sel);
      $("#sel-all").checked = st.selected.size === st.options.length;
      drawBulk();
    } else if (el.dataset.f === "status") el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  // Enter moves down a column, like a spreadsheet.
  $("#opts").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || !e.target.dataset.f) return;
    e.preventDefault();
    const col = e.target.dataset.f;
    const all = $$('#opts [data-f="' + col + '"]');
    const next = all[all.indexOf(e.target) + (e.shiftKey ? -1 : 1)];
    if (next) { next.focus(); next.select && next.select(); }
  });
  $("#sel-all").addEventListener("change", (e) => {
    st.selected = e.target.checked ? new Set(st.options.map((o) => o.id)) : new Set();
    drawOptions();
  });
  $("#add-option").addEventListener("click", () => {
    const last = st.options[st.options.length - 1] || {};
    st.added.push({ storage: last.storage || "", condition: "", color: "", price: null, trade: null, qty: null, status: "sale" });
    drawOptions(); refreshBar();
    const inputs = $$('#opts tr.new [data-f="' + (isPart ? "storage" : "condition") + '"]');
    inputs[inputs.length - 1].focus();
  });

  /* ---------- bulk changes ---------- */
  function drawBulk() {
    const n = st.selected.size;
    $("#bulk").innerHTML = n ? '<div class="bulkbar"><b>' + n + " selected</b>" +
      '<button class="btn ghost small" data-b="price">Set price</button>' +
      '<button class="btn ghost small" data-b="adjust">Raise / lower price</button>' +
      '<button class="btn ghost small" data-b="trade">Set trade price</button>' +
      '<button class="btn ghost small" data-b="qty">Set stock</button>' +
      '<button class="btn ghost small" data-b="sale">On sale</button>' +
      '<button class="btn ghost small" data-b="soldout">Sold out</button>' +
      '<button class="btn ghost small" data-b="hidden">Hide</button>' +
      '<button class="btn ghost small" data-b="clear">Clear selection</button></div>' : "";
  }
  $("#bulk").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-b]"); if (!b) return;
    const act = b.dataset.b;
    const chosen = st.options.filter((o) => st.selected.has(o.id));
    if (act === "clear") { st.selected.clear(); return drawOptions(); }
    if (["sale", "soldout", "hidden"].includes(act)) chosen.forEach((o) => { o.status = act; });
    else if (act === "adjust") {
      const v = await modal({
        title: "Raise or lower the price of " + chosen.length + " options",
        html: '<div style="display:flex;gap:10px"><select id="adj-dir" style="max-width:130px"><option value="up">Raise by</option><option value="down">Lower by</option></select>' +
          '<input id="adj-n" type="number" min="0" step="0.01" placeholder="20"><select id="adj-u" style="max-width:90px"><option value="$">$</option><option value="%">%</option></select></div>' +
          '<small class="muted">Options without a price are left alone. Prices are rounded to the nearest dollar.</small>',
        ok: "Apply",
        collect: (body) => {
          const n = readNumber($("#adj-n", body).value);
          if (!n || Number.isNaN(n)) throw new Error("Type an amount.");
          return { dir: $("#adj-dir", body).value, n, unit: $("#adj-u", body).value };
        }
      });
      if (!v) return;
      chosen.forEach((o) => {
        if (o.price === null) return;
        const delta = v.unit === "%" ? o.price * v.n / 100 : v.n;
        o.price = Math.max(0, Math.round(o.price + (v.dir === "up" ? delta : -delta)));
      });
    } else {
      const what = { price: "price", trade: "trade price", qty: "stock" }[act];
      const v = await modal({
        title: "Set the " + what + " for " + chosen.length + " options",
        html: '<label class="field"><span>' + what[0].toUpperCase() + what.slice(1) + '</span><input id="bulk-v" type="number" min="0" step="' + (act === "qty" ? "1" : "0.01") + '"></label>' +
          '<small class="muted">Leave it empty to clear it' + (act === "qty" ? " (stock not counted)" : act === "price" ? " (shows “Contact for price”)" : "") + ".</small>",
        ok: "Apply",
        collect: (body) => {
          const n = readNumber($("#bulk-v", body).value, { int: act === "qty" });
          if (Number.isNaN(n)) throw new Error("Numbers only.");
          return { n };
        }
      });
      if (!v) return;
      chosen.forEach((o) => { o[act] = v.n; });
    }
    drawOptions(); refreshBar();
    toast("Applied to " + chosen.length + " options — press Save to keep it.");
  });

  function drawSummary() {
    const live = st.options.filter((o) => o.status !== "hidden");
    const prices = live.map((o) => o.price).filter((x) => x !== null);
    const parts = [live.length + " option" + (live.length === 1 ? "" : "s") + " on the site"];
    if (prices.length) parts.push(Math.min(...prices) === Math.max(...prices) ? money(prices[0]) : money(Math.min(...prices)) + " – " + money(Math.max(...prices)));
    const unpriced = live.filter((o) => o.price === null).length;
    if (unpriced) parts.push(unpriced + " without a price");
    $("#summary").textContent = parts.join(" · ");
  }

  /* ---------- colours & photos ---------- */
  function shotTile(url, ci, pi) {
    return '<div class="shot-tile' + (pi === 0 ? " first" : "") + '" draggable="true" data-ci="' + ci + '" data-pi="' + pi + '" title="Drag to reorder · drop a picture here to replace it">' +
      (url === "…" ? '<span class="spinner dark"></span>' : '<img alt="" loading="lazy" src="' + esc(photoSrc(url)) + '">') +
      '<button class="x" type="button" data-rm="' + ci + ":" + pi + '" aria-label="Remove photo">×</button></div>';
  }
  function drawColours() {
    if (!hasColours) return;
    const box = $("#finishes");
    box.innerHTML = st.colours.length ? st.colours.map((c, ci) =>
      '<div class="finish' + (c.hidden ? " off" : "") + '" data-ci="' + ci + '">' +
        '<span class="grip" draggable="true" title="Drag to reorder colours">' + GRIP + "</span>" +
        '<div class="finish-main"><div class="finish-title">' +
          '<label class="swatch" style="background:' + esc(c.hex) + '" title="Change the swatch colour"><input type="color" data-hex="' + ci + '" value="' + esc(toHex(c.hex)) + '"></label>' +
          '<input type="text" data-name="' + ci + '" value="' + esc(c.color) + '" aria-label="Colour name">' +
          '<span class="pill plain nodot">' + c.photos.filter((u) => u !== "…").length + " photo" + (c.photos.length === 1 ? "" : "s") + "</span></div>" +
          '<div class="shots" data-shots="' + ci + '">' + c.photos.map((u, pi) => shotTile(u, ci, pi)).join("") +
          '<button class="shot-add" type="button" data-add="' + ci + '">' + PLUS + "Add photos</button></div></div>" +
        '<div class="finish-side"><label class="switch"><input type="checkbox" data-show="' + ci + '"' + (c.hidden ? "" : " checked") + '><span class="track"></span>' + (c.hidden ? "Hidden" : "Shown") + "</label>" +
        '<button class="btn danger small" type="button" data-del="' + ci + '">Remove colour</button></div></div>').join("")
      : '<div class="empty">No colours yet. Add one, then drag its photos in.</div>';

    $$(".finish", box).forEach((el) => {
      const ci = Number(el.dataset.ci);
      acceptFiles(el, (files) => addPhotos(ci, files));
    });
    $$(".shot-tile", box).forEach((el) => {
      acceptFiles(el, (files) => replacePhoto(Number(el.dataset.ci), Number(el.dataset.pi), files[0]));
    });
    $$(".shots", box).forEach((el) => {
      const ci = Number(el.dataset.shots);
      sortable(el, ".shot-tile", (from, to) => { move(st.colours[ci].photos, from, to); dirtyColours(); });
    });
  }
  if (hasColours) {
    const box = $("#finishes");
    sortable(box, ".finish", (from, to) => { move(st.colours, from, to); dirtyColours(); }, ".grip");
    box.addEventListener("click", async (e) => {
      const add = e.target.closest("[data-add]");
      if (add) { const files = await pickFiles(); if (files.length) addPhotos(Number(add.dataset.add), files); return; }
      const rm = e.target.closest("[data-rm]");
      if (rm) { const [ci, pi] = rm.dataset.rm.split(":").map(Number); st.colours[ci].photos.splice(pi, 1); dirtyColours(); return; }
      const del = e.target.closest("[data-del]");
      if (del) {
        const c = st.colours[Number(del.dataset.del)];
        if (await confirmBox("Remove " + (c.color || "this colour") + "?", "Shoppers will no longer be able to pick it. You can switch it off instead if it may come back.", "Remove", true)) {
          st.colours.splice(Number(del.dataset.del), 1); dirtyColours();
        }
      }
    });
    box.addEventListener("change", (e) => {
      const t = e.target;
      if (t.dataset.show !== undefined) { st.colours[Number(t.dataset.show)].hidden = !t.checked; dirtyColours(); }
    });
    box.addEventListener("input", (e) => {
      const t = e.target;
      if (t.dataset.name !== undefined) { st.colours[Number(t.dataset.name)].color = t.value; markColours(); }
      if (t.dataset.hex !== undefined) {
        const c = st.colours[Number(t.dataset.hex)];
        c.hex = t.value; t.parentNode.style.background = t.value; markColours();
      }
    });
    $("#add-colour").addEventListener("click", async () => {
      const name = await modal({
        title: "Add a colour",
        html: '<label class="field"><span>Colour name</span><input id="cn" type="text" placeholder="e.g. Desert Titanium"></label><small class="muted">You can drag its photos in straight after.</small>',
        ok: "Add colour",
        collect: (body) => {
          const v = $("#cn", body).value.trim();
          if (!v) throw new Error("Type a colour name.");
          if (st.colours.some((c) => c.color.toLowerCase() === v.toLowerCase())) throw new Error("There is already a colour called " + v + ".");
          return v;
        }
      });
      if (!name) return;
      st.colours.push({ color: name, hex: builtinHex(name), hidden: false, photos: [] });
      dirtyColours();
    });
  }
  function toHex(c) { return /^#[0-9a-f]{6}$/i.test(c) ? c : "#9aa7b4"; }
  function markColours() { st.coloursDirty = true; refreshBar(); }
  function dirtyColours() { st.coloursDirty = true; drawColours(); refreshBar(); }

  async function processUpload(file) {
    const blob = await preparePhoto(file, { cut: cutOut.on });
    return upload(blob, "products/" + p.id);
  }
  async function addPhotos(ci, files) {
    const list = hasColours ? st.colours[ci].photos : st.photos;
    for (const file of files) {
      list.push("…");
      const slot = list.length - 1;
      st.uploading++;
      redrawPhotos(); refreshBar();
      try {
        const url = await processUpload(file);
        const at = list.indexOf("…");
        list.splice(at >= 0 ? at : slot, 1, url);
      } catch (err) {
        const at = list.indexOf("…"); if (at >= 0) list.splice(at, 1);
        toast("Could not upload " + file.name + ": " + err.message, "bad");
      } finally { st.uploading--; }
      hasColours ? (st.coloursDirty = true) : (st.photosDirty = true);
      redrawPhotos(); refreshBar();
    }
    toast(files.length === 1 ? "Photo added — press Save to publish it." : files.length + " photos added — press Save to publish them.");
  }
  async function replacePhoto(ci, pi, file) {
    const list = hasColours ? st.colours[ci].photos : st.photos;
    const old = list[pi];
    list[pi] = "…"; st.uploading++; redrawPhotos(); refreshBar();
    try { list[pi] = await processUpload(file); toast("Photo replaced — press Save to publish it."); }
    catch (err) { list[pi] = old; toast("Could not upload: " + err.message, "bad"); }
    finally { st.uploading--; }
    hasColours ? (st.coloursDirty = true) : (st.photosDirty = true);
    redrawPhotos(); refreshBar();
  }
  function redrawPhotos() { hasColours ? drawColours() : drawPartPhotos(); }

  // Parts and other products: one row of photos.
  function drawPartPhotos() {
    if (hasColours) return;
    const box = $("#pshots");
    box.innerHTML = st.photos.map((u, pi) => shotTile(u, 0, pi)).join("") +
      '<button class="shot-add" type="button" id="padd">' + PLUS + "Add photos</button>";
    $$(".shot-tile", box).forEach((el) => acceptFiles(el, (files) => replacePhoto(0, Number(el.dataset.pi), files[0])));
    acceptFiles($("#padd"), (files) => addPhotos(0, files), "over");
  }
  if (!hasColours) {
    const box = $("#pshots");
    sortable(box, ".shot-tile", (from, to) => { move(st.photos, from, to); st.photosDirty = true; drawPartPhotos(); refreshBar(); });
    acceptFiles($("#photos-card"), (files) => addPhotos(0, files));
    box.addEventListener("click", async (e) => {
      if (e.target.closest("#padd")) { const files = await pickFiles(); if (files.length) addPhotos(0, files); return; }
      const rm = e.target.closest("[data-rm]");
      if (rm) { st.photos.splice(Number(rm.dataset.rm.split(":")[1]), 1); st.photosDirty = true; drawPartPhotos(); refreshBar(); }
    });
  }

  /* ---------- saving ---------- */
  function pending() {
    let n = 0;
    st.options.forEach((o) => fields.forEach((f) => { if (changed(o, f)) n++; }));
    n += st.added.filter((o) => o.storage || o.condition || o.price !== null).length;
    if (st.coloursDirty) n++;
    if (st.photosDirty) n++;
    if (st.active !== p.is_active) n++;
    return n;
  }
  setLeaveCheck(() => pending() > 0);
  function refreshBar() {
    const n = pending();
    const bar = $("#savebar");
    if (!n && !st.uploading) { bar.innerHTML = ""; return; }
    bar.innerHTML = '<div class="savebar"><span>' + (st.uploading ? '<span class="spinner"></span> Uploading ' + st.uploading + " photo" + (st.uploading === 1 ? "" : "s") + "…" :
      "<b>" + n + " unsaved change" + (n === 1 ? "" : "s") + "</b>") + '</span><span style="display:flex;gap:10px">' +
      '<button class="btn ghost" id="discard" type="button">Discard</button><button class="btn accent" id="save" type="button"' + (st.uploading ? " disabled" : "") + ">Save changes</button></span></div>";
    $("#discard").onclick = async () => {
      if (await confirmBox("Discard your changes?", "Everything you changed on this page since the last save will be put back.", "Discard", true)) { setLeaveCheck(null); renderProduct(id); }
    };
    $("#save").onclick = save;
  }

  async function save() {
    const btn = $("#save");
    btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Saving…';
    try {
      const options = [];
      const lines = [];
      for (const o of st.options) {
        const set = {};
        fields.forEach((f) => { if (changed(o, f)) set[f] = o[f]; });
        if (!Object.keys(set).length) continue;
        if ("status" in set) {
          set.active = o.status !== "hidden";
          set.available = o.status === "sale";
          delete set.status;
        }
        options.push({ id: o.id, set });
        lines.push(describe(o, st.orig[o.id]));
      }
      const newOptions = st.added.filter((o) => o.storage || o.condition || o.price !== null).map((o) => ({
        storage: o.storage.trim(), condition: o.condition.trim(), color: (o.color || "").trim(),
        price: o.price, trade: o.trade, qty: o.qty, available: o.status === "sale"
      }));
      if (st.colours.some((c) => !c.color.trim())) throw new Error("Every colour needs a name.");
      const names = st.colours.map((c) => c.color.trim().toLowerCase());
      if (new Set(names).size !== names.length) throw new Error("Two colours have the same name.");

      await saveProduct(p.id, {
        product: st.active !== p.is_active ? { is_active: st.active } : null,
        options, newOptions,
        finishes: st.coloursDirty ? st.colours.map((c) => ({ ...c, photos: c.photos.filter((u) => u !== "…") })) : null,
        images: st.photosDirty ? st.photos.filter((u) => u !== "…") : null
      });
      const bits = [];
      if (options.length) bits.push(options.length + " option" + (options.length === 1 ? "" : "s") + " changed");
      if (newOptions.length) bits.push(newOptions.length + " added");
      if (st.coloursDirty) bits.push("colours & photos updated");
      if (st.photosDirty) bits.push("photos updated");
      if (st.active !== p.is_active) bits.push(st.active ? "put back on the site" : "hidden from the site");
      await log("updated", p.model + (p.part_name ? " — " + p.part_name : ""), { productId: p.id, summary: bits.join(", "), lines: lines.slice(0, 40) });
      setLeaveCheck(null);
      if (options.length || newOptions.length || st.active !== p.is_active) mirrorSoon();
      toast("Saved. The website updates within about a minute.", "good");
      renderProduct(id);
    } catch (err) {
      toast(err.message, "bad");
      btn.disabled = false; btn.textContent = "Save changes";
    }
  }
  function describe(o, was) {
    const name = [o.storage, o.condition, o.color].filter(Boolean).join(" ");
    const parts = [];
    if (was.price !== o.price) parts.push("price " + money(was.price) + " → " + money(o.price));
    if (was.trade !== o.trade) parts.push("trade " + money(was.trade) + " → " + money(o.trade));
    if (was.qty !== o.qty) parts.push("stock " + (was.qty ?? "—") + " → " + (o.qty ?? "—"));
    if (was.status !== o.status) parts.push(o.status === "sale" ? "on sale" : o.status === "soldout" ? "sold out" : "hidden");
    return name + ": " + (parts.join(", ") || "details changed");
  }

  drawOptions();
  drawColours();
  drawPartPhotos();
  refreshBar();
}
