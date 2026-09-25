// Start-up: sign-in, the frame around every page, search, and page switching.

import { sb, configured, me, loadMe, search } from "./db.js";
import { $, $$, esc, toast, initials, debounce, modal, photoSrc } from "./ui.js";
import { renderHome } from "./views/home.js";
import { renderDevices, renderParts } from "./views/products.js";
import { renderProduct } from "./views/product.js";
import { renderPosters } from "./views/posters.js";
import { renderActivity } from "./views/activity.js";

/* ---------- unsaved work guard ----------
   A page with unsaved edits registers a check; leaving asks first. */
let leaveCheck = null;
export function setLeaveCheck(fn) { leaveCheck = fn; }
window.addEventListener("beforeunload", (e) => { if (leaveCheck && leaveCheck()) { e.preventDefault(); e.returnValue = ""; } });

/* ---------- routing ---------- */
const routes = [
  [/^#?\/?$/, "home", () => renderHome()],
  [/^#\/devices(?:\?(.*))?$/, "devices", (m) => renderDevices(new URLSearchParams(m[1] || ""))],
  [/^#\/parts(?:\?(.*))?$/, "parts", (m) => renderParts(new URLSearchParams(m[1] || ""))],
  [/^#\/product\/([0-9a-f-]{36})$/, null, (m) => renderProduct(m[1])],
  [/^#\/posters$/, "posters", () => renderPosters()],
  [/^#\/activity$/, "activity", () => renderActivity()]
];
let lastHash = location.hash;
async function route() {
  if (leaveCheck && leaveCheck() && location.hash !== lastHash) {
    const go = await modal({ title: "Leave without saving?", html: '<p class="muted" style="margin:0">You have changes on this page that are not saved yet.</p>', ok: "Leave and discard", danger: true, cancel: "Stay here" });
    if (!go) { history.replaceState(null, "", lastHash || "#/"); return; }
  }
  leaveCheck = null;
  lastHash = location.hash;
  const hash = location.hash || "#/";
  $("#sidebar").classList.remove("open");
  for (const [re, nav, fn] of routes) {
    const m = hash.match(re);
    if (!m) continue;
    $$(".side-nav a").forEach((a) => a.classList.toggle("on", a.dataset.nav === (nav || sessionStorage.getItem("fm.lastList") || "devices")));
    if (nav === "devices" || nav === "parts") sessionStorage.setItem("fm.lastList", nav);
    $("#view").innerHTML = '<div class="skeleton" style="height:160px"></div>';
    try { await fn(m); } catch (err) {
      console.error(err);
      $("#view").innerHTML = '<div class="card card-body"><h2>Something went wrong</h2><p class="muted">' + esc(err.message || err) + '</p><button class="btn ghost" onclick="location.reload()">Reload</button></div>';
    }
    $("#view").focus({ preventScroll: true });
    window.scrollTo(0, 0);
    return;
  }
  location.hash = "#/";
}
window.addEventListener("hashchange", route);

/* ---------- sign in ---------- */
function showSignedOut(text) {
  $("#app").hidden = true;
  $("#login-view").hidden = false;
  if (text) { $("#login-message").textContent = text; $("#login-message").className = "message error"; }
}
async function showSignedIn(session) {
  if (!(await loadMe(session))) {
    await sb.auth.signOut();
    return showSignedOut("This account does not have FM Cellular admin access.");
  }
  $("#login-view").hidden = true;
  $("#app").hidden = false;
  $("#me-name").textContent = me.name;
  $("#me-email").textContent = me.email;
  $("#me-avatar").textContent = initials(me.name);
  $$("[data-owner-only]").forEach((el) => { el.hidden = me.role !== "owner"; });
  route();
}

$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = $("#login-message");
  msg.textContent = "Signing in…"; msg.className = "message";
  const { data, error } = await sb.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#password").value });
  if (error) { msg.textContent = "That email and password did not match. Try again, or reset your password."; msg.className = "message error"; return; }
  $("#password").value = "";
  msg.textContent = "";
  showSignedIn(data.session);
});
$("#forgot-password").addEventListener("click", () => {
  $("#login-form").hidden = true; $("#forgot-password").hidden = true; $("#recovery-request-form").hidden = false;
  $("#recovery-email").value = $("#email").value; $("#recovery-email").focus();
});
$("#cancel-recovery").addEventListener("click", () => {
  $("#login-form").hidden = false; $("#forgot-password").hidden = false; $("#recovery-request-form").hidden = true;
});
$("#recovery-request-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = $("#recovery-message");
  const { error } = await sb.auth.resetPasswordForEmail($("#recovery-email").value.trim(), { redirectTo: location.origin + "/recovery" });
  msg.textContent = error ? error.message : "If that email has admin access, a reset link is on its way.";
  msg.className = "message " + (error ? "error" : "success");
});
$("#sign-out").addEventListener("click", async () => {
  if (leaveCheck && leaveCheck() && !(await modal({ title: "Sign out without saving?", html: '<p class="muted" style="margin:0">Your unsaved changes will be lost.</p>', ok: "Sign out", danger: true }))) return;
  leaveCheck = null;
  await sb.auth.signOut();
  location.hash = "";
  showSignedOut();
});

/* ---------- search ---------- */
const results = $("#search-results");
const input = $("#global-search");
let pick = -1;
const ICON_PHONE = '<svg viewBox="0 0 24 24" style="width:20px;height:20px"><rect x="7" y="3" width="10" height="18" rx="2.4"/></svg>';
const ICON_PART = '<svg viewBox="0 0 24 24" style="width:20px;height:20px"><path d="M14.5 5.5l4 4-9 9h-4v-4z"/></svg>';
const runSearch = debounce(async () => {
  const q = input.value.trim();
  if (q.length < 2) { results.hidden = true; return; }
  try {
    const rows = await search(q);
    pick = -1;
    results.innerHTML = rows.length ? rows.map((r) =>
      '<a class="sr-item" href="#/product/' + r.id + '"><span class="ph" style="width:38px;height:38px;border-radius:8px;background:var(--sunk)">' +
      (r.item_type === "part" ? ICON_PART : ICON_PHONE) + "</span><span><b>" + esc(r.model) + (r.part_name ? " — " + esc(r.part_name) : "") +
      "</b><small>" + esc(r.item_type === "part" ? "Part · " + r.category : r.category) + (r.is_active ? "" : " · hidden") + "</small></span></a>").join("")
      : '<div class="sr-empty">Nothing matches “' + esc(q) + '”.</div>';
    results.hidden = false;
  } catch (err) { results.innerHTML = '<div class="sr-empty">' + esc(err.message) + "</div>"; results.hidden = false; }
}, 180);
input.addEventListener("input", runSearch);
input.addEventListener("keydown", (e) => {
  const items = $$(".sr-item", results);
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    pick = Math.max(0, Math.min(items.length - 1, pick + (e.key === "ArrowDown" ? 1 : -1)));
    items.forEach((x, i) => x.classList.toggle("on", i === pick));
  } else if (e.key === "Enter" && items.length) {
    e.preventDefault();
    location.hash = items[Math.max(0, pick)].getAttribute("href");
    results.hidden = true; input.blur();
  } else if (e.key === "Escape") { results.hidden = true; input.blur(); }
});
results.addEventListener("click", () => { results.hidden = true; input.value = ""; });
document.addEventListener("click", (e) => { if (!e.target.closest(".search")) results.hidden = true; });
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !e.target.closest("input,textarea,select,[contenteditable]")) { e.preventDefault(); input.focus(); }
});

/* ---------- the rest of the frame ---------- */
$("#menu-toggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));

// A picture dragged anywhere over the page: show where it can go, and never
// let the browser open the file instead.
let dragDepth = 0;
window.addEventListener("dragenter", (e) => { if ([...(e.dataTransfer?.types || [])].includes("Files")) { dragDepth++; document.body.classList.add("dragging-files"); } });
window.addEventListener("dragleave", () => { dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) document.body.classList.remove("dragging-files"); });
window.addEventListener("drop", (e) => { dragDepth = 0; document.body.classList.remove("dragging-files"); if ([...(e.dataTransfer?.types || [])].includes("Files")) e.preventDefault(); });
window.addEventListener("dragover", (e) => { if ([...(e.dataTransfer?.types || [])].includes("Files")) e.preventDefault(); });
const hint = document.createElement("div");
hint.className = "page-drop";
hint.innerHTML = "<div>Drop the picture on a colour, a photo, or the poster area</div>";
document.body.appendChild(hint);

// Before the switch only: refresh everything here from the Google Sheet.
$("#sync-sheet").addEventListener("click", async () => {
  const btn = $("#sync-sheet");
  btn.disabled = true;
  try {
    toast("Reading the Google Sheet…");
    const dry = await sb.functions.invoke("sync-from-sheet", { body: {} });
    if (dry.error || !dry.data?.ok) throw new Error(dry.data?.error || dry.error?.message || "The sheet could not be read.");
    const d = dry.data;
    const go = await modal({
      title: "Replace everything with the Google Sheet?",
      html: '<p style="margin:0">The sheet has <b>' + d.products + " products</b> and <b>" + d.variants + " options</b> (" + d.priced + " priced), " +
        d.finishes + ' colours.</p><p class="muted" style="margin:0">Every edit made in this admin since the last copy will be replaced. Only use this before the website switches over.</p>',
      ok: "Replace with the sheet", danger: true
    });
    if (!go) return;
    toast("Copying… this takes about half a minute.");
    const run = await sb.functions.invoke("sync-from-sheet", { body: { confirm: "replace-all" } });
    if (run.error || !run.data?.ok) throw new Error(run.data?.error || run.error?.message || "The copy failed.");
    toast("Copied from the sheet.", "good");
    route();
  } catch (err) { toast(err.message, "bad"); }
  finally { btn.disabled = false; }
});

/* ---------- go ---------- */
(async () => {
  if (!configured) return showSignedOut("The admin is missing its settings (config.js).");
  const { data } = await sb.auth.getSession();
  if (data.session) showSignedIn(data.session);
  else showSignedOut();
  sb.auth.onAuthStateChange((event) => { if (event === "SIGNED_OUT") showSignedOut(); });
})();

export { photoSrc };
