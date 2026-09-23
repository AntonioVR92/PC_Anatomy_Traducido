// Data describing the parts of a mouse that can be explored in 3D.
// Each part is a clickable hotspot on the mouse (buttons, wheel, sensor, body, cable, etc.).

// Describes one mouse part: its 3D position on the model and the text about it.
export type MousePart = {
  id: string;
  number: number;
  name: string;
  position: [number, number, number];
  view?: [number, number, number];
  title: string;
  description: string;
  function: string;
  importance: string;
  facts: string[];
};

// The full list of mouse parts, each with its own learning text.
export const MOUSE_PARTS: MousePart[] = [
  {
    id: "left-button",
    number: 1,
    name: "Botón izquierdo",
    position: [-0.22, 0.1, -0.36],
    view: [-0.55, 0.35, 1.0],
    title: "Botón izquierdo",
    description:
      "El botón izquierdo principal es el disparador del ratón: el que pulsas en casi cada interacción. Debajo, un microinterruptor cierra un contacto eléctrico que registra cada pulsación y se libera con un clic satisfactorio.",
    function:
      "Envía la señal de clic principal al ordenador, impulsando selecciones, arrastres y la mayoría de acciones de la interfaz.",
    importance:
      "Es la entrada más pulsada de la informática: la durabilidad de su interruptor (a menudo valorada en millones de clics) determina cuánto dura un ratón.",
    facts: [
      "La mayoría de ratones usan microinterruptores estilo Omron valorados para 50–80 millones de clics.",
      "Los doble clics o clics fallidos aparecen cuando los contactos del interruptor se desgastan o rebotan.",
      "Algunos ratones gaming añaden fuerza de actuación ajustable para hacer los clics más suaves o más duros.",
    ],
  },
  {
    id: "right-button",
    number: 2,
    name: "Botón derecho",
    position: [0.22, 0.1, -0.36],
    view: [0.55, 0.35, 1.0],
    title: "Botón derecho",
    description:
      "El botón derecho abre menús contextuales y acciones secundarias. Usa el mismo diseño de microinterruptor que el izquierdo, pero cableado a una señal distinta que el sistema operativo asocia a la funcionalidad secundaria.",
    function:
      "Activa menús contextuales, acciones secundarias y atajos específicos de cada aplicación mediante la señal de clic derecho.",
    importance:
      "El clic derecho es central en el trabajo diario: es cómo copias, pegas, inspeccionas y gestionas casi todo en el escritorio.",
    facts: [
      "El clic derecho llegó originalmente con el primer ratón de Apple en 2005.",
      "En muchos ratones el botón derecho es espejo en forma, pero por lo demás idéntico al izquierdo.",
      "Los gestos del trackpad pueden emular el clic derecho, pero un botón físico sigue siendo más rápido para muchos usuarios.",
    ],
  },
  {
    id: "scroll-wheel",
    number: 3,
    name: "Rueda de desplazamiento",
    position: [0, 0.13, -0.42],
    view: [0, 0.45, 1.0],
    title: "Rueda de desplazamiento",
    description:
      "La rueda de desplazamiento se sitúa entre los dos botones principales. Su rotación dentada envía pulsos de scroll al girarla, y la propia rueda es también un botón central: al pulsarla se abren el auto-scroll o las funciones de clic medio.",
    function:
      "Desplaza páginas y documentos con suavidad, y actúa como tercer botón pulsable para acciones de clic medio.",
    importance:
      "La rueda es cómo navegas páginas largas y líneas de tiempo sin mover el cursor: las ruedas desgastadas hacen el scroll irregular o a saltos.",
    facts: [
      "Las ruedas magnéticas y de giro libre permiten recorrer 100 páginas de un solo impulso.",
      "Los dientes los crea una rueda de retención o, en ratones premium, un encoder magnético.",
      "Pulsar la rueda suele abrir enlaces en pestañas nuevas o activar el paneo en aplicaciones.",
    ],
  },
  {
    id: "dpi-button",
    number: 4,
    name: "Botón DPI",
    position: [0, 0.15, -0.28],
    view: [0, 0.9, 0.6],
    title: "Botón DPI",
    description:
      "El botón DPI se sitúa justo detrás de la rueda. Cicla la sensibilidad del sensor — puntos por pulgada — permitiéndote cambiar la velocidad del cursor al vuelo para tareas como apuntar con precisión o barridos rápidos.",
    function:
      "Ajusta la resolución del sensor del ratón para cambiar cuánto se mueve el cursor por cada pulgada de movimiento físico.",
    importance:
      "Poder cambiar el DPI a mitad de sesión es esencial en juegos competitivos y trabajo de diseño preciso, sin tener que entrar en ajustes de software.",
    facts: [
      "DPI significa dots per inch (puntos por pulgada): el número de píxeles que se mueve el cursor por cada pulgada de recorrido del ratón.",
      "Los sensores de gama alta rastrean hasta 26.000 DPI, aunque la mayoría de la gente juega por debajo de 1.600.",
      "Algunos ratones guardan varios escalones de DPI para que una sola pulsación ciclé entre presets.",
    ],
  },
  {
    id: "body",
    number: 5,
    name: "Cuerpo y carcasa principal",
    position: [0, 0.16, -0.1],
    view: [0, 1.0, 0.35],
    title: "Cuerpo y carcasa principal",
    description:
      "La carcasa principal es la carcasa exterior del ratón y el reposamanos. Define el agarre, canaliza los botones y protege la electrónica interior, mientras el acabado gomoso o mate proporciona adherencia.",
    function:
      "Aloja el sensor, los interruptores y el controlador, ofreciendo a la mano una plataforma cómoda y estable.",
    importance:
      "La ergonomía decide la comodidad tras horas de uso: una carcasa mal diseñada provoca fatiga, tensión y dolor de muñeca.",
    facts: [
      "Las formas de ratón se agrupan en categorías como agarre de palma, de garra y de yema.",
      "Las carcasas perforadas «honeycomb» quitan gramos a los ratones gaming ultraligeros.",
      "El revestimiento y la textura importan más de lo que mucha gente cree: las palmas sudorosas pierden agarre en el plástico brillante.",
    ],
  },
  {
    id: "sensor",
    number: 6,
    name: "Sensor óptico",
    position: [0, -0.16, -0.08],
    view: [0, -1.0, 0.45],
    title: "Sensor óptico",
    description:
      "En la parte inferior, el sensor óptico fotografía la superficie a miles de fotogramas por segundo. Rastrea motas de polvo y detalles de textura para calcular exactamente cuánto y a qué velocidad se mueve el ratón.",
    function:
      "Captura el movimiento sobre la superficie y lo convierte en datos precisos de movimiento del cursor enviados al ordenador.",
    importance:
      "La calidad del sensor define la precisión: un buen sensor rastrea el deslizamiento sin jitter, aceleración ni angle snapping.",
    facts: [
      "Los sensores modernos rastrean a hasta 8.000 Hz, muestreando el movimiento 8.000 veces por segundo.",
      "La distancia de despegue importa: los jugadores levantan el ratón constantemente, así que un lift-off bajo evita el arrastre del cursor.",
      "El papel blanco y las alfombrillas oscuras pueden engañar a sensores débiles; los sensores premium manejan casi cualquier superficie.",
    ],
  },
  {
    id: "cable",
    number: 7,
    name: "Cable y conexión",
    position: [0, 0.02, 0.44],
    view: [0, 0.25, -1.0],
    title: "Cable y conexión",
    description:
      "El cable lleva los datos y la alimentación del ratón de vuelta al ordenador. Su funda trenzada flexible reduce el arrastre, y el conector se enchufa a un puerto USB — o, en modelos inalámbricos, un dongle o Bluetooth sustituye el cable por completo.",
    function:
      "Transmite las pulsaciones de botones y los datos del sensor al ordenador mientras alimenta la electrónica del ratón.",
    importance:
      "La calidad de la conexión afecta tanto a la latencia como a la libertad de movimiento: un cable rígido arrastra, y una conexión defectuosa provoca tirones del cursor.",
    facts: [
      "Los ratones gaming con cable reportan tan rápido como 1 ms con polling USB.",
      "Los cables estilo paracord casi no arrastran y son populares entre jugadores de esports.",
      "Los ratones inalámbricos usan dongles de 2,4 GHz para baja latencia, mientras que Bluetooth cambia algo de velocidad por comodidad.",
    ],
  },
];
