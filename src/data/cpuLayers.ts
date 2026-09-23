// Data describing the layers of a CPU that can be "peeled" apart in 3D.
// Each layer is one physical part of the chip (heat spreader, die, pins, etc.).

// Describes one CPU layer: its 3D mesh, position, colors, and the learning text about it.
export type CPULayer = {
  id: string;
  number: number;
  meshName: string;
  hotspotOffset: [number, number, number];
  lift: number;
  fadeIn?: boolean;
  color: string;
  title: string;
  description: string;
  purpose: string;
  facts: string[];
  problems: string[];
};

// The full, ordered list of CPU layers, from the top of the chip down to the pins.
export const CPU_LAYERS: CPULayer[] = [
  {
    // The metal lid on top of the CPU.
    id: "ihs",
    number: 1,
    meshName: "Integrated Heat Spreader",
    hotspotOffset: [0.32, 0.12, 0.12],
    lift: 0.28,
    color: "#d7dde6",
    title: "Difusor de calor integrado (IHS)",
    description:
      "La tapa de níquel pulido que corona el procesador. Distribuye el calor de forma uniforme por toda la superficie del chip y ofrece al disipador un punto de montaje plano y fiable — a la vez que protege el silicio frágil que hay debajo.",
    purpose:
      "Conduce el calor del die por toda su superficie y proporciona la cara de contacto lisa contra la que presiona el disipador de la CPU.",
    facts: [
      "La mayoría de IHS son cobre niquelado: el baño cambia un poco de rendimiento térmico por resistencia a la corrosión y un acabado limpio.",
      "El IHS lleva la marca de la CPU porque es la única parte del chip que normalmente se ve.",
      "El IHS solo mide un par de milímetros de grosor, y aun así debe repartir el calor de un die que puede superar los 250 W.",
    ],
    problems: [
      "Un IHS abombado o curvado hace mal contacto con el disipador, disparando las temperaturas incluso con buena pasta.",
      "El delidding — quitar el IHS para cambiar la pasta interna — puede agrietar el die si se hace con descuido.",
    ],
  },
  {
    // The layer of thermal paste between the die and the heat spreader.
    id: "tim",
    number: 2,
    meshName: "Thermal Interface Material",
    hotspotOffset: [-0.32, 0.02, 0.1],
    lift: 0.2,
    fadeIn: true,
    color: "#cfe0ff",
    title: "Material de interfaz térmica (TIM)",
    description:
      "El material de interfaz térmica es una capa fina de pasta comprimida entre el die de silicio y el difusor de calor. Rellena los huecos de aire microscópicos que, de lo contrario, atraparían el calor y aislarían el silicio.",
    purpose:
      "Maximiza la transferencia de calor eliminando las minúsculas bolsas de aire entre el die y el IHS, dejando que el calor fluya hacia el disipador.",
    facts: [
      "Las pastas de gama alta usan rellenos de plata o nitruro de boro para empujar la conductividad térmica mucho más allá de la pasta blanca corriente.",
      "La pasta se seca y «se bombea» (pump-out) tras años de ciclos térmicos: por eso reaplicar pasta a una CPU antigua puede bajar drásticamente las temperaturas.",
      "Los TIM de metal líquido conducen el calor aún mejor, pero pueden disolver las bases de aluminio del disipador si se derraman.",
    ],
    problems: [
      "Demasiado poca pasta deja puntos secos; demasiada se desborda por el borde del die y puede cortocircuitar componentes cercanos.",
      "La pasta térmica reseca es la razón más habitual de que las CPUs antiguas empiecen de pronto a calentarse.",
    ],
  },
  {
    // The silicon chip inside the CPU that does all the computing.
    id: "die",
    number: 3,
    meshName: "Silicon Die",
    hotspotOffset: [0.32, -0.02, -0.1],
    lift: 0.1,
    color: "#9fb0c6",
    title: "Die de silicio",
    description:
      "El die de silicio es el procesador en sí: miles de millones de transistores grabados en una lámina finísima de silicio que realiza cada cálculo de tu ordenador.",
    purpose:
      "Ejecuta instrucciones, realiza operaciones aritméticas y mueve datos por el sistema a miles de millones de operaciones por segundo.",
    facts: [
      "Un die moderno agrupa más de 8.000 millones de transistores en unos pocos centímetros cuadrados — cada uno más pequeño que un virus.",
      "Las características del die se miden en nanómetros: un transistor de 5 nm tiene unos 20 átomos de ancho.",
      "El die solo tiene una fracción de milímetro de grosor, y aun así concentra un calor enorme en una zona minúscula.",
    ],
    problems: [
      "El silicio puede degradarse tras años de alto voltaje, reduciendo poco a poco el margen de overclocking.",
      "Un die agrietado — normalmente por presión de montaje o un delid fallido — destruye la CPU al instante.",
    ],
  },
  {
    // The green circuit board that the die sits on.
    id: "substrate",
    number: 4,
    meshName: "Substrate",
    hotspotOffset: [-0.32, -0.05, 0.15],
    lift: -0.14,
    color: "#2f6b34",
    title: "Sustrato",
    description:
      "La placa de circuito verde que lleva el die y lo conecta a la placa base. Miles de pistas microscópicas expanden las señales del die hacia los pines que se enchufan en el zócalo.",
    purpose:
      "Distribuye la alimentación y enruta cada señal de datos entre el silicio y el zócalo de la placa base.",
    facts: [
      "El sustrato es una PCB en miniatura con docenas de capas finas, cada una no más gruesa que un cabello humano.",
      "Cada uno de los pines externos de la CPU — a menudo más de mil — termina en esta pequeña placa.",
      "Su trabajo es el inverso al de la placa base: recoge señales del die denso y las expande hacia el zócalo.",
    ],
    problems: [
      "Las uniones de soldadura agrietadas entre el die y el sustrato provocan cuelgues intermitentes y fallos de POST.",
      "La humedad o la contaminación en los contactos del sustrato pueden causar fallos de arranque e inestabilidad.",
    ],
  },
  {
    // The gold contacts at the bottom of the CPU that plug into the motherboard.
    id: "pins",
    number: 5,
    meshName: "Contact Pins",
    hotspotOffset: [0.32, -0.09, 0.05],
    lift: 0,
    color: "#d8b45a",
    title: "Pines de contacto",
    description:
      "Los pines de contacto dorados que transportan alimentación y datos entre la CPU y el zócalo de la placa base. En chips de escritorio con zócalo como este, son el único enlace físico entre el procesador y el resto del sistema.",
    purpose:
      "Proporcionan la conexión eléctrica y mecánica que asienta la CPU en el zócalo y la mantiene alimentada.",
    facts: [
      "Este chip estilo AM4 lleva cientos de pines dorados, cada uno de los cuales debe alinearse a la perfección con su agujero del zócalo.",
      "Los pines están bañados en oro porque el oro resiste la corrosión que bloquearía las señales eléctricas débiles.",
      "En zócalos PGA los pines viven en la propia CPU, por eso un pin doblado suele significar un procesador arruinado.",
    ],
    problems: [
      "Los pines doblados o rotos son el clásico asesino de CPUs: un solo contacto desalineado puede impedir que el sistema arranque.",
      "El polvo o los restos atrapados entre los pines y el zócalo crean malos contactos y fallos aleatorios.",
    ],
  },
];
