"use client";

// MobileHeader.tsx: The compact top bar shown on tablet and mobile. It
// replaces the desktop sidebar header: hamburger button on the left to open
// the components drawer, the Computer Anatomy logo/name, and a compact
// version badge on the right. Hidden on lg+ where the sidebar takes over.
import Image from "next/image";
import { Menu } from "lucide-react";

export function MobileHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="relative z-40 flex h-14 shrink-0 items-center gap-2.5 border-b border-line bg-surface/80 px-3 backdrop-blur-xl lg:hidden">
      {/* Hamburger button opens the components drawer. */}
      <button
        type="button"
        aria-label="Open components list"
        onClick={onOpenMenu}
        className="-ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-foreground transition-colors active:bg-surface-3"
      >
        <Menu className="h-5 w-5" strokeWidth={1.8} />
      </button>

      {/* Logo mark. */}
      <div className="relative shrink-0">
        <Image
          src="/logo.png"
          alt="Computer Anatomy logo"
          width={128}
          height={128}
          priority
          className="h-8 w-8 rounded-lg object-cover"
        />
      </div>

      {/* Name + short subtitle. */}
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-[13px] font-semibold leading-tight tracking-tight text-foreground">
          Computer Anatomy
        </span>
        <span className="truncate text-[10px] leading-tight text-muted-2">
          Explore Components
        </span>
      </div>

      {/* Compact version badge. */}
      <span className="ml-auto shrink-0 rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-2">
        v0.1
      </span>
    </header>
  );
}