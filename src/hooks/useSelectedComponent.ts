"use client";

import { useState } from "react";

export function useSelectedComponent<T extends { id: string }>(parts: T[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = parts.find((p) => p.id === selectedId) ?? null;
  const index = selected ? parts.findIndex((p) => p.id === selected.id) : -1;

  const select = (id: string) => setSelectedId(id);
  const clear = () => setSelectedId(null);
  const next = () => {
    if (!parts.length) return;
    const i = index < 0 ? 0 : (index + 1) % parts.length;
    setSelectedId(parts[i].id);
  };
  const prev = () => {
    if (!parts.length) return;
    const i = index < 0 ? parts.length - 1 : (index - 1 + parts.length) % parts.length;
    setSelectedId(parts[i].id);
  };

  return { selectedId, selected, select, clear, next, prev };
}
