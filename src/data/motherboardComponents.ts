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

export type MotherboardComponent = MotherboardPart;

export const MOTHERBOARD_PARTS: MotherboardPart[] = [
  {
    id: "cpu-socket",
    number: 1,
    name: "CPU Socket",
    meshName: "CPU Socket",
    nodes: [36],
    view: [0, 1, 0.3],
    title: "CPU Socket",
    description:
      "The CPU socket is the precision-machined landing zone where the processor installs. Metal contacts (pins or lands) connect every CPU lead to the motherboard's traces, and a retention arm locks the processor securely in place.",
    function:
      "Physically mounts the CPU and carries thousands of electrical connections between the processor, memory controller, and the rest of the system.",
    importance:
      "The socket decides which CPUs a motherboard supports. Wrong generation, wrong pin count, or a bent pin means the machine will not boot.",
    facts: [
      "Modern LGA sockets hold over 1,700 delicate pins — one bent pin can kill the board.",
      "Intel uses pins on the board (LGA); AMD boards have holes and pins on the CPU (PGA).",
      "Socket pins are gold-plated for corrosion resistance and conductivity.",
    ],
  },
  {
    id: "ram-slots",
    number: 2,
    name: "RAM Slots",
    meshName: "RAM Slots",
    nodes: [7, 13],
    offset: [0, 0.45, 0.3],
    view: [0.9, 0.55, 0.3],
    title: "RAM Slots",
    description:
      "DIMM slots are the long sockets that hold system memory. Each DDR5 module clicks into a channel, and most boards offer two or four slots laid out so you can populate them for optimal dual-channel bandwidth.",
    function:
      "Carries power and data between the memory controller and the RAM sticks, letting the CPU access active programs at nanosecond speeds.",
    importance:
      "The number of slots and their channel layout set your upgrade ceiling — a two-slot board caps you at two DIMMs, while four-slot boards allow larger totals.",
    facts: [
      "Populating matching slots (A2/B2) enables dual-channel mode, nearly doubling memory bandwidth.",
      "DDR5 modules place the voltage regulator directly on the stick.",
      "A single DIMM 'skips' a slot so the slots line up with the board's channel wiring.",
    ],
  },
  {
    id: "pcie-x16",
    number: 3,
    name: "PCIe x16 Slot",
    meshName: "PCI-E",
    nodes: [9],
    view: [0, 0.5, -1],
    title: "PCIe x16 Slot",
    description:
      "The PCIe x16 slot is the primary high-bandwidth expansion lane — the home of the graphics card. Its 16 lanes deliver data between the GPU and CPU faster than almost any other connector on the board.",
    function:
      "Connects add-in cards — most importantly the GPU — to the processor and memory over a high-speed serial link.",
    importance:
      "It is the critical path for gaming and rendering; a x8 or x4 slot cripples graphics performance, and a damaged slot can prevent the system from posting.",
    facts: [
      "PCIe 5.0 x16 pushes up to 128 GB/s — over 8× the bandwidth of the original PCIe 1.0.",
      "The long slot is keyed so a card can only be inserted one way.",
      "Some boards let you split the x16 into x8/x8 for dual-GPU setups.",
    ],
  },
  {
    id: "m2-nvme",
    number: 4,
    name: "M.2 NVMe Slot",
    meshName: "M.2 NVMe Slot",
    nodes: [30],
    view: [0.45, 0.7, -0.75],
    title: "M.2 NVMe Slot",
    description:
      "The M.2 slot is a low-profile connector that mounts solid state drives directly onto the board. NVMe drives here run over PCIe lanes, bypassing the SATA bottleneck for multi-gigabyte-per-second transfers.",
    function:
      "Hosts M.2 storage (SSDs and Wi-Fi cards), delivering data straight to the CPU or chipset over PCIe or SATA lanes.",
    importance:
      "An M.2 NVMe slot is what makes a PC boot in seconds — the fastest consumer storage connects here, not to a 2.5-inch bay.",
    facts: [
      "A single M.2 NVMe drive can outpace several SATA SSDs in RAID.",
      "Hotter drives can throttle, so many slots sit under a dedicated heatsink.",
      "M.2 comes in lengths from 2230 to 22110, keyed by notches for PCIe or SATA.",
    ],
  },
  {
    id: "atx-power",
    number: 5,
    name: "24-pin ATX Power Connector",
    meshName: "24-pin ATX",
    nodes: [5],
    view: [1, 0.45, 0.2],
    title: "24-pin ATX Power Connector",
    description:
      "The 24-pin header is the motherboard's main power feed. It delivers +3.3 V, +5 V, and +12 V from the power supply, distributing power across the board so every component has juice to run.",
    function:
      "Supplies the primary voltage rails and grounds to the motherboard, powering the board's circuitry and feeding the CPU and memory VRMs.",
    importance:
      "If this connector is loose or mis-seated, the board gets no power and the system stays dead — no fans, no beeps, nothing.",
    facts: [
      "It is keyed with one clipped pin so it can only plug in one way.",
      "The 4 extra pins versus the old 20-pin header were added for the +12 V rail.",
      "A failing ATX connector is a common cause of intermittent no-power faults.",
    ],
  },
  {
    id: "sata",
    number: 6,
    name: "SATA Ports",
    meshName: "SATA_1-4",
    nodes: [190, 192, 194, 196],
    offset: [0, 0.55, 0.3],
    view: [0.7, 0.55, -0.6],
    title: "SATA Ports",
    description:
      "SATA ports connect 2.5-inch SSDs, 3.5-inch hard drives, and optical drives. SATA III moves 6 Gb/s — plenty for mechanical drives, though slower than NVMe for solid state.",
    function:
      "Carries data to and from SATA storage drives and powers the connection between the drive and the chipset.",
    importance:
      "They are the workhorses of bulk storage — most multi-drive builds still hang their HDDs and SATA SSDs off these ports.",
    facts: [
      "SATA III tops out at 6 Gb/s (about 550 MB/s real-world).",
      "The port is L-shaped so cables cannot be reversed.",
      "All SATA versions are cross-compatible, so old drives work in new boards.",
    ],
  },
  {
    id: "cmos-battery",
    number: 7,
    name: "CMOS Battery",
    meshName: "CMOS",
    nodes: [19],
    view: [-0.9, 0.5, 0.3],
    title: "CMOS Battery",
    description:
      "The small coin-cell battery keeps the CMOS memory alive when the PC is unplugged. CMOS stores BIOS settings — boot order, clocks, and profiles — so the board remembers its configuration between sessions.",
    function:
      "Powers the real-time clock and the small memory holding UEFI/BIOS settings when mains power is off.",
    importance:
      "A dead battery resets your BIOS settings and the system clock; after a few years it silently fails and must be swapped.",
    facts: [
      "It is usually a CR2032 lithium cell that lasts 5–10 years.",
      "Removing it for 30 seconds is the classic 'hard reset' to clear a locked BIOS.",
      "The RTC keeps running even in a completely powered-down PC thanks to this battery.",
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
      "The chipset is the motherboard's traffic controller. It manages the slower, high-volume connections — USB, SATA, M.2, audio, and networking — and routes them to the CPU, often hidden under a decorative heatsink.",
    function:
      "Coordinates I/O devices, storage, and expansion, funneling their data to the processor while offloading management tasks.",
    importance:
      "The chipset (e.g., B650 vs X870) determines how many USB/SATA/M.2 ports you get and whether features like overclocking or PCIe 5.0 are unlocked.",
    facts: [
      "The chipset sits on the board under its own heatsink because it draws real power.",
      "High-end chipsets unlock extra PCIe lanes and faster I/O.",
      "Modern chipsets link to the CPU over a dedicated DMI link.",
    ],
  },
  {
    id: "rear-io",
    number: 9,
    name: "Rear I/O Ports",
    meshName: "Rear I/O Panel",
    nodes: [325, 327, 329, 331, 333, 335, 337],
    offset: [0, 0.55, 0],
    view: [-1, 0.4, 0.15],
    title: "Rear I/O Ports",
    description:
      "The rear I/O panel is the cluster of ports along the back edge of the board — USB, Ethernet, audio jacks, video outputs, and more. It is the permanent connection point for your peripherals and network.",
    function:
      "Exposes the motherboard's built-in connectivity to the outside world: USB devices, network cable, audio, and integrated graphics.",
    importance:
      "These ports are what you actually plug into daily. Their count and speed set how many monitors and devices your built-in hardware can serve.",
    facts: [
      "USB ports on the rear I/O often run at full speed, while front-panel ports share bandwidth.",
      "Many boards offer a BIOS flashback USB port that can update firmware without a CPU.",
      "Thunderbolt and 2.5 GbE ports are premium rear I/O additions.",
    ],
  },
];
