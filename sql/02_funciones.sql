-- =========================================================
-- Función para descontar stock de forma atómica.
-- Se usa al crear un pedido, para que dos compras simultáneas
-- del mismo modelo nunca dejen el stock en negativo.
-- =========================================================

create or replace function descontar_stock(p_id text, p_cantidad int)
returns void
language plpgsql
as $$
begin
  update productos
  set stock = greatest(0, stock - p_cantidad),
      actualizado = now()
  where id = p_id;
end;
$$;
