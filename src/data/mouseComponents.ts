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

export const MOUSE_PARTS: MousePart[] = [
  {
    id: "left-button",
    number: 1,
    name: "Left Button",
    position: [-0.22, 0.1, -0.36],
    view: [-0.55, 0.35, 1.0],
    title: "Left Button",
    description:
      "The primary left button is the mouse's main trigger — the one you click for almost every interaction. Under it, a micro switch closes an electrical contact that registers each press and releases with a satisfying click.",
    function:
      "Sends the primary click signal to the computer, driving selections, drags, and most interface actions.",
    importance:
      "It is the most-clicked input in computing — its switch durability (often rated in millions of clicks) determines how long a mouse lasts.",
    facts: [
      "Most mice use Omron-style micro switches rated for 50–80 million clicks.",
      "Double-clicking or missed clicks happen when switch contacts wear out or bounce.",
      "Some gaming mice add adjustable actuation force to make clicks lighter or heavier.",
    ],
  },
  {
    id: "right-button",
    number: 2,
    name: "Right Button",
    position: [0.22, 0.1, -0.36],
    view: [0.55, 0.35, 1.0],
    title: "Right Button",
    description:
      "The right button opens context menus and secondary actions. It uses the same micro-switch design as the left button, just wired to a different signal that the operating system maps to secondary functionality.",
    function:
      "Triggers context menus, secondary actions, and app-specific shortcuts through the right-click signal.",
    importance:
      "Right-click is central to everyday workflows — right-clicking is how you copy, paste, inspect, and manage nearly everything on a desktop.",
    facts: [
      "Right-clicking originally shipped with the first Apple mouse in 2005.",
      "On many mice the right button is mirrored in shape but otherwise identical to the left.",
      "Trackpad gestures can emulate right-click, but a physical button remains faster for many users.",
    ],
  },
  {
    id: "scroll-wheel",
    number: 3,
    name: "Scroll Wheel",
    position: [0, 0.13, -0.42],
    view: [0, 0.45, 1.0],
    title: "Scroll Wheel",
    description:
      "The scroll wheel sits between the two main buttons. Its notched rotation sends scrolling pulses as you roll it, and the wheel itself is also a middle button — clicking it opens auto-scroll or middle-click functions.",
    function:
      "Scrolls pages and documents smoothly, and acts as a third clickable button for middle-click actions.",
    importance:
      "The wheel is how you navigate long pages and timelines without moving the cursor — worn-out wheels make scrolling erratic or jumpy.",
    facts: [
      "Magnetic and free-spinning scroll wheels can let you fling through 100 pages in a single spin.",
      "The notches are created by a detent wheel or, on premium mice, a magnetic encoder.",
      "Clicking the wheel often opens links in new tabs or enables panning in apps.",
    ],
  },
  {
    id: "dpi-button",
    number: 4,
    name: "DPI Button",
    position: [0, 0.15, -0.28],
    view: [0, 0.9, 0.6],
    title: "DPI Button",
    description:
      "The DPI button sits just behind the scroll wheel. It cycles the sensor's sensitivity — dots per inch — letting you switch cursor speed on the fly for tasks like precise aiming or fast sweeping.",
    function:
      "Adjusts the mouse sensor's resolution to change how far the cursor moves per inch of physical movement.",
    importance:
      "Being able to change DPI mid-session is essential for competitive games and precise design work without digging into software settings.",
    facts: [
      "DPI stands for dots per inch — the number of pixels the cursor moves per inch of mouse travel.",
      "High-end sensors track up to 26,000 DPI, though most people play under 1,600.",
      "Some mice store multiple DPI steps so a single button press cycles through presets.",
    ],
  },
  {
    id: "body",
    number: 5,
    name: "Body & Main Shell",
    position: [0, 0.16, -0.1],
    view: [0, 1.0, 0.35],
    title: "Body & Main Shell",
    description:
      "The main shell is the mouse's outer housing and palm rest. It shapes the grip, channels the buttons, and protects the electronics inside while the rubberized or matte finish provides grip.",
    function:
      "Houses the sensor, switches, and controller, while giving the hand a comfortable, stable platform.",
    importance:
      "Ergonomics decide comfort over hours of use — a poorly shaped shell causes fatigue, strain, and wrist pain.",
    facts: [
      "Mouse shapes fall into categories like palm, claw, and fingertip grips.",
      "Perforated 'honeycomb' shells shave grams off ultralight gaming mice.",
      "Coating and texture matter more than most people think — sweaty palms degrade grip on glossy plastic.",
    ],
  },
  {
    id: "sensor",
    number: 6,
    name: "Optical Sensor",
    position: [0, -0.16, -0.08],
    view: [0, -1.0, 0.45],
    title: "Optical Sensor",
    description:
      "On the underside, the optical sensor photographs the surface at thousands of frames per second. It tracks dust speckles and texture details to compute exactly how far and fast the mouse is moving.",
    function:
      "Captures surface motion and converts it into precise cursor movement data sent to the computer.",
    importance:
      "Sensor quality defines accuracy — a good sensor tracks gliding motion without jitter, acceleration, or angle snapping.",
    facts: [
      "Modern sensors track at up to 8,000 Hz, sampling movement 8,000 times per second.",
      "Lift-off distance matters — gamers lift the mouse constantly, so low lift-off avoids cursor drift.",
      "White paper and dark mousepads can fool weaker sensors; premium sensors handle almost any surface.",
    ],
  },
  {
    id: "cable",
    number: 7,
    name: "Cable & Connection",
    position: [0, 0.02, 0.44],
    view: [0, 0.25, -1.0],
    title: "Cable & Connection",
    description:
      "The cable carries the mouse's data and power back to the computer. Its flexible braided sheath reduces drag, and the connector plugs into a USB port — or, on wireless models, a dongle or Bluetooth replaces the cord entirely.",
    function:
      "Transmits button presses and sensor data to the computer while powering the mouse's electronics.",
    importance:
      "Connection quality affects both latency and freedom of movement — a stiff cable drags, while a failing connection causes cursor stutters.",
    facts: [
      "Wired gaming mice report as fast as 1 ms with USB polling.",
      "Paracord-style cables are nearly drag-free and popular among esports players.",
      "Wireless mice use 2.4 GHz dongles for low latency, while Bluetooth trades some speed for convenience.",
    ],
  },
];
