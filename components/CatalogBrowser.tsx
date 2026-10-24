"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { categories, divisions, type Product } from "@/lib/structure";
import { getT, tr, type Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

const PAGE = 24;

export function CatalogBrowser({
  products,
  locale,
  division,
}: {
  products: Product[];
  locale: Locale;
  division?: string; // when set, the division tabs are hidden
}) {
  const t = getT(locale);
  const [activeDivision, setActiveDivision] = useState(division ?? "all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const cats = categories.filter((c) => activeDivision === "all" || c.division === activeDivision);

  const shown = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return products.filter(
      (p) =>
        (activeDivision === "all" || p.division === activeDivision) &&
        (activeCategory === "all" || p.category === activeCategory) &&
        // Search matches the product name in any language
        (!q || Object.values(p.name).some((n) => n.toLocaleLowerCase().includes(q))),
    );
  }, [products, activeDivision, activeCategory, query]);

  const pickDivision = (d: string) => {
    setActiveDivision(d);
    setActiveCategory("all");
    setLimit(PAGE);
  };

  return (
    <div>
      <div className="sticky top-[64px] z-30 -mx-5 border-b border-fg/10 bg-paper/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        {!division && (
          <div className="scrollbar-none -mx-1 mb-3 flex gap-1 overflow-x-auto">
            {[{ slug: "all", name: null }, ...divisions].map((d) => (
              <button
                key={d.slug}
                onClick={() => pickDivision(d.slug)}
                className={`relative shrink-0 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                  activeDivision === d.slug ? "text-paper" : "text-fg-muted hover:text-fg"
                }`}
              >
                {activeDivision === d.slug && (
                  <motion.span layoutId="div-tab" className="absolute inset-0 bg-fg" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                )}
                <span className="relative">{d.name ? tr(d.name, locale) : t("all")}</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto">
            {[{ slug: "all", name: null }, ...cats].map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  setActiveCategory(c.slug);
                  setLimit(PAGE);
                }}
                className={`shrink-0 border px-3 py-1.5 text-xs transition-colors ${
                  activeCategory === c.slug ? "border-fg bg-fg/5 text-fg" : "border-fg/15 text-fg-muted hover:border-fg/40"
                }`}
              >
                {c.name ? tr(c.name, locale) : t("all")}
              </button>
            ))}
          </div>
          <label className="flex shrink-0 items-center gap-3 border-b border-fg/20 py-1 lg:w-64">
            <Search className="h-4 w-4 text-fg-muted" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder={t("search")}
              className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-fg-muted/60"
            />
          </label>
        </div>
      </div>

      <p className="mt-8 text-sm text-fg-muted">
        {shown.length} {shown.length === 1 ? t("product1") : t("products")}
      </p>

      <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.slice(0, limit).map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={p} locale={locale} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {shown.length > limit && (
        <div className="mt-16 text-center">
          <button onClick={() => setLimit((n) => n + PAGE)} className="btn-outline-dark">
            {t("viewAll")} · {shown.length - limit}+
          </button>
        </div>
      )}

      {shown.length === 0 && <p className="py-24 text-center font-display text-2xl text-fg-muted">{t("noMatch")}</p>}
    </div>
  );
}
