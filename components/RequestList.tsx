"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// The client's request list: products they want a quote for. Kept in localStorage
// so it survives reloads and language changes until the request is sent.
// Sizes and finishes are stored as indexes into the category's lists, so they display in any language.

export type RequestItem = {
  id: string;
  slug: string;
  size: number;
  option: number;
  quantity: number;
};

type Ctx = {
  items: RequestItem[];
  count: number;
  add: (item: Omit<RequestItem, "id">) => void;
  update: (id: string, patch: Partial<Pick<RequestItem, "quantity">>) => void;
  remove: (id: string) => void;
  clear: () => void;
  justAdded: number;
};

const RequestListContext = createContext<Ctx | null>(null);
const KEY = "hieron-request-list-v2";

export function RequestListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const add = useCallback((item: Omit<RequestItem, "id">) => {
    const id = `${item.slug}|${item.size}|${item.option}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i));
      return [...prev, { ...item, id }];
    });
    setJustAdded((n) => n + 1);
  }, []);

  const update = useCallback<Ctx["update"]>((id, patch) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, add, update, remove, clear, justAdded }),
    [items, add, update, remove, clear, justAdded],
  );

  return <RequestListContext.Provider value={value}>{children}</RequestListContext.Provider>;
}

export function useRequestList() {
  const ctx = useContext(RequestListContext);
  if (!ctx) throw new Error("useRequestList must be used inside RequestListProvider");
  return ctx;
}
