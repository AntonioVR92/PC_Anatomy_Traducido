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

export const CPU_LAYERS: CPULayer[] = [
  {
    id: "ihs",
    number: 1,
    meshName: "Integrated Heat Spreader",
    hotspotOffset: [0.32, 0.12, 0.12],
    lift: 0.28,
    color: "#d7dde6",
    title: "Integrated Heat Spreader",
    description:
      "The polished nickel lid that caps the processor. It spreads heat evenly across the whole chip surface and gives the cooler a flat, reliable mounting point — while protecting the fragile silicon beneath.",
    purpose:
      "Conducts heat from the die across its full surface and provides the smooth contact face the CPU cooler presses against.",
    facts: [
      "Most IHSs are nickel-plated copper — plating trades a little thermal performance for corrosion resistance and a clean finish.",
      "The IHS carries the CPU's branding because it is the only part of the chip you normally ever see.",
      "The IHS is only a couple of millimetres thick, yet it must spread the heat of a die that can exceed 250 W.",
    ],
    problems: [
      "A warped or bowed IHS makes poor contact with the cooler, spiking temperatures even with good paste.",
      "Delidding — removing the IHS to swap the internal paste — can crack the die if done carelessly.",
    ],
  },
  {
    id: "tim",
    number: 2,
    meshName: "Thermal Interface Material",
    hotspotOffset: [-0.32, 0.02, 0.1],
    lift: 0.2,
    fadeIn: true,
    color: "#cfe0ff",
    title: "Thermal Interface Material",
    description:
      "The thermal interface material is a thin layer of paste squeezed between the silicon die and the heat spreader. It fills the microscopic air gaps that would otherwise trap heat and insulate the silicon.",
    purpose:
      "Maximises heat transfer by eliminating the tiny air pockets between the die and the IHS, letting heat flow into the cooler.",
    facts: [
      "High-end pastes use silver or boron-nitride fillers to push thermal conductivity far beyond ordinary white paste.",
      "Paste dries and 'pumps out' over years of thermal cycling — which is why repasting an old CPU can dramatically lower temperatures.",
      "Liquid-metal TIMs conduct heat even better, but they can dissolve aluminium cooler bases if they leak.",
    ],
    problems: [
      "Too little paste leaves dry spots; too much spills over the die edge and can short nearby components.",
      "Dried-out thermal paste is the most common reason old CPUs suddenly start running hot.",
    ],
  },
  {
    id: "die",
    number: 3,
    meshName: "Silicon Die",
    hotspotOffset: [0.32, -0.02, -0.1],
    lift: 0.1,
    color: "#9fb0c6",
    title: "Silicon Die",
    description:
      "The silicon die is the processor itself — billions of transistors etched into a wafer-thin slice of silicon that performs every calculation your computer makes.",
    purpose:
      "Executes instructions, performs arithmetic, and moves data through the system at billions of operations per second.",
    facts: [
      "A modern die packs more than 8 billion transistors into a few square centimetres — each one smaller than a virus.",
      "Die features are measured in nanometres: a 5 nm transistor is roughly 20 atoms wide.",
      "The die is only a fraction of a millimetre thick, yet it concentrates enormous heat into a tiny area.",
    ],
    problems: [
      "Silicon can degrade over years of high voltage, slowly reducing overclocking headroom.",
      "A cracked die — usually from mounting pressure or a botched delid — destroys the CPU instantly.",
    ],
  },
  {
    id: "substrate",
    number: 4,
    meshName: "Substrate",
    hotspotOffset: [-0.32, -0.05, 0.15],
    lift: -0.14,
    color: "#2f6b34",
    title: "Substrate",
    description:
      "The green circuit board that carries the die and connects it to the motherboard. Thousands of microscopic traces fan the die's signals out to the pins that plug into the socket.",
    purpose:
      "Distributes power and routes every data signal between the silicon and the motherboard socket.",
    facts: [
      "The substrate is a miniature PCB with dozens of thin layers, each no thicker than a human hair.",
      "Every one of the CPU's external pins — often more than a thousand — terminates on this small board.",
      "Its job is the reverse of the motherboard's: it gathers signals from the dense die and fans them out to the socket.",
    ],
    problems: [
      "Cracked solder joints between the die and substrate cause intermittent crashes and no-post issues.",
      "Moisture or contamination on the substrate's contacts can cause boot failures and instability.",
    ],
  },
  {
    id: "pins",
    number: 5,
    meshName: "Contact Pins",
    hotspotOffset: [0.32, -0.09, 0.05],
    lift: 0,
    color: "#d8b45a",
    title: "Contact Pins",
    description:
      "The gold contact pins that carry power and data between the CPU and the motherboard socket. On socketed desktop chips like this one, they are the only physical link between the processor and the rest of the system.",
    purpose:
      "Provide the electrical and mechanical connection that seats the CPU into the socket and keeps it powered.",
    facts: [
      "This AM4-style chip carries hundreds of gold pins, each of which must align perfectly with its socket hole.",
      "The pins are gold-plated because gold resists the corrosion that would block the faint electrical signals.",
      "On PGA sockets the pins live on the CPU itself, which is why a bent pin usually means a ruined processor.",
    ],
    problems: [
      "Bent or broken pins are the classic CPU killer — a single misaligned contact can stop the system from booting.",
      "Dust or debris trapped between the pins and socket creates poor contacts and random failures.",
    ],
  },
];
