(() => {
  "use strict";

  const config = window.FM_ADMIN_CONFIG || {};
  const missingConfig = !config.supabaseUrl || !config.supabaseAnonKey || config.supabaseUrl.includes("YOUR_PROJECT");
  // detectSessionInUrl must be true here (unlike the main admin client) so this page can
  // exchange the recovery link's token for a session.
  const client = missingConfig || !window.supabase ? null : window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
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
    intro.textContent = "Choose the password you will sign in with.";
    form.hidden = false;
  }

  async function init() {
    if (!client) {
      intro.textContent = "This page did not load fully. Check the internet connection and open the link from your email again.";
      return;
    }
    // The email link says why it failed, when it did (used already, or too old).
    const said = new URLSearchParams(location.hash.replace(/^#/, "")).get("error_description") ||
                 new URLSearchParams(location.search).get("error_description");
    const { data } = await client.auth.getSession();
    if (data.session) showForm();
    else intro.textContent = (said ? said.replace(/\+/g, " ") + ". " : "This link has already been used or is too old. ") +
      "Ask for a new one: press “Forgot your password?” on the sign-in page, or ask the owner to invite you again.";
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

    message(formMessage, "Password saved. Taking you to sign in…", "success");
    await client.auth.signOut();
    setTimeout(() => { window.location.href = "/"; }, 1500);
  });

  init();
})();
