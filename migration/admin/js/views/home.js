import { stats, activity, me } from "../db.js";
import { $, esc, timeAgo, initials } from "../ui.js";

export async function renderHome() {
  const hour = new Date().getHours();
  const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const view = $("#view");
  view.innerHTML =
    '<div class="page-head"><div><p class="eyebrow">FM Cellular</p><h1>' + hello + ", " + esc(me.name.split(" ")[0]) +
    '</h1><p class="sub">Here is the shop at a glance. Everything you change here goes live on the website within about a minute.</p></div></div>' +
    '<div class="grid-tiles" id="tiles">' + '<div class="card tile skeleton" style="height:108px"></div>'.repeat(4) + "</div>" +
    '<div class="two-col">' +
      '<section class="card"><div class="card-head"><div><h2>Needs attention</h2><p>Quick ways into the jobs that come up most.</p></div></div><div class="card-body" id="todo"></div></section>' +
      '<section class="card"><div class="card-head"><div><h2>Recent changes</h2><p>Who changed what.</p></div><a class="btn ghost small" href="#/activity">See all</a></div><div class="card-body"><div class="feed" id="feed"></div></div></section>' +
    "</div>";

  const [s, feed] = await Promise.all([stats().catch(() => ({})), activity(8).catch(() => [])]);
  const n = (v) => (v === null || v === undefined ? "—" : Number(v).toLocaleString());
  $("#tiles").innerHTML =
    '<a class="card tile" href="#/devices"><span>Phones &amp; devices</span><strong class="num">' + n(s.devices) + "</strong><em>listed on the site</em></a>" +
    '<a class="card tile" href="#/parts"><span>Parts</span><strong class="num">' + n(s.parts) + "</strong><em>screens, batteries and more</em></a>" +
    '<a class="card tile warn" href="#/devices?filter=unpriced"><span>No price yet</span><strong class="num">' + n(s.unpriced) + "</strong><em>options showing “Contact for price”</em></a>" +
    '<a class="card tile good" href="#/posters"><span>Posters live</span><strong class="num">' + n(s.posters) + "</strong><em>on the parts page</em></a>";

  $("#todo").innerHTML = [
    ["#/devices", "Update phone prices", "Open a phone, type the new prices into its table, press Save."],
    ["#/parts", "Update a part", "Search for the model — like “14 Pro screen” — then change price, trade price or stock."],
    ["#/devices", "Change photos", "Open a phone and drag pictures onto a colour. Drag to reorder; the first one is the main photo."],
    ["#/posters", "Swap a poster", "Drag a finished poster picture into Posters, or switch one off to take it down."]
  ].map(([href, t, d]) =>
    '<a href="' + href + '" style="display:grid;gap:2px;padding:12px 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--ink)"><b>' +
    esc(t) + '</b><span class="muted" style="font-size:.9rem">' + esc(d) + "</span></a>").join("") +
    (s.soldOut ? '<p class="muted" style="margin:12px 0 0;font-size:.9rem">' + n(s.soldOut) + " options are marked sold out and hidden from shoppers.</p>" : "");

  $("#feed").innerHTML = feed.length ? feed.map(activityRow).join("") :
    '<div class="empty"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>No changes yet. Edits made here will show up in this list.</div>';
}

export function activityRow(a) {
  const who = a.actor_email ? a.actor_email.replace(/@.*/, "") : "someone";
  return '<div class="feed-item"><span class="avatar">' + esc(initials(who)) + "</span><div><b>" + esc(who) + "</b> " +
    esc(a.action) + (a.target ? ' <a href="' + (a.detail && a.detail.productId ? "#/product/" + a.detail.productId : "#/activity") + '">' + esc(a.target) + "</a>" : "") +
    (a.detail && a.detail.summary ? '<div class="muted" style="font-size:.86rem">' + esc(a.detail.summary) + "</div>" : "") +
    "</div><small>" + esc(timeAgo(a.at)) + "</small></div>";
}
