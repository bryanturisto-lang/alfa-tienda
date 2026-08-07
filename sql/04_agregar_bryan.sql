-- =========================================================
-- Agrega a Bryan como usuario admin del panel.
-- =========================================================

insert into usuarios (usuario, clave_hash, nombre, rol, cargo) values
  ('bryan', crypt('AlfaSTC-Bryan26!', gen_salt('bf')), 'Bryan', 'admin', 'Administrador')
on conflict (usuario) do nothing;
