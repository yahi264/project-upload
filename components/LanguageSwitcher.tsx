"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { Flag } from "./Flag";
import { getT, localeNames, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = getT(locale);

  useEffect(() => {
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Same page, other language: swap the first part of the address.
  const hrefFor = (l: Locale) => `/${l}${pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "")}`;
  const remember = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2" aria-label={t("language")}>
        {locales.map((l) => (
          <Link
            key={l}
            href={hrefFor(l)}
            onClick={() => remember(l)}
            className={`flex items-center gap-2 border px-3 py-1.5 text-xs ${l === locale ? "border-cream text-cream" : "border-silver/30 text-silver"}`}
          >
            <Flag locale={l} />
            {localeNames[l]}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 py-2 text-xs uppercase tracking-[0.2em] text-silver transition-colors hover:text-cream"
        aria-expanded={open}
        aria-label={t("language")}
      >
        <Flag locale={locale} />
        {locale}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full mt-3 w-48 bg-cream py-2 shadow-2xl shadow-ink/30"
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={hrefFor(l)}
                  onClick={() => remember(l)}
                  lang={l}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy hover:bg-sand"
                >
                  <Flag locale={l} />
                  <span className="flex-1">{localeNames[l]}</span>
                  {l === locale && <Check className="h-4 w-4 text-gold" />}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
