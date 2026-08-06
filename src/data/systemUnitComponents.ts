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

export type SystemUnitComponent = SystemUnitPart;

export const SYSTEM_UNIT_PARTS: SystemUnitPart[] = [
  {
    id: "case",
    number: 1,
    name: "Case & Chassis",
    meshName: "Case",
    nodes: [1391],
    offset: [0, 1.6, 0.3],
    view: [0.5, 0.4, 1.0],
    title: "Case & Chassis",
    description:
      "The case is the structural skeleton of the system unit. It anchors every component, guides airflow from intake to exhaust, hides cables, and shields the parts inside from dust, static, and physical damage — with tempered glass panels to show it all off.",
    function:
      "Mounts the motherboard, GPU, PSU, drives, and fans while directing airflow and routing cables for a cool, clean build.",
    importance:
      "The chassis decides what fits — motherboard size, GPU length, cooler height, and fan counts all depend on the case you choose.",
    facts: [
      "Tempered glass side panels give a view of the internals but add weight and fragility.",
      "Mesh-front cases feed fans more air than sealed glass fronts, improving thermals.",
      "Cable-routing channels behind the motherboard tray keep airflow unobstructed.",
    ],
  },
  {
    id: "motherboard",
    number: 2,
    name: "Motherboard",
    meshName: "MotherBoard",
    nodes: [4],
    view: [0.25, 0.05, 0.97],
    title: "Motherboard",
    description:
      "The motherboard is the main printed circuit board that physically and electrically ties the whole system together. Power, data, and control signals travel across its traces between the CPU, RAM, GPU, storage, and every header and port.",
    function:
      "Distributes power from the PSU, routes data between components, and hosts the CPU, memory, expansion slots, and I/O.",
    importance:
      "Every part plugs into the board — its socket, chipset, and layout define which components your system can use.",
    facts: [
      "The board is mounted on brass standoffs so it never shorts against the case.",
      "The 24-pin ATX power header feeds the whole board from the PSU.",
      "Front-panel headers carry the power button, LEDs, and USB to the front of the case.",
    ],
  },
  {
    id: "cpu",
    number: 3,
    name: "CPU & Water Block",
    meshName: "CPU",
    nodes: [1327, 2123],
    view: [0, 1, 0.35],
    title: "CPU & Water Block",
    description:
      "The CPU is the silicon brain of the system, executing billions of instructions per second. Here it is capped by a liquid-cooling water block — a copper plate and micro-channel labyrinth that pulls heat straight off the processor die and into the cooling loop.",
    function:
      "Executes all program instructions and coordinates the system, while the water block conducts its heat into the liquid cooling loop.",
    importance:
      "Without efficient cooling the CPU throttles or shuts down — the water block is what lets it sustain full boost clocks under load.",
    facts: [
      "Water blocks transfer heat far more efficiently than air coolers, enabling quieter builds.",
      "Thermal paste fills the microscopic gaps between the CPU lid and the block's cold plate.",
      "A single CPU can pull over 200 W — enough to heat a small room under sustained load.",
    ],
  },
  {
    id: "ram",
    number: 4,
    name: "RAM Modules",
    meshName: "RAM",
    nodes: [1975, 1962, 1949, 1936],
    view: [0.7, 0.7, 0.35],
    title: "RAM Modules",
    description:
      "RAM is the system's high-speed working memory. These four modules hold the data and instructions the CPU is actively using, trading capacity for the nanosecond access times that keep everything running smoothly.",
    function:
      "Stores active programs and data for instant CPU access, acting as the fast staging area between the CPU and storage.",
    importance:
      "Capacity and speed set how many tasks you can juggle — too little RAM forces the system to spill work onto slower storage.",
    facts: [
      "Populating alternate slots enables dual-channel mode for higher bandwidth.",
      "Each module here carries a heatsink — and on this build, RGB lighting.",
      "RAM is volatile: everything in it vanishes the instant power is cut.",
    ],
  },
  {
    id: "m2-ssd",
    number: 5,
    name: "M.2 SSD",
    meshName: "M2",
    nodes: [1332],
    view: [0.25, 0.15, 0.95],
    title: "M.2 SSD",
    description:
      "The M.2 SSD is a slim, gumstick-sized NVMe drive mounted directly on the motherboard. It connects over PCIe lanes, bypassing the SATA bottleneck to reach multi-gigabyte-per-second transfer speeds — the reason modern PCs boot in seconds.",
    function:
      "Hosts the operating system and hot files on flash memory connected straight to the CPU or chipset over PCIe.",
    importance:
      "As the fastest storage tier in the system, it defines how snappy boot, app launch, and file access feel.",
    facts: [
      "Top M.2 NVMe drives read over 7 GB/s — fast enough to copy a movie in under a second.",
      "The drive screws directly to the motherboard tray, needing no cables.",
      "Hot M.2 drives can throttle, which is why some sit under dedicated heatsinks.",
    ],
  },
  {
    id: "ssd",
    number: 6,
    name: "SATA SSD",
    meshName: "SSD",
    nodes: [1988],
    view: [0.35, 0.55, 0.95],
    title: "SATA SSD",
    description:
      "This 2.5-inch solid state drive stores data on flash chips rather than spinning platters. Mounted in a drive bay, it offers silent, shock-resistant bulk storage that still outpaces any mechanical hard drive by a wide margin.",
    function:
      "Persists programs, games, and files on flash memory, delivering fast random access with no moving parts.",
    importance:
      "It's the ideal companion drive — quiet, durable, and quick enough for games and media that don't need M.2 speeds.",
    facts: [
      "A 2.5-inch SATA SSD tops out around 550 MB/s, still roughly ten times faster than an HDD.",
      "With no moving parts, SSDs survive drops and vibration that would destroy a mechanical drive.",
      "The drive bolts into a tray and connects with a thin SATA data cable and a power lead.",
    ],
  },
  {
    id: "gpu",
    number: 7,
    name: "Graphics Card",
    meshName: "RTX2080ti",
    nodes: [1532, 1537, 1849, 1878],
    view: [0.5, 0.35, 1.0],
    title: "Graphics Card",
    description:
      "The graphics card is a massively parallel processor that renders every frame you see. This RTX-class GPU uses thousands of cores to draw 3D scenes, while its triple-fan heatsink and copper heat pipes keep the silicon cool under load.",
    function:
      "Renders graphics for the display and offloads parallel compute for AI, video, and scientific workloads.",
    importance:
      "It's the biggest performance lever for gaming and creative work — and the largest, heaviest component in the case.",
    facts: [
      "Modern GPUs pack over 16,000 cores and draw more power than the whole rest of the PC.",
      "GPU fans are held off until the card gets hot, keeping the system silent at idle.",
      "Many cards support RGB and dual BIOS for quiet and performance modes.",
    ],
  },
  {
    id: "radiator",
    number: 8,
    name: "Liquid Cooler Radiator",
    meshName: "Radiator",
    nodes: [1913, 1990, 2018, 2046],
    view: [0, 0.85, 0.6],
    title: "Liquid Cooler Radiator",
    description:
      "The radiator is where the liquid cooling loop sheds its heat. Warm coolant flows through dozens of thin metal fins while fans push air across them, dumping the CPU and GPU's heat into the case and out of the system.",
    function:
      "Dissipates heat carried by the coolant into the air, transferring it from the water loop to the room.",
    importance:
      "The radiator's size and fan configuration determine how much heat the loop can reject — and how quiet the build stays.",
    facts: [
      "Thicker radiators with more fins reject more heat but need stronger fans.",
      "The radiator mounts to the top or front of the case, often behind the glass.",
      "Push-pull fan setups (fans on both sides) boost airflow at the cost of extra screws.",
    ],
  },
  {
    id: "pump",
    number: 9,
    name: "Pump & Reservoir",
    meshName: "Res_Pump",
    nodes: [2138, 2148, 2171],
    view: [-0.35, 0.3, 1.0],
    title: "Pump & Reservoir",
    description:
      "The pump is the heart of the liquid cooling loop. It drives coolant through the water block, tubes, and radiator, while the integrated reservoir holds spare fluid, bleeds air out of the system, and makes maintenance easy.",
    function:
      "Circulates coolant continuously around the loop and stores extra fluid, removing trapped air bubbles.",
    importance:
      "If the pump stops, the loop loses circulation and the CPU heats up within seconds — it must run reliably at all times.",
    facts: [
      "Liquid cooling pumps use brushless motors that can run for years without wear.",
      "The reservoir lets you see coolant level and helps purge air bubbles after filling.",
      "Pump speed is often tied to CPU temperature for quiet operation at idle.",
    ],
  },
  {
    id: "psu",
    number: 10,
    name: "Power Supply",
    meshName: "PSU",
    nodes: [2175],
    view: [0.65, 0.3, 0.95],
    title: "Power Supply",
    description:
      "The power supply converts mains AC power into the clean, regulated DC voltages every component needs. Housed in its own compartment at the bottom of the case, it feeds the motherboard, GPU, and drives while protecting the system from surges.",
    function:
      "Steps down and rectifies wall power into +12 V, +5 V, and +3.3 V rails, delivering stable power under load.",
    importance:
      "PSU quality determines system stability and longevity — a weak unit can reboot, shut down, or even damage other parts.",
    facts: [
      "A gold-rated PSU is over 90% efficient, wasting less energy as heat.",
      "Fully modular units let you plug in only the cables you need for cleaner builds.",
      "The fan turns off at low load, making the PC silent when idle.",
    ],
  },
];
