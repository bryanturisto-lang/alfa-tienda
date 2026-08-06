-- =========================================================
-- Usuarios iniciales del panel de Alfa Importaciones STC.
-- Las claves están cifradas con bcrypt aquí mismo (crypt + gen_salt),
-- nunca quedan en texto plano en la base de datos.
-- =========================================================

create extension if not exists "pgcrypto";

insert into usuarios (usuario, clave_hash, nombre, rol, cargo) values
  ('admin',   crypt('AlfaSTC-Admin26!',   gen_salt('bf')), 'Administración',      'admin',   'Administrador'),
  ('ventas',  crypt('AlfaSTC-Ventas26!',  gen_salt('bf')), 'Equipo de Ventas',    'ventas',  'Coordinación de ventas'),
  ('almacen', crypt('AlfaSTC-Almacen26!', gen_salt('bf')), 'Equipo de Almacén',   'almacen', 'Jefe de almacén')
on conflict (usuario) do nothing;

-- Para agregar a alguien más después:
-- insert into usuarios (usuario, clave_hash, nombre, rol, cargo)
-- values ('nuevo_usuario', crypt('SuClaveSegura', gen_salt('bf')), 'Su Nombre', 'ventas', 'Su cargo');
