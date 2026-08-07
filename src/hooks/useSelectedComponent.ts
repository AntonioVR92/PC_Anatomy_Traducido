"use client";

import { useState } from "react";

// Hook that tracks which component (from a list of parts) is currently selected.
export function useSelectedComponent<T extends { id: string }>(parts: T[]) {
  // The id of the part currently selected (null when nothing is selected).
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Look up the full selected part by its id, or null if there is no selection.
  const selected = parts.find((p) => p.id === selectedId) ?? null;
  // Position of the selected part in the list (-1 means nothing is selected).
  const index = selected ? parts.findIndex((p) => p.id === selected.id) : -1;

  // Select a part by id.
  const select = (id: string) => setSelectedId(id);
  // Deselect everything.
  const clear = () => setSelectedId(null);
  // Move the selection forward, wrapping around to the start of the list.
  const next = () => {
    if (!parts.length) return;
    // If nothing is selected, start at index 0; otherwise advance and wrap around.
    const i = index < 0 ? 0 : (index + 1) % parts.length;
    setSelectedId(parts[i].id);
  };
  // Move the selection backward, wrapping around to the end of the list.
  const prev = () => {
    if (!parts.length) return;
    // If nothing is selected, start at the last item; otherwise go back and wrap around.
    const i = index < 0 ? parts.length - 1 : (index - 1 + parts.length) % parts.length;
    setSelectedId(parts[i].id);
  };

  return { selectedId, selected, select, clear, next, prev };
}
