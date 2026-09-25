// Photos: what the shop shows for a model, preparing a new picture so it
// matches every other photo on the site, and drag-and-drop of image files.

import { upload } from "./db.js";

/* ---------- the shop's own colours and photos ---------- */
// The live site's catalog-maps.js and photo-library.js are loaded by
// index.html, so a model nobody has edited shows exactly what a shopper sees.

const has = (name) => { try { return typeof eval(name) !== "undefined"; } catch (e) { return false; } };
const G = (name) => (has(name) ? eval(name) : null);   // the site files declare top-level consts

function libraryPhotos(model, colour) {
  return window.PhotoLibrary ? window.PhotoLibrary.photos(model, colour) : [];
}
function builtinColours(model) {
  const own = G("MODEL_COLOR_MAP") && G("MODEL_COLOR_MAP")[model];
  if (own && own.length) return own;
  return window.PhotoLibrary ? window.PhotoLibrary.colours(model) : [];
}
function builtinPhoto(model, colour) {
  const map = G("PHOTO_MAP"), base = G("PHOTO_BASE") || "phone-images/transparent/";
  if (colour && map && map[model] && map[model][colour]) return base + String(map[model][colour]).replace(/\.png$/i, ".webp");
  return libraryPhotos(model, colour)[0] || "";
}
export function builtinHex(name) {
  const m = G("COLOR_HEX_MAP");
  return (m && m[String(name || "").trim().toLowerCase()]) || "#9AA7B4";
}
const unique = (...lists) => {
  const seen = new Set(), out = [];
  lists.flat().forEach((u) => { const s = String(u || "").trim(); if (s && !seen.has(s)) { seen.add(s); out.push(s); } });
  return out;
};

// The colours for a model: what is saved, else the lineup the site ships with.
export function coloursFor(model, saved) {
  if (saved && saved.length) {
    return saved.map((f) => ({
      color: f.color || "", hex: f.hex_color || builtinHex(f.color), hidden: !!f.is_hidden,
      photos: unique([f.image_url], f.extra_urls || [])
    }));
  }
  return builtinColours(model).map((c) => ({
    color: c, hex: builtinHex(c), hidden: false,
    photos: unique([builtinPhoto(model, c)], libraryPhotos(model, c))
  }));
}

// The picture on a product's card.
export function cardPhoto(model, saved) {
  const list = coloursFor(model, saved).filter((c) => !c.hidden);
  for (const c of list) if (c.photos[0]) return c.photos[0];
  return "";
}

/* ---------- making an upload match the shop ---------- */
// The same steps every photo on the site went through: find the plain
// background, cut it away, trim to the product, fit it to a 560px square.

const CANVAS = 560, FILL = 0.9, WORK_MAX = 1400;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("That file is not a picture this browser can open.")); };
    img.src = url;
  });
}
const lum = (d, i) => (d[i] * 30 + d[i + 1] * 59 + d[i + 2] * 11) / 100;
const span = (d, i) => Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]);

function cutOut(img) {
  const scale = Math.min(1, WORK_MAX / Math.max(img.width, img.height));
  const W = Math.max(1, Math.round(img.width * scale)), H = Math.max(1, Math.round(img.height * scale));
  const work = document.createElement("canvas");
  work.width = W; work.height = H;
  const wx = work.getContext("2d", { willReadFrequently: true });
  wx.drawImage(img, 0, 0, W, H);
  const id = wx.getImageData(0, 0, W, H), d = id.data;

  const border = [];
  for (let x = 0; x < W; x += 3) { border.push(lum(d, x * 4)); border.push(lum(d, ((H - 1) * W + x) * 4)); }
  for (let y = 0; y < H; y += 3) { border.push(lum(d, (y * W) * 4)); border.push(lum(d, (y * W + W - 1) * 4)); }
  border.sort((a, b) => a - b);
  const ground = border[Math.floor(border.length / 2)];
  const spread = border[Math.floor(border.length * 0.95)] - border[Math.floor(border.length * 0.05)];
  const tol = Math.max(5, spread + 4), soft = Math.max(tol + 16, ground < 110 ? 46 : 26), maxSpan = ground < 110 ? 24 : 18;

  const bg = new Uint8Array(W * H), stack = new Int32Array(W * H);
  let sp = 0;
  const seed = (i) => { if (bg[i]) return; const q = i * 4; if (Math.abs(lum(d, q) - ground) <= tol && span(d, q) <= maxSpan) { bg[i] = 1; stack[sp++] = i; } };
  for (let x = 0; x < W; x++) { seed(x); seed((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { seed(y * W); seed(y * W + W - 1); }
  while (sp > 0) {
    const cur = stack[--sp], cy = (cur / W) | 0, cx = cur - cy * W;
    for (let k = 0; k < 4; k++) {
      const nx = cx + (k === 0 ? -1 : k === 1 ? 1 : 0), ny = cy + (k === 2 ? -1 : k === 3 ? 1 : 0);
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const ni = ny * W + nx;
      if (bg[ni]) continue;
      const pi = ni * 4;
      if (Math.abs(lum(d, pi) - ground) > tol || span(d, pi) > maxSpan) continue;
      bg[ni] = 1; stack[sp++] = ni;
    }
  }
  let alpha = new Uint8ClampedArray(W * H);
  for (let i = 0; i < W * H; i++) alpha[i] = bg[i] ? 0 : 255;
  const next = alpha.slice();
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x;
    if (!alpha[i] || (alpha[i - 1] && alpha[i + 1] && alpha[i - W] && alpha[i + W])) continue;
    const diff = Math.abs(lum(d, i * 4) - ground);
    if (diff > soft) continue;
    const av = Math.max(0, Math.min(255, Math.round(255 * (diff - tol) / (soft - tol))));
    if (av < next[i]) next[i] = av;
  }
  alpha = next;
  const rowMin = Math.max(4, Math.round(W * 0.02)), colMin = Math.max(4, Math.round(H * 0.02));
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < H; y++) { let n = 0; for (let x = 0; x < W; x++) if (alpha[y * W + x] >= 16) n++; if (n < rowMin) for (let x = 0; x < W; x++) alpha[y * W + x] = 0; }
    for (let x = 0; x < W; x++) { let n = 0; for (let y = 0; y < H; y++) if (alpha[y * W + x] >= 16) n++; if (n < colMin) for (let y = 0; y < H; y++) alpha[y * W + x] = 0; }
  }
  let L = W, R = -1, T = H, B = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    d[i * 4 + 3] = alpha[i];
    if (alpha[i] < 16) continue;
    if (x < L) L = x; if (x > R) R = x; if (y < T) T = y; if (y > B) B = y;
  }
  if (R < L || B < T) return null;                    // nothing but background
  wx.putImageData(id, 0, 0);
  return { work, L, T, cw: R - L + 1, ch: B - T + 1 };
}

// Returns a Blob ready to upload.
export async function preparePhoto(file, { cut = true } = {}) {
  const img = await loadImage(file);
  const out = document.createElement("canvas");
  out.width = CANVAS; out.height = CANVAS;
  const ox = out.getContext("2d");
  ox.imageSmoothingEnabled = true; ox.imageSmoothingQuality = "high";
  const c = cut ? cutOut(img) : null;
  if (c) {
    const f = Math.min((CANVAS * FILL) / c.cw, (CANVAS * FILL) / c.ch);
    const dw = c.cw * f, dh = c.ch * f;
    ox.drawImage(c.work, c.L, c.T, c.cw, c.ch, (CANVAS - dw) / 2, (CANVAS - dh) / 2, dw, dh);
  } else {
    // A busy background cannot be cut cleanly; keep the whole picture, fitted.
    const f = Math.min(CANVAS / img.width, CANVAS / img.height);
    const dw = img.width * f, dh = img.height * f;
    ox.drawImage(img, (CANVAS - dw) / 2, (CANVAS - dh) / 2, dw, dh);
  }
  return new Promise((resolve) => out.toBlob(resolve, "image/webp", 0.92));
}

// Posters keep their own shape: just made smaller if huge.
export async function preparePoster(file) {
  const img = await loadImage(file);
  const maxW = 2000, f = Math.min(1, maxW / img.width);
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * f); c.height = Math.round(img.height * f);
  const x = c.getContext("2d");
  x.imageSmoothingQuality = "high";
  x.drawImage(img, 0, 0, c.width, c.height);
  return new Promise((resolve) => c.toBlob(resolve, "image/webp", 0.9));
}

export async function uploadPhoto(file, folder, opts) {
  const blob = await preparePhoto(file, opts);
  return upload(blob, folder);
}

/* ---------- drag and drop of files ---------- */

export const isFileDrag = (e) => !!(e.dataTransfer && [...(e.dataTransfer.types || [])].includes("Files"));
export const imageFiles = (list) => [...(list || [])].filter((f) => /^image\//.test(f.type));

// Makes `el` accept dropped picture files. onFiles(files) gets only images.
export function acceptFiles(el, onFiles, overClass = "file-over") {
  let depth = 0;
  el.addEventListener("dragenter", (e) => { if (!isFileDrag(e)) return; e.preventDefault(); depth++; el.classList.add(overClass); });
  el.addEventListener("dragover", (e) => { if (!isFileDrag(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = "copy"; });
  el.addEventListener("dragleave", (e) => { if (!isFileDrag(e)) return; depth = Math.max(0, depth - 1); if (!depth) el.classList.remove(overClass); });
  el.addEventListener("drop", (e) => {
    if (!isFileDrag(e)) return;
    e.preventDefault(); e.stopPropagation();
    depth = 0; el.classList.remove(overClass);
    const files = imageFiles(e.dataTransfer.files);
    if (files.length) onFiles(files);
  });
}

// Opens the picker; resolves with the chosen image files.
export function pickFiles({ multiple = true } = {}) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.multiple = multiple;
    input.onchange = () => resolve(imageFiles(input.files));
    input.click();
  });
}

// Reordering things inside a container by dragging them (mouse or touch pen).
// `items` is a selector for the draggable children; onMove(from, to) is
// called with their indexes once dropped.
export function sortable(container, itemSel, onMove, handleSel = null) {
  let from = -1;
  const items = () => [...container.querySelectorAll(itemSel)];
  container.addEventListener("dragstart", (e) => {
    const it = e.target.closest(itemSel);
    if (!it || !container.contains(it)) return;
    if (handleSel && !e.target.closest(handleSel)) return;
    e.stopPropagation();          // a photo dragged inside a colour is not the colour moving
    from = items().indexOf(it);
    it.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "fm-move");
  });
  container.addEventListener("dragover", (e) => {
    if (from < 0 || isFileDrag(e)) return;
    const it = e.target.closest(itemSel);
    if (!it || !container.contains(it)) return;
    e.preventDefault();
    items().forEach((x) => x.classList.remove("drop-before"));
    it.classList.add("drop-before");
  });
  container.addEventListener("drop", (e) => {
    if (from < 0 || isFileDrag(e)) return;
    const it = e.target.closest(itemSel);
    e.preventDefault();
    const to = it ? items().indexOf(it) : -1;
    const f = from;
    from = -1;
    items().forEach((x) => x.classList.remove("drop-before", "dragging"));
    if (to >= 0 && to !== f) onMove(f, to);
  });
  container.addEventListener("dragend", () => {
    from = -1;
    items().forEach((x) => x.classList.remove("drop-before", "dragging"));
  });
}

export const move = (list, from, to) => { const [x] = list.splice(from, 1); list.splice(to, 0, x); return list; };
