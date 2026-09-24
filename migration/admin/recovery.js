(() => {
  "use strict";

  const config = window.FM_ADMIN_CONFIG || {};
  const missingConfig = !config.supabaseUrl || !config.supabaseAnonKey || config.supabaseUrl.includes("YOUR_PROJECT");
  // detectSessionInUrl must be true here (unlike the main admin client) so this page can
  // exchange the recovery link's token for a session.
  const client = missingConfig ? null : window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  const $ = (selector) => document.querySelector(selector);
  const intro = $("#recovery-intro");
  const form = $("#recovery-form");

  function message(target, text = "", kind = "") {
    target.textContent = text;
    target.className = `message ${kind}`.trim();
  }

  function showForm() {
    intro.textContent = "Choose a new password for your admin account.";
    form.hidden = false;
  }

  async function init() {
    if (!client) {
      intro.textContent = "Admin configuration is missing.";
      return;
    }
    const { data } = await client.auth.getSession();
    if (data.session) showForm();
    else intro.textContent = "This recovery link is invalid or has expired. Request a new one from the sign-in page.";
  }

  client?.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") showForm();
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const password = $("#new-password").value;
    const confirmPassword = $("#confirm-password").value;
    const formMessage = $("#recovery-form-message");

    if (password.length < 8) return message(formMessage, "Password must be at least 8 characters.", "error");
    if (password !== confirmPassword) return message(formMessage, "Passwords do not match.", "error");

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    message(formMessage, "Updating…");
    const { error } = await client.auth.updateUser({ password });
    button.disabled = false;
    if (error) return message(formMessage, error.message, "error");

    message(formMessage, "Password updated. Redirecting to sign in…", "success");
    await client.auth.signOut();
    setTimeout(() => { window.location.href = "/"; }, 1500);
  });

  init();
})();
