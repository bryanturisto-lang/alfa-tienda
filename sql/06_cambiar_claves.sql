-- =========================================================
-- Cambia la clave de TODOS los usuarios existentes a Alfa.2026
-- Corre esto en Supabase -> SQL Editor.
-- =========================================================

update usuarios
set clave_hash = crypt('Alfa.2026', gen_salt('bf'));

-- Verifica que se actualizaron todos:
select usuario, rol, nombre from usuarios;
