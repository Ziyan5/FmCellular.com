import { activity } from "../db.js";
import { $, esc } from "../ui.js";
import { activityRow } from "./home.js";

export async function renderActivity() {
  $("#view").innerHTML =
    '<div class="page-head"><div><p class="eyebrow">History</p><h1>Activity</h1><p class="sub">Every change made in this admin: who, what and when.</p></div></div>' +
    '<section class="card"><div class="card-body"><div class="feed" id="feed"><div class="skeleton" style="height:200px"></div></div></div></section>';
  const rows = await activity(200);
  $("#feed").innerHTML = rows.length ? rows.map((a) => activityRow(a) +
    (a.detail && a.detail.lines && a.detail.lines.length
      ? '<details style="margin:-4px 0 8px 46px"><summary class="muted" style="cursor:pointer;font-size:.86rem">Details</summary><ul style="margin:6px 0;padding-left:18px;font-size:.88rem">' +
        a.detail.lines.map((l) => "<li>" + esc(l) + "</li>").join("") + "</ul></details>"
      : "")).join("")
    : '<div class="empty">No changes yet.</div>';
}
