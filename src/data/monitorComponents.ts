// Data describing the parts of a monitor that can be explored in 3D.
// Each part is a clickable hotspot on the model (screen, ports, buttons, stand, etc.).

// Describes one monitor part: which 3D mesh it belongs to, where it is, and the text about it.
export type MonitorPart = {
  id: string;
  number: number;
  name: string;
  meshName?: string;
  nodes: number[];
  offset?: [number, number, number];
  view?: [number, number, number];
  focusRadius?: number;
  title: string;
  description: string;
  function: string;
  importance: string;
  facts: string[];
};

// The full list of monitor parts, each with its own learning text.
export const MONITOR_PARTS: MonitorPart[] = [
  {
    id: "screen",
    number: 1,
    name: "Panel de visualización",
    meshName: "screen",
    nodes: [5],
    view: [0, 0, 1],
    title: "Panel de visualización",
    description:
      "El panel de visualización es la superficie frontal del monitor: millones de píxeles que convierten los fotogramas de la GPU en imágenes visibles. El panel de este modelo es una pantalla estilo IPS, donde cada píxel es una minúscula celda de cristal líquido iluminada desde detrás.",
    function:
      "Refresca millones de píxeles sincronizados con la GPU para renderizar la imagen que ves.",
    importance:
      "El panel define toda tu experiencia: su resolución, tasa de refresco y precisión de color marcan la diferencia entre una buena pantalla y una excelente.",
    facts: [
      "Un panel IPS mantiene los colores precisos al verlo desde un ángulo, a diferencia de los paneles TN.",
      "Los píxeles son direccionables individualmente: un panel 1440p tiene unos 3,7 millones de ellos.",
      "El light bleed (fuga de luz) en los bordes es un defecto habitual del panel, sobre todo cosmético.",
    ],
  },
  {
    id: "power-button",
    number: 2,
    name: "Botón de encendido",
    meshName: "knop_1",
    nodes: [11],
    view: [0.9, -0.1, -0.5],
    focusRadius: 0.12,
    title: "Botón de encendido",
    description:
      "El botón de encendido enciende y apaga el monitor. En este modelo es un pequeño botón tipo joystick en el borde inferior derecho, normalmente combinado con los controles del menú en pantalla (OSD).",
    function:
      "Cambia el monitor entre estados de encendido y espera (standby), despertándolo para mostrar la señal.",
    importance:
      "Un botón de encendido defectuoso es un fallo habitual: si se queda atascado o se rompe, el monitor puede no despertar del reposo.",
    facts: [
      "Muchos monitores combinan el interruptor de encendido con un joystick de menú para ahorrar espacio.",
      "Mantener el botón pulsado varios segundos fuerza un ciclo de apagado completo en muchos modelos.",
      "Cuando no hay señal, los monitores suelen entrar automáticamente en un standby de bajo consumo.",
    ],
  },
  {
    id: "osd-buttons",
    number: 3,
    name: "Botón OSD / Menú",
    meshName: "knop001_2",
    nodes: [13],
    view: [0.9, -0.1, -0.5],
    focusRadius: 0.12,
    title: "Botón OSD / Menú",
    description:
      "El botón del menú en pantalla (OSD) abre la superposición de ajustes del monitor. Desde aquí ajustas brillo, contraste, fuente de entrada y perfil de color sin tocar el software.",
    function:
      "Abre y navega por el menú integrado del monitor para controlar los ajustes de visualización.",
    importance:
      "El OSD es cómo cambias entre entradas (HDMI 1, HDMI 2…) y afinas la imagen: esencial cuando la pantalla se ve demasiado oscura o lavada.",
    facts: [
      "Los menús OSD modernos pueden mostrar lecturas en tiempo real de resolución y tasa de refresco.",
      "Algunos modelos permiten reasignar botones para cambiar rápidamente entre modos de imagen.",
      "Un botón OSD atascado puede dejar artefactos de menú superpuestos a la imagen.",
    ],
  },
  {
    id: "power-led",
    number: 4,
    name: "LED de encendido / estado",
    meshName: "Object_50",
    nodes: [50],
    view: [0, 0, 1],
    title: "LED de encendido / estado",
    description:
      "El LED de estado se sitúa en el bisel inferior e informa del estado del monitor: normalmente blanco o azul cuando está encendido, ámbar en standby y apagado cuando no hay corriente.",
    function:
      "Ofrece una pista visual rápida de si el monitor está encendido, en reposo o apagado.",
    importance:
      "Un LED parpadeante o de color incorrecto puede ser la primera pista de una placa de alimentación defectuosa o un problema de señal.",
    facts: [
      "Muchos monitores permiten desactivar el LED por completo desde el OSD.",
      "Algunos monitores gaming iluminan el LED de forma distinta según el modo de tasa de refresco.",
      "Un LED ámbar o parpadeante suele significar que el panel no recibe señal de vídeo.",
    ],
  },
  {
    id: "ac-power-port",
    number: 5,
    name: "Puerto de alimentación AC",
    meshName: "female_power_3",
    nodes: [17],
    view: [0.5, -0.15, -1],
    focusRadius: 0.15,
    title: "Puerto de alimentación AC",
    description:
      "El puerto de alimentación AC recibe la corriente de la red a través del transformador o el cable. Se conecta a la placa de alimentación interna del monitor, que convierte la AC en las bajas tensiones que necesitan el panel y la electrónica.",
    function:
      "Introduce la electricidad de la red en la circuitería de alimentación del monitor.",
    importance:
      "Un conector de alimentación flojo o dañado provoca pantallas negras intermitentes: uno de los fallos más habituales de monitor.",
    facts: [
      "La mayoría de monitores de escritorio usan una fuente interna alimentada por un cable en forma de ocho o C14.",
      "El conector suele llevar un filtro de ferrita para atenuar el ruido eléctrico.",
      "Nunca tires del cable por el hilo: los pines del conector se doblan con facilidad.",
    ],
  },
  {
    id: "audio-jack",
    number: 6,
    name: "Jack de audio",
    meshName: "audiojack_5",
    nodes: [22],
    view: [0.35, -0.1, -1],
    focusRadius: 0.15,
    title: "Jack de audio",
    description:
      "El jack de audio permite enchufar auriculares o altavoces directamente al monitor. El audio que llega por HDMI o DisplayPort se pasa a esta salida de 3,5 mm.",
    function:
      "Saca el audio del monitor a auriculares o altavoces externos.",
    importance:
      "Te ahorra llevar un cable de audio aparte al PC cuando tu GPU está conectada por HDMI o DisplayPort.",
    facts: [
      "No todos los monitores pasan el audio: depende de la placa de audio del panel.",
      "Algunos modelos silencian sus altavoces integrados cuando se enchufa el jack.",
      "El volumen de salida del jack suele estar ligado al control de volumen del propio monitor.",
    ],
  },
  {
    id: "hdmi-1",
    number: 7,
    name: "Puerto HDMI 1",
    meshName: "hdmi_6",
    nodes: [24],
    view: [0.2, -0.1, -1],
    focusRadius: 0.15,
    title: "Puerto HDMI 1",
    description:
      "HDMI (High-Definition Multimedia Interface) transporta vídeo y audio por un solo cable. Este puerto conecta tu GPU, consola o portátil a la imagen del monitor.",
    function:
      "Transporta vídeo y audio digitales desde un dispositivo fuente hasta la pantalla.",
    importance:
      "HDMI es la conexión más habitual en pantallas de consumo: un puerto dañado significa sin señal desde esa entrada.",
    facts: [
      "HDMI 2.1 admite 4K a 120 Hz y más, mientras que el 2.0 antiguo se queda en 4K/60.",
      "HDMI también puede transportar Ethernet y comandos de control CEC por el mismo cable.",
      "El conector está ranurado (keyed) para que solo encaje en un sentido: comprueba antes de insertarlo.",
    ],
  },
  {
    id: "hdmi-2",
    number: 8,
    name: "Puerto HDMI 2",
    meshName: "hdmi001_7",
    nodes: [27],
    view: [0.2, -0.1, -1],
    focusRadius: 0.15,
    title: "Puerto HDMI 2",
    description:
      "La segunda entrada HDMI permite que un monitor gestione dos fuentes a la vez. Cambia entre tu PC y una consola, un streaming box o un segundo portátil sin desenchufar cables.",
    function:
      "Ofrece una entrada digital extra de vídeo/audio para configuraciones con varias fuentes.",
    importance:
      "Varias entradas HDMI permiten compartir un monitor entre dispositivos y cambiar al instante desde el OSD.",
    facts: [
      "La mayoría de monitores etiquetan las entradas para que puedas renombrarlas (p. ej. «PC», «Consola»).",
      "El monitor suele detectar automáticamente qué entrada tiene señal activa.",
      "Dos puertos HDMI a menudo comparten el mismo procesador de vídeo interno.",
    ],
  },
  {
    id: "hdmi-3",
    number: 9,
    name: "Puerto HDMI 3",
    meshName: "hdmi002_8",
    nodes: [30],
    view: [0.2, -0.1, -1],
    focusRadius: 0.15,
    title: "Puerto HDMI 3",
    description:
      "La tercera entrada HDMI añade aún más flexibilidad: un verdadero hub multi-entrada que puede servir a un PC de trabajo, una consola y un dispositivo multimedia a la vez.",
    function:
      "Ofrece una tercera entrada HDMI simultánea para conectar más dispositivos fuente.",
    importance:
      "Con tres entradas HDMI puedes dejar todos los dispositivos enchufados y cambiar bajo demanda, sin intercambiar cables.",
    facts: [
      "Algunos modelos incluyen un DisplayPort o USB-C único que también sirve como entrada de vídeo.",
      "El cambio de entrada puede automatizarse con CEC o detección automática de fuente.",
      "Un alto número de puertos es habitual en monitores de oficina y profesionales, no tanto en los gaming.",
    ],
  },
  {
    id: "stand",
    number: 10,
    name: "Soporte y base",
    meshName: "voetonder_13",
    nodes: [36, 40],
    view: [0, 0.35, 1],
    title: "Soporte y base",
    description:
      "El soporte y la base sostienen el panel y permiten ajustar su altura, inclinación y a veces la rotación. El brazo sujeta la pantalla mientras la base ancha mantiene estable todo el monitor sobre el escritorio.",
    function:
      "Sostiene el panel con seguridad y permite un posicionamiento ergonómico.",
    importance:
      "Un soporte sólido y ajustable reduce la tensión de cuello y ojos — y una base inestable puede hacer caer el monitor.",
    facts: [
      "La mayoría de soportes admiten montaje VESA como alternativa a la base de serie.",
      "Los soportes con altura ajustable permiten alinear la parte superior de la pantalla con la altura de los ojos.",
      "Los monitores pesan 3–7 kg; la base debe ser lo bastante pesada para contrapesar el panel.",
    ],
  },
];
