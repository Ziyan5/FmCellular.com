// The slideshow at the top of the parts page. Drag to reorder, a switch to
// take one down (kept, not deleted), drag a finished poster picture in to
// add one, and edit the words on the designed ones.

import { listPosters, savePosterOrder, updatePoster, addPoster, deletePoster, log, upload, me } from "../db.js";
import { $, $$, esc, toast, modal, confirmBox, photoSrc, safeHeadline, SITE } from "../ui.js";
import { preparePoster, acceptFiles, pickFiles, sortable, move } from "../photos.js";

const PLUS = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';

export async function renderPosters() {
  const view = $("#view");
  view.innerHTML =
    '<div class="page-head"><div><p class="eyebrow">Parts page</p><h1>Posters</h1>' +
    "<p class=\"sub\">The slideshow at the top of the parts page, in this order. Drag to reorder. Switch one off to take it down — it stays here to switch back on later.</p></div>" +
    '<button class="btn accent" id="new-poster">' + PLUS + "Upload a poster</button></div>" +
    '<div class="posters" id="posters">' + '<div class="card skeleton" style="height:230px"></div>'.repeat(3) + "</div>";

  let posters = await listPosters();

  function preview(p) {
    if (p.picture_url) return '<div class="poster-prev"><img class="full" alt="" src="' + esc(photoSrc(p.picture_url)) + '"></div>';
    const c = p.config || {};
    const shots = (c.shots || []).slice(-2);
    return '<div class="poster-prev" style="background:' + esc(c.tint || "#eef1f7") + '">' +
      '<div class="ptext">' + (c.kick ? "<small>" + esc(c.kick) + "</small>" : "") + "<b>" + safeHeadline(c.head) + "</b>" +
      (c.cta && c.cta.t ? '<span class="muted" style="font-size:.8rem;font-weight:700">' + esc(c.cta.t) + " →</span>" : "") + "</div>" +
      shots.map((s, i) => '<img class="pshot" alt="" style="right:' + (i ? "0%" : "14%") + ";z-index:" + (i + 1) + '" src="' +
        esc(SITE + "phone-images/transparent/" + encodeURI(String(s.f).replace(/\.png$/i, ".webp"))) + '">').join("") + "</div>";
  }
  function draw() {
    const box = $("#posters");
    box.innerHTML = posters.map((p, i) =>
      '<article class="card poster' + (p.is_hidden ? " off" : "") + '" data-id="' + esc(p.id) + '" draggable="true">' + preview(p) +
      '<div class="poster-foot"><span class="order">' + (p.is_hidden ? "Taken down" : "Slide " + (posters.filter((x) => !x.is_hidden).indexOf(p) + 1)) + "</span>" +
      '<span style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
      '<label class="switch"><input type="checkbox" data-show="' + esc(p.id) + '"' + (p.is_hidden ? "" : " checked") + '><span class="track"></span>' + (p.is_hidden ? "Off" : "Live") + "</label>" +
      '<button class="btn ghost small" data-edit="' + esc(p.id) + '">Edit</button>' +
      (p.picture_url ? '<button class="btn danger small" data-del="' + esc(p.id) + '">Delete</button>' : "") +
      "</span></div></article>").join("") +
      '<button class="poster-new" id="drop-poster" type="button"><div>' + PLUS + "<b>Drop a finished poster here</b><br><span>or click to choose a picture · wide pictures work best (about 1600 × 700)</span></div></button>";
    acceptFiles($("#drop-poster"), (files) => newPoster(files[0]), "over");
  }
  const box = $("#posters");
  sortable(box, ".poster", async (from, to) => {
    move(posters, from, to);
    draw();
    try { await savePosterOrder(posters.map((p) => p.id)); await log("reordered", "Posters", { summary: "New slide order" }); toast("Order saved — live within about a minute.", "good"); }
    catch (err) { toast(err.message, "bad"); }
  });
  box.addEventListener("change", async (e) => {
    const id = e.target.dataset.show;
    if (!id) return;
    const p = posters.find((x) => x.id === id);
    const hide = !e.target.checked;
    try {
      await updatePoster(id, { is_hidden: hide });
      p.is_hidden = hide;
      await log(hide ? "took down" : "put back", "a poster", { summary: posterName(p) });
      toast(hide ? "Poster taken down." : "Poster is live again.", "good");
    } catch (err) { e.target.checked = !hide; toast(err.message, "bad"); }
    draw();
  });
  box.addEventListener("click", async (e) => {
    if (e.target.closest("#drop-poster")) { const f = await pickFiles({ multiple: false }); if (f.length) newPoster(f[0]); return; }
    const del = e.target.closest("[data-del]");
    if (del) {
      const p = posters.find((x) => x.id === del.dataset.del);
      if (!(await confirmBox("Delete this poster?", "It will be removed for good. To keep it for later, switch it off instead.", "Delete", true))) return;
      try { await deletePoster(p.id); posters = posters.filter((x) => x !== p); await log("deleted", "a poster", { summary: posterName(p) }); draw(); toast("Poster deleted.", "good"); }
      catch (err) { toast(err.message, "bad"); }
      return;
    }
    const ed = e.target.closest("[data-edit]");
    if (ed) editPoster(posters.find((x) => x.id === ed.dataset.edit));
  });
  $("#new-poster").addEventListener("click", async () => { const f = await pickFiles({ multiple: false }); if (f.length) newPoster(f[0]); });
  acceptFiles(box, (files) => newPoster(files[0]), "file-over-page");

  async function newPoster(file) {
    const url = URL.createObjectURL(file);
    const link = await modal({
      title: "Add this poster",
      wide: true,
      html: '<img class="preview-img" alt="" src="' + url + '">' +
        '<label class="field"><span>Where should it go when clicked? (optional)</span><input id="plink" type="text" placeholder="e.g. #/d/iphone or https://…"><small>Leave empty if it is just a picture.</small></label>',
      ok: "Upload and put it live",
      collect: (body) => $("#plink", body).value.trim()
    });
    URL.revokeObjectURL(url);
    if (link === null) return;
    toast("Uploading the poster…");
    try {
      const blob = await preparePoster(file);
      const pic = await upload(blob, "posters");
      const row = await addPoster({ id: "poster-" + Date.now().toString(36), sort_order: 0, is_hidden: false, picture_url: pic, link: link || null, config: {} });
      posters.unshift(row);
      await savePosterOrder(posters.map((p) => p.id));
      await log("added", "a poster", { summary: "New picture poster, first in the slideshow" });
      draw();
      toast("Poster added as the first slide — live within about a minute.", "good");
    } catch (err) { toast("Could not add the poster: " + err.message, "bad"); }
  }

  async function editPoster(p) {
    if (p.picture_url) {
      const v = await modal({
        title: "Edit poster",
        html: '<img class="preview-img" alt="" src="' + esc(photoSrc(p.picture_url)) + '">' +
          '<label class="field"><span>Link when clicked</span><input id="plink" type="text" value="' + esc(p.link || "") + '"></label>' +
          '<button class="btn ghost small" type="button" id="swap">Replace the picture…</button>',
        ok: "Save",
        build: (body) => {
          $("#swap", body).addEventListener("click", async () => {
            const f = await pickFiles({ multiple: false });
            if (!f.length) return;
            $("#swap", body).textContent = "Uploading…";
            const pic = await upload(await preparePoster(f[0]), "posters");
            body.dataset.pic = pic;
            $(".preview-img", body).src = pic;
            $("#swap", body).textContent = "Picture replaced";
          });
        },
        collect: (body) => ({ link: $("#plink", body).value.trim() || null, picture_url: body.dataset.pic || p.picture_url })
      });
      if (!v) return;
      await updatePoster(p.id, v); Object.assign(p, v);
    } else {
      const c = p.config || {};
      const plain = (h) => String(h || "").replace(/<br\s*\/?>/gi, " / ").replace(/<\/?em>/gi, "*").replace(/<[^>]+>/g, "");
      const v = await modal({
        title: "Edit poster words",
        wide: true,
        html:
          '<label class="field"><span>Small line above (optional)</span><input id="pk" type="text" value="' + esc(c.kick || "") + '"></label>' +
          '<label class="field"><span>Headline</span><input id="ph" type="text" value="' + esc(plain(c.head)) + '"><small>Use “/” for a new line and *stars* around words to colour them blue.</small></label>' +
          '<label class="field"><span>Paragraph (optional)</span><textarea id="pl" rows="3">' + esc(c.lede || "") + "</textarea></label>" +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><label class="field"><span>Button text</span><input id="pt" type="text" value="' + esc((c.cta && c.cta.t) || "") + '"></label>' +
          '<label class="field"><span>Button goes to</span><input id="pu" type="text" value="' + esc((c.cta && c.cta.href) || "") + '"></label></div>',
        ok: "Save",
        collect: (body) => {
          const head = $("#ph", body).value.trim();
          if (!head) throw new Error("The headline cannot be empty.");
          const html = esc(head).replace(/\s*\/\s*/g, "<br>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
          return { ...c, kick: $("#pk", body).value.trim(), head: html, lede: $("#pl", body).value.trim(),
                   cta: { ...(c.cta || {}), t: $("#pt", body).value.trim(), href: $("#pu", body).value.trim() } };
        }
      });
      if (!v) return;
      await updatePoster(p.id, { config: v }); p.config = v;
    }
    await log("edited", "a poster", { summary: posterName(p) });
    draw();
    toast("Poster saved — live within about a minute.", "good");
  }

  draw();
}

function posterName(p) {
  if (p.picture_url) return "Picture poster";
  return String((p.config && p.config.head) || p.id).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
