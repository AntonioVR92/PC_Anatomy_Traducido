// Data describing the parts of a motherboard that can be explored in 3D.
// Each part is a clickable hotspot on the board (CPU socket, RAM slots, ports, etc.).

// Describes one motherboard part: which 3D mesh it belongs to, where it is, and the text about it.
export type MotherboardPart = {
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

// The motherboard part type is the same as the general part type (kept as a named alias for clarity).
export type MotherboardComponent = MotherboardPart;

// The full list of motherboard parts, each with its own learning text.
export const MOTHERBOARD_PARTS: MotherboardPart[] = [
  {
    id: "cpu-socket",
    number: 1,
    name: "Zócalo de CPU",
    meshName: "CPU Socket",
    nodes: [36],
    view: [0, 1, 0.3],
    title: "Zócalo de CPU",
    description:
      "El zócalo de CPU es la zona de precisión mecanizada donde se instala el procesador. Contactos metálicos (pines o pads) conectan cada terminal de la CPU con las pistas de la placa base, y un brazo de retención fija el procesador con seguridad.",
    function:
      "Monta físicamente la CPU y transporta miles de conexiones eléctricas entre el procesador, el controlador de memoria y el resto del sistema.",
    importance:
      "El zócalo decide qué CPUs admite una placa base. Generación incorrecta, número de pines equivocado o un pin doblado significan que la máquina no arrancará.",
    facts: [
      "Los zócalos LGA modernos tienen más de 1.700 pines delicados: un solo pin doblado puede matar la placa.",
      "Intel usa pines en la placa (LGA); las placas AMD tienen agujeros y los pines van en la CPU (PGA).",
      "Los pines del zócalo están bañados en oro para resistir la corrosión y mejorar la conductividad.",
    ],
  },
  {
    id: "ram-slots",
    number: 2,
    name: "Ranuras de RAM",
    meshName: "RAM Slots",
    nodes: [7, 13],
    offset: [0, 0.45, 0.3],
    view: [0.9, 0.55, 0.3],
    title: "Ranuras de RAM",
    description:
      "Las ranuras DIMM son los zócalos largos que alojan la memoria del sistema. Cada módulo DDR5 encaja en un canal, y la mayoría de placas ofrecen dos o cuatro ranuras dispuestas para poblarlas con el máximo ancho de banda en dual-channel.",
    function:
      "Transporta alimentación y datos entre el controlador de memoria y los módulos de RAM, permitiendo a la CPU acceder a los programas activos a velocidades de nanosegundos.",
    importance:
      "El número de ranuras y su disposición por canales marcan tu techo de ampliación: una placa de dos ranuras te limita a dos DIMMs, mientras que las de cuatro permiten totales mayores.",
    facts: [
      "Poblar ranuras coincidentes (A2/B2) activa el modo dual-channel, casi duplicando el ancho de banda de memoria.",
      "Los módulos DDR5 llevan el regulador de tensión directamente en el módulo.",
      "Un solo DIMM «salta» una ranura para que las ranuras se alineen con el cableado de canales de la placa.",
    ],
  },
  {
    id: "pcie-x16",
    number: 3,
    name: "Ranura PCIe x16",
    meshName: "PCI-E",
    nodes: [9],
    view: [0, 0.5, -1],
    title: "Ranura PCIe x16",
    description:
      "La ranura PCIe x16 es el carril de expansión principal de alto ancho de banda — el hogar de la tarjeta gráfica. Sus 16 líneas entregan datos entre la GPU y la CPU más rápido que casi cualquier otro conector de la placa.",
    function:
      "Conecta tarjetas de ampliación — sobre todo la GPU — al procesador y a la memoria mediante un enlace serie de alta velocidad.",
    importance:
      "Es la ruta crítica para juegos y renderizado; una ranura x8 o x4 limita el rendimiento gráfico, y una ranura dañada puede impedir que el sistema arranque (POST).",
    facts: [
      "PCIe 5.0 x16 alcanza hasta 128 GB/s — más de 8× el ancho de banda del PCIe 1.0 original.",
      "La ranura larga está ranurada (keyed) para que la tarjeta solo se pueda insertar en un sentido.",
      "Algunas placas permiten dividir el x16 en x8/x8 para configuraciones de doble GPU.",
    ],
  },
  {
    id: "m2-nvme",
    number: 4,
    name: "Ranura M.2 NVMe",
    meshName: "M.2 NVMe Slot",
    nodes: [30],
    view: [0.45, 0.7, -0.75],
    title: "Ranura M.2 NVMe",
    description:
      "La ranura M.2 es un conector de bajo perfil que monta discos de estado sólido directamente en la placa. Los SSD NVMe aquí funcionan por líneas PCIe, saltándose el cuello de botella de SATA para transferencias de varios gigabytes por segundo.",
    function:
      "Aloja almacenamiento M.2 (SSDs y tarjetas Wi-Fi), entregando datos directamente a la CPU o al chipset por líneas PCIe o SATA.",
    importance:
      "Una ranura M.2 NVMe es lo que hace que un PC arranque en segundos: el almacenamiento de consumo más rápido se conecta aquí, no a una bahía de 2,5 pulgadas.",
    facts: [
      "Un solo SSD M.2 NVMe puede superar a varios SSD SATA en RAID.",
      "Los discos más calientes pueden reducir su velocidad, por eso muchas ranuras van bajo un disipador dedicado.",
      "M.2 existe en longitudes de 2230 a 22110, con muescas (keyed) para PCIe o SATA.",
    ],
  },
  {
    id: "atx-power",
    number: 5,
    name: "Conector de alimentación ATX de 24 pines",
    meshName: "24-pin ATX",
    nodes: [5],
    view: [1, 0.45, 0.2],
    title: "Conector de alimentación ATX de 24 pines",
    description:
      "El header de 24 pines es la alimentación principal de la placa base. Entrega +3,3 V, +5 V y +12 V desde la fuente de alimentación, distribuyendo energía por la placa para que cada componente tenga corriente.",
    function:
      "Suministra los rieles de tensión principales y las masas a la placa base, alimentando su circuitería y los VRM de la CPU y la memoria.",
    importance:
      "Si este conector está flojo o mal asentado, la placa no recibe energía y el sistema permanece muerto: ni ventiladores, ni pitidos, nada.",
    facts: [
      "Está ranurado (keyed) con un pin recortado para que solo se pueda enchufar en un sentido.",
      "Los 4 pines extra respecto al antiguo header de 20 pines se añadieron para el riel de +12 V.",
      "Un conector ATX defectuoso es una causa habitual de fallos intermitentes de «sin energía».",
    ],
  },
  {
    id: "sata",
    number: 6,
    name: "Puertos SATA",
    meshName: "SATA_1-4",
    nodes: [190, 192, 194, 196],
    offset: [0, 0.55, 0.3],
    view: [0.7, 0.55, -0.6],
    title: "Puertos SATA",
    description:
      "Los puertos SATA conectan SSD de 2,5 pulgadas, discos duros de 3,5 pulgadas y unidades ópticas. SATA III mueve 6 Gb/s — de sobra para discos mecánicos, aunque más lento que NVMe para estado sólido.",
    function:
      "Transporta datos hacia y desde las unidades de almacenamiento SATA y alimenta la conexión entre la unidad y el chipset.",
    importance:
      "Son los caballos de batalla del almacenamiento masivo: la mayoría de montajes con varias unidades siguen colgando sus HDD y SSD SATA de estos puertos.",
    facts: [
      "SATA III alcanza como máximo 6 Gb/s (unos 550 MB/s en la práctica).",
      "El puerto tiene forma de L para que los cables no se puedan invertir.",
      "Todas las versiones de SATA son compatibles entre sí, así que los discos antiguos funcionan en placas nuevas.",
    ],
  },
  {
    id: "cmos-battery",
    number: 7,
    name: "Pila CMOS",
    meshName: "CMOS",
    nodes: [19],
    view: [-0.9, 0.5, 0.3],
    title: "Pila CMOS",
    description:
      "La pequeña pila de botón mantiene viva la memoria CMOS cuando el PC está desenchufado. El CMOS guarda los ajustes del BIOS — orden de arranque, relojes y perfiles — para que la placa recuerde su configuración entre sesiones.",
    function:
      "Alimenta el reloj en tiempo real y la pequeña memoria que guarda los ajustes de UEFI/BIOS cuando no hay corriente de red.",
    importance:
      "Una pila agotada restablece los ajustes del BIOS y el reloj del sistema; tras unos años falla en silencio y hay que cambiarla.",
    facts: [
      "Suele ser una pila de litio CR2032 que dura 5–10 años.",
      "Retirarla durante 30 segundos es el clásico «hard reset» para borrar un BIOS bloqueado.",
      "El RTC sigue funcionando incluso en un PC completamente apagado gracias a esta pila.",
    ],
  },
  {
    id: "chipset",
    number: 8,
    name: "Chipset",
    meshName: "Chipset",
    nodes: [311, 312, 313, 314, 315, 316],
    view: [0, 0.65, -0.75],
    title: "Chipset",
    description:
      "El chipset es el controlador de tráfico de la placa base. Gestiona las conexiones más lentas y de alto volumen — USB, SATA, M.2, audio y red — y las enruta hacia la CPU, a menudo oculto bajo un disipador decorativo.",
    function:
      "Coordina dispositivos de E/S, almacenamiento y expansión, canalizando sus datos al procesador mientras descarga tareas de gestión.",
    importance:
      "El chipset (p. ej., B650 frente a X870) determina cuántos puertos USB/SATA/M.2 obtienes y si funciones como overclocking o PCIe 5.0 están desbloqueadas.",
    facts: [
      "El chipset se asienta en la placa bajo su propio disipador porque consume energía real.",
      "Los chipsets de gama alta desbloquean líneas PCIe extra y E/S más rápidas.",
      "Los chipsets modernos se enlazan a la CPU mediante un enlace DMI dedicado.",
    ],
  },
  {
    id: "rear-io",
    number: 9,
    name: "Puertos de E/S traseros",
    meshName: "Rear I/O Panel",
    nodes: [325, 327, 329, 331, 333, 335, 337],
    offset: [0, 0.55, 0],
    view: [-1, 0.4, 0.15],
    title: "Puertos de E/S traseros",
    description:
      "El panel de E/S trasero es el grupo de puertos en el borde posterior de la placa — USB, Ethernet, jacks de audio, salidas de vídeo y más. Es el punto de conexión permanente para tus periféricos y la red.",
    function:
      "Expone la conectividad integrada de la placa base al exterior: dispositivos USB, cable de red, audio y gráficos integrados.",
    importance:
      "Estos puertos son a los que enchufas a diario. Su cantidad y velocidad marcan cuántos monitores y dispositivos puede atender el hardware integrado.",
    facts: [
      "Los puertos USB de la E/S trasera suelen funcionar a máxima velocidad, mientras que los del panel frontal comparten ancho de banda.",
      "Muchas placas ofrecen un puerto USB de BIOS flashback que puede actualizar el firmware sin CPU.",
      "Los puertos Thunderbolt y 2.5 GbE son añadidos premium de la E/S trasera.",
    ],
  },
];
