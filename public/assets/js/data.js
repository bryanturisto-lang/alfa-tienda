/* =========================================================
   ALFA — Datos de la tienda
   Catálogo de prueba (10 modelos ficticios) + configuración
   ========================================================= */

window.ALFA = window.ALFA || {};

/* ---------------------------------------------------------
   Configuración general — edita aquí para adaptar la tienda
   --------------------------------------------------------- */
ALFA.config = {
  storeName: "Alfa",
  tagline: "Laptops que rinden",

  // Tasa de cambio referencial (Bs por 1 USD). Cámbiala cuando la actualices.
  bcvRate: 216.40,
  bcvUpdated: "02/08/2026",

  iva: 0.16,          // 16 % IVA
  freeShippingOver: 800,  // delivery gratis a partir de este monto en USD

  contact: {
    phone: "+58 414-685-5453",
    whatsapp: "584146855453",
    email: "hola@alfa.com.ve",
    rif: "J-50123456-7",
  },

  // Datos para pago móvil (los que ve el cliente al pagar)
  pagoMovil: {
    banco: "0102 — Banco de Venezuela",
    rif: "V-14.956.906",
    telefono: "0424-4152658",
    titular: "Ruben Antonio Bonilla Hernández",
  },

  transferencia: {
    banco: "0102 — Banco de Venezuela",
    cuenta: "0102-0692-89-0000124407",
    tipo: "Corriente",
    titular: "Ruben Antonio Bonilla Hernández",
    rif: "V-14.956.906",
  },

  zelle: { email: "basik.agencia@gmail.com", titular: "Carlos García" },

  binance: { id: "1112686561", alias: "Alfa Digital Store" },

  paypal: { titular: "Ruben Bonilla Hernandez", email: "ruben.b.1495@gmail.com", nota: "Recuerda que PayPal cobra una comisión aparte." },

  banescoPanama: { titular: "Yeremy Bonilla", banco: "Banesco Panamá", cuenta: "221022934666", tipo: "Cuenta corriente" },

  bancos: [
    "0102 — Banco de Venezuela", "0104 — Venezolano de Crédito",
    "0105 — Mercantil", "0108 — Provincial", "0114 — Bancaribe",
    "0115 — Exterior", "0128 — Banco Caroní", "0134 — Banesco",
    "0138 — Banco Plaza", "0151 — BFC Banco Fondo Común",
    "0156 — 100% Banco", "0163 — Banco del Tesoro",
    "0168 — Bancrecer", "0169 — Mi Banco", "0171 — Banco Activo",
    "0172 — Bancamiga", "0174 — Banplus", "0175 — Bicentenario",
    "0177 — Banfanb", "0191 — BNC Banco Nacional de Crédito",
  ],

  // Tiendas físicas para retiro
  tiendas: [
    {
      id: "naguanagua",
      nombre: "Alfa Digital Store — Naguanagua",
      direccion: "Av. Universidad, sector La Granja, CC Freemarket, piso 1, local T-38, municipio Naguanagua, estado Carabobo",
      horario: "Lun a Sáb · 9:00 a 18:00",
      telefono: "+58 414-685-5453 / +58 414-143-4892",
    },
  ],

  // Zonas de delivery: costo en USD y tiempo estimado (días hábiles)
  zonas: [
    { id: "ccs", nombre: "Caracas (Distrito Capital y Miranda)", costo: 8, dias: 1 },
    { id: "central", nombre: "Región Central (Aragua, Carabobo, Vargas)", costo: 14, dias: 2 },
    { id: "occidente", nombre: "Occidente (Zulia, Falcón, Lara, Trujillo)", costo: 19, dias: 3 },
    { id: "oriente", nombre: "Oriente (Anzoátegui, Sucre, Monagas, N. Esparta)", costo: 22, dias: 4 },
    { id: "andes", nombre: "Los Andes (Mérida, Táchira, Barinas)", costo: 21, dias: 4 },
    { id: "llanos", nombre: "Llanos y Guayana (Bolívar, Apure, Guárico, Amazonas)", costo: 26, dias: 5 },
  ],

  courier: ["Zoom", "MRW", "Domesa", "Tealca", "Delivery propio Alfa"],
};

/* ---------------------------------------------------------
   Catálogo — 10 modelos de prueba
   --------------------------------------------------------- */
ALFA.products = [
  {
    id: "zenith-14",
    nombre: "Alfa Zenith 14",
    linea: "Zenith",
    categoria: "ultrabook",
    categoriaLabel: "Ultrabook",
    precio: 849,
    precioAnterior: 949,
    rating: 4.8,
    reviews: 214,
    stock: 12,
    color: "Plata Lunar",
    coloresDisponibles: ["Plata Lunar", "Grafito"],
    etiquetas: ["Más vendido"],
    resumen:
      "Ultrabook de 14″ con chasis de aluminio unibody de 1,19 kg y pantalla OLED. Pensada para quien trabaja todo el día fuera del escritorio.",
    descripcion:
      "El Zenith 14 condensa lo esencial: un cuerpo de aluminio mecanizado de 15,9 mm, un panel OLED de 2.8K calibrado de fábrica y una batería que aguanta una jornada completa. El procesador Alfa Core A7 de 12 núcleos gestiona hojas de cálculo pesadas, decenas de pestañas y videollamadas sin que los ventiladores se hagan notar. Si tu día se reparte entre reuniones, café y aeropuertos, esta es la máquina.",
    destacados: [
      "Pantalla OLED 2.8K a 120 Hz con cobertura DCI-P3 del 100 %",
      "Solo 1,19 kg y 15,9 mm de grosor",
      "Hasta 16 horas de autonomía en uso mixto",
      "Carga rápida: 50 % en 30 minutos con el cargador de 65 W",
      "Teclado retroiluminado con recorrido de 1,4 mm y lector de huella",
    ],
    specs: {
      Procesador: "Alfa Core A7-1260P · 12 núcleos · hasta 4,7 GHz",
      Gráficos: "Alfa Iris Xe integrada",
      Memoria: "16 GB LPDDR5-6400 (soldada)",
      Almacenamiento: "512 GB SSD NVMe PCIe 4.0",
      Pantalla: '14" OLED 2880×1800 · 120 Hz · 400 nits',
      "Sistema operativo": "Windows 11 Home",
      Batería: "75 Wh · hasta 16 h",
      Peso: "1,19 kg",
      Puertos: "2× Thunderbolt 4, 1× USB-A 3.2, HDMI 2.1, jack 3,5 mm",
      Conectividad: "Wi-Fi 6E · Bluetooth 5.3",
      Cámara: "1080p con obturador físico",
      Garantía: "2 años Alfa Care",
    },
    imagenes: ["zenith-14-1.svg", "zenith-14-2.svg", "zenith-14-3.svg"],
    opiniones: [
      { autor: "María G.", estrellas: 5, fecha: "12 jul 2026", texto: "La uso a diario para diseño y edición ligera. La pantalla es lo mejor: los negros son negros de verdad. La batería me dura toda la jornada." },
      { autor: "Jorge R.", estrellas: 5, fecha: "28 jun 2026", texto: "Muy liviana, casi no la siento en el bolso. Llegó en dos días a Caracas y el empaque venía impecable." },
      { autor: "Andrea P.", estrellas: 4, fecha: "05 jun 2026", texto: "Excelente en todo, aunque me hubiera gustado poder ampliar la RAM. Igual con 16 GB voy más que sobrada." },
    ],
  },

  {
    id: "zenith-16-pro",
    nombre: "Alfa Zenith 16 Pro",
    linea: "Zenith",
    categoria: "ultrabook",
    categoriaLabel: "Ultrabook",
    precio: 1299,
    precioAnterior: 1449,
    rating: 4.9,
    reviews: 138,
    stock: 7,
    color: "Titanio",
    coloresDisponibles: ["Titanio", "Plata Lunar"],
    etiquetas: ["Nuevo"],
    resumen:
      "La hermana mayor del Zenith: 16″ mini-LED, 32 GB de RAM y 1 TB de SSD para quien necesita pantalla grande sin cargar un ladrillo.",
    descripcion:
      "El Zenith 16 Pro estira la fórmula del Zenith a una pantalla de 16 pulgadas mini-LED con 1000 nits de pico, ideal para trabajar con color en exteriores o con luz de ventana. Dentro lleva el Alfa Core A9 de 14 núcleos, 32 GB de RAM y un SSD de 1 TB, y aún así se queda en 1,68 kg. El sistema de refrigeración de doble cámara de vapor mantiene el rendimiento sostenido en exportaciones largas.",
    destacados: [
      "Panel mini-LED de 16″ con 1000 nits de brillo pico y HDR real",
      "32 GB de RAM y 1 TB de SSD de serie",
      "Refrigeración de doble cámara de vapor",
      "Lector de tarjetas SD UHS-II para flujos de foto y video",
      "Cuatro altavoces con Alfa Spatial Audio",
    ],
    specs: {
      Procesador: "Alfa Core A9-1370H · 14 núcleos · hasta 5,0 GHz",
      Gráficos: "Alfa Arc G7 · 8 GB GDDR6",
      Memoria: "32 GB LPDDR5X-7500",
      Almacenamiento: "1 TB SSD NVMe PCIe 4.0",
      Pantalla: '16" mini-LED 3200×2000 · 120 Hz · 1000 nits pico',
      "Sistema operativo": "Windows 11 Pro",
      Batería: "99,9 Wh · hasta 14 h",
      Peso: "1,68 kg",
      Puertos: "3× Thunderbolt 4, USB-A 3.2, HDMI 2.1, SD UHS-II, jack 3,5 mm",
      Conectividad: "Wi-Fi 7 · Bluetooth 5.4",
      Cámara: "1440p con IR para Windows Hello",
      Garantía: "3 años Alfa Care Pro",
    },
    imagenes: ["zenith-16-pro-1.svg", "zenith-16-pro-2.svg", "zenith-16-pro-3.svg"],
    opiniones: [
      { autor: "Camila V.", estrellas: 5, fecha: "20 jul 2026", texto: "La pantalla mini-LED es una barbaridad. Trabajo con fotografía y por fin veo el color como debe ser sin conectar un monitor externo." },
      { autor: "Luis A.", estrellas: 5, fecha: "01 jul 2026", texto: "Los 32 GB se notan. Corro máquinas virtuales y Docker sin que se ahogue." },
    ],
  },

  {
    id: "vortex-x15",
    nombre: "Alfa Vortex X15",
    linea: "Vortex",
    categoria: "gaming",
    categoriaLabel: "Gaming",
    precio: 1149,
    precioAnterior: 1299,
    rating: 4.7,
    reviews: 302,
    stock: 15,
    color: "Negro Eclipse",
    coloresDisponibles: ["Negro Eclipse"],
    etiquetas: ["Oferta"],
    resumen:
      "Gaming de 15,6″ a 165 Hz con GPU dedicada de 8 GB y teclado RGB por tecla. Rinde en 1080p ultra sin pedir permiso.",
    descripcion:
      "El Vortex X15 es el punto dulce entre precio y cuadros por segundo. Su GPU Alfa RTX-N7 de 8 GB mueve los títulos actuales en 1080p con ajustes altos por encima de los 100 fps, y la pantalla de 165 Hz con 3 ms de respuesta le saca provecho. El sistema de refrigeración lleva cinco tubos de calor y dos ventiladores de 84 aspas, con un modo Turbo accesible desde el teclado. Además la RAM y el almacenamiento son ampliables: dos ranuras SO-DIMM y dos M.2 libres.",
    destacados: [
      "Pantalla 15,6″ IPS 165 Hz · 3 ms · 100 % sRGB",
      "GPU Alfa RTX-N7 de 8 GB GDDR6 a 115 W",
      "Teclado RGB con iluminación por tecla y anti-ghosting de 6 teclas",
      "RAM y SSD ampliables: 2 ranuras SO-DIMM + 2 M.2",
      "Barra de luz frontal RGB sincronizable",
    ],
    specs: {
      Procesador: "Alfa Ryzon R7-7840HS · 8 núcleos · hasta 5,1 GHz",
      Gráficos: "Alfa RTX-N7 · 8 GB GDDR6 · 115 W TGP",
      Memoria: "16 GB DDR5-5600 (2× 8 GB, ampliable a 64 GB)",
      Almacenamiento: "1 TB SSD NVMe PCIe 4.0 (+1 ranura M.2 libre)",
      Pantalla: '15,6" IPS 1920×1080 · 165 Hz · 300 nits',
      "Sistema operativo": "Windows 11 Home",
      Batería: "90 Wh · hasta 6 h",
      Peso: "2,25 kg",
      Puertos: "USB-C 3.2 con DP, 3× USB-A 3.2, HDMI 2.1, RJ-45, jack 3,5 mm",
      Conectividad: "Wi-Fi 6E · Bluetooth 5.3 · Ethernet 2.5G",
      Cámara: "1080p a 60 fps",
      Garantía: "2 años Alfa Care",
    },
    imagenes: ["vortex-x15-1.svg", "vortex-x15-2.svg", "vortex-x15-3.svg"],
    opiniones: [
      { autor: "Diego M.", estrellas: 5, fecha: "18 jul 2026", texto: "Corro todo en alto a más de 120 fps. El modo Turbo suena, sí, pero con audífonos ni te enteras." },
      { autor: "Sofía L.", estrellas: 4, fecha: "30 jun 2026", texto: "Muy buena por el precio. Le subí la RAM a 32 GB yo mismo, se abre con cuatro tornillos." },
      { autor: "Rafael C.", estrellas: 5, fecha: "14 jun 2026", texto: "La compré con pago móvil y me la mandaron a Valencia en dos días. Todo transparente." },
    ],
  },

  {
    id: "vortex-x17-titan",
    nombre: "Alfa Vortex X17 Titan",
    linea: "Vortex",
    categoria: "gaming",
    categoriaLabel: "Gaming",
    precio: 1899,
    precioAnterior: null,
    rating: 4.9,
    reviews: 87,
    stock: 4,
    color: "Negro Titan",
    coloresDisponibles: ["Negro Titan"],
    etiquetas: ["Tope de gama"],
    resumen:
      "17,3″ QHD a 240 Hz, GPU de 16 GB y 32 GB de RAM. La estación de juego portátil más potente del catálogo.",
    descripcion:
      "El X17 Titan no hace concesiones. Pantalla de 17,3 pulgadas QHD a 240 Hz, GPU Alfa RTX-N9 de 16 GB funcionando a 175 W y un chasis con cámara de vapor de cobre que cubre CPU, GPU y VRM. El teclado es mecánico de perfil bajo con switches ópticos, y los cuatro altavoces con dos subwoofers hacen que no eches de menos los parlantes externos. Pesa 3,1 kg: esto es un escritorio que se guarda en un bolso, no un ultraligero.",
    destacados: [
      "Pantalla 17,3″ QHD 2560×1440 a 240 Hz · 100 % DCI-P3",
      "GPU Alfa RTX-N9 de 16 GB GDDR6X a 175 W",
      "Teclado mecánico óptico de perfil bajo con RGB por tecla",
      "Cámara de vapor de cobre y siete tubos de calor",
      "Sonido 2.2 con subwoofers dedicados",
    ],
    specs: {
      Procesador: "Alfa Core A9-13980HX · 24 núcleos · hasta 5,6 GHz",
      Gráficos: "Alfa RTX-N9 · 16 GB GDDR6X · 175 W TGP",
      Memoria: "32 GB DDR5-5600 (2× 16 GB, ampliable a 64 GB)",
      Almacenamiento: "2 TB SSD NVMe PCIe 4.0 en RAID 0",
      Pantalla: '17,3" IPS 2560×1440 · 240 Hz · 500 nits',
      "Sistema operativo": "Windows 11 Pro",
      Batería: "99,9 Wh · hasta 4 h",
      Peso: "3,10 kg",
      Puertos: "2× Thunderbolt 4, 3× USB-A 3.2, HDMI 2.1, RJ-45, SD, jack 3,5 mm",
      Conectividad: "Wi-Fi 7 · Bluetooth 5.4 · Ethernet 2.5G",
      Cámara: "1080p con IR",
      Garantía: "3 años Alfa Care Pro",
    },
    imagenes: ["vortex-x17-titan-1.svg", "vortex-x17-titan-2.svg", "vortex-x17-titan-3.svg"],
    opiniones: [
      { autor: "Ernesto B.", estrellas: 5, fecha: "22 jul 2026", texto: "Es una bestia. Edito video 4K y juego en QHD sin bajar de 144 fps. Eso sí: llévala siempre con el cargador." },
      { autor: "Patricia N.", estrellas: 5, fecha: "10 jul 2026", texto: "El teclado mecánico marca la diferencia. Vale cada dólar." },
    ],
  },

  {
    id: "nova-air-13",
    nombre: "Alfa Nova Air 13",
    linea: "Nova",
    categoria: "ultrabook",
    categoriaLabel: "Ultraligera",
    precio: 729,
    precioAnterior: 799,
    rating: 4.6,
    reviews: 176,
    stock: 20,
    color: "Arena",
    coloresDisponibles: ["Arena", "Plata Lunar"],
    etiquetas: ["Ultraligera"],
    resumen:
      "990 gramos de magnesio, 13,3″ y refrigeración pasiva: la más liviana del catálogo y completamente silenciosa.",
    descripcion:
      "La Nova Air 13 baja del kilo gracias a un chasis de aleación de magnesio y a un diseño sin ventiladores. Al no tener partes móviles, es absolutamente silenciosa y no acumula polvo. El procesador Alfa Core A5 de bajo consumo está pensado para navegación, ofimática, videollamadas y estudio, no para renderizar. Si tu prioridad es no sentir el peso del bolso y no oír nada, esta es la elección.",
    destacados: [
      "990 g y 13,9 mm — el modelo más liviano de Alfa",
      "Refrigeración pasiva: cero ventiladores, cero ruido",
      "Pantalla IPS 13,3″ 2K con relación 16:10",
      "Hasta 18 horas de autonomía",
      "Chasis de aleación de magnesio con certificación MIL-STD-810H",
    ],
    specs: {
      Procesador: "Alfa Core A5-1240U · 10 núcleos · hasta 4,4 GHz",
      Gráficos: "Alfa Iris Xe integrada",
      Memoria: "16 GB LPDDR5-5200 (soldada)",
      Almacenamiento: "512 GB SSD NVMe PCIe 4.0",
      Pantalla: '13,3" IPS 2560×1600 · 60 Hz · 400 nits',
      "Sistema operativo": "Windows 11 Home",
      Batería: "65 Wh · hasta 18 h",
      Peso: "0,99 kg",
      Puertos: "2× USB-C 3.2 (uno con DP), USB-A 3.2, jack 3,5 mm",
      Conectividad: "Wi-Fi 6E · Bluetooth 5.3",
      Cámara: "1080p con obturador físico",
      Garantía: "2 años Alfa Care",
    },
    imagenes: ["nova-air-13-1.svg", "nova-air-13-2.svg", "nova-air-13-3.svg"],
    opiniones: [
      { autor: "Gabriela T.", estrellas: 5, fecha: "16 jul 2026", texto: "Soy estudiante y la cargo todos los días. No pesa nada y no hace ruido en la biblioteca." },
      { autor: "Miguel S.", estrellas: 4, fecha: "02 jul 2026", texto: "Para ofimática es perfecta. No le pidan edición de video pesada porque no es para eso." },
    ],
  },

  {
    id: "flex-360",
    nombre: "Alfa Flex 360",
    linea: "Flex",
    categoria: "convertible",
    categoriaLabel: "Convertible 2 en 1",
    precio: 899,
    precioAnterior: 999,
    rating: 4.7,
    reviews: 121,
    stock: 9,
    color: "Azul Índigo",
    coloresDisponibles: ["Azul Índigo", "Grafito"],
    etiquetas: ["2 en 1"],
    resumen:
      "Bisagra de 360° con pantalla táctil y lápiz incluido. Laptop, tienda o tablet según lo que estés haciendo.",
    descripcion:
      "La Flex 360 gira completamente sobre su bisagra reforzada y se usa en cuatro modos: portátil, tienda, presentación y tablet. La pantalla táctil de 14 pulgadas responde a 4096 niveles de presión con el Alfa Pen incluido, que se guarda magnéticamente en el lateral y se carga solo. Es la máquina para quien toma notas a mano, dibuja bocetos o presenta de pie frente a un cliente.",
    destacados: [
      "Bisagra de 360° certificada para 30.000 aperturas",
      "Alfa Pen incluido: 4096 niveles de presión y carga magnética",
      "Pantalla táctil antirreflejo con Gorilla Glass",
      "Se convierte en tablet, tienda o pantalla de presentación",
      "Cámara con obturador y micrófonos con cancelación de ruido",
    ],
    specs: {
      Procesador: "Alfa Core A7-1355U · 10 núcleos · hasta 5,0 GHz",
      Gráficos: "Alfa Iris Xe integrada",
      Memoria: "16 GB LPDDR5-6000",
      Almacenamiento: "512 GB SSD NVMe PCIe 4.0",
      Pantalla: '14" IPS táctil 1920×1200 · 60 Hz · 400 nits',
      "Sistema operativo": "Windows 11 Home",
      Batería: "70 Wh · hasta 13 h",
      Peso: "1,42 kg",
      Puertos: "2× Thunderbolt 4, USB-A 3.2, HDMI 2.1, jack 3,5 mm",
      Conectividad: "Wi-Fi 6E · Bluetooth 5.3",
      Cámara: "1080p con obturador físico e IR",
      Garantía: "2 años Alfa Care",
    },
    imagenes: ["flex-360-1.svg", "flex-360-2.svg", "flex-360-3.svg"],
    opiniones: [
      { autor: "Valentina R.", estrellas: 5, fecha: "19 jul 2026", texto: "Estudio medicina y tomar notas a mano sobre los PDF me cambió la vida. El lápiz responde muy bien." },
      { autor: "Óscar D.", estrellas: 4, fecha: "27 jun 2026", texto: "Muy versátil. En modo tablet pesa un poco pero se aguanta." },
    ],
  },

  {
    id: "studio-pro-16",
    nombre: "Alfa Studio Pro 16",
    linea: "Studio",
    categoria: "creador",
    categoriaLabel: "Creadores",
    precio: 1649,
    precioAnterior: 1799,
    rating: 4.8,
    reviews: 94,
    stock: 6,
    color: "Grafito",
    coloresDisponibles: ["Grafito"],
    etiquetas: ["Color calibrado"],
    resumen:
      "Estación de trabajo de 16″ con panel calibrado Delta-E < 1, 32 GB de RAM y GPU certificada para software profesional.",
    descripcion:
      "El Studio Pro 16 sale de fábrica con un informe de calibración individual: cada unidad se mide y se ajusta a Delta-E menor que 1 en los espacios sRGB, DCI-P3 y AdobeRGB. Su GPU lleva controladores certificados para las suites de edición, modelado y CAD más usadas, y el chasis de aluminio incorpora un dial táctil programable a la izquierda del trackpad para ajustar parámetros sin soltar el ratón. Es la máquina para quien cobra por lo que produce en pantalla.",
    destacados: [
      "Panel 16″ 4K calibrado de fábrica · Delta-E < 1 · 100 % AdobeRGB",
      "Dial táctil programable para ajustes finos",
      "GPU con controladores certificados para software profesional",
      "32 GB de RAM ampliables a 96 GB",
      "Lector SD Express y dos Thunderbolt 4 para almacenamiento externo",
    ],
    specs: {
      Procesador: "Alfa Core A9-13800H · 14 núcleos · hasta 5,2 GHz",
      Gráficos: "Alfa Quadra Q6 · 12 GB GDDR6 (certificada ISV)",
      Memoria: "32 GB DDR5-5600 (ampliable a 96 GB)",
      Almacenamiento: "1 TB SSD NVMe PCIe 4.0 (+1 M.2 libre)",
      Pantalla: '16" IPS 3840×2400 · 60 Hz · 600 nits · Delta-E < 1',
      "Sistema operativo": "Windows 11 Pro",
      Batería: "90 Wh · hasta 10 h",
      Peso: "1,95 kg",
      Puertos: "2× Thunderbolt 4, 2× USB-A 3.2, HDMI 2.1, SD Express, jack 3,5 mm",
      Conectividad: "Wi-Fi 6E · Bluetooth 5.3",
      Cámara: "1080p con IR y obturador",
      Garantía: "3 años Alfa Care Pro con soporte prioritario",
    },
    imagenes: ["studio-pro-16-1.svg", "studio-pro-16-2.svg", "studio-pro-16-3.svg"],
    opiniones: [
      { autor: "Daniela F.", estrellas: 5, fecha: "21 jul 2026", texto: "El informe de calibración venía en la caja con el número de serie. Mis impresiones por fin coinciden con lo que veo." },
      { autor: "Tomás H.", estrellas: 5, fecha: "08 jul 2026", texto: "El dial parecía un truco de marketing y terminó siendo lo que más uso." },
    ],
  },

  {
    id: "core-15",
    nombre: "Alfa Core 15",
    linea: "Core",
    categoria: "hogar",
    categoriaLabel: "Uso diario",
    precio: 549,
    precioAnterior: 629,
    rating: 4.4,
    reviews: 389,
    stock: 28,
    color: "Gris Niebla",
    coloresDisponibles: ["Gris Niebla", "Negro Eclipse"],
    etiquetas: ["Mejor precio"],
    resumen:
      "15,6″ Full HD, 16 GB de RAM y 512 GB de SSD por menos de 600 dólares. La opción sensata para casa y oficina.",
    descripcion:
      "El Core 15 hace lo que la mayoría de la gente necesita: navegar con muchas pestañas, trabajar con documentos, ver series y hacer videollamadas, sin sorpresas. Trae 16 GB de RAM y 512 GB de SSD de serie —no 8 GB como suele pasar en este rango— y un teclado de tamaño completo con teclado numérico. La RAM llega a 32 GB y hay una ranura M.2 libre por si más adelante quieres crecer.",
    destacados: [
      "16 GB de RAM y 512 GB de SSD de serie",
      "Teclado completo con bloque numérico",
      "Ampliable: hasta 32 GB de RAM y una ranura M.2 libre",
      "Pantalla antirreflejo de 15,6″ Full HD",
      "Lector de huella integrado en el botón de encendido",
    ],
    specs: {
      Procesador: "Alfa Core A5-1335U · 10 núcleos · hasta 4,6 GHz",
      Gráficos: "Alfa UHD integrada",
      Memoria: "16 GB DDR4-3200 (ampliable a 32 GB)",
      Almacenamiento: "512 GB SSD NVMe PCIe 3.0 (+1 M.2 libre)",
      Pantalla: '15,6" IPS 1920×1080 · 60 Hz · 250 nits antirreflejo',
      "Sistema operativo": "Windows 11 Home",
      Batería: "54 Wh · hasta 9 h",
      Peso: "1,72 kg",
      Puertos: "USB-C 3.2, 2× USB-A 3.2, HDMI 1.4, RJ-45, lector SD, jack 3,5 mm",
      Conectividad: "Wi-Fi 6 · Bluetooth 5.2 · Ethernet",
      Cámara: "720p con obturador físico",
      Garantía: "1 año Alfa Care",
    },
    imagenes: ["core-15-1.svg", "core-15-2.svg", "core-15-3.svg"],
    opiniones: [
      { autor: "Rosa E.", estrellas: 5, fecha: "24 jul 2026", texto: "Se la compré a mi hijo para la universidad y va perfecta. Por el precio no consigues 16 GB en otro lado." },
      { autor: "Héctor J.", estrellas: 4, fecha: "11 jul 2026", texto: "Cumple. La pantalla podría tener más brillo, pero para trabajar en interiores está bien." },
      { autor: "Nathalie O.", estrellas: 4, fecha: "29 jun 2026", texto: "Retiré en la tienda del CCCT, me atendieron rapidísimo y me la configuraron ahí mismo." },
    ],
  },

  {
    id: "edge-14-business",
    nombre: "Alfa Edge 14 Business",
    linea: "Edge",
    categoria: "empresa",
    categoriaLabel: "Empresarial",
    precio: 979,
    precioAnterior: null,
    rating: 4.7,
    reviews: 66,
    stock: 11,
    color: "Azul Medianoche",
    coloresDisponibles: ["Azul Medianoche"],
    etiquetas: ["Certificada MIL-STD"],
    resumen:
      "Portátil corporativa con chip de seguridad, lector de huella, cámara IR y certificación militar de resistencia.",
    descripcion:
      "El Edge 14 Business está pensado para flotas corporativas: chip de seguridad TPM 2.0, cifrado por hardware del SSD, lector de huella, cámara IR con obturador y un bisel reforzado que supera doce pruebas MIL-STD-810H. Incluye herramientas de gestión remota para el departamento de sistemas y una batería reemplazable por el usuario. Alfa mantiene el suministro de este modelo y sus repuestos durante cinco años.",
    destacados: [
      "TPM 2.0, cifrado por hardware y arranque seguro",
      "Certificación MIL-STD-810H en 12 pruebas",
      "Cámara IR con obturador físico y lector de huella",
      "Batería y SSD reemplazables por el usuario",
      "Disponibilidad garantizada de repuestos por 5 años",
    ],
    specs: {
      Procesador: "Alfa Core A7-1345U vPro · 10 núcleos · hasta 5,0 GHz",
      Gráficos: "Alfa Iris Xe integrada",
      Memoria: "16 GB DDR5-5200 (ampliable a 64 GB)",
      Almacenamiento: "512 GB SSD NVMe con cifrado por hardware",
      Pantalla: '14" IPS 1920×1200 · 60 Hz · 400 nits antirreflejo',
      "Sistema operativo": "Windows 11 Pro",
      Batería: "57 Wh reemplazable · hasta 12 h",
      Peso: "1,35 kg",
      Puertos: "2× Thunderbolt 4, 2× USB-A 3.2, HDMI 2.1, RJ-45, ranura SIM, jack 3,5 mm",
      Conectividad: "Wi-Fi 6E · Bluetooth 5.3 · LTE opcional",
      Cámara: "1080p IR con obturador",
      Garantía: "3 años Alfa Care Business en sitio",
    },
    imagenes: ["edge-14-business-1.svg", "edge-14-business-2.svg", "edge-14-business-3.svg"],
    opiniones: [
      { autor: "Ricardo M.", estrellas: 5, fecha: "23 jul 2026", texto: "Compramos catorce equipos para la empresa. La gestión remota nos ahorró muchísimo tiempo de despliegue." },
      { autor: "Yolanda C.", estrellas: 4, fecha: "05 jul 2026", texto: "Sólida como pocas. Se me cayó de la mesa y ni se inmutó." },
    ],
  },

  {
    id: "spark-11",
    nombre: "Alfa Spark 11",
    linea: "Spark",
    categoria: "hogar",
    categoriaLabel: "Estudiantes",
    precio: 329,
    precioAnterior: 379,
    rating: 4.3,
    reviews: 452,
    stock: 34,
    color: "Azul Cielo",
    coloresDisponibles: ["Azul Cielo", "Gris Niebla"],
    etiquetas: ["Ideal estudiantes"],
    resumen:
      "Compacta de 11,6″, resistente a caídas y salpicaduras. La primera laptop de la casa o la de repuesto del bolso.",
    descripcion:
      "La Spark 11 está diseñada para sobrevivir a la vida escolar: bisagras reforzadas, teclado resistente a salpicaduras y un chasis que aguanta caídas de hasta 70 cm. Pesa 1,15 kg, arranca en segundos y su batería llega a las 14 horas, así que cubre un día completo de clases sin cargador. No es una máquina para editar video, pero para clases, tareas, navegación y videollamadas cumple con creces y a un precio difícil de discutir.",
    destacados: [
      "Resistente a caídas de 70 cm y a salpicaduras en el teclado",
      "1,15 kg — cabe en cualquier mochila escolar",
      "Hasta 14 horas de batería",
      "Arranque en menos de 10 segundos gracias al SSD",
      "Bisagras reforzadas probadas en 25.000 aperturas",
    ],
    specs: {
      Procesador: "Alfa Core A3-N200 · 4 núcleos · hasta 3,7 GHz",
      Gráficos: "Alfa UHD integrada",
      Memoria: "8 GB LPDDR5-4800 (soldada)",
      Almacenamiento: "256 GB SSD NVMe PCIe 3.0",
      Pantalla: '11,6" IPS 1366×768 · 60 Hz · 250 nits',
      "Sistema operativo": "Windows 11 Home en modo S",
      Batería: "42 Wh · hasta 14 h",
      Peso: "1,15 kg",
      Puertos: "USB-C 3.2, 2× USB-A 3.2, HDMI 1.4, lector microSD, jack 3,5 mm",
      Conectividad: "Wi-Fi 6 · Bluetooth 5.2",
      Cámara: "720p",
      Garantía: "1 año Alfa Care",
    },
    imagenes: ["spark-11-1.svg", "spark-11-2.svg", "spark-11-3.svg"],
    opiniones: [
      { autor: "Carmen L.", estrellas: 5, fecha: "26 jul 2026", texto: "Se la compramos a la niña para el liceo. Ya se le cayó dos veces y sigue como nueva." },
      { autor: "Pedro Z.", estrellas: 4, fecha: "13 jul 2026", texto: "Por el precio no hay queja. Para Word, Zoom y navegar va bien; no le pidas más." },
      { autor: "Isabel Q.", estrellas: 4, fecha: "30 jun 2026", texto: "La batería es real, me dura todo el día de clases." },
    ],
  },
];

/* Estados por los que pasa un pedido (usados en el seguimiento) */
ALFA.estados = [
  {
    id: "recibido",
    titulo: "Pedido recibido",
    icono: "receipt",
    texto: "Registramos tu pedido y te enviamos el resumen por correo.",
  },
  {
    id: "pago",
    titulo: "Pago verificado",
    icono: "shield",
    texto: "Confirmamos tu pago móvil contra el estado de cuenta del banco.",
  },
  {
    id: "preparando",
    titulo: "En preparación",
    icono: "box",
    texto: "Estamos revisando, configurando y empacando tu equipo en el almacén.",
  },
  {
    id: "enviado",
    titulo: "Despachado",
    icono: "truck",
    texto: "Tu pedido salió del almacén rumbo a la dirección de entrega.",
  },
  {
    id: "reparto",
    titulo: "En reparto",
    icono: "pin",
    texto: "El repartidor tiene tu paquete y lo entrega hoy.",
  },
  {
    id: "entregado",
    titulo: "Entregado",
    icono: "check",
    texto: "El equipo fue entregado y firmado por el destinatario.",
  },
];

/* Variante de estados cuando el cliente retira en tienda */
ALFA.estadosTienda = [
  { id: "recibido", titulo: "Pedido recibido", icono: "receipt", texto: "Registramos tu pedido y te enviamos el resumen por correo." },
  { id: "pago", titulo: "Pago verificado", icono: "shield", texto: "Confirmamos tu pago móvil contra el estado de cuenta del banco." },
  { id: "preparando", titulo: "En preparación", icono: "box", texto: "Estamos revisando y configurando tu equipo antes de entregarlo." },
  { id: "enviado", titulo: "En camino a la tienda", icono: "truck", texto: "Tu equipo va desde el almacén central a la tienda que elegiste." },
  { id: "reparto", titulo: "Listo para retirar", icono: "store", texto: "Puedes pasar a buscarlo con tu cédula y el número de pedido." },
  { id: "entregado", titulo: "Retirado", icono: "check", texto: "El equipo fue entregado en tienda. ¡Que lo disfrutes!" },
];
