/* =========================================================
   ALFA — Motor del panel administrativo
   Sesión, menú por rol, tablas, modales, gráficos y utilidades
   ========================================================= */

window.ADM = (function () {
  "use strict";

  const A = window.ALFA;
  const ADM = {};

  /* ==================== Menú ==================== */
  const MENU = [
    { grupo: "Operación" },
    { id: "panel", label: "Panel", icono: "chart", href: "index.html" },
    { id: "pedidos", label: "Pedidos", icono: "receipt", href: "pedidos.html", contador: () => A.orders.activos().filter((o) => o.estadoIndex < A.orders.pasosDe(o).length - 1).length },
    { id: "pagos", label: "Pagos por verificar", icono: "phone", href: "pagos.html", contador: () => A.orders.porVerificar().length },
    { id: "envios", label: "Envíos", icono: "truck", href: "envios.html", contador: () => A.orders.enCurso().length },
    { grupo: "Catálogo" },
    { id: "inventario", label: "Inventario", icono: "box", href: "inventario.html", contador: () => A.products.filter((p) => p.stock <= 3).length },
    { grupo: "Negocio" },
    { id: "clientes", label: "Clientes", icono: "user", href: "clientes.html" },
    { id: "reportes", label: "Reportes", icono: "sparkle", href: "reportes.html" },
    { grupo: "Sistema" },
    { id: "configuracion", label: "Configuración", icono: "settings", href: "configuracion.html" },
    { id: "bitacora", label: "Actividad", icono: "clock", href: "bitacora.html" },
  ];

  ADM.rolNombre = { admin: "Administrador", ventas: "Ventas", almacen: "Almacén" };

  /* ==================== Arranque de página ====================
     Devuelve false si no hay sesión o permiso: la página no debe seguir. */
  ADM.iniciar = async function (modulo, titulo, subtitulo) {
    A.basePath = "../";
    document.body.classList.add("adm-body");
    await A.initAdmin();

    const s = A.sesion.actual();
    if (!s) { ADM.pantallaLogin(); return false; }
    if (!A.sesion.puede(modulo)) { ADM.pantallaSinAcceso(modulo); return false; }

    ADM.armazon(modulo, titulo, subtitulo);
    return true;
  };

  /* ==================== Pantalla de acceso ==================== */
  ADM.pantallaLogin = function () {
    document.body.innerHTML = `
    <div class="login-bg">
      <div class="login-card">
        <a class="logo" href="../index.html">
          <span class="logo-mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 13 L47 47 L41 47 L32 26 L23 47 L17 47 Z" fill="#fff"/>
              <rect x="25" y="35" width="14" height="4.6" rx="2.3" fill="#fff"/>
            </svg>
          </span>
          <span class="logo-text">Alf<span>a</span></span>
        </a>
        <div class="center" style="margin-bottom:22px">
          <h1 style="font-size:1.3rem">Panel interno</h1>
          <p class="small muted" style="margin-top:5px">Acceso solo para el equipo de Alfa.</p>
        </div>

        <form id="formLogin" class="stack-16" novalidate>
          <div class="field">
            <label for="lgUsuario">Usuario</label>
            <input class="input" id="lgUsuario" autocomplete="username" placeholder="admin">
          </div>
          <div class="field">
            <label for="lgClave">Contraseña</label>
            <input class="input" id="lgClave" type="password" autocomplete="current-password" placeholder="••••••••">
          </div>
          <div id="lgError" class="notice notice-red hidden"></div>
          <button class="btn btn-primary btn-block btn-lg" type="submit">Entrar</button>
        </form>

        <div class="login-demo" id="lgBloqueDemos">
          <p class="tiny muted" style="margin-bottom:10px">Usuarios de demostración — haz clic para entrar:</p>
          <div id="lgDemos"></div>
        </div>

        <p class="tiny muted center" style="margin-top:14px" id="lgModo"></p>

        <p class="tiny muted center" style="margin-top:18px">
          <a href="../index.html" style="color:var(--brand)">← Volver a la tienda</a>
        </p>
      </div>
    </div>`;

    document.getElementById("lgDemos").innerHTML = A.usuarios
      .map(
        (u) => `<button type="button" data-u="${u.usuario}">
          <span class="avatar">${u.nombre.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
          <span><strong>${u.nombre} · ${u.cargo}</strong><span>${u.usuario} / ${u.clave}</span></span>
        </button>`
      )
      .join("");

    // Aviso del modo en el que está corriendo el panel
    const modo = document.getElementById("lgModo");
    if (A.modoServidor) {
      modo.innerHTML = "Conectado al servidor. Los datos son los mismos para todo el equipo.";
      if (A.avisoSeguridad) {
        modo.innerHTML +=
          '<br><span style="color:var(--amber-600);font-weight:700">Aún usa las claves de demostración: define ALFA_USUARIOS y ALFA_SECRET en Netlify.</span>';
      } else {
        // Con claves reales configuradas no tiene sentido mostrar las de ejemplo
        document.getElementById("lgBloqueDemos").remove();
      }
    } else {
      const d = (A.api && A.api.diagnostico) || {};
      modo.innerHTML = `
        <span style="color:var(--amber-600);font-weight:700">${A.escape(d.titulo || "Sin conexión con el servidor")}</span><br>
        <span>El panel trabaja con los datos de este navegador.</span>
        <button type="button" id="lgDetalle"
                style="display:block;margin:8px auto 0;color:var(--brand);text-decoration:underline;font-size:.72rem">
          Ver detalle
        </button>`;

      const boton = document.getElementById("lgDetalle");
      if (boton) boton.onclick = () => ADM.diagnostico();
    }

    const demos = document.getElementById("lgDemos");
    if (demos) {
      demos.addEventListener("click", (e) => {
        const b = e.target.closest("button[data-u]");
        if (!b) return;
        const u = A.usuarios.find((x) => x.usuario === b.dataset.u);
        document.getElementById("lgUsuario").value = u.usuario;
        document.getElementById("lgClave").value = u.clave;
        entrar(u.usuario, u.clave);
      });
    }

    document.getElementById("formLogin").addEventListener("submit", (e) => {
      e.preventDefault();
      entrar(document.getElementById("lgUsuario").value, document.getElementById("lgClave").value);
    });

    async function entrar(usuario, clave) {
      const err = document.getElementById("lgError");
      const boton = document.querySelector("#formLogin button[type=submit]");
      boton.disabled = true;
      boton.textContent = "Comprobando…";

      const s = await A.sesion.entrar(usuario, clave);

      if (!s) {
        boton.disabled = false;
        boton.textContent = "Entrar";
        err.classList.remove("hidden");
        err.innerHTML = A.icon("alert") + "<span>Usuario o contraseña incorrectos.</span>";
        return;
      }
      location.reload();
    }
  };

  ADM.pantallaSinAcceso = function (modulo) {
    const s = A.sesion.actual();
    document.body.innerHTML = `
      <div class="sin-acceso">
        ${A.icon("lock", "", 46)}
        <h1 style="font-size:1.3rem">Sin acceso a esta sección</h1>
        <p class="small muted" style="margin-top:8px">
          Tu perfil (<strong>${ADM.rolNombre[s.rol]}</strong>) no tiene permiso para ver
          <strong>${modulo}</strong>. Pídeselo a un administrador.
        </p>
        <div class="row" style="justify-content:center;gap:10px;margin-top:22px">
          <a class="btn btn-primary" href="index.html">Ir al panel</a>
          <button class="btn btn-ghost" type="button" onclick="ADM.salir()">Cambiar de usuario</button>
        </div>
      </div>`;
  };

  ADM.salir = function () {
    A.sesion.salir();
    location.href = "index.html";
  };

  /* ==================== Diagnóstico de conexión ==================== */
  ADM.diagnostico = function () {
    const d = (A.api && A.api.diagnostico) || {};
    const enLocal = d.causa === "local";

    ADM.modal({
      titulo: enLocal ? "Estás trabajando sin servidor" : "No hay conexión con el servidor",
      subtitulo: "Qué está pasando y cómo resolverlo",
      cuerpo: `
        <div class="notice ${enLocal ? "notice-blue" : "notice-amber"}" style="margin-bottom:18px">
          ${A.icon(enLocal ? "info" : "alert")}
          <span><strong>${A.escape(d.titulo || "Sin conexión")}</strong><br>${A.escape(d.detalle || "")}</span>
        </div>

        <h4 style="font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-muted);margin-bottom:8px">Qué hacer</h4>
        <p class="small" style="color:var(--ink-soft);margin-bottom:18px">${A.escape(d.ayuda || "")}</p>

        <h4 style="font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-muted);margin-bottom:8px">Mientras tanto</h4>
        <p class="small" style="color:var(--ink-soft);margin-bottom:18px">
          El panel y la tienda funcionan igual, pero con los datos guardados en <strong>este navegador</strong>.
          Los pedidos que haga un cliente no los verás aquí, y lo que cambies aquí no lo verá nadie más.
        </p>

        <details style="border:1px solid var(--line);border-radius:var(--radius-sm);padding:12px 14px">
          <summary style="cursor:pointer;font-size:.82rem;font-weight:600;color:var(--brand-deep)">Detalle técnico</summary>
          <dl class="dl" style="margin-top:12px">
            <div class="dl-row"><dt>Causa</dt><dd class="mono">${A.escape(d.causa || "—")}</dd></div>
            <div class="dl-row"><dt>Comprobación</dt><dd class="mono">${location.origin}/api/salud</dd></div>
          </dl>
          <p class="tiny muted" style="margin-top:10px">
            Abre esa dirección en una pestaña: si responde <span class="mono">{"ok":true}</span> el servidor está bien.
            Si da error, míralo en Netlify → Deploys → último deploy → Function logs.
          </p>
        </details>`,
      pie: `<button class="btn btn-ghost" type="button" onclick="ADM.cerrarModal()">Cerrar</button>
            <a class="btn btn-ghost" href="${location.origin}/api/salud" target="_blank" rel="noopener">Abrir /api/salud</a>
            <button class="btn btn-primary" type="button" id="admReintentar">${A.icon("refresh")} Reintentar conexión</button>`,
      alAbrir: (bg) => {
        bg.querySelector("#admReintentar").onclick = async function () {
          this.disabled = true;
          this.innerHTML = "Comprobando…";
          const ok = await A.api.reintentar();
          if (ok) {
            A.toast("¡Conectado! Recargando…", "checkCircle");
            setTimeout(() => location.reload(), 900);
          } else {
            ADM.cerrarModal();
            setTimeout(ADM.diagnostico, 300);
          }
        };
      },
    });
  };

  /* ==================== Armazón (menú + barra) ==================== */
  ADM.armazon = function (activo, titulo, subtitulo) {
    const s = A.sesion.actual();
    const permitidos = A.permisos[s.rol] || [];
    const iniciales = s.nombre.split(" ").map((x) => x[0]).slice(0, 2).join("");

    let nav = "";
    MENU.forEach((m) => {
      if (m.grupo) {
        const quedan = MENU.slice(MENU.indexOf(m) + 1);
        const hasta = quedan.findIndex((x) => x.grupo);
        const items = hasta === -1 ? quedan : quedan.slice(0, hasta);
        if (!items.some((i) => permitidos.includes(i.id))) return;
        nav += `<div class="adm-nav-group">${m.grupo}</div>`;
        return;
      }
      if (!permitidos.includes(m.id)) return;
      let n = 0;
      try { n = m.contador ? m.contador() : 0; } catch (e) { n = 0; }
      nav += `<a href="${m.href}"${m.id === activo ? ' class="is-active"' : ""}>
        ${A.icon(m.icono)}<span>${m.label}</span>${n > 0 ? `<span class="pill">${n}</span>` : ""}
      </a>`;
    });

    const shell = document.createElement("div");
    shell.className = "adm";
    shell.innerHTML = `
      <aside class="adm-side" id="admSide">
        <div class="adm-brand">
          <span class="logo-mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 13 L47 47 L41 47 L32 26 L23 47 L17 47 Z" fill="#fff"/>
              <rect x="25" y="35" width="14" height="4.6" rx="2.3" fill="#fff"/>
            </svg>
          </span>
          <span>
            <span class="logo-text">Alf<span>a</span></span>
            <small>Panel interno</small>
          </span>
        </div>
        <nav class="adm-nav">${nav}</nav>
        <div class="adm-side-foot">
          <div class="adm-user">
            <span class="avatar">${iniciales}</span>
            <span><strong>${A.escape(s.nombre)}</strong><span>${A.escape(s.cargo)}</span></span>
          </div>
          <div class="tiny" style="padding:0 4px 10px;color:rgba(255,255,255,.45)">
            ${A.modoServidor
              ? (A.avisoSeguridad
                  ? '<span style="color:#ffcf7a">● Servidor · falta configurar las claves</span>'
                  : '<span style="color:#7fe0a8">● Conectado al servidor</span>')
              : `<button type="button" onclick="ADM.diagnostico()" style="color:#ffcf7a;text-align:left;font-size:inherit">
                   ○ Sin servidor · ver por qué
                 </button>`}
          </div>
          <div class="row" style="gap:7px">
            <a class="btn btn-ghost btn-sm grow" href="../index.html" style="background:transparent;color:rgba(255,255,255,.75);border-color:rgba(255,255,255,.18)">Ver tienda</a>
            <button class="btn btn-ghost btn-sm" type="button" onclick="ADM.salir()" style="background:transparent;color:rgba(255,255,255,.75);border-color:rgba(255,255,255,.18)" aria-label="Salir">Salir</button>
          </div>
        </div>
      </aside>

      <div class="adm-backdrop" id="admBackdrop" onclick="ADM.menu(false)"></div>

      <div class="adm-main">
        <header class="adm-top">
          <button class="icon-btn adm-burger" type="button" onclick="ADM.menu(true)" aria-label="Menú">${A.icon("menu")}</button>
          <div>
            <h1>${titulo}</h1>
            ${subtitulo ? `<p>${subtitulo}</p>` : ""}
          </div>
          <div class="adm-top-actions" id="admAcciones"></div>
        </header>
        <main class="adm-content" id="admContenido"></main>
      </div>`;

    const cuerpo = document.getElementById("adm-page");
    document.body.insertBefore(shell, cuerpo);
    document.getElementById("admContenido").appendChild(cuerpo);
    cuerpo.classList.remove("hidden");
  };

  ADM.menu = function (abrir) {
    document.getElementById("admSide").classList.toggle("is-open", abrir);
    document.getElementById("admBackdrop").classList.toggle("is-open", abrir);
  };

  ADM.acciones = function (html) {
    const c = document.getElementById("admAcciones");
    if (c) c.innerHTML = html;
  };

  /* ==================== Modal ==================== */
  ADM.modal = function (opciones) {
    cerrarModal();
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.id = "admModal";
    bg.innerHTML = `
      <div class="modal ${opciones.ancho || ""}" role="dialog" aria-modal="true">
        <div class="modal-head">
          <div>
            <h3>${opciones.titulo}</h3>
            ${opciones.subtitulo ? `<p>${opciones.subtitulo}</p>` : ""}
          </div>
          <button class="icon-btn" type="button" onclick="ADM.cerrarModal()" aria-label="Cerrar">${A.icon("close")}</button>
        </div>
        <div class="modal-body">${opciones.cuerpo}</div>
        ${opciones.pie ? `<div class="modal-foot">${opciones.pie}</div>` : ""}
      </div>`;
    document.body.appendChild(bg);
    bg.addEventListener("click", (e) => { if (e.target === bg) cerrarModal(); });
    requestAnimationFrame(() => bg.classList.add("is-open"));
    if (opciones.alAbrir) opciones.alAbrir(bg);
    return bg;
  };

  function cerrarModal() {
    const m = document.getElementById("admModal");
    if (!m) return;
    m.classList.remove("is-open");
    setTimeout(() => m.remove(), 240);
  }
  ADM.cerrarModal = cerrarModal;

  ADM.confirmar = function (titulo, texto, alConfirmar, textoBoton, peligro) {
    ADM.modal({
      titulo,
      ancho: "angosto",
      cuerpo: `<p class="small" style="color:var(--ink-soft)">${texto}</p>`,
      pie: `<button class="btn btn-ghost" type="button" onclick="ADM.cerrarModal()">Cancelar</button>
            <button class="btn ${peligro ? "btn-dark" : "btn-primary"}" type="button" id="admConfirmarOk"
                    ${peligro ? 'style="background:var(--red-600)"' : ""}>${textoBoton || "Confirmar"}</button>`,
      alAbrir: (bg) => {
        bg.querySelector("#admConfirmarOk").onclick = () => { cerrarModal(); alConfirmar(); };
      },
    });
  };

  /* ==================== Panel de detalle ==================== */
  ADM.detalle = function (titulo, cuerpo, pie) {
    let d = document.getElementById("admDetalle");
    if (!d) {
      d = document.createElement("aside");
      d.className = "det";
      d.id = "admDetalle";
      document.body.appendChild(d);
      const bd = document.createElement("div");
      bd.className = "overlay";
      bd.id = "admDetalleBg";
      bd.onclick = ADM.cerrarDetalle;
      document.body.appendChild(bd);
    }
    d.innerHTML = `
      <div class="det-head">
        <div class="row-between">
          ${titulo}
          <button class="icon-btn" type="button" onclick="ADM.cerrarDetalle()" aria-label="Cerrar">${A.icon("close")}</button>
        </div>
      </div>
      <div class="det-body">${cuerpo}</div>
      ${pie ? `<div class="det-foot">${pie}</div>` : ""}`;
    requestAnimationFrame(() => {
      d.classList.add("is-open");
      document.getElementById("admDetalleBg").classList.add("is-open");
    });
    return d;
  };

  ADM.cerrarDetalle = function () {
    const d = document.getElementById("admDetalle");
    const bg = document.getElementById("admDetalleBg");
    if (d) d.classList.remove("is-open");
    if (bg) bg.classList.remove("is-open");
  };

  /* ==================== Utilidades de datos ==================== */
  ADM.estadoBadge = function (o) {
    if (o.cancelado) return '<span class="badge badge-red">Cancelado</span>';
    const pasos = A.orders.pasosDe(o);
    const p = pasos[o.estadoIndex];
    if (o.estadoIndex >= pasos.length - 1) return '<span class="badge badge-green">' + p.titulo + "</span>";
    if (o.estadoIndex === 0) return '<span class="badge badge-amber">' + p.titulo + "</span>";
    return '<span class="badge">' + p.titulo + "</span>";
  };

  ADM.pagoBadge = function (o) {
    return {
      verificado: '<span class="badge badge-green">Verificado</span>',
      reportado: '<span class="badge badge-amber">Por verificar</span>',
      rechazado: '<span class="badge badge-red">Rechazado</span>',
      "por-cobrar": '<span class="badge badge-gray">Por cobrar</span>',
    }[o.pagoEstado] || '<span class="badge badge-gray">—</span>';
  };

  ADM.metodoLabel = function (m) {
    return {
      "pago-movil": "Pago móvil",
      transferencia: "Transferencia",
      zelle: "Zelle",
      efectivo: "Efectivo en tienda",
    }[m] || m;
  };

  ADM.stockBadge = function (p) {
    if (p.stock === 0) return '<span class="badge badge-red">Agotado</span>';
    if (p.stock <= 3) return '<span class="badge badge-amber">Stock bajo</span>';
    if (p.stock <= 8) return '<span class="badge badge-gray">' + p.stock + " unid.</span>";
    return '<span class="badge badge-green">' + p.stock + " unid.</span>";
  };

  ADM.hace = function (iso) {
    const ms = Date.now() - new Date(iso).getTime();
    const min = Math.round(ms / 60000);
    if (min < 1) return "hace instantes";
    if (min < 60) return `hace ${min} min`;
    const h = Math.round(min / 60);
    if (h < 24) return `hace ${h} h`;
    const d = Math.round(h / 24);
    if (d < 30) return `hace ${d} ${d === 1 ? "día" : "días"}`;
    return A.fmtFecha(iso);
  };

  ADM.diaISO = (d) => new Date(d).toISOString().slice(0, 10);

  /** Ventas agrupadas por día en los últimos n días. */
  ADM.ventasPorDia = function (n) {
    const hoy = new Date();
    const dias = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(hoy.getTime() - i * 86400000);
      dias.push({ fecha: ADM.diaISO(d), etiqueta: d.toLocaleDateString("es-VE", { day: "2-digit", month: "short" }), total: 0, pedidos: 0 });
    }
    A.orders.activos().forEach((o) => {
      const k = ADM.diaISO(o.creado);
      const d = dias.find((x) => x.fecha === k);
      if (d) { d.total = A.round2(d.total + o.totales.total); d.pedidos++; }
    });
    return dias;
  };

  /** Unidades y monto vendido por modelo. */
  ADM.ventasPorModelo = function () {
    const mapa = {};
    A.orders.activos().forEach((o) =>
      o.items.forEach((it) => {
        if (!mapa[it.id]) mapa[it.id] = { id: it.id, nombre: it.nombre, unidades: 0, monto: 0 };
        mapa[it.id].unidades += it.qty;
        mapa[it.id].monto = A.round2(mapa[it.id].monto + it.precio * it.qty);
      })
    );
    return Object.values(mapa).sort((a, b) => b.monto - a.monto);
  };

  ADM.ventasPorMetodo = function () {
    const mapa = {};
    A.orders.activos().forEach((o) => {
      const k = o.pago.metodo;
      if (!mapa[k]) mapa[k] = { metodo: k, label: ADM.metodoLabel(k), pedidos: 0, monto: 0 };
      mapa[k].pedidos++;
      mapa[k].monto = A.round2(mapa[k].monto + o.totales.total);
    });
    return Object.values(mapa).sort((a, b) => b.monto - a.monto);
  };

  ADM.clientes = function () {
    const mapa = {};
    A.orders.all().forEach((o) => {
      const k = (o.cliente.email || o.cliente.cedula).toLowerCase();
      if (!mapa[k]) {
        mapa[k] = { clave: k, ...o.cliente, pedidos: 0, gastado: 0, cancelados: 0, ultimo: o.creado, primero: o.creado };
      }
      const c = mapa[k];
      if (o.cancelado) c.cancelados++;
      else { c.pedidos++; c.gastado = A.round2(c.gastado + o.totales.total); }
      if (new Date(o.creado) > new Date(c.ultimo)) c.ultimo = o.creado;
      if (new Date(o.creado) < new Date(c.primero)) c.primero = o.creado;
    });
    return Object.values(mapa).sort((a, b) => b.gastado - a.gastado);
  };

  /* ==================== Gráficos ==================== */
  ADM.graficoBarras = function (datos, formato) {
    const max = Math.max(...datos.map((d) => d.total), 1);
    return `<div class="chart">${datos
      .map(
        (d) => `<div class="chart-col">
          <div class="chart-bar" style="height:${Math.max(3, (d.total / max) * 165)}px">
            <span>${(formato || A.fmtUSD)(d.total)}</span>
          </div>
          <span class="chart-lbl">${d.etiqueta}</span>
        </div>`
      )
      .join("")}</div>`;
  };

  ADM.barrasH = function (filas) {
    const max = Math.max(...filas.map((f) => f.valor), 1);
    return `<div class="barra-h">${filas
      .map(
        (f) => `<div>
          <div class="barra-h-row">
            <span class="barra-h-lbl">${A.escape(f.etiqueta)}</span>
            <span class="barra-h-val">${f.texto}</span>
          </div>
          <div class="barra-h-track"><div class="barra-h-fill ${f.color || ""}" style="width:${(f.valor / max) * 100}%"></div></div>
        </div>`
      )
      .join("")}</div>`;
  };

  ADM.donut = function (partes) {
    const total = partes.reduce((s, p) => s + p.valor, 0) || 1;
    const colores = ["#1565d8", "#5b9bff", "#0f9d58", "#e8a33d", "#a98bff", "#d1384f"];
    let acumulado = 0;
    const r = 54, c = 2 * Math.PI * r;
    const arcos = partes
      .map((p, i) => {
        const largo = (p.valor / total) * c;
        const seg = `<circle cx="70" cy="70" r="${r}" fill="none" stroke="${colores[i % colores.length]}"
          stroke-width="22" stroke-dasharray="${largo} ${c - largo}"
          stroke-dashoffset="${-acumulado}" transform="rotate(-90 70 70)"/>`;
        acumulado += largo;
        return seg;
      })
      .join("");

    return `<div class="row" style="gap:26px;flex-wrap:wrap;align-items:center">
      <svg width="140" height="140" viewBox="0 0 140 140" style="flex-shrink:0">
        <circle cx="70" cy="70" r="${r}" fill="none" stroke="var(--gray-100)" stroke-width="22"/>
        ${arcos}
      </svg>
      <ul class="donut-leyenda grow">
        ${partes
          .map(
            (p, i) => `<li>
              <span class="donut-punto" style="background:${colores[i % colores.length]}"></span>
              <span class="grow">${A.escape(p.etiqueta)}</span>
              <strong style="color:var(--brand-deep)">${p.texto}</strong>
            </li>`
          )
          .join("")}
      </ul>
    </div>`;
  };

  /* ==================== Exportar CSV ==================== */
  ADM.exportarCSV = function (nombre, columnas, filas) {
    const esc = (v) => {
      const s = String(v == null ? "" : v).replace(/"/g, '""');
      return /[",;\n]/.test(s) ? `"${s}"` : s;
    };
    const csv =
      "﻿" +
      [columnas.map(esc).join(";")]
        .concat(filas.map((f) => f.map(esc).join(";")))
        .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre + "-" + ADM.diaISO(new Date()) + ".csv";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    A.toast("Archivo CSV descargado", "box");
  };

  /* ==================== Tabla vacía ==================== */
  ADM.vacio = function (icono, titulo, texto) {
    return `<div class="tabla-vacia">
      ${A.icon(icono, "", 40)}
      <h4 style="color:var(--brand-deep);margin-bottom:5px">${titulo}</h4>
      <p class="small">${texto}</p>
    </div>`;
  };

  return ADM;
})();
