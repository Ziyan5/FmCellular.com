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

async function run() {
  if (running) { again = true; return; }
  running = true;
  try {
    const { data, error } = await sb.functions.invoke("mirror-to-sheet", { body: { apply: true } });
    if (error || !data || !data.ok) throw new Error((data && data.error) || (error && error.message) || "no answer");
    const refused = [data.inventory, data.parts].map((t) => t && t.refused).filter(Boolean);
    if (refused.length) throw new Error(refused[0]);
  } catch (err) {
    toast("Saved here, but the backup sheet did not update: " + err.message + " It will try again on your next save.", "bad");
  } finally {
    running = false;
    if (again) { again = false; mirrorSoon(); }
  }
}
