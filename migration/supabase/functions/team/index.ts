// The admin's Team page: who can sign in, and inviting new staff.
// Owner only - checked with admin_role() as the caller. Creating a login
// needs the service key, which is why this runs here and not in the page.
//
// { action: "list" }
// { action: "invite", email, name, role: "staff" | "owner", redirectTo }
// { action: "set", userId, active?, role?, name? }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...cors, "Content-Type": "application/json; charset=utf-8" },
});
const ALLOWED_REDIRECTS = [/^https:\/\/([a-z0-9-]+\.)?fmcellular-admin-staging\.pages\.dev\/recovery$/, /^https:\/\/admin\.fmcellular\.com\/recovery$/];

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return json({ ok: false, error: "Use POST." }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const caller = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: request.headers.get("Authorization") || "" } },
    auth: { persistSession: false },
  });
  const [{ data: role }, { data: who }] = await Promise.all([caller.rpc("admin_role"), caller.auth.getUser()]);
  if (role !== "owner" || !who?.user) return json({ ok: false, error: "Only the owner can manage the team." }, 403);

  let body: any = {};
  try { body = await request.json(); } catch { return json({ ok: false, error: "Send JSON." }, 400); }
  const db = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

  try {
    if (body.action === "list") {
      const { data, error } = await db.from("admin_users").select("user_id,email,display_name,role,is_active,created_at").order("created_at");
      if (error) throw error;
      const { data: users } = await db.auth.admin.listUsers({ perPage: 1000 });
      const seen: Record<string, any> = {};
      (users?.users || []).forEach((u: any) => { seen[u.id] = u; });
      return json({ ok: true, me: who.user.id, team: data.map((a: any) => ({
        ...a, lastSignIn: seen[a.user_id]?.last_sign_in_at || null, confirmed: !!seen[a.user_id]?.email_confirmed_at,
      })) });
    }

    if (body.action === "invite") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "That email address does not look right." }, 400);
      const role2 = body.role === "owner" ? "owner" : "staff";
      const redirectTo = ALLOWED_REDIRECTS.some((re) => re.test(String(body.redirectTo || ""))) ? body.redirectTo : undefined;
      const { data: list } = await db.auth.admin.listUsers({ perPage: 1000 });
      let user = (list?.users || []).find((u: any) => (u.email || "").toLowerCase() === email);
      let invited = false;
      if (!user) {
        const { data, error } = await db.auth.admin.inviteUserByEmail(email, { redirectTo });
        if (error) throw error;
        user = data.user; invited = true;
      }
      const { error } = await db.from("admin_users").upsert({
        user_id: user.id, email, role: role2, is_active: true, display_name: String(body.name || "").trim() || null,
      }, { onConflict: "user_id" });
      if (error) throw error;
      return json({ ok: true, invited, email });
    }

    if (body.action === "set") {
      if (body.userId === who.user.id && (body.active === false || body.role === "staff")) {
        return json({ ok: false, error: "You can't switch off or demote your own owner account." }, 400);
      }
      const set: any = {};
      if (typeof body.active === "boolean") set.is_active = body.active;
      if (body.role === "owner" || body.role === "staff") set.role = body.role;
      if (typeof body.name === "string") set.display_name = body.name.trim() || null;
      const { error } = await db.from("admin_users").update(set).eq("user_id", body.userId);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ ok: false, error: "Unknown action." }, 400);
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: String((error as any).message || error) }, 500);
  }
});
