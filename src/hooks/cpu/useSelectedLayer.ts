"use client";

import { useMemo, useState } from "react";
import type { CPULayer } from "@/data/cpuLayers";

// Hook that tracks which CPU layer (from a list of layers) is currently selected.
export function useSelectedLayer(layers: CPULayer[]) {
  // The id of the layer currently selected (null when nothing is selected).
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Look up the full selected layer by its id, or null if there is no selection.
  const selected = useMemo(
    () => layers.find((l) => l.id === selectedId) ?? null,
    [layers, selectedId]
  );
  // Position of the selected layer in the list (-1 means nothing is selected).
  const index = selected ? layers.findIndex((l) => l.id === selected.id) : -1;

  // Select a layer by id.
  const select = (id: string) => setSelectedId(id);
  // Deselect everything.
  const clear = () => setSelectedId(null);
  // Move the selection forward, wrapping around to the start of the list.
  const next = () => {
    if (!layers.length) return;
    // If nothing is selected, start at index 0; otherwise advance and wrap around.
    const i = index < 0 ? 0 : (index + 1) % layers.length;
    setSelectedId(layers[i].id);
  };
  // Move the selection backward, wrapping around to the end of the list.
  const prev = () => {
    if (!layers.length) return;
    // If nothing is selected, start at the last item; otherwise go back and wrap around.
    const i = index < 0 ? layers.length - 1 : (index - 1 + layers.length) % layers.length;
    setSelectedId(layers[i].id);
  };

  return { selectedId, selected, index, select, clear, next, prev };
}
