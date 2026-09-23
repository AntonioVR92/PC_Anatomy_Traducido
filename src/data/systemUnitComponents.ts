// Data describing the parts of a system unit (the computer case with everything inside)
// that can be explored in 3D. Each part is a clickable hotspot on the model.

// Describes one system unit part: which 3D mesh it belongs to, where it is, and the text about it.
export type SystemUnitPart = {
  id: string;
  number: number;
  name: string;
  meshName?: string;
  nodes: number[];
  offset?: [number, number, number];
  view?: [number, number, number];
  title: string;
  description: string;
  function: string;
  importance: string;
  facts: string[];
};

// The system unit part type is the same as the general part type (kept as a named alias for clarity).
export type SystemUnitComponent = SystemUnitPart;

// The full list of system unit parts, each with its own learning text.
export const SYSTEM_UNIT_PARTS: SystemUnitPart[] = [
  {
    id: "case",
    number: 1,
    name: "Caja y chasis",
    meshName: "Case",
    nodes: [1391],
    offset: [0, 1.6, 0.3],
    view: [0.5, 0.4, 1.0],
    title: "Caja y chasis",
    description:
      "La caja es el esqueleto estructural de la unidad del sistema. Ancla cada componente, dirige el flujo de aire desde la entrada hasta la salida, oculta los cables y protege las piezas del polvo, la electricidad estática y los golpes — con paneles de cristal templado para enseñarlo todo.",
    function:
      "Monta la placa base, la GPU, la PSU, las unidades y los ventiladores, mientras dirige el flujo de aire y canaliza los cables para un montaje fresco y ordenado.",
    importance:
      "El chasis decide qué cabe: el tamaño de la placa base, la longitud de la GPU, la altura del disipador y la cantidad de ventiladores dependen de la caja que elijas.",
    facts: [
      "Los paneles laterales de cristal templado dejan ver el interior, pero añaden peso y fragilidad.",
      "Las cajas con frontal de malla alimentan mejor a los ventiladores que las de cristal sellado, mejorando las temperaturas.",
      "Los canales de gestión de cables detrás de la bandeja de la placa base mantienen el flujo de aire libre de obstáculos.",
    ],
  },
  {
    id: "motherboard",
    number: 2,
    name: "Placa base",
    meshName: "MotherBoard",
    nodes: [4],
    view: [0.25, 0.05, 0.97],
    title: "Placa base",
    description:
      "La placa base es la placa de circuito impreso principal que une física y eléctricamente todo el sistema. La alimentación, los datos y las señales de control viajan por sus pistas entre la CPU, la RAM, la GPU, el almacenamiento y cada conector y puerto.",
    function:
      "Distribuye la energía de la PSU, enruta los datos entre componentes y aloja la CPU, la memoria, las ranuras de expansión y la E/S.",
    importance:
      "Cada pieza se enchufa a la placa: su zócalo, chipset y disposición definen qué componentes puede usar tu sistema.",
    facts: [
      "La placa se monta sobre separadores de latón para que nunca haga cortocircuito contra la caja.",
      "El conector de alimentación ATX de 24 pines alimenta toda la placa desde la PSU.",
      "Los headers del panel frontal llevan el botón de encendido, los LEDs y el USB al frente de la caja.",
    ],
  },
  {
    id: "cpu",
    number: 3,
    name: "CPU y bloque de agua",
    meshName: "CPU",
    nodes: [1327, 2123],
    view: [0, 1, 0.35],
    title: "CPU y bloque de agua",
    description:
      "La CPU es el cerebro de silicio del sistema: ejecuta miles de millones de instrucciones por segundo. Aquí está cubierta por un bloque de refrigeración líquida — una placa de cobre y un laberinto de microcanales que extrae el calor del die del procesador y lo lleva al circuito de refrigeración.",
    function:
      "Ejecuta todas las instrucciones de los programas y coordina el sistema, mientras el bloque de agua conduce su calor al circuito de refrigeración líquida.",
    importance:
      "Sin una refrigeración eficiente, la CPU reduce su frecuencia o se apaga: el bloque de agua es lo que le permite sostener relojes de boost a pleno rendimiento bajo carga.",
    facts: [
      "Los bloques de agua transfieren el calor mucho más eficientemente que los disipadores de aire, permitiendo montajes más silenciosos.",
      "La pasta térmica rellena los huecos microscópicos entre la tapa de la CPU y la placa fría del bloque.",
      "Una sola CPU puede consumir más de 200 W — suficiente para calentar una habitación pequeña bajo carga sostenida.",
    ],
  },
  {
    id: "ram",
    number: 4,
    name: "Módulos de RAM",
    meshName: "RAM",
    nodes: [1975, 1962, 1949, 1936],
    view: [0.7, 0.7, 0.35],
    title: "Módulos de RAM",
    description:
      "La RAM es la memoria de trabajo de alta velocidad del sistema. Estos cuatro módulos guardan los datos e instrucciones que la CPU está usando en ese momento, priorizando tiempos de acceso de nanosegundos que mantienen todo fluido.",
    function:
      "Almacena programas y datos activos para acceso instantáneo de la CPU, actuando como zona intermedia rápida entre la CPU y el almacenamiento.",
    importance:
      "La capacidad y la velocidad marcan cuántas tareas puedes manejar a la vez: poca RAM obliga al sistema a volcar trabajo a un almacenamiento más lento.",
    facts: [
      "Poblar ranuras alternas activa el modo dual-channel para mayor ancho de banda.",
      "Cada módulo aquí lleva un disipador — y en este montaje, iluminación RGB.",
      "La RAM es volátil: todo lo que contiene desaparece en el instante en que se corta la corriente.",
    ],
  },
  {
    id: "m2-ssd",
    number: 5,
    name: "SSD M.2",
    meshName: "M2",
    nodes: [1332],
    view: [0.25, 0.15, 0.95],
    title: "SSD M.2",
    description:
      "El SSD M.2 es una unidad NVMe delgada, del tamaño de un chicle, montada directamente en la placa base. Se conecta por líneas PCIe, saltándose el cuello de botella de SATA para alcanzar velocidades de varios gigabytes por segundo — la razón por la que los PCs modernos arrancan en segundos.",
    function:
      "Aloja el sistema operativo y los archivos más usados en memoria flash conectada directamente a la CPU o al chipset por PCIe.",
    importance:
      "Como el nivel de almacenamiento más rápido del sistema, define lo ágil que se siente el arranque, la apertura de apps y el acceso a archivos.",
    facts: [
      "Los mejores SSD M.2 NVMe leen a más de 7 GB/s — lo bastante rápido como para copiar una película en menos de un segundo.",
      "La unidad se atornilla directamente a la bandeja de la placa base, sin necesidad de cables.",
      "Los SSD M.2 calientes pueden reducir su velocidad, por eso algunos van bajo disipadores dedicados.",
    ],
  },
  {
    id: "ssd",
    number: 6,
    name: "SSD SATA",
    meshName: "SSD",
    nodes: [1988],
    view: [0.35, 0.55, 0.95],
    title: "SSD SATA",
    description:
      "Este disco de estado sólido de 2,5 pulgadas guarda datos en chips flash, no en platos giratorios. Montado en una bahía, ofrece almacenamiento silencioso y resistente a golpes que sigue superando por mucho a cualquier disco duro mecánico.",
    function:
      "Conserva programas, juegos y archivos en memoria flash, ofreciendo acceso aleatorio rápido sin piezas móviles.",
    importance:
      "Es el compañero ideal: silencioso, duradero y lo bastante rápido para juegos y multimedia que no necesitan velocidades M.2.",
    facts: [
      "Un SSD SATA de 2,5 pulgadas alcanza como máximo unos 550 MB/s, aún unas diez veces más rápido que un HDD.",
      "Sin piezas móviles, los SSD sobreviven caídas y vibraciones que destruirían un disco mecánico.",
      "La unidad se atornilla a una bandeja y se conecta con un cable de datos SATA fino y un cable de alimentación.",
    ],
  },
  {
    id: "gpu",
    number: 7,
    name: "Tarjeta gráfica",
    meshName: "RTX2080ti",
    nodes: [1532, 1537, 1849, 1878],
    view: [0.5, 0.35, 1.0],
    title: "Tarjeta gráfica",
    description:
      "La tarjeta gráfica es un procesador masivamente paralelo que renderiza cada fotograma que ves. Esta GPU de clase RTX usa miles de núcleos para dibujar escenas 3D, mientras su disipador de triple ventilador y sus heat pipes de cobre mantienen el silicio fresco bajo carga.",
    function:
      "Renderiza gráficos para la pantalla y descarga cálculo paralelo para IA, vídeo y cargas científicas.",
    importance:
      "Es la palanca de rendimiento más grande para juegos y trabajo creativo — y el componente más grande y pesado de la caja.",
    facts: [
      "Las GPUs modernas agrupan más de 16.000 núcleos y consumen más energía que el resto del PC junto.",
      "Los ventiladores de la GPU se mantienen apagados hasta que la tarjeta se calienta, manteniendo el sistema silencioso en reposo.",
      "Muchas tarjetas admiten RGB y dual BIOS para modos silencioso y de rendimiento.",
    ],
  },
  {
    id: "radiator",
    number: 8,
    name: "Radiador de refrigeración líquida",
    meshName: "Radiator",
    nodes: [1913, 1990, 2018, 2046],
    view: [0, 0.85, 0.6],
    title: "Radiador de refrigeración líquida",
    description:
      "El radiador es donde el circuito de refrigeración líquida libera su calor. El refrigerante caliente fluye por docenas de aletas metálicas finas mientras los ventiladores empujan aire a través de ellas, expulsando el calor de la CPU y la GPU hacia la caja y fuera del sistema.",
    function:
      "Disipa el calor que lleva el refrigerante al aire, transfiriéndolo del circuito de agua a la habitación.",
    importance:
      "El tamaño del radiador y la configuración de ventiladores determinan cuánto calor puede expulsar el circuito — y lo silencioso que se mantiene el montaje.",
    facts: [
      "Los radiadores más gruesos, con más aletas, expulsan más calor pero necesitan ventiladores más potentes.",
      "El radiador se monta en la parte superior o frontal de la caja, a menudo detrás del cristal.",
      "Las configuraciones push-pull (ventiladores a ambos lados) aumentan el flujo de aire a costa de más tornillos.",
    ],
  },
  {
    id: "pump",
    number: 9,
    name: "Bomba y depósito",
    meshName: "Res_Pump",
    nodes: [2138, 2148, 2171],
    view: [-0.35, 0.3, 1.0],
    title: "Bomba y depósito",
    description:
      "La bomba es el corazón del circuito de refrigeración líquida. Impulsa el refrigerante por el bloque de agua, los tubos y el radiador, mientras el depósito integrado guarda líquido de reserva, expulsa el aire del sistema y facilita el mantenimiento.",
    function:
      "Circula el refrigerante de forma continua por el circuito y almacena líquido extra, eliminando las burbujas de aire atrapadas.",
    importance:
      "Si la bomba se detiene, el circuito pierde circulación y la CPU se calienta en segundos: debe funcionar de forma fiable en todo momento.",
    facts: [
      "Las bombas de refrigeración líquida usan motores sin escobillas que pueden funcionar durante años sin desgaste.",
      "El depósito permite ver el nivel de refrigerante y ayuda a purgar las burbujas de aire tras el llenado.",
      "La velocidad de la bomba suele vincularse a la temperatura de la CPU para un funcionamiento silencioso en reposo.",
    ],
  },
  {
    id: "psu",
    number: 10,
    name: "Fuente de alimentación",
    meshName: "PSU",
    nodes: [2175],
    view: [0.65, 0.3, 0.95],
    title: "Fuente de alimentación",
    description:
      "La fuente de alimentación convierte la corriente alterna de la red en las tensiones de corriente continua limpias y reguladas que necesita cada componente. Alojada en su propio compartimento en la parte inferior de la caja, alimenta la placa base, la GPU y las unidades, protegiendo el sistema de sobretensiones.",
    function:
      "Reduce y rectifica la corriente de la pared a rieles de +12 V, +5 V y +3,3 V, entregando energía estable bajo carga.",
    importance:
      "La calidad de la PSU determina la estabilidad y longevidad del sistema: una unidad débil puede reiniciar, apagar o incluso dañar otras piezas.",
    facts: [
      "Una PSU con certificación gold supera el 90 % de eficiencia, desperdiciando menos energía en forma de calor.",
      "Las unidades totalmente modulares permiten enchufar solo los cables que necesitas para montajes más limpios.",
      "El ventilador se apaga a baja carga, haciendo el PC silencioso cuando está en reposo.",
    ],
  },
];
