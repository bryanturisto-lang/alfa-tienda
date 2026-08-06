# Ecommerce Alfa — v2 (Supabase)

Reconstrucción del backend original (que se perdió) usando Supabase en vez de
Netlify Blobs. **El frontend (`public/`) es el mismo que ya tenías funcionando
en producción** — no se tocó nada del HTML/CSS/JS público ni del panel.

---

## 1. Crear las tablas en Supabase

Entra a tu proyecto → **SQL Editor** → New query, y corre en este orden:

1. `sql/01_esquema.sql` — crea las 5 tablas
2. `sql/02_funciones.sql` — función para descontar stock sin condiciones de carrera
3. `sql/03_usuarios_iniciales.sql` — **edita las claves de ejemplo antes de correrlo**, crea tu equipo real

## 2. Variables de entorno en Netlify

**Site configuration → Environment variables:**

| Variable | Valor |
|---|---|
| `ALFA_SUPABASE_URL` | La Project URL de Supabase (`https://kttgkhzniomxmpnflqmy.supabase.co`) |
| `ALFA_SUPABASE_SERVICE_KEY` | La **service_role key** (la secreta, nunca la anon) |
| `ALFA_SECRET` | Cadena aleatoria para firmar sesiones — genera con `openssl rand -base64 32` |

La **anon key** de Supabase no se usa en este proyecto: el backend habla con
Supabase solo con la service_role key, y el navegador nunca toca Supabase
directamente.

## 3. Instalar dependencias y probar en local

```bash
npm install
npm install -g netlify-cli
netlify dev
```

Abre `http://localhost:8888/api/salud` — debe responder `{"ok":true,...}`.

## 4. Primera carga de datos

Entra a `/admin`, inicia sesión con uno de los usuarios que creaste en el
paso 1. Como el catálogo está vacío, el panel va a sembrar los 10 modelos de
ejemplo automáticamente (vía `POST /api/semilla`). Desde **Inventario** puedes
editarlos, darlos de baja, o cargar tu catálogo real.

## 5. Publicar

Sube esta carpeta completa a un repositorio de GitHub (todo lo de adentro,
no la carpeta en sí) y conéctalo en Netlify: **Site configuration → Build &
deploy → Link site to Git**.

---

## Qué cambió respecto al proyecto original

- **Almacenamiento:** Netlify Blobs → Supabase (Postgres). Tablas reales en
  vez de un blob JSON por colección.
- **Usuarios:** ya no viven en una variable de entorno en texto plano — están
  en la tabla `usuarios` con la clave cifrada (bcrypt).
- **Descuento de stock:** ahora es una operación atómica en la base de datos
  (`descontar_stock`), no una resta en el navegador.
- **El frontend no cambió.** Sigue llamando exactamente las mismas rutas
  (`/api/publico`, `/api/pedido`, `/api/sesion`, `/api/coleccion/:nombre`,
  etc.), así que no hubo que tocar `app.js`, `admin.js` ni ningún `.html`.

## Limitación conocida (heredada del diseño original)

El panel sigue guardando catálogo y pedidos como **arreglo completo** cada vez
que algo cambia (por ejemplo, al cambiar el precio de un producto se reenvía
el catálogo entero). El backend nuevo lo recibe y hace `upsert` fila por fila
en vez de pisar un blob, lo cual ya es una mejora real — pero si en algún
momento dos personas del equipo editan pedidos distintos exactamente al mismo
tiempo, sigue existiendo una ventana pequeña de que gane el último guardado.
Resolverlo del todo requiere cambiar el panel para que cada acción (verificar
pago, cambiar estado, etc.) llame un endpoint específico para ese pedido en
vez de reenviar la lista completa — es un cambio de frontend que podemos
hacer después si el volumen de pedidos lo justifica.
