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
    name: "Display Panel",
    meshName: "screen",
    nodes: [5],
    view: [0, 0, 1],
    title: "Display Panel",
    description:
      "The display panel is the monitor's front surface — millions of pixels that turn GPU frames into visible images. The model's panel is an IPS-style screen, where each pixel is a tiny liquid-crystal cell backlit from behind.",
    function:
      "Refreshes millions of pixels in sync with the GPU to render the image you see.",
    importance:
      "The panel defines your whole experience — its resolution, refresh rate, and color accuracy are the difference between a good screen and a great one.",
    facts: [
      "An IPS panel keeps colors accurate when viewed from an angle, unlike TN panels.",
      "The pixels are individually addressable — a 1440p panel has about 3.7 million of them.",
      "Backlight bleed at the edges is a common, mostly cosmetic panel flaw.",
    ],
  },
  {
    id: "power-button",
    number: 2,
    name: "Power Button",
    meshName: "knop_1",
    nodes: [11],
    view: [0.9, -0.1, -0.5],
    focusRadius: 0.12,
    title: "Power Button",
    description:
      "The power button turns the monitor on and off. On this model it is a small joystick-style button on the lower-right edge, usually combined with the on-screen display (OSD) controls.",
    function:
      "Cycles the monitor between powered and standby states, waking it to show signal.",
    importance:
      "A failing power button is a common fault — if it sticks or breaks, the monitor may not wake from sleep.",
    facts: [
      "Many monitors combine the power switch with a menu joystick to save space.",
      "Holding the button down for several seconds forces a full power cycle on many models.",
      "When no signal is present, monitors usually enter a low-power standby automatically.",
    ],
  },
  {
    id: "osd-buttons",
    number: 3,
    name: "OSD / Menu Button",
    meshName: "knop001_2",
    nodes: [13],
    view: [0.9, -0.1, -0.5],
    focusRadius: 0.12,
    title: "OSD / Menu Button",
    description:
      "The on-screen display (OSD) button opens the monitor's settings overlay. From here you adjust brightness, contrast, input source, and color profile without touching software.",
    function:
      "Opens and navigates the monitor's built-in menu to control display settings.",
    importance:
      "The OSD is how you switch between inputs (HDMI 1, HDMI 2…) and tune the picture — essential when the display looks too dim or washed out.",
    facts: [
      "Modern OSD menus can show real-time resolution and refresh-rate readouts.",
      "Some models let you remap buttons to quick-switch between picture modes.",
      "A stuck OSD button can leave menu artifacts overlaid on the image.",
    ],
  },
  {
    id: "power-led",
    number: 4,
    name: "Power / Status LED",
    meshName: "Object_50",
    nodes: [50],
    view: [0, 0, 1],
    title: "Power / Status LED",
    description:
      "The status LED sits on the lower bezel and reports the monitor's state — typically white or blue when on, amber when in standby, and off when powered down.",
    function:
      "Gives a quick visual cue of whether the monitor is on, asleep, or powered off.",
    importance:
      "A flickering or wrong-colored LED can be the first hint of a failing power board or a signal problem.",
    facts: [
      "Many monitors allow you to disable the LED entirely through the OSD.",
      "Some gaming monitors light the LED differently for different refresh-rate modes.",
      "Amber or blinking LED usually means the panel is getting no video signal.",
    ],
  },
  {
    id: "ac-power-port",
    number: 5,
    name: "AC Power Port",
    meshName: "female_power_3",
    nodes: [17],
    view: [0.5, -0.15, -1],
    focusRadius: 0.15,
    title: "AC Power Port",
    description:
      "The AC power port takes mains power from the wall through the power brick or cable. It connects to the monitor's internal power board, which converts AC into the low voltages the panel and electronics need.",
    function:
      "Feeds mains electricity into the monitor's power supply circuitry.",
    importance:
      "A loose or damaged power connector causes intermittent black screens — one of the most common monitor faults.",
    facts: [
      "Most desktop monitors use an internal power supply fed by a figure-eight or C14 cable.",
      "The connector often holds a ferrite choke to filter electrical noise.",
      "Never yank the cable by the wire — the connector pins bend easily.",
    ],
  },
  {
    id: "audio-jack",
    number: 6,
    name: "Audio Jack",
    meshName: "audiojack_5",
    nodes: [22],
    view: [0.35, -0.1, -1],
    focusRadius: 0.15,
    title: "Audio Jack",
    description:
      "The audio jack lets you plug headphones or speakers directly into the monitor. Audio arriving over HDMI or DisplayPort is passed through to this 3.5 mm output.",
    function:
      "Outputs monitor audio to headphones or external speakers.",
    importance:
      "It saves you running a separate audio cable to the PC when your GPU is connected by HDMI or DisplayPort.",
    facts: [
      "Not all monitors pass audio through — it depends on the panel's audio board.",
      "Some models mute their built-in speakers when the jack is plugged in.",
      "The jack output volume is often tied to the monitor's own volume control.",
    ],
  },
  {
    id: "hdmi-1",
    number: 7,
    name: "HDMI Port 1",
    meshName: "hdmi_6",
    nodes: [24],
    view: [0.2, -0.1, -1],
    focusRadius: 0.15,
    title: "HDMI Port 1",
    description:
      "HDMI (High-Definition Multimedia Interface) carries both video and audio over a single cable. This port connects your GPU, console, or laptop to the monitor's picture.",
    function:
      "Carries digital video and audio from a source device to the display.",
    importance:
      "HDMI is the most common connection in consumer displays — a damaged port means no signal from that input.",
    facts: [
      "HDMI 2.1 supports 4K at 120 Hz and beyond, while older 2.0 tops out at 4K/60.",
      "HDMI can also carry Ethernet and CEC control commands on the same cable.",
      "The connector is keyed so it only fits one way — check before inserting.",
    ],
  },
  {
    id: "hdmi-2",
    number: 8,
    name: "HDMI Port 2",
    meshName: "hdmi001_7",
    nodes: [27],
    view: [0.2, -0.1, -1],
    focusRadius: 0.15,
    title: "HDMI Port 2",
    description:
      "The second HDMI input lets a monitor handle two sources at once. Switch between your PC and a console, streaming box, or second laptop without unplugging cables.",
    function:
      "Provides an extra digital video/audio input for multi-source setups.",
    importance:
      "Multiple HDMI ports let you share one monitor between devices and switch instantly from the OSD.",
    facts: [
      "Most monitors label inputs so you can rename them (e.g. 'PC', 'Console').",
      "The monitor usually auto-detects which input has a live signal.",
      "Two HDMI ports often share the same internal video processor.",
    ],
  },
  {
    id: "hdmi-3",
    number: 9,
    name: "HDMI Port 3",
    meshName: "hdmi002_8",
    nodes: [30],
    view: [0.2, -0.1, -1],
    focusRadius: 0.15,
    title: "HDMI Port 3",
    description:
      "The third HDMI input adds even more flexibility — a true multi-input hub that can serve a work PC, a gaming console, and a media device all at once.",
    function:
      "Offers a third simultaneous HDMI input for connecting more source devices.",
    importance:
      "With three HDMI inputs you can keep every device plugged in and switch on demand — no cable swapping.",
    facts: [
      "Some models include a single DisplayPort or USB-C that doubles as a video input.",
      "Input switching can be automated with CEC or auto-source detection.",
      "High port count is common on office and professional monitors, not gaming ones.",
    ],
  },
  {
    id: "stand",
    number: 10,
    name: "Stand & Base",
    meshName: "voetonder_13",
    nodes: [36, 40],
    view: [0, 0.35, 1],
    title: "Stand & Base",
    description:
      "The stand and base support the panel and let you adjust its height, tilt, and sometimes rotation. The arm holds the screen while the wide base keeps the whole monitor stable on a desk.",
    function:
      "Supports the panel securely and allows ergonomic positioning.",
    importance:
      "A solid, adjustable stand reduces neck and eye strain — and a wobbly base can send a monitor toppling.",
    facts: [
      "Most stands support VESA mounting as an alternative to the stock base.",
      "Height-adjustable stands let you line the screen top up with eye level.",
      "Monitors weigh 3–7 kg; the base must be heavy enough to counterbalance the panel.",
    ],
  },
];
