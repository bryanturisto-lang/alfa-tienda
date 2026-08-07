// =========================================================
// Ecommerce Alfa — API (Netlify Function)
// Atiende /api/* completo. Almacenamiento: Supabase (Postgres).
// Reemplaza la versión anterior basada en Netlify Blobs.
// =========================================================

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";

const SUPABASE_URL = process.env.ALFA_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.ALFA_SUPABASE_SERVICE_KEY;
const SECRETO = process.env.ALFA_SECRET;

const SECRETO_POR_DEFECTO = !SECRETO;
const secretoEfectivo = SECRETO || "alfa-secreto-de-desarrollo-no-usar-en-produccion";

let supabase = null;
function db() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  if (!supabase) supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  return supabase;
}

// --------------------- Evolution API (WhatsApp) ---------------------
const EVOLUTION_URL = (process.env.ALFA_EVOLUTION_URL || "").replace(/\/+$/, "");
const EVOLUTION_APIKEY = process.env.ALFA_EVOLUTION_APIKEY;
const EVOLUTION_INSTANCIA = process.env.ALFA_EVOLUTION_INSTANCIA;
const EVOLUTION_GRUPO_INTERNO = process.env.ALFA_EVOLUTION_GRUPO_INTERNO; // ej: 120363012345678901@g.us

function evolutionListo() {
  return !!(EVOLUTION_URL && EVOLUTION_APIKEY && EVOLUTION_INSTANCIA);
}

// Convierte un teléfono venezolano tipo "0412-1234567" o "+58 412-1234567"
// al formato que espera WhatsApp: 584121234567
function normalizarNumeroVE(numero) {
  if (!numero) return null;
  let d = String(numero).replace(/\D/g, "");
  if (d.startsWith("58") && d.length === 12) return d;
  if (d.startsWith("0") && d.length === 11) return "58" + d.slice(1);
  if (d.length === 10) return "58" + d;
  return d || null;
}

// Envía un mensaje de texto. Nunca lanza error hacia arriba: si Evolution
// no está configurado o falla, solo lo registra en la bitácora — un
// problema de WhatsApp jamás debe tumbar la creación/actualización de un pedido.
async function enviarWhatsApp(sb, numeroDestino, texto, refPedido) {
  if (!evolutionListo()) return;
  const numero = numeroDestino.includes("@g.us") ? numeroDestino : normalizarNumeroVE(numeroDestino);
  if (!numero) return;
  try {
    const controlador = new AbortController();
    const corte = setTimeout(() => controlador.abort(), 3000);
    const resp = await fetch(`${EVOLUTION_URL}/message/sendText/${encodeURIComponent(EVOLUTION_INSTANCIA)}`, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: EVOLUTION_APIKEY },
      body: JSON.stringify({ number: numero, text: texto }),
      signal: controlador.signal,
    });
    clearTimeout(corte);
    if (!resp.ok) {
      const detalle = await resp.text().catch(() => "");
      if (sb) await sb.from("bitacora").insert({ tipo: "whatsapp-error", mensaje: `Fallo al enviar a ${numero}: ${resp.status} ${detalle}`.slice(0, 500), referencia: refPedido || null });
    }
  } catch (e) {
    const motivo = e.name === "AbortError" ? "tiempo de espera agotado (5s)" : e.message;
    if (sb) await sb.from("bitacora").insert({ tipo: "whatsapp-error", mensaje: `Excepción al enviar a ${numero}: ${motivo}`.slice(0, 500), referencia: refPedido || null });
  }
}

async function notificarGrupoInterno(sb, texto, ref) {
  if (!EVOLUTION_GRUPO_INTERNO) return;
  await enviarWhatsApp(sb, EVOLUTION_GRUPO_INTERNO, texto, ref);
}

const PERMISOS = {
  admin: ["panel", "pedidos", "pagos", "inventario", "envios", "clientes", "reportes", "configuracion", "bitacora"],
  ventas: ["panel", "pedidos", "pagos", "clientes"],
  almacen: ["panel", "pedidos", "inventario", "envios"],
};

// --------------------- utilidades de respuesta ---------------------
function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store, must-revalidate" },
  });
}
function error(status, msg) {
  return json(status, { error: msg });
}

// --------------------- tokens firmados (HMAC-SHA256) ---------------------
function base64url(input) {
  return Buffer.from(input).toString("base64url");
}
function firmarToken(payload) {
  const cuerpo = base64url(JSON.stringify(payload));
  const firma = createHmac("sha256", secretoEfectivo).update(cuerpo).digest("base64url");
  return `${cuerpo}.${firma}`;
}
function verificarToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [cuerpo, firma] = token.split(".");
  const esperada = createHmac("sha256", secretoEfectivo).update(cuerpo).digest("base64url");
  const a = Buffer.from(firma);
  const b = Buffer.from(esperada);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(cuerpo, "base64url").toString());
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
function sesionDesdePeticion(req) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  return verificarToken(token);
}

// --------------------- mapeo fila <-> objeto del frontend ---------------------
function productoDesdeFila(f) {
  return {
    id: f.id,
    nombre: f.nombre,
    linea: f.linea,
    categoria: f.categoria,
    categoriaLabel: f.categoria_label,
    precio: Number(f.precio),
    precioAnterior: f.precio_anterior != null ? Number(f.precio_anterior) : undefined,
    rating: Number(f.rating),
    reviews: f.reviews,
    stock: f.stock,
    color: f.color,
    coloresDisponibles: f.colores_disponibles || [],
    etiquetas: f.etiquetas || [],
    resumen: f.resumen,
    descripcion: f.descripcion,
    destacados: f.destacados || [],
    specs: f.specs || {},
    imagenes: f.imagenes || [],
    opiniones: f.opiniones || [],
  };
}
function filaDesdeProducto(p) {
  return {
    id: p.id,
    nombre: p.nombre,
    linea: p.linea,
    categoria: p.categoria,
    categoria_label: p.categoriaLabel,
    precio: p.precio,
    precio_anterior: p.precioAnterior ?? null,
    rating: p.rating ?? 0,
    reviews: p.reviews ?? 0,
    stock: p.stock ?? 0,
    color: p.color,
    colores_disponibles: p.coloresDisponibles || [],
    etiquetas: p.etiquetas || [],
    resumen: p.resumen,
    descripcion: p.descripcion,
    destacados: p.destacados || [],
    specs: p.specs || {},
    imagenes: p.imagenes || [],
    opiniones: p.opiniones || [],
    activo: true,
    actualizado: new Date().toISOString(),
  };
}
function pedidoDesdeFila(f) {
  return {
    codigo: f.codigo,
    creado: f.creado,
    eta: f.eta,
    items: f.items || [],
    cliente: f.cliente || {},
    entrega: f.entrega || {},
    pago: f.pago || {},
    totales: f.totales || {},
    estadoIndex: f.estado_index,
    pagoEstado: f.pago_estado,
    cancelado: f.cancelado,
    notas: f.notas || [],
    historial: f.historial || [],
    guia: f.guia,
    courier: f.courier,
    repartidor: f.repartidor,
  };
}
function filaDesdePedido(o) {
  return {
    codigo: o.codigo,
    creado: o.creado,
    eta: o.eta,
    items: o.items || [],
    cliente: o.cliente || {},
    entrega: o.entrega || {},
    pago: o.pago || {},
    totales: o.totales || {},
    estado_index: o.estadoIndex ?? 0,
    pago_estado: o.pagoEstado || "reportado",
    cancelado: !!o.cancelado,
    notas: o.notas || [],
    historial: o.historial || [],
    guia: o.guia || null,
    courier: o.courier || null,
    repartidor: o.repartidor || null,
  };
}

// --------------------- carga de colecciones completas ---------------------
async function cargarCatalogo(sb) {
  const { data, error: err } = await sb.from("productos").select("*").eq("activo", true).order("nombre");
  if (err) throw err;
  return (data || []).map(productoDesdeFila);
}
async function cargarConfig(sb) {
  const { data, error: err } = await sb.from("configuracion").select("datos").eq("id", 1).maybeSingle();
  if (err) throw err;
  return data ? data.datos : null;
}
async function cargarPedidos(sb) {
  const { data, error: err } = await sb.from("pedidos").select("*").order("creado", { ascending: false });
  if (err) throw err;
  return (data || []).map(pedidoDesdeFila);
}
async function cargarBitacora(sb) {
  const { data, error: err } = await sb.from("bitacora").select("*").order("fecha", { ascending: false }).limit(500);
  if (err) throw err;
  return (data || []).map((f) => ({ id: f.id, fecha: f.fecha, usuario: f.usuario, rol: f.rol, accion: f.tipo, detalle: f.mensaje, ref: f.referencia }));
}

// --------------------- handler principal ---------------------
export default async (req, context) => {
  const url = new URL(req.url);
  // El redirect de netlify.toml manda /api/algo -> /.netlify/functions/api/algo
  const partes = url.pathname.replace(/^\/(\.netlify\/functions\/)?api\/?/, "").split("/").filter(Boolean);
  const ruta = "/" + partes.join("/");
  const metodo = req.method;

  const sb = db();

  // -------- /salud --------
  if (ruta === "/salud" && metodo === "GET") {
    if (!sb) {
      return json(200, {
        ok: false,
        almacenamiento: false,
        motivo: "Faltan ALFA_SUPABASE_URL o ALFA_SUPABASE_SERVICE_KEY en las variables de entorno.",
      });
    }
    try {
      const { error: err } = await sb.from("configuracion").select("id").limit(1);
      if (err) throw err;
      return json(200, {
        ok: true,
        secretoPorDefecto: SECRETO_POR_DEFECTO,
        evolutionConfigurado: evolutionListo(),
        evolutionUrl: EVOLUTION_URL || null,
        evolutionGrupoInternoConfigurado: !!EVOLUTION_GRUPO_INTERNO,
      });
    } catch (e) {
      return json(200, { ok: false, almacenamiento: false, motivo: e.message });
    }
  }

  if (!sb) return error(500, "Almacenamiento no configurado.");

  try {
    // -------- /publico --------
    if (ruta === "/publico" && metodo === "GET") {
      const [catalogo, config] = await Promise.all([cargarCatalogo(sb), cargarConfig(sb)]);
      return json(200, { catalogo, config: config || {} });
    }

    // -------- /sesion (login) --------
    if (ruta === "/sesion" && metodo === "POST") {
      const body = await req.json().catch(() => ({}));
      const usuario = String(body.usuario || "").trim().toLowerCase();
      const clave = String(body.clave || "");
      if (!usuario || !clave) return error(400, "Usuario y clave requeridos.");

      const { data: fila, error: err } = await sb.from("usuarios").select("*").eq("usuario", usuario).maybeSingle();
      if (err) throw err;
      if (!fila) return error(401, "Usuario o clave incorrectos.");

      const ok = await bcrypt.compare(clave, fila.clave_hash);
      if (!ok) return error(401, "Usuario o clave incorrectos.");

      const sesion = { usuario: fila.usuario, nombre: fila.nombre, rol: fila.rol, cargo: fila.cargo, desde: new Date().toISOString() };
      const token = firmarToken({ ...sesion, exp: Date.now() + 1000 * 60 * 60 * 12 }); // 12 horas

      const { count } = await sb.from("usuarios").select("id", { count: "exact", head: true });

      return json(200, {
        token,
        sesion,
        permisos: PERMISOS[fila.rol] || [],
        avisoSeguridad: SECRETO_POR_DEFECTO,
      });
    }

    // -------- /estado (requiere sesión) --------
    if (ruta === "/estado" && metodo === "GET") {
      const sesion = sesionDesdePeticion(req);
      if (!sesion) return error(401, "Sesión inválida o vencida.");
      const [catalogo, config, pedidos, bitacora] = await Promise.all([
        cargarCatalogo(sb), cargarConfig(sb), cargarPedidos(sb), cargarBitacora(sb),
      ]);
      return json(200, {
        catalogo, config: config || {}, pedidos, bitacora,
        sesion: { usuario: sesion.usuario, nombre: sesion.nombre, rol: sesion.rol, cargo: sesion.cargo, desde: sesion.desde },
        permisos: PERMISOS[sesion.rol] || [],
      });
    }

    // -------- /pedido (crear) --------
    if (ruta === "/pedido" && metodo === "POST") {
      const body = await req.json().catch(() => ({}));
      if (!Array.isArray(body.items) || !body.items.length) return error(400, "El pedido no tiene productos.");

      // El servidor no confía en el navegador: revalida stock antes de crear el pedido.
      const ids = body.items.map((it) => it.id);
      const { data: filas, error: err } = await sb.from("productos").select("id, stock, precio").in("id", ids);
      if (err) throw err;
      const stockPorId = new Map(filas.map((f) => [f.id, f.stock]));

      for (const it of body.items) {
        const disponible = stockPorId.get(it.id) ?? 0;
        if (it.qty > disponible) {
          return error(409, `No hay suficiente stock de "${it.id}" (disponible: ${disponible}).`);
        }
      }

      const codigo = body.codigo || generarCodigo();
      const { data: existe } = await sb.from("pedidos").select("codigo").eq("codigo", codigo).maybeSingle();
      if (existe) return error(409, "Ya existe un pedido con ese número.");

      const fila = filaDesdePedido({ ...body, codigo });
      const { error: errIns } = await sb.from("pedidos").insert(fila);
      if (errIns) throw errIns;

      // Descuenta el inventario de forma atómica.
      for (const it of body.items) {
        try {
          const { error: errRpc } = await sb.rpc("descontar_stock", { p_id: it.id, p_cantidad: it.qty });
          if (errRpc) throw errRpc;
        } catch (e) {
          // Fallback si el RPC no existe: resta directa (menos seguro ante concurrencia extrema).
          const disponible = stockPorId.get(it.id) ?? 0;
          await sb.from("productos").update({ stock: Math.max(0, disponible - it.qty) }).eq("id", it.id);
        }
      }

      await sb.from("bitacora").insert({
        tipo: "pedido-creado",
        mensaje: `Pedido ${codigo} por $${body.totales?.total ?? "?"}`,
        referencia: codigo,
        usuario: null,
        rol: null,
      });

      const totalTxt = `$${body.totales?.total ?? "?"}`;
      const telCliente = body.cliente?.telefono;
      const nombreCliente = body.cliente?.nombre || "";
      await Promise.all([
        telCliente
          ? enviarWhatsApp(sb, telCliente,
              `🟢 *Pedido recibido (Pago pendiente)*\n\n👋 ¡Hola${nombreCliente ? ", " + nombreCliente : ""}!\nGracias por comprar en Alfa. Hemos recibido tu pedido *${codigo}* por un total de ${totalTxt}.\n\nAhora nuestro equipo verificará el pago. Una vez confirmado, comenzaremos a preparar tu pedido y te notificaremos de inmediato.\n\nSi tienes alguna duda, responde a este mensaje. ¡Con gusto te ayudaremos! 💻`,
              codigo)
          : Promise.resolve(),
        notificarGrupoInterno(sb,
          `🛒 *Nuevo pedido* — ${codigo}\n👤 ${nombreCliente || "Cliente"}\n💵 ${totalTxt}\n🚚 ${body.entrega?.modo === "tienda" ? "Retiro en tienda" : "Delivery"}`,
          codigo),
      ]);

      return json(201, pedidoDesdeFila(fila));
    }

    // -------- /pedido/:codigo (seguimiento público) --------
    if (partes[0] === "pedido" && partes[1] && metodo === "GET") {
      const codigo = decodeURIComponent(partes[1]);
      const { data, error: err } = await sb.from("pedidos").select("*").eq("codigo", codigo).maybeSingle();
      if (err) throw err;
      if (!data) return error(404, "No encontramos ese número de pedido.");
      return json(200, pedidoDesdeFila(data));
    }

    // -------- /pedido/:codigo (eliminar) — solo administradores --------
    if (partes[0] === "pedido" && partes[1] && metodo === "DELETE") {
      const sesion = sesionDesdePeticion(req);
      if (!sesion) return error(401, "Sesión inválida o vencida.");
      if (sesion.rol !== "admin") return error(403, "Solo un administrador puede eliminar pedidos.");
      const codigo = decodeURIComponent(partes[1]);
      const { data: existente } = await sb.from("pedidos").select("codigo").eq("codigo", codigo).maybeSingle();
      if (!existente) return error(404, "No encontramos ese pedido.");
      const { error: err } = await sb.from("pedidos").delete().eq("codigo", codigo);
      if (err) throw err;
      await sb.from("bitacora").insert({
        tipo: "pedido-eliminado",
        mensaje: `${sesion.nombre} eliminó el pedido ${codigo}`,
        referencia: codigo,
        usuario: sesion.usuario,
        rol: sesion.rol,
      });
      return json(200, { ok: true });
    }

    // -------- /coleccion/:nombre (guarda desde el panel) --------
    if (partes[0] === "coleccion" && partes[1] && metodo === "PUT") {
      const sesion = sesionDesdePeticion(req);
      if (!sesion) return error(401, "Sesión inválida o vencida.");
      const nombre = partes[1];
      const permisosRol = PERMISOS[sesion.rol] || [];
      const body = await req.json().catch(() => null);
      if (body == null) return error(400, "Cuerpo inválido.");

      if (nombre === "catalogo") {
        if (!permisosRol.includes("inventario")) return error(403, "Tu rol no tiene permiso de inventario.");
        if (!Array.isArray(body)) return error(400, "Se esperaba un arreglo de productos.");

        const UMBRAL_STOCK_BAJO = 3;
        const ids = body.map((p) => p.id).filter(Boolean);
        const { data: previos } = await sb.from("productos").select("id, stock").in("id", ids);
        const stockAntes = new Map((previos || []).map((p) => [p.id, p.stock]));

        const filas = body.map(filaDesdeProducto);
        const { error: err } = await sb.from("productos").upsert(filas, { onConflict: "id" });
        if (err) throw err;

        for (const p of body) {
          const antes = stockAntes.get(p.id);
          if (antes === undefined || antes === p.stock) continue;
          if (p.stock === 0 && antes > 0) {
            await notificarGrupoInterno(sb, `🚫 *${p.nombre}* se quedó sin stock.`, p.id);
          } else if (p.stock > 0 && p.stock <= UMBRAL_STOCK_BAJO && antes > UMBRAL_STOCK_BAJO) {
            await notificarGrupoInterno(sb, `⚠️ Stock bajo de *${p.nombre}*: quedan ${p.stock} unidades.`, p.id);
          }
        }

        return json(200, { ok: true });
      }

      if (nombre === "config") {
        if (!permisosRol.includes("configuracion")) return error(403, "Tu rol no tiene permiso de configuración.");
        const { error: err } = await sb.from("configuracion").upsert({ id: 1, datos: body, actualizado: new Date().toISOString() });
        if (err) throw err;
        return json(200, { ok: true });
      }

      if (nombre === "pedidos") {
        if (!permisosRol.includes("pedidos")) return error(403, "Tu rol no tiene permiso de pedidos.");
        if (!Array.isArray(body)) return error(400, "Se esperaba un arreglo de pedidos.");

        // Traemos el estado ANTERIOR de estos pedidos para detectar qué cambió.
        const codigos = body.map((o) => o.codigo).filter(Boolean);
        const { data: previos } = await sb.from("pedidos").select("codigo, pago_estado, estado_index").in("codigo", codigos);
        const previoPorCodigo = new Map((previos || []).map((p) => [p.codigo, p]));

        const filas = body.map(filaDesdePedido);
        const { error: err } = await sb.from("pedidos").upsert(filas, { onConflict: "codigo" });
        if (err) throw err;

        // Notificaciones: comparamos antes vs. después de cada pedido.
        for (const o of body) {
          const antes = previoPorCodigo.get(o.codigo);
          if (!antes) continue; // pedido recién creado: ya se notificó en /pedido
          const tel = o.cliente?.telefono;
          const nombre = o.cliente?.nombre || "";
          const saludo = nombre ? `¡Hola ${nombre}!` : "¡Hola!";
          const enTienda = o.entrega?.modo === "tienda";

          if (antes.pago_estado !== "verificado" && o.pagoEstado === "verificado") {
            if (tel) await enviarWhatsApp(sb, tel,
              `✅ *Pago verificado*\n\n🎉 ¡Hola, ${nombre}!\n¡Buenas noticias! Hemos verificado correctamente el pago de tu pedido *${o.codigo}*.\n\nNuestro equipo ya comenzó a preparar tu pedido. Te mantendremos informado sobre cada etapa hasta su entrega.\n\nGracias por confiar en Alfa. 💙`,
              o.codigo);
          }
          if (antes.pago_estado !== "rechazado" && o.pagoEstado === "rechazado") {
            if (tel) await enviarWhatsApp(sb, tel,
              `🔴 *Pago no verificado*\n\n👋 ¡Hola, ${nombre}!\nIntentamos verificar el pago correspondiente a tu pedido *${o.codigo}*, pero por el momento no fue posible confirmarlo.\n\nNo te preocupes, podemos ayudarte a resolverlo. Solo responde a este mensaje y nuestro equipo revisará tu caso lo antes posible. 🤝`,
              o.codigo);
            await notificarGrupoInterno(sb, `⚠️ *Pago rechazado* — pedido ${o.codigo}\n👤 ${nombre || "Cliente"}`, o.codigo);
          }
          if (typeof o.estadoIndex === "number" && antes.estado_index !== o.estadoIndex && tel) {
            const etiquetas = enTienda
              ? { 3: `${saludo} 🚚 Tu equipo ya va en camino a la tienda que elegiste.`, 4: `${saludo} 📦 ¡Tu pedido ya está listo para retirar! Te esperamos.`, 5: `${saludo} ✅ Retiraste tu pedido, ¡que lo disfrutes! Gracias por comprar en Alfa 💙` }
              : { 3: `${saludo} 🚚 Despachamos tu pedido, ya va en camino hacia ti.`, 4: `${saludo} 📍 El repartidor tiene tu paquete y te lo entrega hoy.`, 5: `${saludo} ✅ Tu pedido fue entregado. ¡Gracias por confiar en Alfa! 💙` };
            const msg = etiquetas[o.estadoIndex];
            if (msg) await enviarWhatsApp(sb, tel, `${msg}\nPedido *${o.codigo}*.`, o.codigo);
          }
        }

        return json(200, { ok: true });
      }

      if (nombre === "bitacora") {
        // Append-only: solo insertamos entradas nuevas (las que el cliente creó localmente no tienen id todavía).
        if (!Array.isArray(body)) return error(400, "Se esperaba un arreglo.");
        const nuevas = body.filter((b) => !b.id).map((b) => ({
          tipo: b.accion, mensaje: b.detalle, referencia: b.ref || null, usuario: sesion.usuario, rol: sesion.rol, fecha: b.fecha || new Date().toISOString(),
        }));
        if (nuevas.length) {
          const { error: err } = await sb.from("bitacora").insert(nuevas);
          if (err) throw err;
        }
        return json(200, { ok: true });
      }

      return error(400, "Colección desconocida.");
    }

    // -------- /semilla (sembrar datos de ejemplo) --------
    if (ruta === "/semilla" && metodo === "POST") {
      const { count } = await sb.from("productos").select("id", { count: "exact", head: true });
      if (count && count > 0) return json(200, { ok: true, yaSembrado: true });

      const body = await req.json().catch(() => ({}));
      if (Array.isArray(body.catalogo) && body.catalogo.length) {
        await sb.from("productos").insert(body.catalogo.map(filaDesdeProducto));
      }
      if (body.config) {
        await sb.from("configuracion").upsert({ id: 1, datos: body.config });
      }
      if (Array.isArray(body.pedidos) && body.pedidos.length) {
        await sb.from("pedidos").insert(body.pedidos.map(filaDesdePedido));
      }
      return json(200, { ok: true });
    }

    // -------- /reiniciar --------
    if (ruta === "/reiniciar" && metodo === "POST") {
      const sesion = sesionDesdePeticion(req);
      if (!sesion || sesion.rol !== "admin") return error(403, "Solo un administrador puede reiniciar los datos.");
      await sb.from("pedidos").delete().neq("codigo", "");
      await sb.from("bitacora").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      return json(200, { ok: true });
    }

    return error(404, "Ruta no encontrada: " + ruta);
  } catch (e) {
    return error(500, e.message || "Error interno.");
  }
};

function generarCodigo() {
  const y = new Date().getFullYear();
  const n = String(Math.floor(1000 + Math.random() * 8999));
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const a = letras[Math.floor(Math.random() * letras.length)];
  const b = letras[Math.floor(Math.random() * letras.length)];
  return `ALF-${y}-${n}${a}${b}`;
}

export const config = {
  path: "/api/*",
};
