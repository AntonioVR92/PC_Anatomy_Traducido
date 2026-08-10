// PC assembly guide: /assembly
// Step-by-step guide to building a desktop computer, fully server-rendered,
// with internal links to every relevant component page and a lazy 3D viewer.

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ModelViewerSection } from "@/components/viewer/ModelViewerSection";
import { SYSTEM_UNIT_MODEL } from "@/lib/components";
import {
  SITE_NAME,
  SITE_PUBLISHED_DATE,
  SITE_REVISED_DATE,
  absoluteUrl,
} from "@/lib/site";

const CANONICAL = "/assembly";
const H1 = "How to Assemble a PC";
const H2 = "text-xl font-semibold tracking-tight text-foreground sm:text-2xl";
const P = "mt-3 text-[15px] leading-relaxed text-muted";
const SECTION = "mt-10";

type Step = {
  title: string;
  body: string;
  link?: { href: string; label: string };
};

const STEPS: Step[] = [
  {
    title: "PC Components You Need",
    body: "Before you start, gather the full set of parts: a CPU, RAM, a motherboard, storage (SSD or HDD), a GPU if you are not relying on integrated graphics, a power supply, a CPU cooler, and a PC case. Check compatibility first — the motherboard socket must match the CPU, the RAM generation must match the board, and the case must fit the motherboard, cooler, GPU, and PSU. Gather a Phillips-head screwdriver, an anti-static surface, and (for some coolers) thermal paste.",
  },
  {
    title: "Install the CPU",
    body: "Open the motherboard's CPU socket lever, align the CPU's gold triangle with the socket's marker, and drop it in without applying pressure — it should sit flat on its own. Close the lever to lock it. For AMD sockets the pins sit on the CPU; for Intel LGA sockets they sit in the motherboard, so never slide or tilt the processor.",
    link: { href: "/components/cpu", label: "Learn how the CPU works" },
  },
  {
    title: "Install RAM",
    body: "Open the retention clips on the RAM slots, align the module's notch with the slot, and press firmly until both clips click. For best performance, install modules in the primary slots (usually A2 and B2) to run in dual-channel mode. Do not force the module — if it will not seat, the orientation is wrong.",
    link: { href: "/components/ram", label: "Learn how RAM works" },
  },
  {
    title: "Install the CPU Cooler",
    body: "Mount the cooler's backplate behind the motherboard, apply a pea-sized drop of thermal paste in the center of the CPU, and secure the cooler with even, diagonal tightening pressure. Connect the fan or pump header to the motherboard's CPU_FAN header so the BIOS can control speed and fail-safe detection.",
    link: { href: "/components/cpu-cooler", label: "Learn how CPU coolers work" },
  },
  {
    title: "Install the Motherboard",
    body: "Install the I/O shield in the case, screw in the standoffs to match your board's holes, and lower the motherboard into place. Secure it with the case screws, then plug in the 24-pin ATX power and 8-pin CPU power cables before routing is harder. This is the natural point to install the M.2 SSD as well, since it mounts directly on the board.",
    link: { href: "/components/motherboard", label: "Learn how the motherboard works" },
  },
  {
    title: "Install Storage",
    body: "M.2 NVMe SSDs slide into their slot on the motherboard at a slight angle and are secured with one screw. 2.5-inch SATA SSDs and hard drives mount in the case's drive bays and connect with a SATA data cable plus a SATA power cable from the PSU.",
    link: { href: "/components/storage", label: "Learn how SSDs, HDDs, and NVMe storage work" },
  },
  {
    title: "Install the GPU",
    body: "Remove the expansion slot covers in the case, align the graphics card with the top PCIe x16 slot, and press it in until the retention clip clicks. Screw the card's bracket to the case and connect its 8-pin or 12VHPWR power cables from the PSU — make sure they click securely.",
    link: { href: "/components/gpu", label: "Learn how the GPU works" },
  },
  {
    title: "Install the Power Supply",
    body: "Mount the PSU in its bay (usually bottom-rear), typically fan-down with the fan facing the case's bottom vent. Route the 24-pin ATX, CPU EPS, GPU PCIe, and SATA power cables through the case's management channels so they stay out of the airflow path.",
    link: { href: "/components/power-supply", label: "Learn how the power supply works" },
  },
  {
    title: "Connect PC Cables",
    body: "Connect the front panel header (power button, reset, LEDs) using the motherboard manual's diagram — these small pins are easy to misplace. Then connect the front USB and audio headers, case fan headers, and finally the monitor, keyboard, and mouse. For a clean, cool build, route every cable behind the motherboard tray.",
  },
  {
    title: "Test the PC",
    body: "Before closing the side panel, connect power and a display and switch the PSU on. The machine should post: fans spin, LEDs light, and the BIOS screen appears. If nothing happens, reseat the RAM and GPU, check both power cables, and confirm the front-panel header is wired correctly. Once it boots, close the case and update drivers and the BIOS.",
  },
];

const MISTAKES = [
  "Forgetting to flip the power supply switch on before the first boot.",
  "Seating RAM or the GPU at an angle — always press straight down until the clip clicks.",
  "Using too much (or too little) thermal paste — a pea-sized dot is the standard.",
  "Skipping the motherboard standoffs or adding extras, which can short the board.",
  "Forgetting the 8-pin CPU power cable, which leaves the CPU without power.",
  "Not installing an exhaust fan, so hot air recirculates inside the case.",
];

const FAQS = [
  {
    q: "How long does it take to assemble a PC?",
    a: "A first-time builder typically takes 2 to 4 hours for the full assembly and cable management. Experienced builders can finish in under an hour.",
  },
  {
    q: "Do I need thermal paste to install a CPU?",
    a: "Yes. Thermal paste fills microscopic gaps between the CPU and cooler base. Stock coolers usually have paste pre-applied; aftermarket coolers often include a tube or a pre-applied layer.",
  },
  {
    q: "What tools do I need to build a PC?",
    a: "A Phillips-head screwdriver (magnetic helps), an anti-static wrist strap or mat, and zip ties for cable management. Everything else comes with the parts.",
  },
  {
    q: "What should I do if my PC does not turn on?",
    a: "Check the power supply switch, the wall outlet, both motherboard power cables, and the front-panel power header wiring. If fans spin but nothing displays, reseat the RAM and GPU.",
  },
];

export const metadata: Metadata = {
  title: "How to Assemble a PC — Step-by-Step Guide",
  description:
    "Learn how to assemble a PC step by step: install the CPU, RAM, cooler, motherboard, storage, GPU, and power supply, connect the cables, and test the computer.",
  alternates: { canonical: absoluteUrl(CANONICAL) },
  openGraph: {
    title: "How to Assemble a PC — Step-by-Step Guide",
    description:
      "A complete step-by-step PC assembly guide: installing the CPU, RAM, cooler, motherboard, storage, GPU, and PSU, with 3D component models.",
    url: absoluteUrl(CANONICAL),
    type: "article",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "PC Anatomy — Explore Computer Hardware in 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Assemble a PC — Step-by-Step Guide",
    description:
      "A complete step-by-step PC assembly guide with 3D component models.",
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function AssemblyPage() {
  const canonical = absoluteUrl(CANONICAL);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: H1,
    description:
      "Step-by-step guide to assembling a desktop PC: prepare components, install the CPU, RAM, CPU cooler, motherboard, storage, GPU, power supply, connect cables, and test the computer.",
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    datePublished: SITE_PUBLISHED_DATE,
    dateModified: SITE_REVISED_DATE,
    mainEntityOfPage: canonical,
    about: "PC assembly",
    inLanguage: "en",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        crumbs={[{ name: "PC Assembly" }]}
        className="mx-auto w-full max-w-4xl px-6 pt-6"
      />

      <article className="mx-auto w-full max-w-4xl px-6 pb-6 pt-4">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          {H1}
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Assembling a desktop PC is the best way to understand how computer
          hardware works — every part snaps, screws, and clicks together in a
          logical order. This guide walks through the full build, step by
          step, with links to interactive 3D models of each component.
        </p>

        <section className={SECTION}>
          <h2 className={H2}>What You Need to Assemble a PC</h2>
          <p className={P}>
            The complete build needs eight categories of parts: a{" "}
            <Link href="/components/cpu" className="font-medium text-accent transition-colors hover:text-accent-bright">
              CPU
            </Link>
            ,{" "}
            <Link href="/components/ram" className="font-medium text-accent transition-colors hover:text-accent-bright">
              RAM
            </Link>
            , a{" "}
            <Link href="/components/motherboard" className="font-medium text-accent transition-colors hover:text-accent-bright">
              motherboard
            </Link>
            ,{" "}
            <Link href="/components/storage" className="font-medium text-accent transition-colors hover:text-accent-bright">
              storage
            </Link>
            , a{" "}
            <Link href="/components/gpu" className="font-medium text-accent transition-colors hover:text-accent-bright">
              GPU
            </Link>
            , a{" "}
            <Link href="/components/power-supply" className="font-medium text-accent transition-colors hover:text-accent-bright">
              power supply
            </Link>
            , a{" "}
            <Link href="/components/cpu-cooler" className="font-medium text-accent transition-colors hover:text-accent-bright">
              CPU cooler
            </Link>
            , and a{" "}
            <Link href="/components/pc-case" className="font-medium text-accent transition-colors hover:text-accent-bright">
              PC case
            </Link>
            . Verify compatibility before buying: socket, RAM generation, case
            clearances, and PSU wattage all have to line up.
          </p>
        </section>

        {STEPS.map((step, index) => (
          <section key={step.title} className={SECTION}>
            <h2 className={H2}>
              Step {index + 1}: {step.title}
            </h2>
            <p className={P}>{step.body}</p>
            {step.link && (
              <p className="mt-3">
                <Link
                  href={step.link.href}
                  className="font-medium text-accent transition-colors hover:text-accent-bright"
                >
                  {step.link.label} →
                </Link>
              </p>
            )}
          </section>
        ))}

        <section className={SECTION}>
          <h2 className={H2}>Common PC Assembly Mistakes</h2>
          <ul className="mt-4 space-y-2.5">
            {MISTAKES.map((mistake) => (
              <li
                key={mistake}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/90"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>Frequently Asked Questions</h2>
          <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>Explore the PC in 3D</h2>
          <p className={P}>
            See how every part fits together inside a real system unit. Rotate
            and zoom the fully assembled PC below, or open the{" "}
            <Link href="/explore" className="font-medium text-accent transition-colors hover:text-accent-bright">
              interactive 3D explorer
            </Link>{" "}
            to inspect each component in detail.
          </p>
          <div className="mt-4">
            <ModelViewerSection
              model={SYSTEM_UNIT_MODEL}
              label="Interactive 3D assembled PC model"
            />
          </div>
        </section>
      </article>

      <JsonLd data={[articleJsonLd, faqJsonLd]} />
    </div>
  );
}
