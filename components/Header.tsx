"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardList, Menu, Snowflake, X } from "lucide-react";
import { useRequestList } from "./RequestList";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { categoriesIn, divisions, featuredCategory } from "@/lib/structure";
import { getT, tr, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getT(locale);
  const base = `/${locale}`;
  const { count, justAdded } = useRequestList();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  // Only the home page starts with a transparent header over the dark hero.
  const overHero = pathname === base && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const inCatalog = pathname.startsWith(`${base}/collections`) || pathname.startsWith(`${base}/products`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overHero ? "bg-transparent py-6" : "bg-ink/95 py-4 shadow-lg shadow-ink/10 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Link href={base} className="flex items-center gap-3" aria-label="Hieron">
          <Image src="/images/site/logo-mark.png" alt="" width={28} height={35} priority className="h-8 w-auto" />
          <Image src="/images/site/logo-word.png" alt="Hieron" width={110} height={20} priority className="h-3.5 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <div onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <Link
              href={`${base}/collections`}
              className={`eyebrow py-2 transition-colors ${inCatalog ? "text-cream" : "text-silver hover:text-cream"}`}
            >
              {t("navCollections")}
            </Link>
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-full pt-0"
                >
                  <div className="container-x">
                    <div className="grid grid-cols-4 gap-px bg-navy/10 shadow-2xl shadow-ink/30">
                      {divisions.map((d) => (
                        <div key={d.slug} className="bg-cream p-6">
                          <Link href={`${base}/collections/${d.slug}`} className="group block">
                            <span className="relative block aspect-[16/7] overflow-hidden">
                              <Image src={d.cover} alt="" fill sizes="400px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </span>
                            <span className="mt-4 block font-display text-xl text-navy">{tr(d.name, locale)}</span>
                          </Link>
                          <ul className="mt-3 space-y-1.5">
                            {categoriesIn(d.slug).map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`${base}/collections/${d.slug}/${c.slug}`}
                                  className={`text-sm transition-colors ${c.slug === featuredCategory ? "inline-flex items-center gap-1.5 font-medium text-gold hover:text-navy" : "text-steel hover:text-navy"}`}
                                >
                                  {c.slug === featuredCategory && <Snowflake className="h-3.5 w-3.5" strokeWidth={1.6} />}
                                  {tr(c.name, locale)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href={`${base}/about`}
            className={`eyebrow transition-colors ${pathname === `${base}/about` ? "text-cream" : "text-silver hover:text-cream"}`}
          >
            {t("navAbout")}
          </Link>
          <LanguageSwitcher locale={locale} />
          <Link href={`${base}/request`} className="btn-outline-light relative !px-5 !py-2.5">
            <ClipboardList className="h-4 w-4" strokeWidth={1.5} />
            {t("navQuote")}
            {count > 0 && (
              <motion.span
                key={justAdded}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute -end-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] tracking-normal text-ink"
              >
                {count}
              </motion.span>
            )}
          </Link>
        </nav>

        <button
          className="relative text-cream lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("menuClose") : t("menuOpen")}
        >
          {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          {count > 0 && !open && <span className="absolute -end-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[calc(100svh-64px)] overflow-y-auto lg:hidden"
          >
            <div className="container-x pb-8 pt-6">
              {divisions.map((d) => (
                <div key={d.slug} className="mb-6">
                  <Link href={`${base}/collections/${d.slug}`} className="font-display text-2xl text-cream">
                    {tr(d.name, locale)}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {categoriesIn(d.slug).map((c) => (
                      <Link key={c.slug} href={`${base}/collections/${d.slug}/${c.slug}`} className={`text-sm ${c.slug === featuredCategory ? "inline-flex items-center gap-1.5 text-gold-light" : "text-silver"}`}>
                        {c.slug === featuredCategory && <Snowflake className="h-3.5 w-3.5" strokeWidth={1.6} />}
                        {tr(c.name, locale)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="my-5 h-px bg-silver/20" />
              <div className="flex flex-col gap-3">
                <Link href={`${base}/collections`} className="eyebrow text-silver">{t("navAll")}</Link>
                <Link href={`${base}/about`} className="eyebrow text-silver">{t("navAbout")}</Link>
                <Link href={`${base}/request`} className="eyebrow text-silver">
                  {t("navQuote")} {count > 0 && <span className="text-gold">({count})</span>}
                </Link>
              </div>
              <div className="mt-6">
                <LanguageSwitcher locale={locale} compact />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
