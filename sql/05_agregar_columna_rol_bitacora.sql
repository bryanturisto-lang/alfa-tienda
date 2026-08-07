-- =========================================================
-- Corrección: la tabla bitacora necesita una columna "rol"
-- (el panel la usa para mostrar quién hizo cada cambio).
-- Corre esto una sola vez en Supabase → SQL Editor.
-- =========================================================

alter table bitacora add column if not exists rol text;
