(() => {
  "use strict";

  const config = window.FM_ADMIN_CONFIG || {};
  const missingConfig = !config.supabaseUrl || !config.supabaseAnonKey || config.supabaseUrl.includes("YOUR_PROJECT");
  const client = missingConfig ? null : window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
  });
  const $ = (selector) => document.querySelector(selector);
  const state = {
    page: 0,
    pageSize: 40,
    total: 0,
    query: "",
    status: "all",
    editingId: null,
    removedVariantIds: [],
    removedImageIds: [],
    removedFinishIds: []
  };

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
    await Promise.all([loadProducts(), loadStats()]);
    return true;
  }

  async function loadStats() {
    const [products, variants, inactive, inventory] = await Promise.all([
      client.from("catalog_products").select("*", { count: "exact", head: true }),
      client.from("catalog_variants").select("*", { count: "exact", head: true }),
      client.from("catalog_products").select("*", { count: "exact", head: true }).eq("is_active", false),
      client.from("inventory_levels").select("quantity,low_stock_threshold")
    ]);
    if (!products.error) $("#stat-products").textContent = (products.count || 0).toLocaleString();
    if (!variants.error) $("#stat-variants").textContent = (variants.count || 0).toLocaleString();
    if (!inactive.error) $("#stat-inactive").textContent = (inactive.count || 0).toLocaleString();
    if (!inventory.error) {
      const low = (inventory.data || []).filter(row => row.quantity !== null && row.quantity <= row.low_stock_threshold).length;
      $("#stat-low-stock").textContent = low.toLocaleString();
    }
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
    row.innerHTML = '<td><strong></strong><br><small></small></td><td></td><td></td><td><span class="status"></span></td><td><button class="button ghost" type="button">Edit</button></td>';
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
      if (id) {
        if (record.classList.contains("variant-row")) state.removedVariantIds.push(id);
        else if (record.classList.contains("finish-row")) state.removedFinishIds.push(id);
        else state.removedImageIds.push(id);
      }
      record.remove();
    });
    container.append(record);
  }

  function resetForm() {
    $("#product-form").reset();
    $("#product-id").value = "";
    $("#is-active").checked = true;
    $("#slug").dataset.manual = "";
    $("#variant-list").replaceChildren();
    $("#image-list").replaceChildren();
    $("#finish-list").replaceChildren();
    state.editingId = null;
    state.removedVariantIds = [];
    state.removedImageIds = [];
    state.removedFinishIds = [];
    message($("#form-message"));
  }

  async function openProduct(id = null) {
    resetForm();
    $("#dialog-title").textContent = id ? "Edit product" : "Add product";
    $("#variant-panel").hidden = !id;
    $("#image-panel").hidden = !id;
    $("#finish-panel").hidden = !id;
    $("#archive-product").hidden = !id;
    dialog.showModal();

    if (!id) return;

    message($("#form-message"), "Loading product…");
    const [productResult, variantsResult, imagesResult, finishesResult] = await Promise.all([
      client.from("catalog_products").select("*").eq("id", id).single(),
      client.from("catalog_variants")
        .select("*,inventory_levels(quantity,available,low_stock_threshold),wholesale_prices(price,minimum_quantity)")
        .eq("product_id", id).order("sku"),
      client.from("product_images").select("*").eq("product_id", id).order("sort_order"),
      client.from("product_finishes").select("*").eq("product_id", id).order("sort_order")
    ]);

    const failure = [productResult, variantsResult, imagesResult, finishesResult].find(result => result.error);
    if (failure) return message($("#form-message"), failure.error.message, "error");

    const product = productResult.data;
    state.editingId = id;
    const fields = {
      "product-id": id,
      "item-type": product.item_type,
      category: product.category,
      brand: product.brand || "",
      model: product.model,
      "part-name": product.part_name || "",
      slug: product.slug,
      description: product.description || ""
    };
    for (const [field, value] of Object.entries(fields)) $("#" + field).value = value;
    $("#is-active").checked = product.is_active;

    for (const variant of variantsResult.data || []) {
      const inventory = Array.isArray(variant.inventory_levels) ? variant.inventory_levels[0] : variant.inventory_levels;
      const wholesale = Array.isArray(variant.wholesale_prices) ? variant.wholesale_prices[0] : variant.wholesale_prices;
      addRecord($("#variant-template"), $("#variant-list"), {
        ...variant,
        quantity: inventory?.quantity,
        available: inventory?.available,
        low_stock_threshold: inventory?.low_stock_threshold ?? 2,
        wholesale_price: wholesale?.price,
        minimum_quantity: wholesale?.minimum_quantity ?? 1
      });
    }

    for (const finish of finishesResult.data || []) addRecord($("#finish-template"), $("#finish-list"), finish);
    for (const image of imagesResult.data || []) addRecord($("#image-template"), $("#image-list"), image);
    message($("#form-message"));
  }

  function recordValues(record) {
    const values = {};
    record.querySelectorAll("[data-field]").forEach(input => {
      let value = input.type === "checkbox" ? input.checked : input.value.trim();
      if (["retail_price","msrp","wholesale_price","quantity","minimum_quantity","low_stock_threshold","sort_order"].includes(input.dataset.field)) {
        value = value === "" ? null : Number(value);
      }
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
      const product = {
        item_type: $("#item-type").value,
        category: $("#category").value.trim(),
        brand: $("#brand").value.trim() || null,
        model: $("#model").value.trim(),
        part_name: $("#part-name").value.trim() || null,
        slug: $("#slug").value.trim(),
        description: $("#description").value.trim() || null,
        is_active: $("#is-active").checked
      };

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
        const inventory = {
          quantity: values.quantity,
          available: values.available,
          low_stock_threshold: values.low_stock_threshold ?? 2
        };
        const wholesalePrice = values.wholesale_price;
        const minimumQuantity = values.minimum_quantity ?? 1;

        delete values.quantity;
        delete values.available;
        delete values.low_stock_threshold;
        delete values.wholesale_price;
        delete values.minimum_quantity;

        const id = values.id;
        delete values.id;
        values.product_id = productId;

        const result = id
          ? await client.from("catalog_variants").update(values).eq("id", id).select("id").single()
          : await client.from("catalog_variants").insert(values).select("id").single();

        if (result.error) throw result.error;
        const variantId = id || result.data.id;

        const inventoryResult = await client.from("inventory_levels").upsert(
          { variant_id: variantId, ...inventory },
          { onConflict: "variant_id" }
        );
        if (inventoryResult.error) throw inventoryResult.error;

        if (wholesalePrice === null) {
          const wholesaleDelete = await client.from("wholesale_prices").delete().eq("variant_id", variantId);
          if (wholesaleDelete.error) throw wholesaleDelete.error;
        } else {
          const wholesaleResult = await client.from("wholesale_prices").upsert(
            { variant_id: variantId, price: wholesalePrice, minimum_quantity: minimumQuantity },
            { onConflict: "variant_id" }
          );
          if (wholesaleResult.error) throw wholesaleResult.error;
        }
      }

      for (const record of $("#finish-list").children) {
        const values = recordValues(record);
        const id = values.id;
        delete values.id;
        values.product_id = productId;
        const result = id
          ? await client.from("product_finishes").update(values).eq("id", id)
          : await client.from("product_finishes").insert(values);
        if (result.error) throw result.error;
      }

      for (const record of $("#image-list").children) {
        const values = recordValues(record);
        const id = values.id;
        delete values.id;
        values.product_id = productId;
        const result = id
          ? await client.from("product_images").update(values).eq("id", id)
          : await client.from("product_images").insert(values);
        if (result.error) throw result.error;
      }

      if (state.removedVariantIds.length) {
        const { error } = await client.from("catalog_variants").delete().in("id", state.removedVariantIds);
        if (error) throw error;
      }
      if (state.removedFinishIds.length) {
        const { error } = await client.from("product_finishes").delete().in("id", state.removedFinishIds);
        if (error) throw error;
      }
      if (state.removedImageIds.length) {
        const { error } = await client.from("product_images").delete().in("id", state.removedImageIds);
        if (error) throw error;
      }

      message($("#form-message"), "Saved successfully.", "success");
      setTimeout(() => dialog.close(), 450);
      await Promise.all([loadProducts(), loadStats()]);
    } catch (error) {
      message($("#form-message"), error.message || "Could not save the product.", "error");
    } finally {
      button.disabled = false;
    }
  }

  let searchTimer;

  $("#login-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (!client) {
      return message($("#login-message"), "Admin configuration is missing. Copy config.example.js to config.js and add the Supabase URL and public anonymous key.", "error");
    }
    message($("#login-message"), "Signing in…");
    const { data, error } = await client.auth.signInWithPassword({
      email: $("#email").value.trim(),
      password: $("#password").value
    });
    if (error) return message($("#login-message"), "Sign-in failed. Check the account and password.", "error");
    await requireAdmin(data.session);
  });

  $("#sign-out").addEventListener("click", async () => {
    await client.auth.signOut();
    setSignedOut();
  });

  $("#forgot-password").addEventListener("click", () => {
    $("#recovery-email").value = $("#email").value;
    message($("#recovery-message"));
    $("#login-form").hidden = true;
    $("#forgot-password").hidden = true;
    $("#recovery-request-form").hidden = false;
  });

  $("#cancel-recovery").addEventListener("click", () => {
    $("#recovery-request-form").hidden = true;
    $("#login-form").hidden = false;
    $("#forgot-password").hidden = false;
  });

  $("#recovery-request-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (!client) {
      return message($("#recovery-message"), "Admin configuration is missing.", "error");
    }
    const button = $("#recovery-request-form").querySelector("button[type=submit]");
    button.disabled = true;
    await client.auth.resetPasswordForEmail($("#recovery-email").value.trim(), {
      redirectTo: `${window.location.origin}/recovery.html`
    });
    button.disabled = false;
    message($("#recovery-message"), "If that email has an admin account, a reset link has been sent.", "success");
  });

  $("#search").addEventListener("input", event => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = event.target.value.trim();
      state.page = 0;
      loadProducts();
    }, 300);
  });

  $("#status-filter").addEventListener("change", event => {
    state.status = event.target.value;
    state.page = 0;
    loadProducts();
  });

  $("#previous-page").addEventListener("click", () => {
    if (state.page > 0) {
      state.page--;
      loadProducts();
    }
  });

  $("#next-page").addEventListener("click", () => {
    state.page++;
    loadProducts();
  });

  $("#new-product").addEventListener("click", () => openProduct());
  $("#close-dialog").addEventListener("click", () => dialog.close());
  $("#cancel-dialog").addEventListener("click", () => dialog.close());
  $("#add-variant").addEventListener("click", () => addRecord($("#variant-template"), $("#variant-list"), {
    is_active: true,
    available: true,
    minimum_quantity: 1,
    low_stock_threshold: 2
  }));
  $("#add-finish").addEventListener("click", () => addRecord($("#finish-template"), $("#finish-list"), {
    sort_order: 0,
    is_hidden: false
  }));
  $("#add-image").addEventListener("click", () => addRecord($("#image-template"), $("#image-list"), { sort_order: 0 }));

  $("#model").addEventListener("input", () => {
    if (!state.editingId && !$("#slug").dataset.manual) {
      $("#slug").value = slugify([$("#brand").value, $("#model").value, $("#part-name").value].filter(Boolean).join(" "));
    }
  });

  $("#slug").addEventListener("input", () => {
    $("#slug").dataset.manual = "true";
  });

  $("#archive-product").addEventListener("click", async () => {
    if (!state.editingId || !confirm("Deactivate this product? It will disappear from the public catalog.")) return;
    const { error } = await client.from("catalog_products").update({ is_active: false }).eq("id", state.editingId);
    if (error) return message($("#form-message"), error.message, "error");
    dialog.close();
    await Promise.all([loadProducts(), loadStats()]);
  });

  $("#product-form").addEventListener("submit", saveProduct);

  if (missingConfig) setSignedOut("Admin configuration has not been added yet.");
  else client.auth.getSession().then(({ data }) => requireAdmin(data.session));
})();