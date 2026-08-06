import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SidebarComponent } from "@/components/motherboard/Sidebar";

export type TabId = "overview" | "functions" | "issues";

type HotspotNav = {
  next: () => void;
  prev: () => void;
  reset: () => void;
  close: () => void;
};

type ExplorerState = {
  selectedId: string;
  tab: TabId;
  hotspotActive: boolean;
  hotspotPart: SidebarComponent | null;
  hotspotIndex: number;
  hotspotTotal: number;
  select: (id: string) => void;
  setTab: (tab: TabId) => void;
  openHotspot: (part: SidebarComponent, index: number, total: number) => void;
  closeHotspot: () => void;
  setHotspotNav: (nav: HotspotNav) => void;
  nextHotspot: () => void;
  prevHotspot: () => void;
  resetHotspot: () => void;
};

export const useExplorer = create<ExplorerState>()(
  persist(
    (set) => {
      const navRef = { current: null as HotspotNav | null };

      return {
        selectedId: "case",
        tab: "overview",
        hotspotActive: false,
        hotspotPart: null,
        hotspotIndex: 0,
        hotspotTotal: 0,
        select: (id) =>
          set({ selectedId: id, hotspotActive: false, hotspotPart: null }),
        setTab: (tab) => set({ tab }),
        openHotspot: (part, index, total) =>
          set({
            hotspotActive: true,
            hotspotPart: part,
            hotspotIndex: index,
            hotspotTotal: total,
          }),
        closeHotspot: () => {
          navRef.current?.close();
          set({
            hotspotActive: false,
            hotspotPart: null,
            hotspotIndex: 0,
            hotspotTotal: 0,
          });
        },
        setHotspotNav: (nav) => {
          navRef.current = nav;
        },
        nextHotspot: () => navRef.current?.next(),
        prevHotspot: () => navRef.current?.prev(),
        resetHotspot: () => navRef.current?.reset(),
      };
    },
    {
      name: "pc-anatomy-explorer",
      partialize: (state) => ({
        selectedId: state.selectedId,
        tab: state.tab,
      }),
    }
  )
);
