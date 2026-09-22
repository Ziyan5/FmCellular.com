(() => {
  "use strict";

  const config = window.FM_ADMIN_CONFIG || {};
  const missingConfig = !config.supabaseUrl || !config.supabaseAnonKey || config.supabaseUrl.includes("YOUR_PROJECT");
  const client = missingConfig ? null : window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
  });
  const $ = (selector) => document.querySelector(selector);
  const state = { page: 0, pageSize: 40, total: 0, query: "", status: "all", editingId: null, removedVariantIds: [], removedImageIds: [] };

  const loginView = $("#login-view");
  const dashboardView = $("#dashboard-view");
  const dialog = $("#product-dialog");

  function message(target, text = "", kind = "") {
    target.textContent = text;
    target.className = `message ${kind}`.trim();
  }

  function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function setSignedIn(email) {
    loginView.hidden = true;
    dashboardView.hidden = false;
    $("#account").hidden = false;
    $("#account-email").textContent = email;
  }

  function setSignedOut(text = "") {
    loginView.hidden = false;
    dashboardView.hidden = true;
    $("#account").hidden = true;
    if (text) message($("#login-message"), text, "error");
  }

  async function requireAdmin(session) {
    if (!session) return false;
    const { data, error } = await client.rpc("is_admin");
    if (error || data !== true) {
      await client.auth.signOut();
      setSignedOut("This account does not have FM Cellular administrator access.");
      return false;
    }
    setSignedIn(session.user.email || "Admin");
    await loadProducts();
    return true;
  }

  async function loadProducts() {
    message($("#dashboard-message"), "Loading products…");
    const from = state.page * state.pageSize;
    const to = from + state.pageSize - 1;
    let request = client.from("catalog_products")
      .select("id,item_type,category,brand,model,part_name,slug,is_active", { count: "exact" })
      .order("model", { ascending: true }).range(from, to);
    if (state.status === "active") request = request.eq("is_active", true);
    if (state.status === "inactive") request = request.eq("is_active", false);
    if (state.query) {
      const safe = state.query.replace(/[,%()]/g, " ").trim();
      if (safe) request = request.or(`model.ilike.%${safe}%,brand.ilike.%${safe}%,category.ilike.%${safe}%,part_name.ilike.%${safe}%`);
    }
    const { data, error, count } = await request;
    if (error) return message($("#dashboard-message"), error.message, "error");
    state.total = count || 0;
    $("#product-rows").replaceChildren(...(data || []).map(productRow));
    const pages = Math.max(1, Math.ceil(state.total / state.pageSize));
    $("#page-label").textContent = `Page ${state.page + 1} of ${pages} · ${state.total.toLocaleString()} products`;
    $("#previous-page").disabled = state.page === 0;
    $("#next-page").disabled = state.page + 1 >= pages;
    message($("#dashboard-message"), data?.length ? "" : "No products matched your search.");
  }

  function productRow(product) {
    const row = document.createElement("tr");
    const name = [product.brand, product.model, product.part_name].filter(Boolean).join(" ");
    row.innerHTML = `<td><strong></strong><br><small></small></td><td></td><td></td><td><span class="status"></span></td><td><button class="button ghost" type="button">Edit</button></td>`;
    row.querySelector("strong").textContent = name;
    row.querySelector("small").textContent = product.slug;
    row.children[1].textContent = product.category;
    row.children[2].textContent = product.item_type;
    const badge = row.querySelector(".status");
    badge.textContent = product.is_active ? "Active" : "Inactive";
    badge.classList.add(product.is_active ? "active" : "inactive");
    row.querySelector("button").addEventListener("click", () => openProduct(product.id));
    return row;
  }

  function addRecord(template, container, values = {}) {
    const record = template.content.firstElementChild.cloneNode(true);
    record.querySelectorAll("[data-field]").forEach(input => {
      const value = values[input.dataset.field];
      if (input.type === "checkbox") input.checked = Boolean(value);
      else if (value !== null && value !== undefined) input.value = value;
    });
    record.querySelector(".remove-record").addEventListener("click", () => {
      const id = record.querySelector('[data-field="id"]').value;
      if (id) (record.classList.contains("variant-row") ? state.removedVariantIds : state.removedImageIds).push(id);
      record.remove();
    });
    container.append(record);
  }

  function resetForm() {
    $("#product-form").reset();
    $("#product-id").value = "";
    $("#is-active").checked = true;
    $("#variant-list").replaceChildren();
    $("#image-list").replaceChildren();
    state.editingId = null;
    state.removedVariantIds = [];
    state.removedImageIds = [];
    message($("#form-message"));
  }

  async function openProduct(id = null) {
    resetForm();
    $("#dialog-title").textContent = id ? "Edit product" : "Add product";
    $("#variant-panel").hidden = !id;
    $("#image-panel").hidden = !id;
    $("#archive-product").hidden = !id;
    dialog.showModal();
    if (!id) return;
    message($("#form-message"), "Loading product…");
    const [{ data: product, error }, variantsResult, imagesResult] = await Promise.all([
      client.from("catalog_products").select("*").eq("id", id).single(),
      client.from("catalog_variants").select("*,inventory_levels(quantity,available)").eq("product_id", id).order("sku"),
      client.from("product_images").select("*").eq("product_id", id).order("sort_order")
    ]);
    if (error || variantsResult.error || imagesResult.error) return message($("#form-message"), (error || variantsResult.error || imagesResult.error).message, "error");
    state.editingId = id;
    for (const [field, value] of Object.entries({"product-id":id,"item-type":product.item_type,category:product.category,brand:product.brand || "",model:product.model,"part-name":product.part_name || "",slug:product.slug,description:product.description || ""})) $("#" + field).value = value;
    $("#is-active").checked = product.is_active;
    for (const variant of variantsResult.data || []) {
      const inventory = Array.isArray(variant.inventory_levels) ? variant.inventory_levels[0] : variant.inventory_levels;
      addRecord($("#variant-template"), $("#variant-list"), {...variant, quantity: inventory?.quantity, available: inventory?.available});
    }
    for (const image of imagesResult.data || []) addRecord($("#image-template"), $("#image-list"), image);
    message($("#form-message"));
  }

  function recordValues(record) {
    const values = {};
    record.querySelectorAll("[data-field]").forEach(input => {
      let value = input.type === "checkbox" ? input.checked : input.value.trim();
      if (["retail_price","msrp","quantity","sort_order"].includes(input.dataset.field)) value = value === "" ? null : Number(value);
      values[input.dataset.field] = value === "" ? null : value;
    });
    return values;
  }

  async function saveProduct(event) {
    event.preventDefault();
    const button = $("#save-product");
    button.disabled = true;
    message($("#form-message"), "Saving…");
    try {
      const product = {item_type:$("#item-type").value,category:$("#category").value.trim(),brand:$("#brand").value.trim() || null,model:$("#model").value.trim(),part_name:$("#part-name").value.trim() || null,slug:$("#slug").value.trim(),description:$("#description").value.trim() || null,is_active:$("#is-active").checked};
      let productId = state.editingId;
      if (productId) {
        const { error } = await client.from("catalog_products").update(product).eq("id", productId);
        if (error) throw error;
      } else {
        const { data, error } = await client.from("catalog_products").insert(product).select("id").single();
        if (error) throw error;
        productId = data.id;
      }
      for (const record of $("#variant-list").children) {
        const values = recordValues(record);
        const inventory = { quantity: values.quantity, available: values.available };
        delete values.quantity; delete values.available;
        const id = values.id; delete values.id;
        values.product_id = productId;
        const result = id ? await client.from("catalog_variants").update(values).eq("id", id).select("id").single() : await client.from("catalog_variants").insert(values).select("id").single();
        if (result.error) throw result.error;
        const variantId = id || result.data.id;
        const inventoryResult = await client.from("inventory_levels").upsert({variant_id:variantId,...inventory},{onConflict:"variant_id"});
        if (inventoryResult.error) throw inventoryResult.error;
      }
      for (const record of $("#image-list").children) {
        const values = recordValues(record); const id = values.id; delete values.id; values.product_id = productId;
        const result = id ? await client.from("product_images").update(values).eq("id", id) : await client.from("product_images").insert(values);
        if (result.error) throw result.error;
      }
      if (state.removedVariantIds.length) { const { error } = await client.from("catalog_variants").delete().in("id", state.removedVariantIds); if (error) throw error; }
      if (state.removedImageIds.length) { const { error } = await client.from("product_images").delete().in("id", state.removedImageIds); if (error) throw error; }
      message($("#form-message"), "Saved successfully.", "success");
      setTimeout(() => dialog.close(), 450);
      await loadProducts();
    } catch (error) {
      message($("#form-message"), error.message || "Could not save the product.", "error");
    } finally { button.disabled = false; }
  }

  let searchTimer;
  $("#login-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (!client) return message($("#login-message"), "Admin configuration is missing. Copy config.example.js to config.js and add the Supabase URL and public anonymous key.", "error");
    message($("#login-message"), "Signing in…");
    const { data, error } = await client.auth.signInWithPassword({email:$("#email").value.trim(),password:$("#password").value});
    if (error) return message($("#login-message"), "Sign-in failed. Check the account and password.", "error");
    await requireAdmin(data.session);
  });
  $("#sign-out").addEventListener("click", async () => { await client.auth.signOut(); setSignedOut(); });
  $("#search").addEventListener("input", event => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { state.query = event.target.value.trim(); state.page = 0; loadProducts(); }, 300); });
  $("#status-filter").addEventListener("change", event => { state.status = event.target.value; state.page = 0; loadProducts(); });
  $("#previous-page").addEventListener("click", () => { if (state.page > 0) { state.page--; loadProducts(); } });
  $("#next-page").addEventListener("click", () => { state.page++; loadProducts(); });
  $("#new-product").addEventListener("click", () => openProduct());
  $("#close-dialog").addEventListener("click", () => dialog.close());
  $("#cancel-dialog").addEventListener("click", () => dialog.close());
  $("#add-variant").addEventListener("click", () => addRecord($("#variant-template"), $("#variant-list"), {is_active:true}));
  $("#add-image").addEventListener("click", () => addRecord($("#image-template"), $("#image-list"), {sort_order:0}));
  $("#model").addEventListener("input", () => { if (!state.editingId && !$("#slug").dataset.manual) $("#slug").value = slugify([$("#brand").value,$("#model").value,$("#part-name").value].filter(Boolean).join(" ")); });
  $("#slug").addEventListener("input", () => { $("#slug").dataset.manual = "true"; });
  $("#archive-product").addEventListener("click", async () => { if (!state.editingId || !confirm("Deactivate this product? It will disappear from the public catalog.")) return; const { error } = await client.from("catalog_products").update({is_active:false}).eq("id",state.editingId); if (error) return message($("#form-message"),error.message,"error"); dialog.close(); await loadProducts(); });
  $("#product-form").addEventListener("submit", saveProduct);

  if (missingConfig) setSignedOut("Admin configuration has not been added yet.");
  else client.auth.getSession().then(({data}) => requireAdmin(data.session));
})();
