// Small shared helpers: escaping, formatting, toasts, confirm boxes.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Poster headlines carry <br> and <em>; keep those two, drop everything else.
export function safeHeadline(html) {
  return esc(String(html || "").replace(/<br\s*\/?>/gi, "\n"))
    .replace(/&lt;em&gt;/gi, "<em>").replace(/&lt;\/em&gt;/gi, "</em>")
    .replace(/\n/g, "<br>");
}

export function money(n) {
  if (n === null || n === undefined || n === "" || !isFinite(Number(n))) return "—";
  const v = Number(n);
  return "$" + v.toLocaleString("en-US", { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
}

export function timeAgo(when) {
  const s = Math.max(1, Math.round((Date.now() - new Date(when).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60); if (m < 60) return m + " min ago";
  const h = Math.round(m / 60); if (h < 24) return h + " hr ago";
  const d = Math.round(h / 24); if (d < 7) return d + " day" + (d === 1 ? "" : "s") + " ago";
  return new Date(when).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Photos are stored as the shop stores them: a path on the live site, or a
// full address for anything uploaded here.
export const SITE = "https://www.fmcellular.com/";
export function photoSrc(url) {
  const s = String(url || "").trim();
  if (!s) return "";
  if (/^(https?:|data:|blob:)/i.test(s)) return s;
  return SITE + encodeURI(s.replace(/^\/+/, ""));
}

export function initials(name) {
  const parts = String(name || "?").replace(/@.*/, "").split(/[\s._-]+/).filter(Boolean);
  return ((parts[0] || "?")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

export function toast(text, kind = "") {
  const box = document.createElement("div");
  box.className = "toast " + kind;
  box.textContent = text;
  $("#toasts").appendChild(box);
  setTimeout(() => { box.style.opacity = "0"; box.style.transition = "opacity .3s"; }, 3200);
  setTimeout(() => box.remove(), 3600);
}

// A modal with its own buttons. Resolves with the value of the button
// pressed, or null when closed. build(body) may add fields; collect(body)
// turns them into the result for the "ok" button.
export function modal({ title, html = "", ok = "OK", cancel = "Cancel", danger = false, wide = false, build, collect }) {
  return new Promise((resolve) => {
    const root = $("#modal-root");
    const back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML =
      '<div class="modal' + (wide ? " wide" : "") + '" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      "<h2>" + esc(title) + "</h2><div class=\"modal-body stack\">" + html + "</div>" +
      '<p class="message" data-msg></p>' +
      '<div class="actions">' + (cancel ? '<button class="btn ghost" data-act="cancel" type="button">' + esc(cancel) + "</button>" : "") +
      '<button class="btn ' + (danger ? "danger" : "primary") + '" data-act="ok" type="button">' + esc(ok) + "</button></div></div>";
    root.appendChild(back);
    const body = back.querySelector(".modal-body");
    const msg = back.querySelector("[data-msg]");
    if (build) build(body, { message: (t, k) => { msg.textContent = t; msg.className = "message " + (k || ""); } });
    const done = (v) => { back.remove(); document.removeEventListener("keydown", onKey); resolve(v); };
    const onKey = (e) => { if (e.key === "Escape") done(null); };
    document.addEventListener("keydown", onKey);
    back.addEventListener("click", async (e) => {
      if (e.target === back) return done(null);
      const act = e.target.closest("[data-act]");
      if (!act) return;
      if (act.dataset.act === "cancel") return done(null);
      try {
        const value = collect ? await collect(body) : true;
        if (value === undefined) return;          // collect decided to keep it open
        done(value);
      } catch (err) {
        msg.textContent = err.message || String(err);
        msg.className = "message error";
      }
    });
    setTimeout(() => (body.querySelector("input,select,textarea") || back.querySelector("[data-act=ok]")).focus(), 30);
  });
}

export const confirmBox = (title, text, ok = "Yes", danger = false) =>
  modal({ title, html: "<p class=\"muted\" style=\"margin:0\">" + esc(text) + "</p>", ok, danger });

// A little SVG phone for products with no photo yet.
export const PLACEHOLDER =
  '<div class="ph"><svg viewBox="0 0 48 48"><rect x="15" y="5" width="18" height="38" rx="4"/><path d="M21 38h6"/></svg></div>';

// Reading a numeric input: blank stays blank (null), anything else a number.
export function readNumber(v, { int = false } = {}) {
  const s = String(v == null ? "" : v).trim().replace(/[$,]/g, "");
  if (s === "") return null;
  const n = Number(s);
  if (!isFinite(n) || n < 0) return NaN;
  return int ? Math.floor(n) : Math.round(n * 100) / 100;
}

export function debounce(fn, ms) {
  let t = null;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}
