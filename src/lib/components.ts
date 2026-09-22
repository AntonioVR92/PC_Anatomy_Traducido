// This file contains all the information about the computer components shown in the app:
// the 3D models to display, the text for each part, specs, common problems, and more.

// A single row in a component's spec list (e.g. "Speed" -> "3.7 – 5.2 GHz").
export type SpecRow = { label: string; value: string };

// The shape of all the data stored for one component (CPU, GPU, RAM, etc.).
export type ComponentInfo = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  short: string;
  icon: string;
  overview: {
    description: string;
    realWorld: string;
    fact: string;
  };
  specs: SpecRow[];
  functions: string[];
  issues: string[];
  focus: {
    at: [number, number, number];
    from: [number, number, number];
  };
  model?: string;
  credits?: string;
};

// The 3D model file used for the System Unit, and the model used when no other model exists.
export const SYSTEM_UNIT_MODEL = "/models/system_unit_update.glb";
export const FALLBACK_MODEL = SYSTEM_UNIT_MODEL;

// The full list of components that can be explored in the app.
export const COMPONENTS: ComponentInfo[] = [
  // --- PC Case (the computer case / system unit) ---
  {
    id: "pc-case",
    index: "01",
    name: "Caja del PC",
    tagline: "El chasis completo del sistema",
    short: "La carcasa que aloja, enfría y protege todos los componentes internos.",
    icon: "Box",
    overview: {
      description:
        "La caja del PC (también llamada unidad de sistema o chasis) es el hogar estructural del ordenador. Más allá de la estética, ofrece anclajes para cada componente, flujo de aire guiado, gestión de cables y protección frente al polvo, la estática y los golpes.",
      realWorld:
        "La elección del chasis define todo el montaje: un frontal de malla aireado alimenta los ventiladores, el cristal templado enseña el interior y las bahías de discos determinan cuánto almacenamiento puedes instalar.",
      fact:
        "Algunas cajas para entusiastas se diseñan con layouts de presión negativa y canales dedicados para el cableado de la placa base, de modo que el flujo de aire quede totalmente libre.",
    },
    specs: [
      { label: "Factor de forma", value: "Mid-Tower" },
      { label: "Soporte de placa base", value: "ATX / mATX / ITX" },
      { label: "Espacio para GPU", value: "360 mm" },
      { label: "Soportes de ventilador", value: "Up to 6× 120 mm" },
      { label: "Bahías de discos", value: "2× 3.5\" + 3× 2.5\"" },
    ],
    functions: [
      "Montar la placa base, la PSU, las unidades y los ventiladores.",
      "Dirigir el flujo de aire desde la entrada hasta la extracción.",
      "Tender y ocultar cables para montajes limpios y frescos.",
      "Proteger los componentes del polvo, la ESD y los daños físicos.",
    ],
    issues: [
      "Frontales restrictivos que ahogan los ventiladores de entrada.",
      "Filtros de polvo obstruidos que reducen el flujo de aire.",
      "Separadores mal alineados que cortocircuitan la placa base.",
      "Espacio insuficiente para GPUs o disipadores sobredimensionados.",
    ],
    focus: { at: [0, 0, 0], from: [0, 0.45, 3.4] },
    model: SYSTEM_UNIT_MODEL,
    credits:
      "\"Dream Computer Setup\" (https://skfb.ly/6QW96) by Daniel Cardona is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- CPU (Central Processing Unit) ---
  {
    id: "cpu",
    index: "02",
    name: "CPU",
    tagline: "Unidad central de procesamiento",
    short: "El cerebro del ordenador: ejecuta instrucciones y coordina cada tarea.",
    icon: "Cpu",
    overview: {
      description:
        "La Unidad Central de Procesamiento es el cerebro de silicio del ordenador. Decodifica y ejecuta miles de millones de instrucciones por segundo —desde aritmética hasta lógica y acceso a memoria— y orquesta todo lo que el sistema operativo y las aplicaciones le piden.",
      realWorld:
        "Dentro de tu portátil o teléfono, la CPU decide con qué fluidez responden las apps. Al pulsar una tecla o abrir una pestaña del navegador, la CPU programa el trabajo, comprueba los datos y delega el renderizado en la GPU —todo en microsegundos.",
      fact:
        "Una CPU moderna contiene más de 8.000 millones de transistores empaquetados en un chip más pequeño que un sello. El primer Intel 4004 de 1971 tenía solo 2.300.",
    },
    specs: [
      { label: "Socket", value: "LGA 1700 / AM5" },
      { label: "Núcleos", value: "8" },
      { label: "Hilos", value: "16" },
      { label: "Frecuencia", value: "3.7 – 5.2 GHz" },
      { label: "Caché", value: "24 MB L3" },
    ],
    functions: [
      "Obtener, decodificar y ejecutar instrucciones desde la RAM.",
      "Realizar operaciones aritméticas y lógicas (ALU).",
      "Coordinar el flujo de datos entre memoria, almacenamiento y periféricos.",
      "Gestionar la planificación de tareas entre núcleos e hilos.",
    ],
    issues: [
      "Sobrecalentamiento bajo carga sostenida sin refrigeración adecuada.",
      "Pines doblados o contactos del socket dañados que impiden el arranque.",
      "Pasta térmica degradada o aplicada incorrectamente.",
      "Degradación del silicio por voltajes excesivos de overclocking.",
    ],
    focus: { at: [-0.16, 0.3, -0.3], from: [-0.45, 0.55, 1.0] },
    model: "/models/cpu.glb",
    credits:
      "\"CPU Ryzen 5 3600\" (https://skfb.ly/on9Ao) by Fochdog is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- Motherboard ---
  {
    id: "motherboard",
    index: "03",
    name: "Placa base",
    tagline: "La placa principal del sistema",
    short: "La columna vertebral que conecta todos los componentes en un ordenador funcional.",
    icon: "CircuitBoard",
    overview: {
      description:
        "La placa base es la placa de circuito impreso principal que conecta física y eléctricamente cada componente. Alimentación, datos y señales viajan por sus pistas, ranuras y conectores: es el sistema nervioso del PC.",
      realWorld:
        "Elegir una placa base determina qué CPU, RAM y almacenamiento puedes instalar: su socket y chipset definen tu ruta de actualización. Quienes montan PCs emparejan la placa con la caja para que puertos y separadores encajen.",
      fact:
        "Una placa base puede tener más de una docena de capas de pistas de cobre apiladas como un sándwich, diseñadas para que las señales lleguen con una diferencia de picosegundos entre sí.",
    },
    specs: [
      { label: "Factor de forma", value: "ATX / mATX / ITX" },
      { label: "Socket CPU", value: "LGA 1700 / AM5" },
      { label: "Chipset", value: "Z790 / B650" },
      { label: "Ranuras RAM", value: "4 × DDR5" },
      { label: "Ranuras de expansión", value: "PCIe 5.0 ×16" },
    ],
    functions: [
      "Distribuir la alimentación de la PSU a cada componente.",
      "Enrutar datos entre CPU, RAM, GPU y almacenamiento.",
      "Alojar ranuras de expansión, puertos y headers.",
      "Informar del estado del sistema y gestionar los estados de energía mediante la BIOS.",
    ],
    issues: [
      "Actualizaciones fallidas de la BIOS que dejan la placa sin arrancar.",
      "Pines del socket de CPU doblados o pistas dañadas.",
      "Hinchazón de condensadores o sobrecalentamiento del VRM en placas económicas.",
      "Cortocircuitos por separadores cuando la placa se monta mal.",
    ],
    focus: { at: [0.0, 0.15, -0.15], from: [0.0, 0.7, 1.15] },
    model: "/models/motherboard.glb",
    credits:
      "\"PC motherboard ASUS Prime H510M-K\" (https://skfb.ly/oFrRt) by zhigulinsky is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- RAM (working memory) ---
  {
    id: "ram",
    index: "04",
    name: "RAM",
    tagline: "Memoria de acceso aleatorio",
    short: "Memoria de trabajo de alta velocidad que guarda los datos que la CPU está usando.",
    icon: "MemoryStick",
    overview: {
      description:
        "La RAM es la memoria de trabajo a corto plazo del ordenador. Almacena los datos e instrucciones que la CPU necesita ahora mismo, priorizando velocidad frente a capacidad para que el procesador no tenga que esperar al almacenamiento más lento.",
      realWorld:
        "Cuando editas un documento, vive en la RAM hasta que lo guardas en el SSD. Más RAM te permite tener docenas de pestañas del navegador y aplicaciones pesadas abiertas a la vez sin ralentizaciones.",
      fact:
        "La RAM es volátil: todo lo que guarda desaparece en el instante en que se corta la corriente. Por eso puedes perder trabajo sin guardar ante un apagado repentino.",
    },
    specs: [
      { label: "Tipo", value: "DDR5" },
      { label: "Capacidad", value: "16 – 32 GB" },
      { label: "Velocidad", value: "5600 MT/s" },
      { label: "Latencia", value: "CL36" },
      { label: "Canales", value: "Dual" },
    ],
    functions: [
      "Mantener programas y datos activos para acceso instantáneo de la CPU.",
      "Actuar como zona intermedia de alta velocidad entre la CPU y el almacenamiento.",
      "Permitir la multitarea manteniendo muchos procesos residentes.",
      "Proporcionar memoria para acceso compartido de la GPU (configuraciones de VRAM compartida).",
    ],
    issues: [
      "Módulos mal asentados que provocan pitidos de no-post.",
      "Mezclar velocidades incompatibles que fuerzan un funcionamiento más lento.",
      "DIMMs defectuosos que producen cuelgues aleatorios y pantallas azules.",
      "Polvo o corrosión en los contactos dorados.",
    ],
    focus: { at: [0.22, 0.28, -0.05], from: [0.85, 0.45, 0.55] },
    model: "/models/ram.glb",
    credits:
      "\"[RAM DDR4] G.Skill Trident Z NEO\" (https://skfb.ly/6WOrn) by Zon Digital is licensed under CC Attribution-NonCommercial-NoDerivs (http://creativecommons.org/licenses/by-nc-nd/4.0/).",
  },
  // --- GPU (graphics card) ---
  {
    id: "gpu",
    index: "05",
    name: "GPU",
    tagline: "Unidad de procesamiento gráfico",
    short: "El procesador paralelo que renderiza imágenes y acelera cargas de IA.",
    icon: "Layers",
    overview: {
      description:
        "La Unidad de Procesamiento Gráfico es un procesador masivamente paralelo diseñado para gráficos y cómputo. Renderiza fotogramas para tu pantalla y acelera cargas como el aprendizaje automático y la codificación de vídeo mediante miles de núcleos pequeños.",
      realWorld:
        "Cada imagen en tu pantalla la calcula la GPU —desde un juego 3D a 240 fps hasta desplazarte por una web. Las GPUs modernas también impulsan las funciones de IA en apps y juegos gracias al hardware de tensores y ray tracing.",
      fact:
        "Una GPU de gama alta puede tener más de 16.000 núcleos y realizar más de 80 billones de operaciones en coma flotante por segundo —aproximadamente un millón de veces más que un superordenador de los años 80.",
    },
    specs: [
      { label: "VRAM", value: "16 GB" },
      { label: "Tipo de memoria", value: "GDDR6X" },
      { label: "Núcleos de cómputo", value: "16,384" },
      { label: "Frecuencia boost", value: "2.6 GHz" },
      { label: "Consumo", value: "320 W" },
    ],
    functions: [
      "Renderizar escenas 3D, interfaz y vídeo a altas tasas de fotogramas.",
      "Descargar cómputo paralelo para IA y cargas científicas.",
      "Codificar y decodificar flujos de vídeo con hardware dedicado.",
      "Impulsar varios monitores a la vez.",
    ],
    issues: [
      "Sobrecalentamiento por pads térmicos secos en el disipador.",
      "Caída de la GPU (GPU sag) que estresa la ranura PCIe con el tiempo.",
      "Fallos de asiento del conector de alimentación bajo carga alta.",
      "Conflictos de drivers que provocan cuelgues o artefactos.",
    ],
    focus: { at: [0.0, -0.18, -0.18], from: [0.5, 0.05, 1.0] },
    model: "/models/gpu.glb",
    credits:
      "\"MSI GeForce RTX 3080 Gaming X Trio | Now Free!\" (https://skfb.ly/ow8HY) by M E U is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- SSD (SATA solid state drive) ---
  {
    id: "ssd",
    index: "06",
    name: "SSD",
    tagline: "Unidad de estado sólido SATA de 2,5\"",
    short: "Almacenamiento silencioso y ultrarrápido sin piezas móviles, por enlace SATA.",
    icon: "HardDrive",
    overview: {
      description:
        "Una unidad de estado sólido (SSD) guarda los datos en chips de memoria flash en lugar de discos giratorios. Sin piezas móviles, ofrece arranques casi instantáneos, carga ágil de aplicaciones y gran resistencia a caídas.",
      realWorld:
        "El SSD SATA clásico de 2,5 pulgadas es la actualización estrella para portátiles y sobremesas antiguos: entra en cualquier bahía y usa el mismo cable que un disco duro, pero es mucho más rápido y silencioso.",
      fact:
        "Un SSD SATA de 2,5\" alcanza como máximo unos 550 MB/s —unas diez veces más rápido que un disco duro mecánico—, aunque sigue por detrás de las unidades NVMe más rápidas.",
    },
    specs: [
      { label: "Interfaz", value: "SATA III" },
      { label: "Factor de forma", value: "2.5 inch" },
      { label: "Capacidad", value: "1 TB" },
      { label: "Velocidad de lectura", value: "550 MB/s" },
      { label: "Velocidad de escritura", value: "520 MB/s" },
    ],
    functions: [
      "Persistir el sistema operativo, programas y archivos.",
      "Ofrecer acceso aleatorio rápido sin piezas móviles.",
      "Acelerar de forma drástica sistemas envejecidos con un simple cambio.",
      "Funcionar en silencio y resistir golpes y vibraciones.",
    ],
    issues: [
      "Bugs de firmware que hacen que las unidades se desconecten.",
      "Trim no activado, lo que degrada el rendimiento de escritura.",
      "El ancho de banda SATA limita el rendimiento por debajo del NVMe.",
      "Desgaste de la NAND en unidades económicas con muchas escrituras.",
    ],
    focus: { at: [-0.24, -0.28, 0.42], from: [-0.8, -0.3, 1.05] },
    model: "/models/ssd_solid_state_drive.glb",
    credits:
      "\"(SSD) Solid State Drive\" (https://skfb.ly/otSKU) by MarkCP is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- M.2 SSD (NVMe solid state drive) ---
  {
    id: "m2-ssd",
    index: "07",
    name: "M.2 SSD",
    tagline: "Unidad de estado sólido NVMe",
    short: "Una unidad NVMe del tamaño de un chicle que se monta directamente en la placa base.",
    icon: "MemoryStick",
    overview: {
      description:
        "El M.2 SSD es una unidad de estado sólido delgada montada en la placa. Se enchufa directamente en una ranura de la placa base y se conecta por líneas PCIe, saltándose SATA para alcanzar velocidades de varios gigabytes por segundo.",
      realWorld:
        "Las unidades M.2 NVMe explican por qué los PCs modernos arrancan en segundos y los juegos cargan en un instante: sin cables, sin bahías, solo un tornillo pequeño y el almacenamiento de consumo más rápido disponible.",
      fact:
        "Una unidad NVMe M.2 de gama alta puede leer más de 7 GB/s —lo bastante rápido como para copiar una película 4K completa en menos de un segundo.",
    },
    specs: [
      { label: "Interfaz", value: "PCIe 4.0 NVMe" },
      { label: "Factor de forma", value: "M.2 2280" },
      { label: "Capacidad", value: "1 TB" },
      { label: "Velocidad de lectura", value: "7,000 MB/s" },
      { label: "Velocidad de escritura", value: "5,000 MB/s" },
    ],
    functions: [
      "Alojar el sistema operativo para un arranque casi instantáneo.",
      "Transferir datos por líneas PCIe dedicadas.",
      "Ofrecer un rendimiento extremo en acceso aleatorio y secuencial.",
      "Montarse a ras de la placa con un solo tornillo.",
    ],
    issues: [
      "Sobrecalentamiento con throttling en unidades M.2 de alta velocidad.",
      "Incompatibilidades de clave entre ranura y unidad (M vs B+M).",
      "Compartición de ancho de banda con la GPU en algunas placas.",
      "Bugs de firmware que hacen que las unidades se desconecten.",
    ],
    focus: { at: [0, 0.1, 0], from: [0, 0.4, 0.9] },
    model: "/models/m.2.glb",
    credits:
      "\"M.2 SSD (Free)\" (https://skfb.ly/pJZv8) by PolyDavid is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- HDD (hard disk drive) ---
  {
    id: "hdd",
    index: "08",
    name: "HDD",
    tagline: "Disco duro",
    short: "Almacenamiento magnético de alta capacidad con platos giratorios.",
    icon: "Disc3",
    overview: {
      description:
        "El disco duro (HDD) almacena datos magnéticamente en platos giratorios, leídos por un brazo minúsculo que se mueve sobre la superficie. Ofrece el menor coste por gigabyte, ideal para archivos y almacenamiento masivo.",
      realWorld:
        "Los HDD mantienen vivos los archivos del mundo: NAS, grabadoras de vigilancia y servidores de copia de seguridad siguen confiando en ellos para terabytes de almacenamiento barato y fiable que con SSDs serían prohibitivos.",
      fact:
        "Los platos giran a hasta 7.200 RPM, y el brazo de lectura flota a meros nanómetros de la superficie —más fino que una sola longitud de onda de la luz.",
    },
    specs: [
      { label: "Interfaz", value: "SATA III" },
      { label: "Factor de forma", value: "3.5 inch" },
      { label: "Capacidad", value: "4 TB" },
      { label: "Velocidad", value: "7,200 RPM" },
      { label: "Caché", value: "256 MB" },
    ],
    functions: [
      "Almacenar grandes volúmenes de datos a bajo coste.",
      "Persistir archivos entre ciclos de encendido.",
      "Servir como capa de copia de seguridad y archivo en sistemas de almacenamiento.",
      "Bufferizar y agrupar escrituras para mayor eficiencia.",
    ],
    issues: [
      "Golpes físicos que provocan head crashes y pérdida de datos.",
      "Desgaste mecánico por giro continuo.",
      "Sectores defectuosos que aparecen conforme envejecen los platos.",
      "Vibración que degrada el rendimiento en montajes con varios discos.",
    ],
    focus: { at: [-0.24, -0.28, 0.42], from: [-0.9, -0.25, 1.0] },
    model: "/models/hdd.glb",
    credits:
      "\"WD Green 1TB Hard Disk HDD\" (https://skfb.ly/oESOn) by MajdyModels is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- PSU (power supply unit) ---
  {
    id: "power-supply",
    index: "09",
    name: "Fuente de alimentación",
    tagline: "Unidad de fuente de alimentación",
    short: "Convierte la corriente de la pared en CC limpia y regulada para cada componente.",
    icon: "Zap",
    overview: {
      description:
        "La fuente de alimentación (PSU) toma la corriente alterna de la red y la convierte en corriente continua estable y de bajo voltaje para el sistema. Su calidad determina no solo los vatios, sino lo seguro y silencioso que funciona todo el PC.",
      realWorld:
        "Una buena PSU entrega potencia constante ante picos de carga —crítico cuando una GPU pasa de reposo a carga 3D plena en milisegundos. Las unidades baratas fallan ante esos transitorios y pueden llevarse otros componentes por delante.",
      fact:
        "Una PSU 80+ Titanium de gama alta supera el 94 % de eficiencia: desperdicia menos de 6 vatios en calor por cada 100 vatios entregados.",
    },
    specs: [
      { label: "Potencia", value: "850 W" },
      { label: "Eficiencia", value: "80+ Gold" },
      { label: "Modularidad", value: "Fully Modular" },
      { label: "Raíles", value: "Single +12V" },
      { label: "Factor de forma", value: "ATX" },
    ],
    functions: [
      "Convertir la corriente AC de la red en voltajes DC regulados.",
      "Proteger los componentes con salvaguardas OVP, OCP y de cortocircuito.",
      "Entregar potencia limpia y estable durante transitorios de carga.",
      "Alimentar dispositivos cuando el PC está en reposo o apagado (raíl de standby).",
    ],
    issues: [
      "Envejecimiento de condensadores que reduce los vatios entregados con los años.",
      "Potencia insuficiente que provoca apagados aleatorios bajo carga.",
      "Ruido de rodamientos del ventilador y polvo acumulado que restringe el flujo de aire.",
      "Mala respuesta a transitorios en fuentes económicas.",
    ],
    focus: { at: [0.12, -0.62, -0.35], from: [0.75, -0.35, 1.05] },
    model: "/models/psu.glb",
    credits:
      "\"PSU Power Supply Unit\" (https://skfb.ly/oBPC9) by Groovex is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- CPU cooler ---
  {
    id: "cpu-cooler",
    index: "10",
    name: "Disipador CPU",
    tagline: "Gestión térmica de la CPU",
    short: "Mantiene el procesador en su rango seguro de temperatura bajo cualquier carga.",
    icon: "Fan",
    overview: {
      description:
        "El disipador de la CPU elimina el enorme calor que genera el procesador, transfiriéndolo del silicio a través de una base y heat pipes hasta un radiador, donde los ventiladores lo expulsan de la caja.",
      realWorld:
        "Tanto las torres de aire como los refrigeradores líquidos AIO permiten que las CPUs sostengan frecuencias boost durante horas de juego. Sin ellos, un chip moderno haría throttling en segundos —o se apagaría para protegerse.",
      fact:
        "Una CPU puede generar más de 250 W de calor —suficiente para hervir agua— y los disipadores mueven esa energía por heat pipes con la misma física que un frigorífico.",
    },
    specs: [
      { label: "Tipo", value: "Tower Air" },
      { label: "Tamaño del ventilador", value: "120 mm" },
      { label: "Soporte de socket", value: "LGA / AM5" },
      { label: "TDP nominal", value: "220 W" },
      { label: "Ruido", value: "≤ 28 dBA" },
    ],
    functions: [
      "Transferir el calor del die de la CPU a una gran superficie.",
      "Disipar el calor hacia el flujo de aire de la caja mediante ventiladores.",
      "Permitir que la CPU sostenga altas frecuencias sin throttling.",
      "Mantener temperaturas seguras durante años de uso.",
    ],
    issues: [
      "Pasta térmica reseca que se agrieta y pierde conductividad.",
      "Polvo que obstruye las aletas y bloquea el flujo de aire.",
      "Fallos de la bomba en refrigeradores líquidos que provocan picos instantáneos.",
      "Presión de montaje incorrecta que deforma o sobrecalienta.",
    ],
    focus: { at: [-0.05, 0.42, -0.42], from: [-0.25, 0.95, 0.85] },
    model: "/models/cpu_fan.glb",
    credits:
      "\"(Free) AMD Wraith Stealth CPU Cooler\" (https://skfb.ly/pJXNM) by PolyDavid is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- Case fans ---
  {
    id: "case-fans",
    index: "11",
    name: "Ventiladores",
    tagline: "Gestión del flujo de aire",
    short: "Introducen aire frío y expulsan el caliente para regular la temperatura de la caja.",
    icon: "Wind",
    overview: {
      description:
        "Los ventiladores de caja establecen el flujo de aire a través del chasis: aspiran aire frío sobre los componentes y expulsan el calor. Una presión positiva y negativa equilibrada mantiene el polvo fuera y las temperaturas a raya.",
      realWorld:
        "Las cajas modernas usan ventiladores frontales de entrada que llevan aire frío directo a la CPU y la GPU, con una extracción trasera o superior que cierra el circuito. Un buen flujo de aire suele importar más que un disipador caro.",
      fact:
        "Un solo ventilador de 140 mm mueve casi el doble de aire que uno de 120 mm al mismo nivel de ruido; por eso los ventiladores grandes y lentos son más silenciosos.",
    },
    specs: [
      { label: "Tamaño", value: "120 mm" },
      { label: "Rodamiento", value: "Fluid Dynamic" },
      { label: "RPM", value: "500 – 1,800" },
      { label: "Caudal de aire", value: "62 CFM" },
      { label: "Ruido", value: "≤ 26 dBA" },
    ],
    functions: [
      "Aspirar aire frío hacia el chasis desde el frontal.",
      "Extraer aire caliente por la parte trasera y superior.",
      "Mantener el equilibrio de presión para disuadir el polvo.",
      "Dirigir el flujo de aire hacia las entradas de la CPU y la GPU.",
    ],
    issues: [
      "Desgaste de rodamientos que provoca ruido de roce o traqueteo.",
      "Acumulación de polvo que desequilibra las aspas.",
      "Tornillos flojos que transmiten vibración a la caja.",
      "No conectar a los headers de ventilador, dejándolos parados.",
    ],
    focus: { at: [0.0, 0.45, 1.08], from: [0.15, 0.55, 2.1] },
    model: "/models/case_fans.glb",
    credits:
      "\"CPU_fan SOGUTUCU\" (https://skfb.ly/6S8JV) by sinemmbagcioglu is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- Keyboard ---
  {
    id: "keyboard",
    index: "12",
    name: "Teclado",
    tagline: "Dispositivo de entrada principal",
    short: "La forma principal de escribir, dar órdenes y controlar el ordenador.",
    icon: "Keyboard",
    overview: {
      description:
        "El teclado es el dispositivo principal de entrada de texto y comandos. Cada pulsación cierra un interruptor que el controlador del teclado convierte en un scancode, y el sistema operativo traduce en caracteres, atajos y acciones.",
      realWorld:
        "Desde redactar documentos hasta controlar juegos, el teclado es donde empieza la mayor parte del trabajo con el ordenador. Los mecánicos ofrecen feedback táctil; las membranas de perfil bajo mantienen los portátiles finos y silenciosos.",
      fact:
        "Un teclado mecánico puede registrar más de 100 pulsaciones simultáneas —lo que se conoce como N-key rollover completo—, por eso gamers y quienes escriben mucho los prefieren por velocidad y precisión.",
    },
    specs: [
      { label: "Disposición", value: "Full / TKL / 75%" },
      { label: "Tipo de switch", value: "Mechanical" },
      { label: "Conexión", value: "USB-C / 2.4 GHz / BT" },
      { label: "Retroiluminación", value: "Per-key RGB" },
      { label: "Número de teclas", value: "104" },
    ],
    functions: [
      "Introducir texto y caracteres mediante pulsaciones.",
      "Activar atajos y macros para ganar velocidad.",
      "Proporcionar entrada para juegos y navegación.",
      "Soportar funciones de accesibilidad como teclas sticky y remapeo.",
    ],
    issues: [
      "Switches pegajosos o que no responden por polvo y suciedad.",
      "Fallos de switches en letras de uso intensivo.",
      "Lag de entrada inalámbrico o conexiones que se caen.",
      "Derrames de líquido que cortocircuitan el circuito del controlador.",
    ],
    focus: { at: [0.0, 0.05, 0.0], from: [0.0, 1.0, 1.6] },
    model: "/models/keyboard.glb",
    credits:
      "\"keyboard\" (https://skfb.ly/6UFI8) by 45P3R4 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- Mouse ---
  {
    id: "mouse",
    index: "13",
    name: "Ratón",
    tagline: "Apuntamiento y control del cursor",
    short: "La herramienta de precisión que mueve el cursor y gestiona las interacciones.",
    icon: "MousePointer2",
    overview: {
      description:
        "El ratón traduce el movimiento de la mano en movimiento del cursor. Un sensor óptico captura el desplazamiento sobre la superficie miles de veces por segundo, mientras los botones y la rueda de desplazamiento activan clics, arrastres y navegación.",
      realWorld:
        "El ratón es la forma natural de apuntar, seleccionar y navegar. Los sensores de alto DPI rastrean movimientos mínimos de muñeca para un apuntamiento preciso en juegos y trabajo a nivel de píxel en herramientas de diseño.",
      fact:
        "Los ratones gaming modernos reportan la posición hasta 8.000 veces por segundo y pueden rastrear velocidades de 650 pulgadas por segundo sin perder precisión.",
    },
    specs: [
      { label: "Sensor", value: "Optical" },
      { label: "DPI", value: "400 – 26,000" },
      { label: "Botones", value: "6" },
      { label: "Conexión", value: "2.4 GHz / BT / USB" },
      { label: "Peso", value: "58 g" },
    ],
    functions: [
      "Mover el cursor con seguimiento óptico.",
      "Seleccionar, hacer clic y arrastrar con los botones principal y secundario.",
      "Desplazarse por páginas y documentos.",
      "Cambiar la sensibilidad al vuelo para tareas de precisión.",
    ],
    issues: [
      "Polvo en el sensor que provoca saltos erráticos del cursor.",
      "Doble clic por microinterruptores desgastados.",
      "Patines desgastados que arrastran sobre la alfombrilla.",
      "Interferencias inalámbricas que causan lag o desconexiones.",
    ],
    focus: { at: [0.0, 0.02, 0.0], from: [0.0, 0.9, 1.4] },
    model: "/models/mouse.glb",
    credits:
      "\"Low poly - Computer Mouse [FREE] Download\" (https://skfb.ly/pM8xn) by IQINISO is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- Monitor ---
  {
    id: "monitor",
    index: "14",
    name: "Monitor",
    tagline: "Pantalla de salida visual",
    short: "La pantalla que convierte los fotogramas renderizados en las imágenes que ves.",
    icon: "Monitor",
    overview: {
      description:
        "El monitor es la salida visual del ordenador. La GPU renderiza un fotograma, el panel de la pantalla refresca millones de píxeles al unísono, y lo que ves es el producto final de todo lo que calcula el sistema.",
      realWorld:
        "La tasa de refresco, la resolución y el tipo de panel definen lo fluido y nítido que es tu experiencia. Un panel de 144 Hz se redibuja el doble de veces que una pantalla estándar de 60 Hz, y el movimiento se siente mucho más suave.",
      fact:
        "Una pantalla 8K contiene unos 33 millones de píxeles direccionables individualmente, cada uno de los cuales debe actualizarse hasta 144 veces por segundo sin tearing visible.",
    },
    specs: [
      { label: "Panel", value: "IPS" },
      { label: "Resolución", value: "2560 × 1440" },
      { label: "Tasa de refresco", value: "144 Hz" },
      { label: "Tiempo de respuesta", value: "1 ms" },
      { label: "Puertos", value: "HDMI 2.1 / DP 1.4 / USB-C" },
    ],
    functions: [
      "Mostrar los fotogramas renderizados por la GPU.",
      "Presentar imágenes con color preciso para diseño y medios.",
      "Soportar sincronización adaptativa para eliminar el tearing.",
      "Actuar como hub de conexiones USB y de vídeo.",
    ],
    issues: [
      "Píxeles muertos o atascados por defectos de fabricación.",
      "Bleed de la luz de fondo en los bordes del panel.",
      "Input lag por procesamiento pesado de imagen.",
      "Quemado de pantalla (burn-in) en paneles OLED por contenido estático.",
    ],
    focus: { at: [0.0, 0.1, 0.0], from: [0.0, 1.2, 2.2] },
    model: "/models/monitor.glb",
    credits:
      "\"Acer monitor\" (https://skfb.ly/o8vT7) by Turtle_Flipper is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- UPS (uninterruptible power supply) ---
  {
    id: "ups",
    index: "15",
    name: "SAI",
    tagline: "UPS — sistema de alimentación ininterrumpida",
    short: "Respaldo por batería que mantiene el PC encendido ante cortes y caídas de tensión.",
    icon: "BatteryCharging",
    overview: {
      description:
        "Un Sistema de Alimentación Ininterrumpida (UPS) se sitúa entre el enchufe de la pared y tu PC. Su batería monitoriza constantemente la red y cambia a alimentación por batería en el instante en que cae la tensión, dándote tiempo para guardar el trabajo y apagar con seguridad.",
      realWorld:
        "Un UPS también limpia la corriente que llega al hardware, recortando picos y filtrando caídas de tensión —esa energía sucia que estresa en silencio PSUs, placas y unidades. Para quien trabaja con documentos o corre servidores, es el seguro más barato en informática.",
      fact:
        "Un UPS puede pasar a batería en menos de 10 milisegundos —mucho más rápido de lo que un PC notaría—, por eso la pantalla no parpadea durante un microcorte.",
    },
    specs: [
      { label: "Capacidad", value: "700 VA / 420 W" },
      { label: "Batería", value: "12 V, 7 Ah" },
      { label: "Autonomía", value: "~10 min at full load" },
      { label: "Salidas", value: "8 × C13" },
      { label: "Protección contra sobretensiones", value: "480 J" },
    ],
    functions: [
      "Cubrir huecos de corriente para que el PC no se apague a mitad de una escritura.",
      "Recortar picos y filtrar el ruido de la red.",
      "Dar tiempo para guardar el trabajo y apagar con seguridad.",
      "Regular el voltaje para equipos en redes inestables.",
    ],
    issues: [
      "Baterías envejecidas que pierden autonomía en 2–3 años.",
      "Celdas recargables que se sobrecalientan si las rejillas de ventilación están obstruidas.",
      "Fallos al conmutar del UPS durante ciclos rápidos de corriente.",
      "Unidades pasivas que dejan pasar caídas de tensión hasta la PSU.",
    ],
    focus: { at: [0, 0.05, 0], from: [0.35, 0.6, 1.6] },
    model: "/models/ups.glb",
    credits:
      "\"APC Battery Backup UPS\" (https://sketchfab.com/3d-models/apc-battery-backup-ups-b5c5af44c00848d3bad02327e3cec236) by Graham Rust is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
  // --- AVR (automatic voltage regulator) ---
  {
    id: "avr",
    index: "16",
    name: "Transformador",
    tagline: "AVR — regulador automático de voltaje",
    short: "Suaviza la tensión inestable de la red para proteger el PC de caídas y picos.",
    icon: "Zap",
    overview: {
      description:
        "Un Regulador Automático de Voltaje (AVR) se sitúa entre el enchufe de la pared y tu PC, monitorizando constantemente la red. Cuando la tensión baja o sube, corrige el suministro en tiempo real para que el hardware reciba siempre energía limpia y estable —da igual lo irregular que sea la red.",
      realWorld:
        "En zonas con corriente fluctuante, un AVR es la primera línea de defensa de un sobremesa. Las caídas y los picos de tensión estresan en silencio PSUs, placas base y unidades; un AVR suaviza esos vaivenes para que la PSU solo tenga que gestionar una entrada bien comportada.",
      fact:
        "A diferencia de un UPS, un AVR no suministra alimentación de respaldo: solo estabiliza el voltaje. Corrige en un rango típico de ±25 % y reacciona en milisegundos, mucho más rápido de lo que un humano notaría un parpadeo.",
    },
    specs: [
      { label: "Voltaje de entrada", value: "140 – 280 VAC" },
      { label: "Voltaje de salida", value: "220 V ± 8%" },
      { label: "Capacidad", value: "1,000 VA / 600 W" },
      { label: "Salidas", value: "6 × Universal" },
      { label: "Protección contra sobretensiones", value: "Built-in" },
    ],
    functions: [
      "Regular el voltaje de entrada durante caídas y picos.",
      "Recortar picos de voltaje antes de que lleguen a tus componentes.",
      "Entregar potencia estable a la PSU en redes inestables.",
      "Proteger frente a irregularidades de polaridad y fase.",
    ],
    issues: [
      "Relés desgastados que clicotean repetidamente durante oscilaciones de voltaje.",
      "Sobrecalentamiento al operar en el límite de su rango.",
      "Caída de la salida bajo carga continua elevada.",
      "Contactos desgastados que reducen la protección contra sobretensiones con el tiempo.",
    ],
    focus: { at: [0, 0.05, 0], from: [0.35, 0.6, 1.6] },
    model: "/models/avr.glb",
    credits:
      "\"Automatic Voltage Regulator (AVR)\" (https://skfb.ly/oMqpy) by seiippai is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  },
];

// Look up a single component by its id. Returns undefined if no matching component exists.
export function getComponent(id: string): ComponentInfo | undefined {
  return COMPONENTS.find((c) => c.id === id);
}
