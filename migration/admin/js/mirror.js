// After a save, copy prices and stock to the Google Sheet, so checkout, the
// wholesale portal and parts orders (which still read the sheet) charge
// what the website shows. Several saves in a row send one copy.

import { sb } from "./db.js";
import { toast } from "./ui.js";

let timer = null, running = false, again = false;

export function mirrorSoon() {
  clearTimeout(timer);
  timer = setTimeout(run, 4000);
}

async function copy() {
  const { data, error } = await sb.functions.invoke("mirror-to-sheet", { body: { apply: true } });
  if (error || !data || !data.ok) {
    let why = (data && data.error) || (error && error.message) || "no answer";
    try { if (error && error.context) why = (await error.context.json()).error || why; } catch (e) {}
    throw new Error(why);
  }
  const refused = [data.inventory, data.parts].map((t) => t && t.refused).filter(Boolean);
  if (refused.length) throw new Error(refused[0]);
}

async function run() {
  if (running) { again = true; return; }
  running = true;
  try {
    // Google is sometimes busy for a few seconds (another save, or someone
    // typing in the sheet). One quiet second try before saying anything.
    try { await copy(); }
    catch (first) { await new Promise((r) => setTimeout(r, 15000)); await copy(); }
  } catch (err) {
    toast("Saved here, but the backup sheet did not update: " + err.message + " It will try again on your next save.", "bad");
  } finally {
    running = false;
    if (again) { again = false; mirrorSoon(); }
  }
}
