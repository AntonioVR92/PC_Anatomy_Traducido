// Per-component SEO content: direct answers, explanations, concepts, and FAQs
// used to build the crawlable educational articles on every component page.
// The visible HTML article and the FAQPage JSON-LD are generated from this
// data, so they always match. Content is factual and written for humans.

export type Concept = { title: string; body: string };
export type Faq = { q: string; a: string };

export type ComponentSeo = {
  /** Direct answer for "What is a {component}?" */
  whatIs: string;
  /** Direct answer for "What does a {component} do?" */
  whatDoes: string;
  /** Paragraph for "How does a {component} work?" */
  howItWorks: string;
  /** "{Component} in a PC build" paragraph */
  inABuild: string;
  /** Sub-topics rendered as H2 sections with descriptive titles. */
  concepts: Concept[];
  /** Visible FAQ (must match FAQPage structured data exactly). */
  faqs: Faq[];
  /** Component ids linked under "Related Computer Components". */
  related: string[];
};

export const SEO_CONTENT: Record<string, ComponentSeo> = {
  "pc-case": {
    whatIs:
      "A PC case (also called a system unit or chassis) is the enclosure that houses, mounts, cools, and protects every internal computer component, from the motherboard to the power supply.",
    whatDoes:
      "A PC case provides mounting points for the motherboard, drives, fans, and power supply, directs airflow from intake to exhaust, and protects components from dust, static, and physical damage.",
    howItWorks:
      "The case holds a metal or plastic frame with pre-drilled standoffs for the motherboard, drive bays for storage, and fan mounts for intake and exhaust. Cool air is pulled in through the front and bottom, flows across the CPU, GPU, and motherboard, and hot air is pushed out through the rear and top. Cable management channels and cutouts keep wiring tidy so airflow stays unobstructed.",
    inABuild:
      "The case determines which motherboard form factor, CPU cooler height, GPU length, and power supply size fit in your build. A case with a mesh front and multiple fan mounts keeps mid-range components cooler than a restricted chassis with poor airflow.",
    concepts: [
      {
        title: "PC Case Form Factors",
        body: "Case size follows motherboard form factors: full-tower cases fit E-ATX boards, mid-towers fit ATX and micro-ATX, and mini-ITX cases are compact. Smaller cases are lighter but limit GPU length, cooler height, and drive capacity.",
      },
      {
        title: "Airflow and Cooling",
        body: "Cases direct airflow with front intakes, rear exhausts, and top vents. A mesh front panel feeds cool air to the CPU and GPU, while solid glass front panels restrict airflow and force reliance on internal fans.",
      },
      {
        title: "Component Compatibility",
        body: "Before buying, check the case's CPU cooler clearance, GPU length limit, and PSU depth. Cases with removable drive cages make installation easier and improve airflow options.",
      },
      {
        title: "Cable Management",
        body: "Channels, grommets, and cutouts behind the motherboard tray let you route cables out of the airflow path. Good cable management improves cooling and makes future upgrades far easier.",
      },
    ],
    faqs: [
      {
        q: "What does a PC case do?",
        a: "A PC case mounts and protects every internal component, directs airflow to keep parts cool, and provides cable management. It also determines which motherboard, GPU, and cooler sizes your build can support.",
      },
      {
        q: "What is the difference between a mid-tower and a full-tower case?",
        a: "A mid-tower case fits ATX, micro-ATX, and mini-ITX motherboards and is the most common choice for desktop builds. A full-tower is larger, supports E-ATX boards, and offers more room for radiators, drives, and oversized GPUs.",
      },
      {
        q: "Do I need case fans?",
        a: "Yes. Case fans move heat out of the chassis so the CPU cooler and GPU cooler can work efficiently. Even a basic build benefits from at least one rear exhaust and one front intake fan.",
      },
    ],
    related: ["motherboard", "power-supply", "cpu-cooler", "case-fans"],
  },

  cpu: {
    whatIs:
      "A CPU (Central Processing Unit) is the main processor of a computer — the silicon chip that executes instructions and coordinates every task the operating system and applications request.",
    whatDoes:
      "The CPU fetches, decodes, and executes billions of instructions per second, from arithmetic and logic operations to memory access and task scheduling, orchestrating everything else in the computer.",
    howItWorks:
      "The CPU loads instructions and data from RAM, decodes each instruction, and executes it in its arithmetic logic unit (ALU) and execution units. Cores work in parallel, and caches hold frequently used data close to the cores to avoid waiting on memory. The memory controller, integrated on the CPU die, manages traffic to and from RAM, storage, and peripherals.",
    inABuild:
      "The CPU is the first major decision in a build because it sets the motherboard socket, RAM generation, and chipset requirements. A balanced build pairs the CPU with RAM that matches its supported speed and a cooler rated for its power draw.",
    concepts: [
      {
        title: "CPU Cores and Threads",
        body: "A core is an independent processing unit; multi-core CPUs run several tasks at once. Threads are logical tasks a core can juggle — simultaneous multithreading (SMT) lets each core handle two threads, improving multitasking and workload efficiency.",
      },
      {
        title: "CPU Clock Speed",
        body: "Clock speed, measured in gigahertz (GHz), is how many instruction cycles a core completes per second. Boost clocks push a core above its base speed when power and thermals allow, so sustained cooling and motherboard power delivery matter as much as the listed frequency.",
      },
      {
        title: "CPU Socket",
        body: "The socket is the physical mount on the motherboard that connects the CPU to the system. Intel uses LGA (land grid array) sockets such as LGA 1700, and AMD uses sockets such as AM5 with pins on the processor. The socket fixes which CPUs a motherboard supports.",
      },
      {
        title: "CPU Cache",
        body: "Cache is ultra-fast memory built into the CPU that stores copies of frequently used data. A hierarchy of L1, L2, and L3 cache feeds the cores so they rarely have to wait for slower system RAM.",
      },
    ],
    faqs: [
      {
        q: "What does a CPU do?",
        a: "A CPU is the computer's main processor. It fetches instructions from RAM, decodes them, and executes them — performing arithmetic, logic, and data movement — while coordinating other components like the GPU, storage, and peripherals.",
      },
      {
        q: "What is a CPU socket?",
        a: "A CPU socket is the mount on the motherboard that physically and electrically connects the processor, for example LGA 1700 on Intel boards or AM5 on AMD boards. The socket determines which CPUs a motherboard supports.",
      },
      {
        q: "What is the difference between CPU cores and threads?",
        a: "A core is a physical processing unit that can execute instructions. A thread is a task stream; with simultaneous multithreading each core can process two threads at once, so an 8-core CPU with SMT can handle 16 threads.",
      },
      {
        q: "What is a good CPU clock speed?",
        a: "Modern desktop CPUs run between 3 and 6 GHz. Higher clock speeds improve single-threaded performance, while more cores improve multitasking and workloads like video rendering.",
      },
    ],
    related: ["motherboard", "ram", "cpu-cooler", "gpu"],
  },

  motherboard: {
    whatIs:
      "A motherboard (also called the mainboard or system board) is the main printed circuit board of a computer that physically and electrically connects every component — CPU, RAM, GPU, storage, and peripherals.",
    whatDoes:
      "The motherboard distributes power from the power supply, routes data between the CPU, RAM, GPU, and storage, and hosts expansion slots, ports, and headers — acting as the nervous system of the PC.",
    howItWorks:
      "Copper traces on the board's layers carry data and power between the CPU socket, memory slots, PCIe slots, and chipset. The chipset manages connectivity — USB, SATA, networking, and audio — and reports system status to the BIOS/UEFI, which initializes hardware at startup.",
    inABuild:
      "The motherboard determines which CPU, RAM generation, and storage your build can use, and its form factor must match the case. Matching the chipset to the CPU's features (overclocking, PCIe lanes, port count) is what makes a build fit together cleanly.",
    concepts: [
      {
        title: "CPU Socket",
        body: "The socket matches the CPU family (for example LGA 1700 for Intel or AM5 for AMD) and is the single most important compatibility point between the motherboard and processor.",
      },
      {
        title: "RAM Slots",
        body: "Motherboards typically have two or four DIMM slots supporting one RAM generation, such as DDR4 or DDR5. Slot placement determines dual-channel operation — installing matched modules in the correct slots doubles memory bandwidth.",
      },
      {
        title: "PCIe Slots",
        body: "PCIe (PCI Express) slots connect expansion cards. The top x16 slot is usually wired directly to the CPU for the GPU, while additional x16, x4, and x1 slots handle capture cards, networking, and other add-in boards.",
      },
      {
        title: "Storage Connections",
        body: "Modern boards offer M.2 slots for NVMe SSDs (wired over PCIe) and SATA ports for 2.5-inch SSDs and hard drives. Some boards share bandwidth between M.2 slots and certain SATA ports, which is documented in the manual.",
      },
      {
        title: "Power Connections",
        body: "The 24-pin ATX connector powers the board, while the 8-pin CPU power connectors feed the processor. VRMs (voltage regulator modules) around the socket convert this power into stable, clean voltages for the CPU.",
      },
      {
        title: "Motherboard Form Factors",
        body: "Common sizes are ATX (305 × 244 mm), micro-ATX, and mini-ITX. Smaller boards fit smaller cases but offer fewer PCIe slots, RAM slots, and M.2 sockets.",
      },
    ],
    faqs: [
      {
        q: "What does a motherboard do?",
        a: "A motherboard connects every computer component: it hosts the CPU, RAM, GPU, and storage, distributes power from the PSU, and routes data between all parts so they work as one computer.",
      },
      {
        q: "What is a motherboard chipset?",
        a: "The chipset is the motherboard's connectivity controller. It manages USB ports, SATA storage, networking, and audio, and decides which CPU features (like overclocking or PCIe lane allocation) a board can offer.",
      },
      {
        q: "How do I know which motherboard to buy?",
        a: "Choose a motherboard whose socket and chipset match your CPU, whose RAM slots match your memory generation, and whose form factor fits your case. Then check that it has enough M.2 slots, SATA ports, and USB ports for your hardware.",
      },
      {
        q: "What is the difference between ATX and micro-ATX?",
        a: "ATX is the standard full-size motherboard format with more PCIe slots, RAM slots, and ports. Micro-ATX (mATX) is a shorter version that fits in smaller cases while keeping most core features.",
      },
    ],
    related: ["cpu", "ram", "gpu", "ssd"],
  },

  ram: {
    whatIs:
      "RAM (Random Access Memory) is the computer's temporary working memory that stores data and instructions currently being used by the operating system and applications.",
    whatDoes:
      "RAM holds active programs and data for instant CPU access, acting as the high-speed staging area between the processor and slower storage, and lets you multitask by keeping many processes resident at once.",
    howItWorks:
      "Each program you open loads from storage into RAM, where the CPU can read it in nanoseconds. RAM cells store one bit per transistor-capacitor pair and must be refreshed thousands of times per second. Because RAM is volatile, everything in it is erased the moment power is lost — which is why unsaved work disappears on a sudden shutdown.",
    inABuild:
      "RAM sits in the motherboard's DIMM slots, matched in pairs for dual-channel bandwidth. Capacity, speed, and generation (DDR4 or DDR5) must match what the motherboard and CPU support — check the CPU's supported speed before buying high-frequency kits.",
    concepts: [
      {
        title: "RAM Capacity",
        body: "Capacity is how much data RAM can hold at once, measured in gigabytes. 16 GB handles everyday multitasking, 32 GB suits gaming and creative work, and heavy workloads like virtual machines benefit from 64 GB or more.",
      },
      {
        title: "RAM Speed",
        body: "Speed is the data transfer rate, measured in megatransfers per second (MT/s). Faster RAM improves performance most when matched with a CPU and motherboard that support that speed, and when modules run in dual-channel mode.",
      },
      {
        title: "RAM Generations",
        body: "DDR4 and DDR5 are the current memory generations. They are not interchangeable — the slots, voltage, and CPU memory controllers differ. DDR5 offers higher speeds and capacities but requires a DDR5 motherboard and CPU.",
      },
      {
        title: "RAM and System Performance",
        body: "Running out of RAM forces the system to use the storage drive as overflow (paging), which is dramatically slower and causes stutter. Enough capacity matters more than raw speed for everyday responsiveness.",
      },
    ],
    faqs: [
      {
        q: "What is RAM used for?",
        a: "RAM is used to hold the data and instructions the CPU is actively working with. Open applications, documents, and browser tabs live in RAM so the processor can access them almost instantly.",
      },
      {
        q: "What is the difference between RAM and storage?",
        a: "RAM is fast, volatile, working memory that loses its contents when power is off. Storage (SSD or HDD) is slower but permanent memory that keeps files and the operating system between restarts.",
      },
      {
        q: "How much RAM do I need?",
        a: "8 GB is enough for basic browsing and office work, 16 GB comfortably handles multitasking and modern games, and 32 GB or more suits video editing, 3D rendering, and virtual machines.",
      },
      {
        q: "Why is my PC using so much RAM?",
        a: "Every open program and browser tab consumes RAM, and the operating system preloads data to speed things up. If usage is near 100%, closing programs or adding more RAM will restore responsiveness.",
      },
    ],
    related: ["cpu", "motherboard", "ssd"],
  },

  gpu: {
    whatIs:
      "A GPU (Graphics Processing Unit) is a massively parallel processor designed for graphics and compute that renders images, video, and games, and accelerates AI and scientific workloads.",
    whatDoes:
      "A GPU computes every image on your display — from 3D games to scrolling a webpage — by running thousands of small cores in parallel, and offloads demanding compute like machine learning and video encoding.",
    howItWorks:
      "A graphics card contains the GPU chip, its own memory (VRAM), and a cooler. The CPU sends the scene data, and the GPU's thousands of cores rasterize triangles, shade pixels, and apply effects in parallel before sending finished frames to the monitor. Dedicated tensor and ray-tracing hardware accelerates AI features and realistic lighting.",
    inABuild:
      "The GPU installs in the top PCIe x16 slot, draws power through 8-pin or 12VHPWR connectors, and needs a power supply with enough wattage and a case with enough length clearance. Integrated graphics (built into the CPU) handle basic tasks, while a dedicated GPU is required for gaming, rendering, and GPU-accelerated workloads.",
    concepts: [
      {
        title: "Integrated vs Dedicated Graphics",
        body: "Integrated GPUs are built into the CPU and share system RAM — fine for browsing and office work. Dedicated GPUs bring their own processing chip, VRAM, and cooler, and are required for gaming, rendering, and AI workloads.",
      },
      {
        title: "GPU Memory (VRAM)",
        body: "Video memory stores textures, frame buffers, and model data close to the GPU. More VRAM (8–24 GB) matters at high resolutions and with large textures or AI models.",
      },
      {
        title: "PCIe Connection",
        body: "The GPU plugs into a PCIe x16 slot wired directly to the CPU. Modern cards use PCIe 4.0 or 5.0, and while slot bandwidth matters, the card's power and cooling limits usually decide performance.",
      },
      {
        title: "Gaming and Graphics Workloads",
        body: "Frame rate depends on the GPU's raw throughput, while resolution and texture quality depend on VRAM. GPUs also accelerate video encoding, 3D rendering, and AI inference far faster than a CPU alone.",
      },
    ],
    faqs: [
      {
        q: "What does a GPU do?",
        a: "A GPU processes graphics and parallel computations. In a desktop computer it renders images, videos, games, and other graphics-intensive workloads, and it also accelerates AI and scientific computing.",
      },
      {
        q: "What is the difference between a CPU and a GPU?",
        a: "A CPU runs a few tasks extremely fast and is good at sequential logic. A GPU runs thousands of simple calculations at once, which makes it ideal for graphics, rendering, and parallel workloads.",
      },
      {
        q: "Do I need a graphics card?",
        a: "For basic tasks, integrated graphics in the CPU is enough. You need a dedicated GPU for gaming, video editing, 3D modeling, and AI or machine learning work.",
      },
      {
        q: "How much VRAM do I need?",
        a: "4–8 GB suits 1080p gaming, 8–12 GB handles 1440p and most modern games, and 16 GB or more is for 4K gaming, high-resolution textures, and AI workloads.",
      },
    ],
    related: ["cpu", "motherboard", "power-supply"],
  },

  ssd: {
    whatIs:
      "An SSD (Solid-State Drive) is a storage drive that keeps data on flash memory chips instead of spinning disks, delivering near-instant boot times and fast application loading with no moving parts.",
    whatDoes:
      "An SSD persists the operating system, programs, and files permanently, provides fast random access without moving parts, and dramatically speeds up aging systems in a straight swap.",
    howItWorks:
      "SSDs store bits in NAND flash cells that trap electrical charge, arranged in pages and blocks. The drive's controller manages wear leveling, garbage collection, and error correction, while a small DRAM or HMB cache accelerates address mapping. With no moving parts, read and write speeds are measured in hundreds of MB/s (SATA) to multiple GB/s (NVMe).",
    inABuild:
      'A 2.5-inch SATA SSD drops into any drive bay using the same cables as a hard drive — the easiest performance upgrade for an older PC. For new builds, an M.2 NVMe SSD mounts directly on the motherboard and is several times faster.',
    concepts: [
      {
        title: "SSD vs HDD",
        body: "SSDs use flash memory with no moving parts: faster, quieter, and more shock-resistant. HDDs use spinning magnetic platters: slower but much cheaper per gigabyte, making them ideal for bulk archives.",
      },
      {
        title: "SATA vs NVMe",
        body: "SATA SSDs top out around 550 MB/s, about ten times faster than a hard drive. NVMe drives connect over PCIe lanes and reach several GB/s — why modern PCs boot in seconds.",
      },
      {
        title: "Storage Capacity",
        body: "Capacity decides how many programs, games, and files you can keep installed. 1 TB fits a large game library; many builds pair a fast 1 TB SSD with a large HDD for archives.",
      },
      {
        title: "Storage vs RAM",
        body: "Storage is permanent memory that keeps data when the power is off. RAM is fast, temporary working memory. Programs load from storage into RAM before the CPU can use them.",
      },
    ],
    faqs: [
      {
        q: "What is computer storage?",
        a: "Computer storage (SSD or HDD) is the permanent memory that holds the operating system, programs, and files when the power is off. It is slower than RAM but keeps data for years.",
      },
      {
        q: "What is the difference between SSD and HDD?",
        a: "An SSD stores data on flash memory with no moving parts, so it is fast, silent, and durable. An HDD stores data on spinning magnetic platters, so it is slower but cheaper per gigabyte.",
      },
      {
        q: "What is the difference between SATA and NVMe SSD?",
        a: "SATA SSDs use the older storage interface and reach about 550 MB/s. NVMe SSDs connect over PCIe lanes and reach several gigabytes per second, which makes them much faster for booting and loading.",
      },
    ],
    related: ["m2-ssd", "hdd", "motherboard", "ram"],
  },

  "m2-ssd": {
    whatIs:
      "An M.2 SSD is a slim, board-mounted solid state drive that plugs directly into a slot on the motherboard and connects over PCIe (NVMe) lanes to reach multi-gigabyte-per-second speeds.",
    whatDoes:
      "An M.2 NVMe drive hosts the operating system for near-instant boot, transfers data over dedicated PCIe lanes, and provides extreme random and sequential throughput with a single-screw install.",
    howItWorks:
      "The M.2 drive is a bare circuit board with NAND flash and a controller, inserted at an angle into the motherboard's M.2 slot and secured with one screw. NVMe drives use PCIe lanes directly, bypassing the SATA bottleneck entirely — a top drive reads over 7 GB/s, fast enough to copy a 4K movie in under a second.",
    inABuild:
      "An M.2 SSD is the default boot drive in modern builds — no cables, no drive bays, just a slot on the motherboard and one screw. Check the slot's key (M-key for NVMe), and be aware some boards share bandwidth between M.2 slots and the GPU or SATA ports.",
    concepts: [
      {
        title: "M.2 Form Factors",
        body: "M.2 drives are named by width and length, such as 2280 (22 mm wide, 80 mm long). Most boards support 2280 drives; some also take shorter 2230 or longer 22110 formats.",
      },
      {
        title: "NVMe vs SATA M.2",
        body: "M.2 slots can carry either NVMe (PCIe) or SATA signals. NVMe drives are much faster; SATA M.2 drives offer no speed advantage over a 2.5-inch SATA SSD. Check the slot and drive key to match them.",
      },
      {
        title: "Heat and Throttling",
        body: "Fast NVMe drives can throttle under sustained load when hot. Motherboard heatsinks or small passive coolers keep high-end drives inside their safe temperature window.",
      },
    ],
    faqs: [
      {
        q: "What is an M.2 SSD?",
        a: "An M.2 SSD is a small, stick-shaped solid state drive that mounts directly onto the motherboard. NVMe M.2 drives connect over PCIe lanes and are the fastest consumer storage available.",
      },
      {
        q: "Is M.2 faster than SATA SSD?",
        a: "NVMe M.2 drives are much faster than SATA SSDs — several GB/s versus about 550 MB/s — because they use PCIe lanes directly instead of the SATA interface.",
      },
      {
        q: "What is the difference between M.2 NVMe and M.2 SATA?",
        a: "Both are M.2-shaped drives, but NVMe connects over PCIe lanes and is several times faster, while SATA M.2 uses the older SATA interface and performs the same as a 2.5-inch SATA SSD.",
      },
    ],
    related: ["motherboard", "ssd", "hdd"],
  },

  hdd: {
    whatIs:
      "An HDD (Hard Disk Drive) is a storage drive that stores data magnetically on spinning platters, offering the lowest cost per gigabyte for bulk storage and archives.",
    whatDoes:
      "An HDD stores large amounts of data cheaply, persists files across power cycles, and serves as backup and archival storage in NAS boxes, servers, and desktops.",
    howItWorks:
      "Magnetic platters spin at 5,400 or 7,200 RPM while a tiny read/write arm hovers nanometers above the surface, magnetizing and detecting bits. The drive buffers writes in cache and batches them for efficiency. Because everything is mechanical, HDDs are slower and more fragile than SSDs, but far cheaper per gigabyte.",
    inABuild:
      "HDDs remain the cheapest way to add terabytes of storage. A common desktop setup pairs a fast SSD for the operating system and games with a large HDD for photos, videos, and backups.",
    concepts: [
      {
        title: "Platter Speed",
        body: "Platter speed, measured in RPM (revolutions per minute), sets the drive's latency. 7,200 RPM drives read faster than 5,400 RPM models, while 3.5-inch desktop drives are typically faster than 2.5-inch laptop drives.",
      },
      {
        title: "Capacity and Cost",
        body: "HDDs cost the least per gigabyte, which is why they still dominate bulk storage. Multi-terabyte drives cost a fraction of an equivalent SSD, making them ideal for archives.",
      },
      {
        title: "Durability",
        body: "Moving platters and a flying read head make HDDs sensitive to physical shock. Sudden drops can cause head crashes and data loss, so they suit stationary desks rather than laptops.",
      },
    ],
    faqs: [
      {
        q: "What is a hard disk drive (HDD)?",
        a: "A hard disk drive stores data magnetically on spinning platters. It is slower than an SSD but offers the lowest cost per gigabyte, making it ideal for bulk storage and backups.",
      },
      {
        q: "How does an HDD work?",
        a: "An HDD spins magnetic platters at thousands of revolutions per minute while a tiny read/write arm hovers above the surface, magnetizing and reading bits. It is mechanical, which makes it slower and more fragile than an SSD.",
      },
      {
        q: "Is an HDD good for gaming?",
        a: "HDDs still run games, but levels and open worlds load much slower than on an SSD. Most builders install games on an SSD and keep an HDD for media, documents, and backups.",
      },
    ],
    related: ["ssd", "m2-ssd", "motherboard"],
  },

  "power-supply": {
    whatIs:
      "A PSU (Power Supply Unit) converts mains AC power from the wall into the stable, low-voltage DC power every internal component needs to run.",
    whatDoes:
      "The power supply takes wall AC and converts it into regulated DC voltages (12V, 5V, 3.3V), protects components with over-voltage, over-current, and short-circuit safeguards, and delivers clean, stable power during load spikes.",
    howItWorks:
      "Inside the PSU, a rectifier converts AC to DC, a power stage switches it at high frequency, and transformers step it down to the 12V, 5V, and 3.3V rails the system uses. Voltage regulators and protection circuits smooth ripple and shut the unit down on faults. An 80 Plus certified unit wastes less energy as heat at typical loads.",
    inABuild:
      "The PSU must supply enough wattage for the CPU and GPU plus headroom for transients, use the right cables for the motherboard (24-pin ATX, 8-pin EPS) and GPU (8-pin or 12VHPWR), and fit the case. A quality unit protects the whole build — a failing budget PSU can damage other parts.",
    concepts: [
      {
        title: "Wattage",
        body: "Wattage is the total power the PSU can deliver continuously. Add the CPU and GPU power draw plus about 20–30% headroom for transient spikes; 650 W covers most mid-range builds and 750–1000 W suits high-end GPUs.",
      },
      {
        title: "Efficiency (80 Plus)",
        body: "The 80 Plus rating measures efficiency at 20%, 50%, and 100% load. Gold (87–90%) and Platinum/Titanium units waste less heat, run quieter, and often use better internal components.",
      },
      {
        title: "Power Connectors",
        body: "The 24-pin ATX connector powers the motherboard, 4/8-pin EPS connectors feed the CPU, 6/8-pin PCIe connectors feed the GPU, and SATA/Molex connectors power drives and accessories. Modular units let you attach only the cables you need.",
      },
      {
        title: "Safe Power Delivery",
        body: "A good PSU keeps voltage within specification under load transients — critical when a GPU jumps from idle to full 3D load in milliseconds. Protection circuits (OVP, OCP, OPP, SCP) shut the unit down before damage can spread.",
      },
    ],
    faqs: [
      {
        q: "What does a power supply do?",
        a: "A power supply unit (PSU) converts the AC power from your wall outlet into the stable low-voltage DC power that the motherboard, CPU, GPU, and drives run on, and protects them from surges and faults.",
      },
      {
        q: "How many watts does my power supply need?",
        a: "Add your CPU's power draw and your GPU's power draw, then add about 20–30% headroom for transient spikes. 650 W covers most mid-range builds; high-end GPUs typically need 750–1000 W.",
      },
      {
        q: "What is 80 Plus efficiency?",
        a: "80 Plus is a certification for power supply efficiency. A Gold-rated unit delivers 87–90% of the power it draws, wasting less energy as heat than Bronze or unrated units.",
      },
      {
        q: "Can a bad power supply damage my PC?",
        a: "Yes. A failing or low-quality PSU can deliver unstable voltage that crashes systems and can take the motherboard, GPU, or drives with it. It is worth buying a reputable unit with enough wattage.",
      },
    ],
    related: ["motherboard", "gpu", "pc-case", "ups"],
  },

  "cpu-cooler": {
    whatIs:
      "A CPU cooler is a heatsink and fan assembly (or liquid radiator) that removes the heat generated by the processor, keeping it inside its safe operating temperature window.",
    whatDoes:
      "The CPU cooler transfers heat from the CPU die through a base plate and heat pipes into a large heatsink, where fans push the heat out of the case so the CPU can sustain boost clocks without throttling.",
    howItWorks:
      "A base plate presses against the CPU with a thin layer of thermal paste filling the microscopic gaps between surfaces. Heat pipes carry the heat into the fin stack, and one or more fans move air across the fins. Liquid (AIO) coolers replace the fin stack with a pump that circulates coolant through a radiator, which works the same way.",
    inABuild:
      "Every desktop CPU needs a cooler — stock coolers handle lower-power chips, while tower air coolers and AIO liquid coolers handle high-TDP CPUs. The cooler's height (for air towers) or radiator size (for AIOs) must fit the case, and its mounting must match the CPU socket.",
    concepts: [
      {
        title: "Air Cooling",
        body: "Air coolers use a metal fin stack and fans. They are reliable, inexpensive, and last for years with no moving pump parts; tower designs with heat pipes are the mainstream choice.",
      },
      {
        title: "Liquid Cooling",
        body: "All-in-one (AIO) liquid coolers pump coolant from a block on the CPU to a radiator with fans. They handle very high heat loads and can fit smaller cases, but add pump and fan noise and a rare pump-failure risk.",
      },
      {
        title: "Heat Dissipation",
        body: "Heat pipes use evaporation and condensation to move heat faster than solid metal. A CPU can generate over 250 W under load, and the cooler must spread and exhaust that energy to prevent throttling.",
      },
      {
        title: "Thermal Paste and Temperature",
        body: "Thermal paste fills microscopic gaps between the CPU and cooler base; dry or badly applied paste causes high temperatures. Healthy desktop CPUs idle in the 30–50 °C range and run 70–90 °C under full load depending on the model.",
      },
    ],
    faqs: [
      {
        q: "What does a CPU cooler do?",
        a: "A CPU cooler moves heat away from the processor so it stays inside its safe temperature window. Without adequate cooling, a modern CPU throttles within seconds or shuts down to protect itself.",
      },
      {
        q: "Air cooling or liquid cooling — which is better?",
        a: "Good tower air coolers match mid-range AIO liquid coolers at lower cost and with no pump failure risk. Large AIO liquid coolers handle the hottest CPUs and often fit small cases better.",
      },
      {
        q: "How much thermal paste should I apply?",
        a: "A pea-sized drop in the center of the CPU is the standard amount. Too little leaves air gaps and overheats; too much spills over the edges and can short motherboard contacts.",
      },
      {
        q: "What is a good CPU temperature?",
        a: "Idle temperatures of 30–50 °C and full-load temperatures up to about 90 °C are normal for modern desktop CPUs. Sustained loads above 95 °C mean the cooler, paste, or case airflow needs attention.",
      },
    ],
    related: ["cpu", "pc-case", "case-fans", "motherboard"],
  },

  "case-fans": {
    whatIs:
      "Case fans are airflow fans mounted in a PC case that pull cool air in and push hot air out, regulating the temperature of every internal component.",
    whatDoes:
      "Case fans draw cool air into the chassis from the front, exhaust warm air from the rear and top, and maintain a pressure balance that deters dust while targeting airflow toward the CPU and GPU intakes.",
    howItWorks:
      "Fans push air by spinning angled blades; static pressure matters when pulling through filters or radiators, while airflow (CFM) matters for moving air through an open case. Placement creates a flow loop: cool intake in the front and bottom, exhaust out the rear and top, so heat never pools around components.",
    inABuild:
      "A typical build uses two or three front intakes and one rear exhaust, with the CPU cooler and GPU cooler feeding into that airflow. Larger, slower fans move the same air as smaller fast fans at lower noise.",
    concepts: [
      {
        title: "Airflow and Static Pressure",
        body: "Airflow (cubic feet per minute) describes raw air movement, while static pressure describes the ability to push through obstacles like dust filters and radiators. Radiator and filter mounts prefer pressure-optimized fans.",
      },
      {
        title: "Pressure Balance",
        body: "Positive pressure (more intake than exhaust) keeps dust out of unfiltered gaps, while negative pressure (more exhaust) cools slightly better but pulls in more dust. Slightly positive pressure is the usual recommendation.",
      },
      {
        title: "Fan Size and Noise",
        body: "A single 140 mm fan moves almost twice the air of a 120 mm fan at the same noise level, which is why large, slow fans are quieter. Fan curves in the BIOS tie speed to temperatures.",
      },
    ],
    faqs: [
      {
        q: "How many case fans do I need?",
        a: "At least two: one front intake and one rear exhaust. Mid-range and high-end builds benefit from two or three front intakes plus a rear exhaust, and an optional top exhaust for hot CPUs.",
      },
      {
        q: "Which direction should case fans face?",
        a: "Intake fans face inward (pulling air in through the front or bottom), and exhaust fans face outward (pushing air out the rear or top). Most fans have direction arrows printed on the frame.",
      },
      {
        q: "Do case fans matter if I have a good CPU cooler?",
        a: "Yes. The CPU cooler only moves heat locally; case fans carry that heat out of the chassis. Without case airflow, hot air recirculates and every component runs hotter.",
      },
    ],
    related: ["pc-case", "cpu-cooler", "power-supply"],
  },

  keyboard: {
    whatIs:
      "A computer keyboard is the primary text and command input device, converting key presses into scancodes that the operating system turns into characters, shortcuts, and actions.",
    whatDoes:
      "A keyboard enters text and characters, triggers shortcuts and macros, provides input for gaming and navigation, and supports accessibility features like sticky keys and remapping.",
    howItWorks:
      "Each key press closes a switch that the keyboard controller detects and converts into a scancode, which is sent over USB or wireless and translated by the operating system. Mechanical keyboards register each press with an independent switch, while membrane keyboards use a single rubber sheet.",
    inABuild:
      "The keyboard is a plug-and-play peripheral that works with any PC over USB, 2.4 GHz wireless, or Bluetooth. Mechanical switches, keycap layouts, and per-key RGB lighting are the main choices for typing comfort and gaming.",
    concepts: [
      {
        title: "Switch Types",
        body: "Mechanical switches (linear, tactile, or clicky) give each key an independent mechanism and are durable and precise. Membrane keyboards are quieter, thinner, and cheaper but feel mushier and wear faster.",
      },
      {
        title: "Keyboard Layouts",
        body: "Full-size keyboards include the numpad, tenkeyless (TKL) layouts drop it for desk space, and 75%/65% compact layouts keep arrow keys and function rows. Smaller layouts need layers to reach missing keys.",
      },
      {
        title: "Rollover and Latency",
        body: "Full N-key rollover registers over 100 simultaneous key presses, which matters for fast typing and games. Wired connections have the lowest latency, followed by 2.4 GHz wireless and Bluetooth.",
      },
    ],
    faqs: [
      {
        q: "What does a keyboard do?",
        a: "A keyboard is the main input device for typing and commands. Each key press closes a switch, and the keyboard controller converts it into a scancode the operating system translates into characters and actions.",
      },
      {
        q: "What is the difference between mechanical and membrane keyboards?",
        a: "Mechanical keyboards have an independent switch under every key, giving crisp feedback, durability, and hot-swappable options. Membrane keyboards use a rubber sheet and are cheaper, quieter, and thinner.",
      },
      {
        q: "What is N-key rollover?",
        a: "N-key rollover lets a keyboard register many simultaneous key presses at once — up to all keys at once. It prevents ghosting during fast typing and gaming combinations.",
      },
    ],
    related: ["mouse", "monitor", "pc-case"],
  },

  mouse: {
    whatIs:
      "A computer mouse is the precision pointing device that moves the cursor on screen, translating hand motion into cursor movement with buttons and a scroll wheel for clicks, drags, and navigation.",
    whatDoes:
      "A mouse moves the cursor with optical tracking, selects and drags with its buttons, scrolls through pages, and switches sensitivity on the fly for precision tasks like gaming and design work.",
    howItWorks:
      "An optical sensor illuminates the surface and captures micro-images thousands of times per second, comparing them to detect movement and direction. Buttons and the scroll wheel send signals to the computer, which converts them into cursor motion and clicks.",
    inABuild:
      "The mouse is a plug-and-play peripheral that works over USB, 2.4 GHz wireless, or Bluetooth. DPI sensitivity, weight, button count, and grip shape are the main choices for comfort, office work, and gaming.",
    concepts: [
      {
        title: "Sensor and DPI",
        body: "DPI (dots per inch) sets how far the cursor moves per inch of hand motion. High-DPI sensors track tiny movements for precise aim in games and pixel-level work in design tools.",
      },
      {
        title: "Polling Rate",
        body: "The polling rate is how often the mouse reports its position — modern gaming mice report up to 8,000 times per second. Higher rates feel more responsive on high-refresh monitors.",
      },
      {
        title: "Buttons and Ergonomics",
        body: "Additional side buttons provide handy shortcuts and macros. Worn micro-switches cause double-clicking, and weight and shape affect long-session comfort.",
      },
    ],
    faqs: [
      {
        q: "What does a mouse do?",
        a: "A mouse moves the cursor and drives interactions on screen. An optical sensor tracks surface movement thousands of times per second, and its buttons and scroll wheel trigger clicks, drags, and navigation.",
      },
      {
        q: "What is DPI on a mouse?",
        a: "DPI (dots per inch) measures cursor sensitivity: how far the cursor moves per inch of physical mouse movement. Higher DPI suits fast sweeping motion; lower DPI suits precise aiming and editing.",
      },
      {
        q: "Why is my mouse double-clicking?",
        a: "Double-clicks usually come from worn micro-switches inside the buttons after years of use. The switch can be replaced, or the mouse can be replaced if the switches are not serviceable.",
      },
    ],
    related: ["keyboard", "monitor"],
  },

  monitor: {
    whatIs:
      "A computer monitor is the visual output display that turns the frames rendered by the GPU into the images you see, refreshing millions of pixels in sync with the graphics card.",
    whatDoes:
      "A monitor displays the frames rendered by the GPU, presents color-accurate images for design and media, supports adaptive sync to eliminate tearing, and can act as a hub for USB and video connections.",
    howItWorks:
      "The GPU sends a frame to the monitor over HDMI, DisplayPort, or USB-C, and the panel refreshes every pixel. Panel type (IPS, VA, OLED), resolution, and refresh rate define how sharp and smooth the image is. Adaptive sync matches the panel's refresh to the GPU's frame rate to prevent tearing.",
    inABuild:
      "The monitor is the final stage of every PC: its resolution drives how demanding games are on the GPU, and its refresh rate (60–240+ Hz) decides how smooth motion looks. Pick ports to match the GPU and consider color accuracy for creative work.",
    concepts: [
      {
        title: "Resolution",
        body: "Resolution is the number of pixels the panel draws — 1920×1080 (Full HD), 2560×1440 (QHD), and 3840×2160 (4K). Higher resolutions need a stronger GPU and are sharper on larger screens.",
      },
      {
        title: "Refresh Rate",
        body: "Refresh rate, in hertz, is how many times the panel redraws per second. A 144 Hz panel updates twice as often as a standard 60 Hz screen, making motion feel dramatically smoother.",
      },
      {
        title: "Panel Types",
        body: "IPS panels offer wide viewing angles and accurate color, VA panels deliver high contrast, and OLED panels give perfect blacks and instant response. Response time and input lag affect gaming feel.",
      },
      {
        title: "Adaptive Sync",
        body: "FreeSync and G-Sync adapt the monitor's refresh rate to the GPU's output, eliminating screen tearing and stutter without adding input lag. Use the matching GPU brand where possible.",
      },
    ],
    faqs: [
      {
        q: "What does a monitor do?",
        a: "A monitor displays everything the computer renders. The GPU produces frames, and the monitor's panel refreshes millions of pixels in sync so you see the output as images and motion.",
      },
      {
        q: "What is the difference between 60 Hz and 144 Hz?",
        a: "A 60 Hz monitor redraws the image 60 times per second, while 144 Hz redraws 144 times. Higher refresh rates make motion look smoother and improve responsiveness in games.",
      },
      {
        q: "Which monitor resolution should I choose?",
        a: "1080p is easy to drive and good for small screens, 1440p is the balanced sweet spot for gaming and work, and 4K is razor sharp but demands a powerful GPU.",
      },
    ],
    related: ["gpu", "keyboard", "mouse"],
  },

  ups: {
    whatIs:
      "A UPS (Uninterruptible Power Supply) is a battery backup that sits between your wall socket and your PC, switching to battery power the instant the grid drops so you can save work and shut down cleanly.",
    whatDoes:
      "A UPS bridges power gaps so the PC never drops mid-write, clamps surges and filters noise from the mains, gives time to save work and shut down safely, and regulates voltage for unstable grids.",
    howItWorks:
      "The UPS constantly monitors incoming mains power. When the grid fails, its inverter switches to battery power in under 10 milliseconds — far faster than a PC notices. Surge components absorb spikes, and the battery recharges automatically when mains returns.",
    inABuild:
      "The PC plugs into the UPS's battery-backed outlets, and a USB cable reports battery status to the operating system so it can shut down automatically during an outage. Capacity (VA/wattage) and runtime set how long the system stays alive.",
    concepts: [
      {
        title: "Capacity and Runtime",
        body: "Capacity is rated in VA and watts — a 700 VA / 420 W unit runs a typical desktop for roughly 10 minutes at full load. Runtime grows when the PC idles or shuts down promptly.",
      },
      {
        title: "Battery Backup vs Surge Protection",
        body: "Surge protectors only clamp voltage spikes. A UPS adds battery power for outages and typically includes surge protection plus voltage regulation, protecting against brownouts too.",
      },
      {
        title: "Battery Lifespan",
        body: "UPS batteries are sealed lead-acid or lithium cells that lose runtime over 2–3 years. Replacing the battery restores full protection and is cheaper than replacing the unit.",
      },
    ],
    faqs: [
      {
        q: "What does a UPS do?",
        a: "A UPS provides battery backup so your PC keeps running during power outages, giving you time to save work and shut down cleanly. It also clamps surges and filters dirty power.",
      },
      {
        q: "What is the difference between a UPS and a surge protector?",
        a: "A surge protector only clamps voltage spikes. A UPS does that and also supplies battery power during outages, so your computer never drops mid-write.",
      },
      {
        q: "How long does a UPS keep a PC running?",
        a: "Runtime depends on load — a 700 VA unit typically provides about 10 minutes for a standard desktop at full load, enough to save work and shut down safely.",
      },
    ],
    related: ["power-supply", "avr"],
  },

  avr: {
    whatIs:
      "An AVR (Automatic Voltage Regulator) is a device that smooths unstable mains voltage, correcting sags and surges in real time so your PC always receives clean, stable power.",
    whatDoes:
      "An AVR regulates incoming voltage during brownouts and surges, clamps voltage spikes before they reach components, and delivers stable power to the PSU under unstable grids.",
    howItWorks:
      "The AVR monitors the incoming mains and, when voltage drifts outside its normal range, switches transformer taps or electronic correction circuitry to bring the output back to specification. It reacts within milliseconds — far faster than a human would notice a flicker — but does not supply backup power like a UPS.",
    inABuild:
      "The PC plugs into the AVR, and the AVR plugs into the wall. In areas with fluctuating power, an AVR is the first line of defense for a desktop, smoothing brownouts and surges so the PSU only handles well-behaved input.",
    concepts: [
      {
        title: "AVR vs UPS",
        body: "A UPS provides battery backup during outages. An AVR only stabilizes voltage — it corrects sags and surges but cannot keep the PC running when the power goes out.",
      },
      {
        title: "Correction Range",
        body: "A typical AVR corrects input voltage over a range such as 140–280 V and holds the output near nominal (for example 220 V ± 8%), reacting within milliseconds to grid swings.",
      },
      {
        title: "When You Need One",
        body: "If lights flicker, appliances strain, or the grid is known to be unstable, an AVR protects the PSU, motherboard, and drives from the stress of repeated brownouts and surges.",
      },
    ],
    faqs: [
      {
        q: "What does an AVR do?",
        a: "An Automatic Voltage Regulator stabilizes mains voltage, correcting sags and surges in real time so the PC's power supply only receives clean, stable input.",
      },
      {
        q: "What is the difference between an AVR and a UPS?",
        a: "A UPS supplies battery power during outages. An AVR does not — it only regulates voltage, protecting against brownouts and surges but not keeping the PC running when the power fails.",
      },
      {
        q: "Do I need an AVR?",
        a: "If your area has unstable voltage — flickering lights, frequent brownouts, or surges — an AVR protects your PSU and components from the stress. Otherwise a quality PSU and surge protection are usually enough.",
      },
    ],
    related: ["ups", "power-supply"],
  },
};
