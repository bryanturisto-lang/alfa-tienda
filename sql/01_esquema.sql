-- =========================================================
-- Ecommerce Alfa — Esquema de base de datos para Supabase
-- Ejecutar completo en: Supabase → SQL Editor → New query → Run
-- =========================================================

-- Extensión para generar UUIDs
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- 1. usuarios (equipo con acceso al panel)
-- ---------------------------------------------------------
create table if not exists usuarios (
  id            uuid primary key default gen_random_uuid(),
  usuario       text unique not null,
  clave_hash    text not null,           -- bcrypt, nunca texto plano
  nombre        text not null,
  rol           text not null check (rol in ('admin', 'ventas', 'almacen')),
  cargo         text,
  creado        timestamptz not null default now()
);

-- ---------------------------------------------------------
-- 2. productos (catálogo de laptops)
-- ---------------------------------------------------------
create table if not exists productos (
  id                    text primary key,     -- ej. 'zenith-14'
  nombre                text not null,
  linea                 text,
  categoria             text,
  categoria_label       text,
  precio                numeric(10,2) not null,
  precio_anterior       numeric(10,2),
  rating                numeric(2,1) default 0,
  reviews               int default 0,
  stock                 int not null default 0,
  color                 text,
  colores_disponibles   jsonb default '[]',
  etiquetas             jsonb default '[]',
  resumen               text,
  descripcion           text,
  destacados            jsonb default '[]',
  specs                 jsonb default '{}',
  imagenes              jsonb default '[]',
  opiniones             jsonb default '[]',
  activo                boolean not null default true,   -- baja lógica en vez de borrar
  creado                timestamptz not null default now(),
  actualizado           timestamptz not null default now()
);

-- ---------------------------------------------------------
-- 3. pedidos
-- ---------------------------------------------------------
create table if not exists pedidos (
  codigo         text primary key,       -- ej. 'ALF-2026-4821XY'
  creado         timestamptz not null default now(),
  eta            timestamptz,
  items          jsonb not null default '[]',
  cliente        jsonb not null default '{}',
  entrega        jsonb not null default '{}',
  pago           jsonb not null default '{}',
  totales        jsonb not null default '{}',
  estado_index   int not null default 0,
  pago_estado    text not null default 'reportado',
  cancelado      boolean not null default false,
  notas          jsonb not null default '[]',
  historial      jsonb not null default '[]',
  guia           text,
  courier        text,
  repartidor     text
);

-- ---------------------------------------------------------
-- 4. configuracion (una sola fila con toda la config de la tienda)
-- ---------------------------------------------------------
create table if not exists configuracion (
  id             int primary key default 1,
  datos          jsonb not null default '{}',
  actualizado    timestamptz not null default now(),
  constraint solo_una_fila check (id = 1)
);

-- ---------------------------------------------------------
-- 5. bitacora (registro de actividad, solo se agrega, nunca se reescribe)
-- ---------------------------------------------------------
create table if not exists bitacora (
  id           bigint generated always as identity primary key,
  tipo         text not null,
  mensaje      text not null,
  referencia   text,
  usuario      text,
  fecha        timestamptz not null default now()
);

-- Índices útiles
create index if not exists idx_pedidos_creado on pedidos (creado desc);
create index if not exists idx_bitacora_fecha on bitacora (fecha desc);
create index if not exists idx_productos_activo on productos (activo);

-- ---------------------------------------------------------
-- Seguridad: Row Level Security
-- La función del backend usa la service_role key, que salta RLS
-- por diseño. Igual dejamos RLS activo en todas las tablas para
-- que nadie pueda leer/escribir directo con la anon key.
-- ---------------------------------------------------------
alter table usuarios       enable row level security;
alter table productos      enable row level security;
alter table pedidos        enable row level security;
alter table configuracion  enable row level security;
alter table bitacora       enable row level security;

-- Sin políticas = nadie entra con la anon key. Todo pasa por el
-- backend (netlify/functions/api.mjs), que usa la service_role key.
