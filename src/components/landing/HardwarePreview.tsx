"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HardwarePreview() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const zoomRef = useRef<HTMLSpanElement | null>(null);
  const spinRef = useRef<HTMLSpanElement | null>(null);
  const exploreRef = useRef<HTMLSpanElement | null>(null);
  const learnRef = useRef<HTMLSpanElement | null>(null);

  const finalRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const zoom = zoomRef.current;
    const spin = spinRef.current;
    const explore = exploreRef.current;
    const learn = learnRef.current;
    const finalRow = finalRowRef.current;

    if (
      !section ||
      !zoom ||
      !spin ||
      !explore ||
      !learn ||
      !finalRow
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * Initial states
       */
      gsap.set([zoom, spin, explore, learn], {
        opacity: 0,
        y: 25,
        filter: "blur(8px)",
      });

      gsap.set(finalRow, {
        opacity: 0,
      });

      /*
       * Scroll timeline
       *
       * IMPORTANT:
       * This section is NOT pinned by ScrollTrigger.
       *
       * The section itself is 300vh tall and the content inside
       * is sticky. This prevents it from competing with Features.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      /*
       * ZOOM
       */
      tl.to(zoom, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.18,
        ease: "power2.out",
      });

      tl.to(zoom, {
        opacity: 0,
        y: -20,
        duration: 0.14,
        ease: "power2.in",
      });

      /*
       * SPIN
       */
      tl.to(spin, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.18,
        ease: "power2.out",
      });

      tl.to(spin, {
        opacity: 0,
        y: -20,
        duration: 0.14,
        ease: "power2.in",
      });

      /*
       * EXPLORE
       */
      tl.to(explore, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.18,
        ease: "power2.out",
      });

      tl.to(explore, {
        opacity: 0,
        y: -20,
        duration: 0.14,
        ease: "power2.in",
      });

      /*
       * LEARN
       */
      tl.to(learn, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.2,
        ease: "power2.out",
      });

      /*
       * Small pause
       */
      tl.to({}, {
        duration: 0.12,
      });

      /*
       * FINAL TRANSFORMATION
       *
       * Learn moves to the right.
       */
      tl.to(learn, {
        x: "32vw",
        duration: 0.4,
        ease: "power2.inOut",
      });

      /*
       * Reveal final horizontal headline.
       */
      tl.to(
        finalRow,
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        "<0.15"
      );

      /*
       * Hide the standalone Learn once final text is visible.
       */
      tl.to(
        learn,
        {
          opacity: 0,
          duration: 0.12,
          ease: "power2.out",
        },
        ">-0.05"
      );

      /*
       * Refresh after layout has settled.
       */
      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] w-full"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center px-6">
          {/* Individual animated words */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              ref={zoomRef}
              className="
                absolute
                whitespace-nowrap
                text-[clamp(4rem,10vw,9rem)]
                font-semibold
                tracking-[-0.06em]
                text-white
                will-change-transform
              "
            >
              Zoom
            </span>

            <span
              ref={spinRef}
              className="
                absolute
                whitespace-nowrap
                text-[clamp(4rem,10vw,9rem)]
                font-semibold
                tracking-[-0.06em]
                text-white
                will-change-transform
              "
            >
              Spin
            </span>

            <span
              ref={exploreRef}
              className="
                absolute
                whitespace-nowrap
                text-[clamp(4rem,10vw,9rem)]
                font-semibold
                tracking-[-0.06em]
                text-white
                will-change-transform
              "
            >
              Explore
            </span>

            <span
              ref={learnRef}
              className="
                absolute
                whitespace-nowrap
                text-[clamp(4rem,10vw,9rem)]
                font-semibold
                tracking-[-0.06em]
                text-white
                will-change-transform
              "
            >
              Learn
            </span>
          </div>

          {/* Final horizontal headline */}
          <div
            ref={finalRowRef}
            className="
              pointer-events-none
              relative
              z-10
              flex
              w-full
              items-center
              justify-center
              whitespace-nowrap
              text-center
              text-[clamp(2.2rem,5.5vw,6rem)]
              font-semibold
              tracking-[-0.055em]
              text-white
            "
          >
            <span>Zoom</span>
            <span>,&nbsp;</span>
            <span>Spin</span>
            <span>,&nbsp;</span>
            <span>Explore</span>
            <span>&nbsp;and&nbsp;</span>
            <span>Learn</span>
          </div>
        </div>
      </div>
    </section>
  );
}