/* =========================================================
   ALFA — Núcleo de la tienda
   Iconos · formato · carrito · pedidos · header/footer · UI
   ========================================================= */

(function () {
  "use strict";

  const A = window.ALFA;
  const CFG = A.config;

  /* ============================ Iconos ============================ */
  const ICONS = {
    cart: '<circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    heart: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1z"/>',
    star: '<path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3 1.2-6.5L2.5 9.3l6.6-.9z"/>',
    truck: '<path d="M3 16V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10"/><path d="M15 9h3.5a1 1 0 0 1 .8.4L22 13v3"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
    store: '<path d="M3 10h18M4 10V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/><path d="M9 20v-5h6v5"/>',
    shield: '<path d="M12 3l7.5 3v5.4c0 4.5-3.1 8.3-7.5 9.6-4.4-1.3-7.5-5.1-7.5-9.6V6z"/><path d="M9 12l2 2 4-4"/>',
    box: '<path d="M21 8.5l-9-5-9 5 9 5z"/><path d="M3 8.5v7l9 5 9-5v-7"/><path d="M12 13.5v7"/>',
    receipt: '<path d="M5 3h14v18l-2.3-1.6L14.4 21l-2.4-1.6L9.6 21l-2.3-1.6L5 21z"/><path d="M9 8h6M9 12h6"/>',
    pin: '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    phone: '<path d="M6.5 3h3l1.5 4-2 1.6a12 12 0 0 0 5.4 5.4l1.6-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    lock: '<rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    battery: '<rect x="2" y="8" width="16" height="9" rx="2"/><path d="M21 11v3"/><path d="M5 11v3M8.5 11v3"/>',
    weight: '<path d="M6 8h12l2 12H4z"/><circle cx="12" cy="5" r="2.4"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-.7 4.3"/><path d="M20 5v6h-6"/>',
    upload: '<path d="M12 16V4"/><path d="M8 8l4-4 4 4"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
    print: '<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="2"/><path d="M7 14h10v6H7z"/>',
    whatsapp: '<path d="M3 21l1.6-4.4A8.3 8.3 0 1 1 8 20.2z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1"/>',
    facebook: '<path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A4 4 0 0 0 10.5 7v1.5H8V12h2.5v9H14v-9h2.5l.5-3.5z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    package: '<path d="M16.5 9.4L7.5 4.2"/><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="6" rx="2"/><rect x="17.5" y="13" width="4" height="6" rx="2"/><path d="M19.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-2"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/><path d="M6 15h4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    /* --- Panel administrativo --- */
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7.5" y="12" width="3" height="5" rx="1"/><rect x="13" y="8" width="3" height="9" rx="1"/><rect x="18" y="5" width="3" height="12" rx="1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9 4.6h.1A1.6 1.6 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
    trash: '<path d="M4 7h16"/><path d="M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M10.5 11v6M13.5 11v6"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M12 4v12"/><path d="M8 12l4 4 4-4"/><path d="M4 18v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1"/>',
    xCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    plusCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h7V3"/><rect x="8" y="13" width="8" height="6"/>',
    copyDoc: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>',
    users: '<circle cx="9" cy="8" r="3.3"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.3 3.3 0 0 1 0 5.6"/><path d="M17.5 14.4A6.5 6.5 0 0 1 21.5 20"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.6"/>',
    dollar: '<path d="M12 2v20"/><path d="M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 2.6 5 3.2 5 1.3 5 3.3-2.2 3.2-5 3.2-5-1.3-5-3.2"/>',
  };

  /* Los atributos width/height dan un tamaño por defecto sensato;
     cualquier regla CSS los sobrescribe sin problema. */
  A.icon = function (name, cls, size) {
    const d = ICONS[name] || "";
    const s = size || 20;
    return `<svg${cls ? ` class="${cls}"` : ""} width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  };

  /* ============================ Formato ============================ */
  A.fmtUSD = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  A.fmtBs = (n) =>
    "Bs " + (Number(n) * CFG.bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  A.fmtBsRaw = (bs) =>
    "Bs " + Number(bs).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  A.round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

  A.fmtFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Caracas" });
  };
  A.fmtFechaHora = (iso) => {
    const d = new Date(iso);
    return (
      d.toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Caracas" }) +
      " · " +
      d.toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Caracas" })
    );
  };

  A.escape = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  A.getProduct = (id) => A.products.find((p) => p.id === id);

  /* Ruta de una imagen. Si la página es autocontenida (ALFA.IMG_MAP existe,
     con las ilustraciones incrustadas), usa la versión incrustada. */
  A.img = (file) =>
    (A.IMG_MAP && A.IMG_MAP[file]) || (A.basePath || "") + "assets/img/" + file;

  A.stars = (rating) => {
    let out = '<span class="stars">';
    for (let i = 1; i <= 5; i++) {
      out += `<svg width="13" height="13" viewBox="0 0 24 24" class="${i <= Math.round(rating) ? "" : "off"}" fill="currentColor" stroke="none">${ICONS.star}</svg>`;
    }
    return out + "</span>";
  };

  /* ============================ Storage ============================ */
  /* Usa localStorage cuando está disponible. Si el navegador lo bloquea
     (por ejemplo al abrir con file:// en Safari o en modo privado), cae
     a memoria: la tienda sigue funcionando durante la sesión. */
  const memoria = {};
  let backend;
  try {
    localStorage.setItem("alfa.test", "1");
    localStorage.removeItem("alfa.test");
    backend = localStorage;
  } catch (e) {
    backend = {
      getItem: (k) => (k in memoria ? memoria[k] : null),
      setItem: (k, v) => { memoria[k] = String(v); },
      removeItem: (k) => { delete memoria[k]; },
    };
    A.sinPersistencia = true;
  }

  /* Colecciones que viven en el servidor cuando hay backend.
     Sin backend, todo cae al almacenamiento del navegador. */
  const REMOTAS = {};
  const remoto = { pedidos: null, catalogo: null, config: null, bitacora: null };
  A.modoServidor = false;

  const puedeEscribirRemoto = () => A.modoServidor && A.api && A.api.token;

  /* Cola de guardado: agrupa escrituras seguidas en una sola petición */
  const pendientes = new Map();
  let temporizador = null;

  function encolar(nombre, valor) {
    pendientes.set(nombre, JSON.parse(JSON.stringify(valor)));
    clearTimeout(temporizador);
    temporizador = setTimeout(vaciarCola, 300);
  }

  async function vaciarCola() {
    const lote = Array.from(pendientes.entries());
    pendientes.clear();
    for (const [nombre, valor] of lote) {
      try {
        await A.api.guardar(nombre, valor);
      } catch (e) {
        if (e.estado === 401) {
          A.toast("Tu sesión venció. Vuelve a entrar.", "alert");
          A.api.salir();
          setTimeout(() => location.reload(), 1500);
          return;
        }
        A.toast("No se pudo guardar en el servidor: " + e.message, "alert");
      }
    }
  }

  A.sincronizar = vaciarCola;

  const store = {
    get(key, fallback) {
      if (A.modoServidor && REMOTAS[key]) {
        const v = remoto[REMOTAS[key]];
        return v == null ? fallback : v;
      }
      try {
        const v = backend.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      if (A.modoServidor && REMOTAS[key]) {
        remoto[REMOTAS[key]] = val;
        if (puedeEscribirRemoto()) encolar(REMOTAS[key], val);
        return true;
      }
      try {
        backend.setItem(key, JSON.stringify(val));
        return true;
      } catch (e) {
        return false;
      }
    },
  };
  A.store = store;

  const K_CART = "alfa.cart.v1";
  const K_ORDERS = "alfa.orders.v1";
  const K_FAVS = "alfa.favs.v1";
  const K_CAT = "alfa.catalogo.v1";
  const K_CFG = "alfa.config.v1";
  const K_LOG = "alfa.bitacora.v1";
  const K_SESION = "alfa.sesion.v1";

  /* ==================== Catálogo persistente ====================
     El catálogo de data.js es la semilla. A partir de la primera carga
     vive en el almacenamiento, para que el panel pueda editarlo y la
     tienda pública refleje esos cambios. */
  A.productosSemilla = JSON.parse(JSON.stringify(A.products));
  A.configSemilla = JSON.parse(JSON.stringify(A.config));

  REMOTAS[K_ORDERS] = "pedidos";
  REMOTAS[K_CAT] = "catalogo";
  REMOTAS[K_CFG] = "config";
  REMOTAS[K_LOG] = "bitacora";

  function aplicarDatos() {
    const cat = store.get(K_CAT, null);
    if (Array.isArray(cat) && cat.length) A.products = cat;
    else store.set(K_CAT, A.products);

    const cfg = store.get(K_CFG, null);
    if (cfg && Object.keys(cfg).length) Object.keys(cfg).forEach((k) => (A.config[k] = cfg[k]));
  }

  /** Carga el estado inicial. Con backend, del servidor; si no, del navegador. */
  A.cargarDatos = async function () {
    const hayServidor = A.api ? await A.api.comprobar() : false;

    if (!hayServidor) {
      A.modoServidor = false;
      aplicarDatos();
      return false;
    }

    A.modoServidor = true;
    let datos = null;

    if (A.api.token) {
      try {
        datos = await A.api.estado();
      } catch (e) {
        A.api.salir();
        store.set(K_SESION, null);
      }
    }
    if (!datos) {
      try {
        const p = await A.api.publico();
        datos = { catalogo: p.catalogo, config: p.config, pedidos: [], bitacora: [] };
      } catch (e) {
        A.modoServidor = false;
        aplicarDatos();
        return false;
      }
    }

    remoto.catalogo = datos.catalogo;
    remoto.config = datos.config;
    remoto.pedidos = datos.pedidos || [];
    remoto.bitacora = datos.bitacora || [];
    if (datos.permisos && datos.sesion) A.permisos[datos.sesion.rol] = datos.permisos;

    // Primera vez en este sitio: se siembra el catálogo y los pedidos de ejemplo
    if (!Array.isArray(remoto.catalogo) || !remoto.catalogo.length) {
      await sembrarServidor();
    }

    aplicarDatos();
    return true;
  };

  async function sembrarServidor() {
    const catalogo = JSON.parse(JSON.stringify(A.productosSemilla));
    const config = JSON.parse(JSON.stringify(A.configSemilla));
    const pedidos = Orders.generarSemilla(catalogo, config);
    try {
      await A.api.sembrar({ catalogo, config, pedidos, bitacora: [] });
      const p = await A.api.publico();
      remoto.catalogo = p.catalogo;
      remoto.config = p.config;
    } catch (e) {
      remoto.catalogo = catalogo;
      remoto.config = config;
    }
  }

  A.guardarCatalogo = function () {
    store.set(K_CAT, A.products);
    document.dispatchEvent(new CustomEvent("alfa:catalogo"));
  };

  A.guardarConfig = function () {
    store.set(K_CFG, A.config);
    document.dispatchEvent(new CustomEvent("alfa:config"));
  };

  A.restaurarCatalogo = function () {
    A.products = JSON.parse(JSON.stringify(A.productosSemilla));
    A.guardarCatalogo();
  };

  A.restaurarConfig = function () {
    Object.keys(A.configSemilla).forEach((k) => (A.config[k] = JSON.parse(JSON.stringify(A.configSemilla[k]))));
    A.guardarConfig();
  };

  /* ==================== Bitácora de actividad ==================== */
  A.bitacora = {
    all: () => store.get(K_LOG, []),
    add(accion, detalle, ref) {
      const list = store.get(K_LOG, []);
      list.unshift({
        fecha: new Date().toISOString(),
        usuario: (A.sesion && A.sesion.actual() && A.sesion.actual().nombre) || "Sistema",
        rol: (A.sesion && A.sesion.actual() && A.sesion.actual().rol) || "sistema",
        accion,
        detalle,
        ref: ref || null,
      });
      store.set(K_LOG, list.slice(0, 400));
    },
    limpiar() { store.set(K_LOG, []); },
  };

  /* ============================ Carrito ============================ */
  const Cart = {
    items() {
      return store.get(K_CART, []).filter((it) => A.getProduct(it.id));
    },
    save(items) {
      store.set(K_CART, items);
      A.renderCart();
      document.dispatchEvent(new CustomEvent("alfa:cart"));
    },
    add(id, qty) {
      qty = qty || 1;
      const p = A.getProduct(id);
      if (!p) return;
      const items = Cart.items();
      const found = items.find((it) => it.id === id);
      const actual = found ? found.qty : 0;
      if (actual + qty > p.stock) {
        A.toast(`Solo quedan ${p.stock} unidades de ${p.nombre}`, "alert");
        if (actual >= p.stock) return;
        qty = p.stock - actual;
      }
      if (found) found.qty += qty;
      else items.push({ id, qty });
      Cart.save(items);
      A.toast(`${p.nombre} agregado al carrito`, "checkCircle");
    },
    setQty(id, qty) {
      const p = A.getProduct(id);
      const items = Cart.items();
      const it = items.find((x) => x.id === id);
      if (!it) return;
      it.qty = Math.max(1, Math.min(qty, p ? p.stock : 99));
      Cart.save(items);
    },
    remove(id) {
      Cart.save(Cart.items().filter((it) => it.id !== id));
    },
    clear() {
      Cart.save([]);
    },
    count() {
      return Cart.items().reduce((s, it) => s + it.qty, 0);
    },
    detailed() {
      return Cart.items().map((it) => {
        const p = A.getProduct(it.id);
        return { ...it, producto: p, subtotal: A.round2(p.precio * it.qty) };
      });
    },
    subtotal() {
      return A.round2(Cart.detailed().reduce((s, l) => s + l.subtotal, 0));
    },
  };
  A.cart = Cart;

  /* ---- Favoritos ---- */
  A.favs = {
    all: () => store.get(K_FAVS, []),
    has: (id) => A.favs.all().includes(id),
    toggle(id) {
      const f = A.favs.all();
      const i = f.indexOf(id);
      if (i >= 0) f.splice(i, 1);
      else f.push(id);
      store.set(K_FAVS, f);
      return i < 0;
    },
  };

  /* ---- Pedidos hechos desde este navegador (accesos rápidos) ---- */
  const K_MIOS = "alfa.mispedidos.v1";
  A.recordarPedido = function (codigo) {
    const l = store.get(K_MIOS, []).filter((c) => c !== codigo);
    l.unshift(codigo);
    store.set(K_MIOS, l.slice(0, 10));
  };
  A.misPedidos = () => store.get(K_MIOS, []);

  /* ============================ Totales ============================ */
  /**
   * Calcula los totales de una compra.
   * @param {number} subtotal  suma de productos en USD
   * @param {object} entrega   { modo:'delivery'|'tienda', zonaId }
   * @param {string} metodo    'pago-movil' | 'transferencia' | 'zelle' | 'efectivo'
   */
  A.calcTotales = function (subtotal, entrega, metodo, config) {
    const CFG = config || A.config;
    let envio = 0;
    if (entrega && entrega.modo === "delivery") {
      const z = CFG.zonas.find((x) => x.id === entrega.zonaId);
      envio = z ? z.costo : 0;
      if (subtotal >= CFG.freeShippingOver) envio = 0;
    }
    const base = A.round2(subtotal + envio);
    const iva = A.round2(base * CFG.iva);
    // 5 % de descuento pagando en bolívares (pago móvil o transferencia)
    const aplicaDesc = metodo === "pago-movil" || metodo === "transferencia";
    const descuento = aplicaDesc ? A.round2(base * 0.05) : 0;
    const total = A.round2(base + iva - descuento);
    return {
      subtotal: A.round2(subtotal),
      envio: A.round2(envio),
      envioGratis: entrega && entrega.modo === "delivery" && subtotal >= CFG.freeShippingOver,
      iva,
      descuento,
      total,
      totalBs: A.round2(total * CFG.bcvRate),
    };
  };

  /* ============================ Pedidos ============================ */
  const Orders = {
    all: () => store.get(K_ORDERS, []),
    saveAll: (list) => store.set(K_ORDERS, list),

    nuevoCodigo() {
      const y = new Date().getFullYear();
      const n = String(Math.floor(1000 + Math.random() * 8999));
      const l = "ABCDEFGHJKLMNPQRSTUVWXYZ";
      return `ALF-${y}-${n}${l[Math.floor(Math.random() * l.length)]}${l[Math.floor(Math.random() * l.length)]}`;
    },

    create(data) {
      const list = Orders.all();
      const ahora = new Date();
      const pasos = data.entrega.modo === "tienda" ? A.estadosTienda : A.estados;

      // Fecha estimada de entrega
      let dias = 1;
      if (data.entrega.modo === "delivery") {
        const z = CFG.zonas.find((x) => x.id === data.entrega.zonaId);
        dias = z ? z.dias : 3;
      } else {
        dias = 2;
      }
      const eta = new Date(ahora.getTime() + dias * 86400000);

      const orden = {
        codigo: data.codigo || Orders.nuevoCodigo(),
        creado: ahora.toISOString(),
        eta: eta.toISOString(),
        items: data.items,
        cliente: data.cliente,
        entrega: data.entrega,
        pago: data.pago,
        totales: data.totales,
        estadoIndex: 0,
        pagoEstado: data.pago.metodo === "efectivo" ? "por-cobrar" : "reportado",
        cancelado: false,
        notas: [],
        historial: [{ paso: pasos[0].id, fecha: ahora.toISOString() }],
        guia: "ALF" + Math.floor(100000000 + Math.random() * 899999999),
        courier: data.entrega.modo === "delivery" ? CFG.courier[Math.floor(Math.random() * CFG.courier.length)] : null,
        repartidor: null,
      };
      list.unshift(orden);
      Orders.saveAll(list);

      // Descontar del inventario
      orden.items.forEach((it) => {
        const p = A.getProduct(it.id);
        if (p) p.stock = Math.max(0, p.stock - it.qty);
      });
      A.guardarCatalogo();

      A.bitacora.add("pedido-creado", `Pedido ${orden.codigo} por ${A.fmtUSD(orden.totales.total)}`, orden.codigo);
      return orden;
    },

    /** Crea el pedido. Con servidor lo registra allá (el stock es único
        para todos); sin servidor, lo guarda en este navegador. */
    async crear(data) {
      if (!A.modoServidor) return Orders.create(data);

      const provisional = Orders.create(data);          // arma el objeto y actualiza la vista
      try {
        const r = await A.api.crearPedido(provisional);
        // El servidor manda: refrescamos catálogo y pedido con lo que quedó guardado
        const publico = await A.api.publico();
        if (Array.isArray(publico.catalogo) && publico.catalogo.length) {
          A.products = publico.catalogo;
          store.set(K_CAT, publico.catalogo);
        }
        A.recordarPedido(r.orden.codigo);
        return r.orden;
      } catch (e) {
        // Se deshace el pedido local para no dejar datos inconsistentes
        Orders.saveAll(Orders.all().filter((o) => o.codigo !== provisional.codigo));
        const err = new Error(e.message || "No se pudo registrar el pedido");
        err.datos = e.datos;
        throw err;
      }
    },

    /** Busca un pedido: primero en memoria, si no en el servidor. */
    async buscar(codigo) {
      const local = Orders.find(codigo);
      if (local) return local;
      if (!A.modoServidor) return null;
      try {
        const r = await A.api.buscarPedido(String(codigo).trim().toUpperCase());
        return r.orden || null;
      } catch (e) {
        return null;
      }
    },

    randomRepartidor() {
      const nombres = ["Carlos Prieto", "Ana Bermúdez", "Wilmer Rojas", "Katiuska Silva", "Jesús Marcano"];
      return {
        nombre: nombres[Math.floor(Math.random() * nombres.length)],
        telefono: "0414-" + Math.floor(1000000 + Math.random() * 8999999),
        vehiculo: Math.random() > 0.5 ? "Moto" : "Camioneta",
      };
    },

    find(codigo) {
      if (!codigo) return null;
      const c = String(codigo).trim().toUpperCase();
      return Orders.all().find((o) => o.codigo.toUpperCase() === c) || null;
    },

    pasosDe(o) {
      return o.entrega.modo === "tienda" ? A.estadosTienda : A.estados;
    },

    avanzar(codigo) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      const pasos = Orders.pasosDe(o);
      if (o.estadoIndex >= pasos.length - 1) return o;
      o.estadoIndex++;
      o.historial.push({ paso: pasos[o.estadoIndex].id, fecha: new Date().toISOString() });
      if (o.estadoIndex >= 1 && o.pagoEstado === "reportado") o.pagoEstado = "verificado";
      if (o.estadoIndex >= 1 && o.entrega.modo === "delivery" && !o.repartidor) o.repartidor = Orders.randomRepartidor();
      Orders.saveAll(list);
      A.bitacora.add("estado-avanzado", `${o.codigo} → ${pasos[o.estadoIndex].titulo}`, o.codigo);
      return o;
    },

    reiniciar(codigo) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      const pasos = Orders.pasosDe(o);
      o.estadoIndex = 0;
      o.historial = [{ paso: pasos[0].id, fecha: new Date().toISOString() }];
      Orders.saveAll(list);
      A.bitacora.add("estado-reiniciado", `${o.codigo} volvió al primer estado`, o.codigo);
      return o;
    },

    /* ---------- Acciones del panel administrativo ---------- */

    /** Fija el pedido en un estado concreto, rellenando el historial. */
    setEstado(codigo, indice) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      const pasos = Orders.pasosDe(o);
      const destino = Math.max(0, Math.min(indice, pasos.length - 1));
      const ahora = new Date().toISOString();

      if (destino > o.estadoIndex) {
        for (let i = o.estadoIndex + 1; i <= destino; i++) o.historial.push({ paso: pasos[i].id, fecha: ahora });
      } else if (destino < o.estadoIndex) {
        const ids = pasos.slice(0, destino + 1).map((p) => p.id);
        o.historial = o.historial.filter((h) => ids.includes(h.paso));
      }
      o.estadoIndex = destino;
      if (destino >= 1 && o.pagoEstado === "reportado") o.pagoEstado = "verificado";
      if (destino >= 1 && o.entrega.modo === "delivery" && !o.repartidor) o.repartidor = Orders.randomRepartidor();
      Orders.saveAll(list);
      A.bitacora.add("estado-cambiado", `${o.codigo} fijado en “${pasos[destino].titulo}”`, o.codigo);
      return o;
    },

    verificarPago(codigo) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      o.pagoEstado = "verificado";
      o.pagoVerificado = new Date().toISOString();
      if (o.estadoIndex < 1) {
        const pasos = Orders.pasosDe(o);
        o.estadoIndex = 1;
        o.historial.push({ paso: pasos[1].id, fecha: o.pagoVerificado });
      }
      if (o.entrega.modo === "delivery" && !o.repartidor) o.repartidor = Orders.randomRepartidor();
      Orders.saveAll(list);
      A.bitacora.add("pago-verificado", `Pago de ${o.codigo} por ${A.fmtUSD(o.totales.total)} verificado`, o.codigo);
      return o;
    },

    rechazarPago(codigo, motivo) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      o.pagoEstado = "rechazado";
      o.pagoMotivo = motivo || "Referencia no encontrada en el estado de cuenta";
      o.estadoIndex = 0;
      o.historial = [{ paso: Orders.pasosDe(o)[0].id, fecha: o.creado }];
      Orders.saveAll(list);
      A.bitacora.add("pago-rechazado", `Pago de ${o.codigo} rechazado: ${o.pagoMotivo}`, o.codigo);
      return o;
    },

    actualizarEnvio(codigo, datos) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      if (datos.courier !== undefined) o.courier = datos.courier;
      if (datos.guia !== undefined) o.guia = datos.guia;
      if (datos.repartidor !== undefined) o.repartidor = datos.repartidor;
      if (datos.eta !== undefined) o.eta = datos.eta;
      Orders.saveAll(list);
      A.bitacora.add("envio-actualizado", `Datos de envío de ${o.codigo} actualizados`, o.codigo);
      return o;
    },

    cancelar(codigo, motivo) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o || o.cancelado) return o;
      o.cancelado = true;
      o.motivoCancelacion = motivo || "Cancelado por el equipo";
      o.canceladoEl = new Date().toISOString();
      Orders.saveAll(list);
      // Devolver el stock al inventario
      o.items.forEach((it) => {
        const p = A.getProduct(it.id);
        if (p) p.stock += it.qty;
      });
      A.guardarCatalogo();
      A.bitacora.add("pedido-cancelado", `${o.codigo} cancelado: ${o.motivoCancelacion}. Stock devuelto.`, o.codigo);
      return o;
    },

    reactivar(codigo) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o || !o.cancelado) return o;
      o.cancelado = false;
      delete o.motivoCancelacion;
      delete o.canceladoEl;
      Orders.saveAll(list);
      o.items.forEach((it) => {
        const p = A.getProduct(it.id);
        if (p) p.stock = Math.max(0, p.stock - it.qty);
      });
      A.guardarCatalogo();
      A.bitacora.add("pedido-reactivado", `${o.codigo} reactivado`, o.codigo);
      return o;
    },

    agregarNota(codigo, texto) {
      const list = Orders.all();
      const o = list.find((x) => x.codigo === codigo);
      if (!o) return null;
      o.notas = o.notas || [];
      o.notas.unshift({
        fecha: new Date().toISOString(),
        usuario: (A.sesion && A.sesion.actual() && A.sesion.actual().nombre) || "Equipo",
        texto,
      });
      Orders.saveAll(list);
      A.bitacora.add("nota-agregada", `Nota interna en ${o.codigo}`, o.codigo);
      return o;
    },

    /* ---------- Consultas agregadas ---------- */
    activos: () => Orders.all().filter((o) => !o.cancelado),

    porVerificar: () =>
      Orders.activos().filter((o) => o.pagoEstado === "reportado" || o.pagoEstado === "rechazado"),

    enCurso: () =>
      Orders.activos().filter((o) => o.estadoIndex >= 1 && o.estadoIndex < Orders.pasosDe(o).length - 1),

    entregados: () => Orders.activos().filter((o) => o.estadoIndex >= Orders.pasosDe(o).length - 1),

    ingresos(soloVerificados) {
      return A.round2(
        Orders.activos()
          .filter((o) => (soloVerificados ? o.pagoEstado === "verificado" : true))
          .reduce((s, o) => s + o.totales.total, 0)
      );
    },

    /* Crea los pedidos de ejemplo la primera vez, para que tanto el
       seguimiento como el panel tengan datos reales con los que trabajar. */
    seed() {
      if (A.modoServidor) return; // en el servidor se siembra una sola vez para todos
      if (store.get("alfa.seeded.v2", false)) return;
      const pedidos = Orders.generarSemilla(A.products, CFG);
      Orders.saveAll(pedidos);
      A.guardarCatalogo();
      store.set("alfa.seeded.v2", true);
      store.set("alfa.seeded.v1", true);
    },

    /** Genera los pedidos de ejemplo y ajusta el stock del catálogo recibido. */
    generarSemilla(catalogo, config) {
      const CFGS = config || CFG;
      const buscar = (id) => catalogo.find((p) => p.id === id);
      const hace = (d) => new Date(Date.now() - d * 86400000).toISOString();

      /* --- Definición compacta de los pedidos de ejemplo --- */
      const CLIENTES = [
        ["Luis Ruiz", "V-20.145.987", "0412-5559834", "luisruizweb@gmail.com"],
        ["Rosa Elena Pérez", "V-11.887.203", "0424-8832019", "rosa.perez@ejemplo.com"],
        ["Daniela Fuentes", "V-18.334.771", "0414-2298450", "dani.fuentes@ejemplo.com"],
        ["Ricardo Molina", "J-40551223-8", "0212-5550188", "compras@inversionesmolina.com"],
        ["Camila Villalobos", "V-24.667.102", "0416-7741039", "camila.v@ejemplo.com"],
        ["Héctor Jiménez", "V-14.209.556", "0426-3390122", "hector.jimenez@ejemplo.com"],
        ["Gabriela Toro", "V-27.881.340", "0412-6612984", "gabriela.toro@ejemplo.com"],
        ["Ernesto Blanco", "V-09.774.612", "0414-8850273", "ernesto.blanco@ejemplo.com"],
        ["Yolanda Castillo", "V-16.443.098", "0424-1129877", "y.castillo@ejemplo.com"],
        ["Pedro Zambrano", "V-22.907.554", "0416-5583021", "pedro.z@ejemplo.com"],
      ];

      const DIRS = [
        ["Av. Francisco de Miranda, Torre Delta, piso 7, ofic. 7-B", "Caracas", "ccs", "Frente al Metro Altamira"],
        ["Av. Bolívar Norte, Res. El Trigal, torre B, apto 9-C", "Valencia", "central", "Al lado del CC Camoruco"],
        ["Calle 72 con Av. 15 Delicias, Edif. Zulia, PB", "Maracaibo", "occidente", "Portón blanco, timbre 2"],
        ["Urb. Los Chaguaramos, Res. Aurora, casa 14", "Barcelona", "oriente", "Casa esquinera azul"],
        ["Av. Los Próceres, Res. Montaña Alta, apto 4-A", "Mérida", "andes", "Cerca del CC Alto Prado"],
        ["Av. Guayana, Res. Caroní Suites, torre 1, apto 12-B", "Puerto Ordaz", "llanos", "Junto a la panadería La Espiga"],
      ];

      /* [codigo, díasAtrás, items, clienteIdx, entrega, pago, estadoIndex, pagoEstado, cancelado] */
      const SPECS = [
        ["ALF-2026-4821KM", 3.0, [["zenith-14", 1]], 0, ["delivery", 0], ["pago-movil", "0105 — Mercantil", "884512"], 4, "verificado", false],
        ["ALF-2026-7390PT", 6.0, [["core-15", 2], ["spark-11", 1]], 1, ["tienda", "ccct"], ["transferencia", "0102 — Banco de Venezuela", "0091774"], 5, "verificado", false],
        ["ALF-2026-1174QB", 0.12, [["vortex-x15", 1]], 4, ["delivery", 1], ["pago-movil", "0134 — Banesco", "553201"], 0, "reportado", false],
        ["ALF-2026-2065HD", 0.35, [["studio-pro-16", 1], ["zenith-14", 1]], 2, ["delivery", 0], ["pago-movil", "0108 — Provincial", "710948"], 0, "reportado", false],
        ["ALF-2026-3318LR", 0.9, [["spark-11", 3]], 6, ["tienda", "sambil-valencia"], ["efectivo", null, null], 0, "por-cobrar", false],
        ["ALF-2026-5527XF", 1.4, [["edge-14-business", 4]], 3, ["delivery", 0], ["transferencia", "0191 — BNC Banco Nacional de Crédito", "0224781"], 2, "verificado", false],
        ["ALF-2026-6743NV", 2.2, [["vortex-x17-titan", 1]], 7, ["delivery", 5], ["zelle", null, "1122334455"], 3, "verificado", false],
        ["ALF-2026-8890CT", 4.5, [["nova-air-13", 1], ["flex-360", 1]], 8, ["delivery", 2], ["pago-movil", "0172 — Bancamiga", "334019"], 5, "verificado", false],
        ["ALF-2026-9012WS", 5.8, [["core-15", 1]], 5, ["tienda", "maracaibo"], ["pago-movil", "0114 — Bancaribe", "667201"], 5, "verificado", false],
        ["ALF-2026-4406JG", 8.3, [["zenith-16-pro", 1]], 9, ["delivery", 3], ["transferencia", "0163 — Banco del Tesoro", "0118093"], 5, "verificado", false],
        ["ALF-2026-7781DM", 9.6, [["flex-360", 2]], 2, ["delivery", 4], ["pago-movil", "0105 — Mercantil", "889003"], 5, "verificado", false],
        ["ALF-2026-2298BK", 1.1, [["vortex-x15", 1]], 9, ["delivery", 1], ["pago-movil", "0169 — Mi Banco", "112233"], 0, "rechazado", false],
        ["ALF-2026-6650ZP", 7.2, [["spark-11", 1]], 6, ["delivery", 3], ["pago-movil", "0175 — Bicentenario", "445566"], 0, "reportado", true],
      ];

      const lista = SPECS.map((s) => {
        const [codigo, dias, items, ci, ent, pg, estadoIndex, pagoEstado, cancelado] = s;
        const creado = hace(dias);
        const [nombre, cedula, telefono, email] = CLIENTES[ci];

        const lineas = items.map(([id, qty]) => {
          const p = buscar(id);
          return { id, nombre: p.nombre, qty, precio: p.precio, img: p.imagenes[0] };
        });
        const subtotal = A.round2(lineas.reduce((s2, l) => s2 + l.precio * l.qty, 0));

        let entrega, dias_envio;
        if (ent[0] === "tienda") {
          const t = CFGS.tiendas.find((x) => x.id === ent[1]) || CFGS.tiendas[0];
          entrega = { modo: "tienda", tiendaId: t.id, tiendaNombre: t.nombre, direccion: t.direccion, horario: t.horario };
          dias_envio = 2;
        } else {
          const [dir, ciudad, zonaId, ref] = DIRS[ent[1]];
          const z = CFGS.zonas.find((x) => x.id === zonaId);
          entrega = { modo: "delivery", zonaId, zonaNombre: z.nombre, direccion: dir, ciudad, referencia: ref, nota: "" };
          dias_envio = z.dias;
        }

        const totales = A.calcTotales(subtotal, entrega, pg[0], CFGS);
        const pago = { metodo: pg[0], montoBs: totales.totalBs };
        if (pg[1]) pago.banco = pg[1];
        if (pg[2]) pago.referencia = pg[2];
        if (pg[0] === "pago-movil") { pago.telefono = telefono; pago.cedula = cedula; pago.fecha = creado.slice(0, 10); }
        if (pg[0] === "transferencia") { pago.titular = nombre; pago.fecha = creado.slice(0, 10); }
        if (pg[0] === "zelle") { pago.titular = nombre; pago.email = email; }
        if (pg[0] === "efectivo") { pago.moneda = "usd"; pago.pendiente = true; }

        const pasos = entrega.modo === "tienda" ? A.estadosTienda : A.estados;
        const historial = [];
        for (let i = 0; i <= estadoIndex; i++) {
          historial.push({ paso: pasos[i].id, fecha: hace(dias - (dias * i) / (estadoIndex + 1.15)) });
        }

        return {
          codigo,
          creado,
          eta: new Date(new Date(creado).getTime() + dias_envio * 86400000).toISOString(),
          items: lineas,
          cliente: { nombre, cedula, telefono, email, empresa: cedula.startsWith("J") ? { razonSocial: "Inversiones Molina C.A.", rif: cedula } : null },
          entrega,
          pago,
          totales,
          estadoIndex,
          pagoEstado,
          pagoMotivo: pagoEstado === "rechazado" ? "La referencia no aparece en el estado de cuenta del banco" : undefined,
          cancelado,
          motivoCancelacion: cancelado ? "El cliente pidió cancelar y comprar otro modelo" : undefined,
          notas: [],
          historial,
          guia: "ALF" + Math.floor(100000000 + Math.random() * 899999999),
          courier: entrega.modo === "delivery" ? CFGS.courier[Math.floor(Math.random() * CFGS.courier.length)] : null,
          repartidor: entrega.modo === "delivery" && estadoIndex >= 3 ? Orders.randomRepartidor() : null,
        };
      });

      // El primero mantiene el repartidor conocido para la documentación
      lista[0].guia = "ALF748193025";
      lista[0].courier = "Delivery propio Alfa";
      lista[0].repartidor = { nombre: "Carlos Prieto", telefono: "0414-3387192", vehiculo: "Camioneta" };
      lista[1].guia = "ALF551209884";

      // Ajustar el stock para reflejar lo vendido y dejar alertas visibles
      lista.filter((o) => !o.cancelado).forEach((o) =>
        o.items.forEach((it) => {
          const p = buscar(it.id);
          if (p) p.stock = Math.max(0, p.stock - it.qty);
        })
      );
      const bajo = buscar("vortex-x17-titan");
      if (bajo) bajo.stock = 2;
      const agotado = buscar("studio-pro-16");
      if (agotado) agotado.stock = 0;

      return lista;
    },

  };
  A.orders = Orders;

  /* ============================ Toasts ============================ */
  A.toast = function (msg, icon) {
    let box = document.querySelector(".toasts");
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = A.icon(icon || "checkCircle") + "<span>" + A.escape(msg) + "</span>";
    box.appendChild(t);
    setTimeout(() => {
      t.classList.add("is-out");
      setTimeout(() => t.remove(), 320);
    }, 2600);
  };

  /* Abre WhatsApp (app o web) con un mensaje ya escrito. La persona
     del otro lado tiene que pulsar enviar — no manda nada solo. */
  A.abrirWhatsApp = function (numero, mensaje) {
    let d = String(numero || "").replace(/\D/g, "");
    if (!d) return;
    // Venezuela: 0412-1234567 (11 dígitos con 0) → 584121234567
    if (d.startsWith("0") && d.length === 11) d = "58" + d.slice(1);
    else if (d.length === 10) d = "58" + d; // sin 0 ni código de país
    else if (!d.startsWith("58")) d = "58" + d.replace(/^0+/, "");
    const url = `https://wa.me/${d}?text=${encodeURIComponent(mensaje || "")}`;
    window.open(url, "_blank", "noopener");
  };

  A.copiar = function (texto, btn) {
    const done = () => {
      A.toast("Copiado: " + texto, "copy");
      if (btn) {
        const old = btn.innerHTML;
        btn.innerHTML = A.icon("check");
        setTimeout(() => (btn.innerHTML = old), 1400);
      }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(done).catch(() => fallback());
    } else fallback();

    function fallback() {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { A.toast("No se pudo copiar", "alert"); }
      ta.remove();
    }
  };

  /* ====================== Header y footer ====================== */
  const NAV = [
    { href: "index.html", label: "Inicio", key: "inicio" },
    { href: "index.html#catalogo", label: "Catálogo", key: "catalogo" },
    { href: "producto.html?id=zenith-14", label: "Destacado", key: "producto" },
    { href: "seguimiento.html", label: "Seguimiento", key: "seguimiento" },
  ];

  A.renderChrome = function (active) {
    const bp = A.basePath || "";
    const headerHost = document.getElementById("app-header");
    if (headerHost) {
      headerHost.outerHTML = `
<header class="header">
  <div class="wrap header-inner">
    <a class="logo" href="${bp}index.html" aria-label="Alfa — inicio">
      <span class="logo-mark">
        <img src="${bp}assets/img/logo-mark.png" alt="" width="32" height="32">
      </span>
      <span class="logo-text">Alf<span>a</span></span>
    </a>

    <nav class="nav" id="mainNav">
      ${NAV.map((n) => `<a href="${bp}${n.href}"${n.key === active ? ' class="is-active"' : ""}>${n.label}</a>`).join("")}
    </nav>

    <form class="searchbar" role="search" id="globalSearch" onsubmit="return ALFA.onGlobalSearch(event)">
      ${A.icon("search")}
      <input type="search" id="globalSearchInput" placeholder="Buscar laptops, líneas, procesadores…" aria-label="Buscar productos">
    </form>

    <div class="header-actions">
      <button class="icon-btn" type="button" onclick="ALFA.openCart()" aria-label="Abrir carrito">
        ${A.icon("cart")}
        <span class="cart-count" id="cartCount" data-empty="true">0</span>
      </button>
      <a class="btn btn-primary btn-sm hide-sm" href="${bp}seguimiento.html" id="headerTrackBtn">${A.icon("pin")} Rastrear</a>
      <button class="icon-btn burger" type="button" onclick="ALFA.toggleNav()" aria-label="Menú">
        ${A.icon("menu")}
      </button>
    </div>
  </div>
</header>

<div class="overlay" id="overlay" onclick="ALFA.closeCart()"></div>
<aside class="drawer" id="cartDrawer" aria-label="Carrito de compras">
  <div class="drawer-head">
    <h3>Tu carrito</h3>
    <button class="icon-btn" type="button" onclick="ALFA.closeCart()" aria-label="Cerrar">${A.icon("close")}</button>
  </div>
  <div class="drawer-body" id="cartBody"></div>
  <div class="drawer-foot" id="cartFoot"></div>
</aside>`;
    }

    const footerHost = document.getElementById("app-footer");
    if (footerHost) {
      footerHost.outerHTML = `
<footer class="footer" id="contacto">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="logo" href="${bp}index.html">
          <span class="logo-mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 13 L47 47 L41 47 L32 26 L23 47 L17 47 Z" fill="#fff"/>
              <rect x="25" y="35" width="14" height="4.6" rx="2.3" fill="#fff"/>
            </svg>
          </span>
          <span class="logo-text">Alf<span>a</span></span>
        </a>
        <p class="footer-desc">Laptops seleccionadas, garantía real y soporte que responde. Tienda 100 % venezolana con retiro en tres ciudades y envío a todo el país.</p>
        <div class="socials">
          <a href="#" aria-label="Instagram">${A.icon("instagram")}</a>
          <a href="#" aria-label="Facebook">${A.icon("facebook")}</a>
          <a href="#" aria-label="WhatsApp">${A.icon("whatsapp")}</a>
          <a href="#" aria-label="X">${A.icon("x")}</a>
        </div>
      </div>
      <div>
        <h4>Tienda</h4>
        <ul>
          <li><a href="${bp}index.html#catalogo">Todas las laptops</a></li>
          <li><a href="${bp}index.html?filtro=gaming#catalogo">Gaming</a></li>
          <li><a href="${bp}index.html?filtro=ultrabook#catalogo">Ultrabooks</a></li>
          <li><a href="${bp}index.html?filtro=empresa#catalogo">Empresarial</a></li>
          <li><a href="${bp}seguimiento.html">Seguir mi pedido</a></li>
        </ul>
      </div>
      <div>
        <h4>Ayuda</h4>
        <ul>
          <li><a href="${bp}seguimiento.html">Estado de mi entrega</a></li>
          <li><a href="#">Formas de pago</a></li>
          <li><a href="#">Garantía y devoluciones</a></li>
          <li><a href="#">Preguntas frecuentes</a></li>
          <li><a href="#">Términos y condiciones</a></li>
        </ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul>
          <li><a href="tel:${CFG.contact.phone.replace(/\s/g, "")}">${CFG.contact.phone}</a></li>
          <li><a href="mailto:${CFG.contact.email}">${CFG.contact.email}</a></li>
          ${CFG.tiendas.map((t) => `<li><span style="font-size:.87rem">${t.nombre}</span></li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Alfa Computación C.A. · RIF ${CFG.contact.rif}</span>
      <span>
        Tasa referencial: 1 USD = ${CFG.bcvRate.toLocaleString("es-VE", { minimumFractionDigits: 2 })} Bs · act. ${CFG.bcvUpdated}
        · <a href="${bp}admin/index.html" style="text-decoration:underline">Panel interno</a>
      </span>
    </div>
  </div>
</footer>`;
    }

    A.renderCart();
  };

  A.toggleNav = function () {
    const nav = document.getElementById("mainNav");
    if (nav) nav.classList.toggle("is-open");
  };

  A.onGlobalSearch = function (ev) {
    ev.preventDefault();
    const q = document.getElementById("globalSearchInput").value.trim();
    const bp = A.basePath || "";
    if (document.getElementById("gridProductos")) {
      A.catalogo && A.catalogo.buscar(q);
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    } else {
      location.href = bp + "index.html?q=" + encodeURIComponent(q) + "#catalogo";
    }
    return false;
  };

  /* ====================== Drawer del carrito ====================== */
  A.openCart = function () {
    document.getElementById("cartDrawer").classList.add("is-open");
    document.getElementById("overlay").classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  A.closeCart = function () {
    document.getElementById("cartDrawer").classList.remove("is-open");
    document.getElementById("overlay").classList.remove("is-open");
    document.body.style.overflow = "";
  };

  A.renderCart = function () {
    const badge = document.getElementById("cartCount");
    const n = Cart.count();
    if (badge) {
      badge.textContent = n;
      badge.dataset.empty = n === 0 ? "true" : "false";
    }

    const body = document.getElementById("cartBody");
    const foot = document.getElementById("cartFoot");
    if (!body || !foot) return;

    const lineas = Cart.detailed();
    const bp = A.basePath || "";

    if (!lineas.length) {
      body.innerHTML = `
        <div class="empty-state">
          ${A.icon("cart")}
          <h4 style="color:var(--brand-deep);margin-bottom:6px">Tu carrito está vacío</h4>
          <p class="small">Agrega una laptop para empezar.</p>
          <a class="btn btn-ghost btn-sm" style="margin-top:16px" href="${bp}index.html#catalogo" onclick="ALFA.closeCart()">Ver catálogo</a>
        </div>`;
      foot.innerHTML = "";
      return;
    }

    body.innerHTML = lineas
      .map(
        (l) => `
      <div class="cart-item">
        <a class="cart-thumb" href="${bp}producto.html?id=${l.id}">
          <img src="${A.img(l.producto.imagenes[0])}" alt="${A.escape(l.producto.nombre)}">
        </a>
        <div class="cart-info">
          <h4><a href="${bp}producto.html?id=${l.id}">${A.escape(l.producto.nombre)}</a></h4>
          <p class="cart-sub">${A.escape(l.producto.color)} · ${A.fmtUSD(l.producto.precio)} c/u</p>
          <div class="row-between" style="margin-top:9px">
            <div class="qty">
              <button type="button" onclick="ALFA.cart.setQty('${l.id}', ${l.qty - 1})" aria-label="Restar">−</button>
              <span>${l.qty}</span>
              <button type="button" onclick="ALFA.cart.setQty('${l.id}', ${l.qty + 1})" aria-label="Sumar">+</button>
            </div>
            <div style="text-align:right">
              <strong style="font-size:.92rem;color:var(--brand-deep)">${A.fmtUSD(l.subtotal)}</strong>
              <button class="cart-remove" type="button" style="display:block;margin-left:auto" onclick="ALFA.cart.remove('${l.id}')">Quitar</button>
            </div>
          </div>
        </div>
      </div>`
      )
      .join("");

    const sub = Cart.subtotal();
    const falta = A.round2(CFG.freeShippingOver - sub);
    foot.innerHTML = `
      <div class="totals">
        <div class="total-row"><span>Subtotal (${Cart.count()} ${Cart.count() === 1 ? "artículo" : "artículos"})</span><strong>${A.fmtUSD(sub)}</strong></div>
        <div class="total-row"><span class="tiny">Equivalente en bolívares</span><span class="tiny">${A.fmtBs(sub)}</span></div>
      </div>
      ${
        falta > 0
          ? `<div class="notice notice-blue" style="margin-bottom:12px">${A.icon("truck")}<span>Te faltan <strong>${A.fmtUSD(falta)}</strong> para el delivery gratis.</span></div>`
          : `<div class="notice notice-green" style="margin-bottom:12px">${A.icon("checkCircle")}<span>¡Tienes delivery gratis en este pedido!</span></div>`
      }
      <a class="btn btn-primary btn-block" href="${bp}checkout.html">${A.icon("lock")} Finalizar compra</a>
      <button class="btn btn-ghost btn-block btn-sm" style="margin-top:8px" type="button" onclick="ALFA.closeCart()">Seguir comprando</button>`;
  };

  /* ====================== Tarjeta de producto ====================== */
  A.cardHTML = function (p) {
    const bp = A.basePath || "";
    const url = `${bp}producto.html?id=${p.id}`;
    const dsc = p.precioAnterior ? Math.round((1 - p.precio / p.precioAnterior) * 100) : 0;
    const stockCls = p.stock > 10 ? "dot-green" : p.stock > 3 ? "dot-amber" : "dot-red";
    const stockTxt = p.stock > 10 ? "En stock" : p.stock > 0 ? `Últimas ${p.stock} unidades` : "Agotado";

    const chips = [
      p.specs.Memoria.split(" ").slice(0, 2).join(" "),
      p.specs.Almacenamiento.split(" ").slice(0, 2).join(" "),
      p.specs.Pantalla.split("·")[0].trim().replace(/"/g, "″"),
    ];

    return `
    <article class="card" data-id="${p.id}">
      <div class="card-media">
        <a href="${url}" aria-label="${A.escape(p.nombre)}">
          <img src="${A.img(p.imagenes[0])}" alt="${A.escape(p.nombre)}" loading="lazy">
        </a>
        <div class="card-tags">
          ${dsc > 0 ? `<span class="badge badge-solid">−${dsc}%</span>` : ""}
          ${p.etiquetas.map((t) => `<span class="badge">${A.escape(t)}</span>`).join("")}
        </div>
        <button class="card-fav${A.favs.has(p.id) ? " is-on" : ""}" type="button"
                onclick="ALFA.toggleFav('${p.id}', this)" aria-label="Guardar en favoritos">${A.icon("heart")}</button>
      </div>
      <div class="card-body">
        <span class="card-brand">${A.escape(p.linea)} · ${A.escape(p.categoriaLabel)}</span>
        <h3 class="card-title"><a href="${url}">${A.escape(p.nombre)}</a></h3>
        <div class="card-specs">${chips.map((c) => `<span class="spec-pill">${A.escape(c)}</span>`).join("")}</div>
        <div class="card-rating">${A.stars(p.rating)}<span>${p.rating.toFixed(1)} · ${p.reviews} opiniones</span></div>
        <div class="stock-line"><span class="dot ${stockCls}"></span><span class="muted">${stockTxt}</span></div>
        <div class="card-foot">
          <div class="price">
            ${p.precioAnterior ? `<span class="price-old">${A.fmtUSD(p.precioAnterior)}</span><br>` : ""}
            <span class="price-now">${A.fmtUSD(p.precio)}</span>
            <div class="price-bs">${A.fmtBs(p.precio)}</div>
          </div>
          <button class="add-btn" type="button" onclick="ALFA.quickAdd('${p.id}', this)"
                  aria-label="Agregar ${A.escape(p.nombre)} al carrito" ${p.stock === 0 ? "disabled" : ""}>${A.icon("plus")}</button>
        </div>
      </div>
    </article>`;
  };

  A.quickAdd = function (id, btn) {
    Cart.add(id, 1);
    if (btn) {
      btn.classList.add("is-done");
      btn.innerHTML = A.icon("check");
      setTimeout(() => {
        btn.classList.remove("is-done");
        btn.innerHTML = A.icon("plus");
      }, 1200);
    }
  };

  A.toggleFav = function (id, btn) {
    const on = A.favs.toggle(id);
    btn.classList.toggle("is-on", on);
    A.toast(on ? "Guardado en favoritos" : "Quitado de favoritos", "heart");
  };

  /* ====================== Validaciones ====================== */
  A.validar = {
    requerido: (v) => String(v || "").trim().length > 0,
    email: (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v || "").trim()),
    telefono: (v) => /^0(4(12|14|16|24|26)|2\d{2})[-\s]?\d{3}[-\s]?\d{4}$/.test(String(v || "").replace(/\s/g, "")),
    cedula: (v) => /^[VEJGPvejgp][-\s]?\d{1,3}\.?\d{3}\.?\d{3}$/.test(String(v || "").trim()),
    referencia: (v) => /^\d{4,20}$/.test(String(v || "").trim()),
    minLen: (v, n) => String(v || "").trim().length >= n,
  };

  A.marcarError = function (input, hay) {
    if (!input) return;
    input.classList.toggle("is-error", !!hay);
    const err = input.parentElement.querySelector(".field-error");
    if (err) err.classList.toggle("is-shown", !!hay);
  };

  /* ==================== Sesión del panel ====================
     Autenticación de demostración: los usuarios viven en el propio
     archivo. En producción esto lo resuelve el servidor. */
  A.usuarios = [
    { usuario: "admin", clave: "alfa2026", nombre: "Luis Ruiz", rol: "admin", cargo: "Administrador" },
    { usuario: "almacen", clave: "alfa2026", nombre: "Wilmer Rojas", rol: "almacen", cargo: "Jefe de almacén" },
    { usuario: "ventas", clave: "alfa2026", nombre: "Katiuska Silva", rol: "ventas", cargo: "Coordinadora de ventas" },
  ];

  A.permisos = {
    admin: ["panel", "pedidos", "pagos", "inventario", "envios", "clientes", "reportes", "configuracion", "bitacora"],
    ventas: ["panel", "pedidos", "pagos", "clientes"],
    almacen: ["panel", "pedidos", "inventario", "envios"],
  };

  A.sesion = {
    actual: () => store.get(K_SESION, null),

    /** Con servidor, la clave la valida el backend y nunca viaja en el código
        público. Sin servidor, se valida contra la lista de arriba. */
    async entrar(usuario, clave) {
      if (A.modoServidor) {
        try {
          const d = await A.api.entrar(usuario, clave);
          store.set(K_SESION, d.sesion);
          if (d.permisos && d.permisos.length) A.permisos[d.sesion.rol] = d.permisos;
          A.avisoSeguridad = !!d.avisoSeguridad;
          return d.sesion;
        } catch (e) {
          return null;
        }
      }
      const u = A.usuarios.find(
        (x) => x.usuario === String(usuario).trim().toLowerCase() && x.clave === clave
      );
      if (!u) return null;
      const s = { usuario: u.usuario, nombre: u.nombre, rol: u.rol, cargo: u.cargo, desde: new Date().toISOString() };
      store.set(K_SESION, s);
      A.bitacora.add("sesion-iniciada", `${u.nombre} (${u.cargo}) inició sesión`);
      return s;
    },

    salir() {
      const s = A.sesion.actual();
      if (s && !A.modoServidor) A.bitacora.add("sesion-cerrada", `${s.nombre} cerró sesión`);
      store.set(K_SESION, null);
      if (A.api) A.api.salir();
    },
    puede(modulo) {
      const s = A.sesion.actual();
      if (!s) return false;
      return (A.permisos[s.rol] || []).includes(modulo);
    },
  };

  /* ====================== Arranque ====================== */
  A.init = async function (page) {
    await A.cargarDatos();
    Orders.seed();
    A.renderChrome(page);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") A.closeCart();
    });
    A.autoRefrescar();
    return A.modoServidor;
  };

  /* Arranque para las páginas del panel (sin carrito ni cabecera pública) */
  A.initAdmin = async function () {
    await A.cargarDatos();
    Orders.seed();
    A.autoRefrescar();
    return A.modoServidor;
  };

  /* ==================== Auto-refresco ====================
     Cada 5 minutos recarga la página para traer datos frescos del
     servidor (precios, stock, estado de pedidos), en toda la tienda,
     el panel y el checkout. Se pausa solo si el usuario está
     escribiendo en un campo o hay un modal abierto en ese momento. */
  A.autoRefrescar = function () {
    const CINCO_MIN = 5 * 60 * 1000;
    setInterval(() => {
      const activo = document.activeElement;
      const escribiendo = activo && (activo.tagName === "INPUT" || activo.tagName === "TEXTAREA" || activo.tagName === "SELECT");
      const hayModalAbierto = document.querySelector(".modal-overlay, .modal.is-open, [aria-modal='true']");
      if (escribiendo || hayModalAbierto) return; // reintenta en el próximo ciclo
      location.reload();
    }, CINCO_MIN);
  };
})();
