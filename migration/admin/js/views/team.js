// Owner only: who can sign in to this admin, inviting staff, switching
// someone off. The server re-checks that the caller is the owner.

import { sb, me, log } from "../db.js";
import { $, esc, toast, modal, confirmBox, timeAgo, initials } from "../ui.js";

async function call(body) {
  const { data, error } = await sb.functions.invoke("team", { body });
  if (error) {
    let msg = error.message;
    try { msg = (await error.context.json()).error || msg; } catch (e) {}
    throw new Error(msg);
  }
  if (!data || !data.ok) throw new Error((data && data.error) || "That did not work.");
  return data;
}

export async function renderTeam() {
  const view = $("#view");
  if (me.role !== "owner") {
    view.innerHTML = '<div class="card card-body"><h2>Owner only</h2><p class="muted">Ask the owner to add or change team members.</p></div>';
    return;
  }
  view.innerHTML =
    '<div class="page-head"><div><p class="eyebrow">Settings</p><h1>Team</h1>' +
    '<p class="sub">Everyone who can sign in here. Staff can change prices, trade prices, stock, photos and posters. Only owners can manage the team and copy from the Google Sheet.</p></div>' +
    '<button class="btn accent" id="invite"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Invite someone</button></div>' +
    '<section class="card"><div class="table-wrap"><table class="list"><thead><tr><th>Person</th><th>Access</th><th>Last signed in</th><th></th></tr></thead>' +
    '<tbody id="team"><tr><td colspan="4"><div class="skeleton" style="height:120px"></div></td></tr></tbody></table></div></section>';

  let data;
  async function load() {
    data = await call({ action: "list" });
    $("#team").innerHTML = data.team.map((t) => {
      const mine = t.user_id === data.me;
      const name = t.display_name || t.email.replace(/@.*/, "");
      return '<tr><td><div style="display:flex;gap:12px;align-items:center"><span class="avatar">' + esc(initials(name)) + "</span><div><b>" + esc(name) +
        (mine ? ' <span class="pill info nodot">You</span>' : "") + '</b><div class="muted" style="font-size:.86rem">' + esc(t.email) + "</div></div></div></td>" +
        "<td>" + (t.is_active ? (t.role === "owner" ? '<span class="pill info">Owner</span>' : '<span class="pill good">Staff</span>') : '<span class="pill plain">Switched off</span>') +
        (t.confirmed ? "" : ' <span class="pill warn nodot">Invite not accepted yet</span>') + "</td>" +
        '<td class="muted">' + (t.lastSignIn ? esc(timeAgo(t.lastSignIn)) : "Never") + "</td>" +
        '<td style="text-align:right;white-space:nowrap">' + (mine ? "" :
          (t.is_active
            ? '<button class="btn ghost small" data-role="' + t.user_id + '" data-to="' + (t.role === "owner" ? "staff" : "owner") + '">Make ' + (t.role === "owner" ? "staff" : "owner") + "</button> " +
              '<button class="btn danger small" data-off="' + t.user_id + '">Switch off</button>'
            : '<button class="btn ghost small" data-on="' + t.user_id + '">Switch back on</button>')) + "</td></tr>";
    }).join("");
  }

  $("#team").addEventListener("click", async (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const person = data.team.find((t) => t.user_id === (b.dataset.role || b.dataset.off || b.dataset.on));
    try {
      if (b.dataset.off) {
        if (!(await confirmBox("Switch off " + person.email + "?", "They will not be able to sign in or change anything. You can switch them back on at any time.", "Switch off", true))) return;
        await call({ action: "set", userId: person.user_id, active: false });
        await log("switched off", person.email);
      } else if (b.dataset.on) {
        await call({ action: "set", userId: person.user_id, active: true });
        await log("switched back on", person.email);
      } else if (b.dataset.role) {
        if (b.dataset.to === "owner" && !(await confirmBox("Make " + person.email + " an owner?", "Owners can invite and switch off people, including you.", "Make owner"))) return;
        await call({ action: "set", userId: person.user_id, role: b.dataset.to });
        await log("made " + b.dataset.to, person.email);
      }
      toast("Done.", "good");
      load();
    } catch (err) { toast(err.message, "bad"); }
  });

  $("#invite").addEventListener("click", async () => {
    const v = await modal({
      title: "Invite someone",
      html: '<label class="field"><span>Their name</span><input id="iname" type="text" placeholder="e.g. Ali"></label>' +
        '<label class="field"><span>Their email</span><input id="iemail" type="email" placeholder="name@example.com"></label>' +
        '<label class="field"><span>Access</span><select id="irole"><option value="staff">Staff — prices, stock, photos, posters</option><option value="owner">Owner — everything, including the team</option></select></label>' +
        '<small class="muted">They get an email with a link to choose their own password.</small>',
      ok: "Send invite",
      collect: (body) => {
        const email = $("#iemail", body).value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Type their email address.");
        return { email, name: $("#iname", body).value.trim(), role: $("#irole", body).value };
      }
    });
    if (!v) return;
    try {
      const r = await call({ action: "invite", ...v, redirectTo: location.origin + "/recovery" });
      await log("invited", v.email, { summary: v.role === "owner" ? "as an owner" : "as staff" });
      toast(r.invited ? "Invite sent to " + v.email + "." : v.email + " already had a login — they can sign in now.", "good");
      load();
    } catch (err) { toast(err.message, "bad"); }
  });

  await load();
}
