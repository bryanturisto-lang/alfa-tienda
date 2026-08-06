/* =========================================================
   ALFA — Cliente de la API
   Habla con /api/* (funciones de Netlify). Si no hay servidor
   —por ejemplo al abrir los archivos con doble clic— avisa y la
   tienda sigue funcionando con los datos del propio navegador.
   ========================================================= */

window.ALFA = window.ALFA || {};

ALFA.api = (function () {
  "use strict";

  const BASE = "/api";
  const K_TOKEN = "alfa.token.v1";

  let disponible = null; // null = sin comprobar, true/false = resultado

  function token() {
    try { return localStorage.getItem(K_TOKEN) || null; } catch (e) { return null; }
  }
  function guardarToken(t) {
    try { t ? localStorage.setItem(K_TOKEN, t) : localStorage.removeItem(K_TOKEN); } catch (e) { /* sin almacenamiento */ }
  }

  async function pedir(ruta, opciones) {
    const o = opciones || {};
    const cab = { "content-type": "application/json" };
    const t = token();
    if (t) cab.authorization = "Bearer " + t;

    const respuesta = await fetch(BASE + ruta, {
      method: o.metodo || "GET",
      headers: cab,
      body: o.cuerpo === undefined ? undefined : JSON.stringify(o.cuerpo),
    });

    let datos = null;
    try { datos = await respuesta.json(); } catch (e) { datos = null; }

    if (!respuesta.ok) {
      const err = new Error((datos && datos.error) || "Error " + respuesta.status);
      err.estado = respuesta.status;
      err.datos = datos;
      throw err;
    }
    return datos;
  }

  return {
    get disponible() { return disponible === true; },
    get token() { return token(); },

    /** Motivo por el que no hay servidor, para poder explicárselo al usuario. */
    diagnostico: { causa: "sin-comprobar", titulo: "", detalle: "", ayuda: "" },

    /** Comprueba si hay backend. Devuelve true/false y no lanza nunca. */
    async comprobar() {
      if (disponible !== null) return disponible;
      const d = ALFA.api.diagnostico;

      if (typeof fetch !== "function" || location.protocol === "file:") {
        disponible = false;
        Object.assign(d, {
          causa: "local",
          titulo: "Abierto como archivo, sin servidor",
          detalle: "Estás viendo el sitio directamente desde tu computadora, no desde una dirección web.",
          ayuda: "Es normal: sirve para revisar el diseño. Para trabajar con datos compartidos, entra por la dirección de tu sitio publicado.",
        });
        return false;
      }

      let respuesta, datos;
      try {
        const controlador = new AbortController();
        const corte = setTimeout(() => controlador.abort(), 8000);
        respuesta = await fetch(BASE + "/salud", { signal: controlador.signal });
        clearTimeout(corte);
      } catch (e) {
        disponible = false;
        Object.assign(d, {
          causa: "sin-red",
          titulo: "No se pudo contactar al servidor",
          detalle: e.name === "AbortError" ? "La consulta tardó demasiado." : "La petición a /api/salud falló.",
          ayuda: "Revisa tu conexión a internet y vuelve a intentarlo.",
        });
        return false;
      }

      if (respuesta.status === 404) {
        disponible = false;
        Object.assign(d, {
          causa: "sin-funcion",
          titulo: "El servidor no está publicado",
          detalle: "La dirección /api/salud responde 404: la función no llegó al sitio.",
          ayuda: "Comprueba que la carpeta netlify/functions esté en el repositorio y que netlify.toml esté en la raíz.",
        });
        return false;
      }

      try {
        datos = await respuesta.json();
      } catch (e) {
        datos = null;
      }

      if (!datos) {
        disponible = false;
        Object.assign(d, {
          causa: "respuesta-rara",
          titulo: "El servidor respondió algo inesperado",
          detalle: "Código " + respuesta.status + " sin datos legibles.",
          ayuda: "Mira los registros de la función en Netlify: Deploys → último deploy → Function logs.",
        });
        return false;
      }

      if (datos.ok) {
        disponible = true;
        Object.assign(d, { causa: "ok", titulo: "Conectado al servidor", detalle: "", ayuda: "" });
        ALFA.avisoSeguridad = !!(datos.usuariosPorDefecto || datos.secretoPorDefecto);
        return true;
      }

      // El servidor responde pero el almacenamiento falla
      disponible = false;
      Object.assign(d, {
        causa: "sin-almacenamiento",
        titulo: "El servidor responde, pero no puede guardar datos",
        detalle: datos.motivo || datos.error || "Error desconocido en el almacenamiento.",
        ayuda: "Si subiste el sitio arrastrando la carpeta, vuelve a publicarlo desde GitHub: al arrastrar no se instalan las dependencias del servidor.",
      });
      return false;
    },

    /** Vuelve a comprobar desde cero (para el botón de reintentar). */
    async reintentar() {
      disponible = null;
      return ALFA.api.comprobar();
    },

    publico: () => pedir("/publico"),
    sembrar: (datos) => pedir("/semilla", { metodo: "POST", cuerpo: datos }),

    crearPedido: (orden) => pedir("/pedido", { metodo: "POST", cuerpo: orden }),
    buscarPedido: (codigo) => pedir("/pedido/" + encodeURIComponent(codigo)),
    eliminarPedido: (codigo) => pedir("/pedido/" + encodeURIComponent(codigo), { metodo: "DELETE" }),

    async entrar(usuario, clave) {
      const d = await pedir("/sesion", { metodo: "POST", cuerpo: { usuario, clave } });
      guardarToken(d.token);
      return d;
    },
    salir() { guardarToken(null); },

    estado: () => pedir("/estado"),
    guardar: (nombre, valor) => pedir("/coleccion/" + nombre, { metodo: "PUT", cuerpo: valor }),
    reiniciar: () => pedir("/reiniciar", { metodo: "POST" }),
  };
})();
