"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Img } from "@/lib/structure";
import { getT, type Locale } from "@/lib/i18n";

export function Gallery({ images, alt, locale }: { images: Img[]; alt: string; locale: Locale }) {
  const t = getT(locale);
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const many = images.length > 1;
  const go = useCallback((d: number) => setI((n) => (n + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!zoom) return;
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom, go]);

  const img = images[i];

  return (
    <div>
      <button
        onClick={() => setZoom(true)}
        className="group relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden"
        style={{ backgroundColor: img.color }}
        aria-label={`${alt} — ${t("photo")} ${i + 1}`}
      >
        <AnimatePresence initial={false}>
          <motion.div key={img.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute inset-0">
            <Image src={img.src} alt={alt} fill priority={i === 0} quality={90} sizes="(min-width:1280px) 750px, (min-width:1024px) 58vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <span className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center bg-cream/90 text-navy opacity-0 transition-opacity group-hover:opacity-100">
          <Expand className="h-4 w-4" strokeWidth={1.5} />
        </span>
        {many && (
          <span className="absolute bottom-4 start-4 bg-ink/60 px-2.5 py-1 text-xs text-cream backdrop-blur-sm" dir="ltr">
            {i + 1} / {images.length}
          </span>
        )}
      </button>

      {many && (
        <div className="scrollbar-none mt-3 flex gap-3 overflow-x-auto">
          {images.map((im, k) => (
            <button
              key={im.src}
              onClick={() => setI(k)}
              aria-label={`${t("photo")} ${k + 1}`}
              className={`relative aspect-[16/9] w-28 shrink-0 overflow-hidden transition-opacity ${k === i ? "ring-2 ring-navy ring-offset-2 ring-offset-cream" : "opacity-60 hover:opacity-100"}`}
              style={{ backgroundColor: im.color }}
            >
              <Image src={im.src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {mounted &&
        createPortal(
        <AnimatePresence>
          {zoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 backdrop-blur"
              onClick={() => setZoom(false)}
              role="dialog"
              aria-modal
            >
              <div className="relative h-[90vh] w-[94vw]" style={{ maxWidth: "160vh" }} onClick={(e) => e.stopPropagation()}>
                <Image src={img.src} alt={alt} fill quality={90} sizes="94vw" className="object-contain" />
              </div>
              <button onClick={() => setZoom(false)} aria-label={t("close")} className="absolute end-5 top-5 p-2 text-cream hover:text-gold-light">
                <X className="h-7 w-7" strokeWidth={1.5} />
              </button>
              {many && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t("previous")} className="absolute start-3 top-1/2 -translate-y-1/2 p-3 text-cream hover:text-gold-light">
                    <ChevronLeft className="h-9 w-9 rtl:-scale-x-100" strokeWidth={1} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t("next")} className="absolute end-3 top-1/2 -translate-y-1/2 p-3 text-cream hover:text-gold-light">
                    <ChevronRight className="h-9 w-9 rtl:-scale-x-100" strokeWidth={1} />
                  </button>
                  <p className="absolute bottom-5 text-sm text-silver" dir="ltr">{i + 1} / {images.length}</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
