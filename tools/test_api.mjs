// =========================================================
// Pruebas de humo contra la API (requiere `netlify dev` corriendo
// en otra terminal, en http://localhost:8888).
// Cubre lo esencial: salud, catálogo público, login, y creación
// de pedido con validación de stock. No reemplaza las 318 pruebas
// del proyecto original (esas se perdieron junto con el código).
// =========================================================

const BASE = process.env.ALFA_TEST_BASE || "http://localhost:8888/api";
let fallos = 0;
let pruebas = 0;

async function esperar(nombre, cond) {
  pruebas++;
  if (!cond) {
    fallos++;
    console.error(`✗ ${nombre}`);
  } else {
    console.log(`✓ ${nombre}`);
  }
}

async function pedir(ruta, opciones = {}) {
  const r = await fetch(BASE + ruta, {
    method: opciones.metodo || "GET",
    headers: { "content-type": "application/json", ...(opciones.token ? { authorization: "Bearer " + opciones.token } : {}) },
    body: opciones.cuerpo ? JSON.stringify(opciones.cuerpo) : undefined,
  });
  let datos = null;
  try { datos = await r.json(); } catch {}
  return { status: r.status, datos };
}

async function main() {
  const salud = await pedir("/salud");
  await esperar("GET /salud responde ok:true", salud.datos && salud.datos.ok === true);

  const publico = await pedir("/publico");
  await esperar("GET /publico devuelve catálogo", Array.isArray(publico.datos?.catalogo));
  await esperar("GET /publico devuelve config", publico.datos?.config && typeof publico.datos.config === "object");

  const loginMalo = await pedir("/sesion", { metodo: "POST", cuerpo: { usuario: "no-existe", clave: "x" } });
  await esperar("Login con usuario inválido devuelve 401", loginMalo.status === 401);

  // Este login solo pasa si ya corriste sql/03_usuarios_iniciales.sql con
  // estas credenciales de ejemplo. Ajusta según tu configuración real.
  const usuarioPrueba = process.env.ALFA_TEST_USUARIO;
  const claveePrueba = process.env.ALFA_TEST_CLAVE;
  if (usuarioPrueba && claveePrueba) {
    const login = await pedir("/sesion", { metodo: "POST", cuerpo: { usuario: usuarioPrueba, clave: claveePrueba } });
    await esperar("Login válido devuelve token", login.status === 200 && !!login.datos?.token);

    if (login.datos?.token) {
      const estado = await pedir("/estado", { token: login.datos.token });
      await esperar("GET /estado con token válido responde 200", estado.status === 200);
    }
  } else {
    console.log("(saltando pruebas de login: define ALFA_TEST_USUARIO y ALFA_TEST_CLAVE para incluirlas)");
  }

  const pedidoSinStock = await pedir("/pedido", {
    metodo: "POST",
    cuerpo: {
      items: [{ id: "producto-que-no-existe", qty: 999999 }],
      cliente: {}, entrega: { modo: "tienda" }, pago: { metodo: "efectivo" }, totales: { total: 0 },
    },
  });
  await esperar("Pedido con producto inexistente/sin stock es rechazado", pedidoSinStock.status >= 400);

  console.log(`\n${pruebas - fallos}/${pruebas} pruebas pasaron.`);
  if (fallos > 0) process.exit(1);
}

main().catch((e) => {
  console.error("Error al correr las pruebas:", e.message);
  console.error("¿Tienes `netlify dev` corriendo en otra terminal?");
  process.exit(1);
});
