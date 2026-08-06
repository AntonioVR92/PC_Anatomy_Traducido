"use client";

import { useMemo, useState } from "react";
import type { CPULayer } from "@/data/cpuLayers";

export function useSelectedLayer(layers: CPULayer[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => layers.find((l) => l.id === selectedId) ?? null,
    [layers, selectedId]
  );
  const index = selected ? layers.findIndex((l) => l.id === selected.id) : -1;

  const select = (id: string) => setSelectedId(id);
  const clear = () => setSelectedId(null);
  const next = () => {
    if (!layers.length) return;
    const i = index < 0 ? 0 : (index + 1) % layers.length;
    setSelectedId(layers[i].id);
  };
  const prev = () => {
    if (!layers.length) return;
    const i = index < 0 ? layers.length - 1 : (index - 1 + layers.length) % layers.length;
    setSelectedId(layers[i].id);
  };

  return { selectedId, selected, index, select, clear, next, prev };
}
