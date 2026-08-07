-- =========================================================
-- Actualiza de una sola vez los datos reales de pago, contacto
-- y tienda física en la configuración guardada en Supabase.
-- No toca zonas, tasa, IVA ni nada más que ya hayas ajustado.
-- Corre esto en Supabase → SQL Editor.
-- =========================================================

update configuracion
set datos = datos || jsonb_build_object(
  'contact', jsonb_build_object(
    'phone', '+58 414-685-5453',
    'whatsapp', '584146855453',
    'email', 'hola@alfa.com.ve',
    'rif', 'J-50123456-7'
  ),
  'pagoMovil', jsonb_build_object(
    'banco', '0102 — Banco de Venezuela',
    'rif', 'V-14.956.906',
    'telefono', '0424-4152658',
    'titular', 'Ruben Antonio Bonilla Hernández'
  ),
  'transferencia', jsonb_build_object(
    'banco', '0102 — Banco de Venezuela',
    'cuenta', '0102-0692-89-0000124407',
    'tipo', 'Corriente',
    'titular', 'Ruben Antonio Bonilla Hernández',
    'rif', 'V-14.956.906'
  ),
  'zelle', jsonb_build_object(
    'email', 'basik.agencia@gmail.com',
    'titular', 'Carlos García'
  ),
  'binance', jsonb_build_object(
    'id', '1112686561',
    'alias', 'Alfa Digital Store'
  ),
  'paypal', jsonb_build_object(
    'email', 'ruben.b.1495@gmail.com',
    'titular', 'Ruben Bonilla Hernandez',
    'nota', 'Recuerda que PayPal cobra una comisión aparte.'
  ),
  'banescoPanama', jsonb_build_object(
    'banco', 'Banesco Panamá',
    'cuenta', '221022934666',
    'tipo', 'Cuenta corriente',
    'titular', 'Yeremy Bonilla'
  ),
  'tiendas', jsonb_build_array(
    jsonb_build_object(
      'id', 'naguanagua',
      'nombre', 'Alfa Digital Store — Naguanagua',
      'direccion', 'Av. Universidad, sector La Granja, CC Freemarket, piso 1, local T-38, municipio Naguanagua, estado Carabobo',
      'horario', 'Lun a Sáb · 9:00 a 18:00',
      'telefono', '+58 414-685-5453 / +58 414-143-4892'
    )
  )
)
where id = 1;

-- Verifica que quedó bien:
select datos->'pagoMovil' as pago_movil, datos->'binance' as binance, datos->'tiendas' as tiendas
from configuracion where id = 1;
