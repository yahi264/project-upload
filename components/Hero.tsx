"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getT, type Locale } from "@/lib/i18n";

// Slowly cross-fades between one photo from each collection.
const slides = [
  "/images/p/jacquard-suite-towel-set-4.webp",
  "/images/p/gold-stripe-noir-1.webp",
  "/images/p/anchor-towel-set-2.webp",
  "/images/p/midnight-navy-1.webp",
  "/images/p/export-warehouse.webp",
];

export function Hero({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: 7, ease: "linear" } }}
            className="absolute inset-0"
          >
            <Image src={slides[i]} alt="" fill priority={i === 0} sizes="100vw" quality={90} className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent rtl:bg-gradient-to-l" />

      <motion.div style={{ opacity: fade }} className="container-x relative pb-20 pt-40 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="eyebrow flex items-center gap-4 text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light" /> {t("heroEyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.08] text-cream sm:text-7xl lg:text-8xl"
        >
          {t("heroTitleA")} <em className="silver-text font-normal">{t("heroTitleB")}</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-silver sm:text-lg"
        >
          {t("heroText")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href={`/${locale}/collections`} className="btn-light group">
            {t("explore")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" strokeWidth={1.5} />
          </Link>
          <Link href={`/${locale}/request`} className="btn-outline-light">{t("navQuote")}</Link>
        </motion.div>
        <div className="mt-14 flex gap-2">
          {slides.map((s, k) => (
            <button
              key={s}
              onClick={() => setI(k)}
              aria-label={`${k + 1}`}
              className={`h-0.5 transition-all duration-500 ${k === i ? "w-10 bg-gold-light" : "w-5 bg-silver/40 hover:bg-silver"}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
