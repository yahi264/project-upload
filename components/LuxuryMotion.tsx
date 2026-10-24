"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { motion, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";

// Gentle, weighted scrolling (skipped for visitors who prefer reduced motion).
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.style.scrollBehavior = "auto";
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  // New page: start at the top
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname]);
  return null;
}

// Gold ring that fills as you scroll; click to glide back to the top.
export function BackToTop({ label }: { label: string }) {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollYProgress.on("change", (v) => setShow(v > 0.12)), [scrollYProgress]);
  const up = () => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      onClick={up}
      aria-label={label}
      title={label}
      className={`fixed bottom-5 start-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink/85 text-gold-light shadow-xl shadow-ink/25 backdrop-blur transition-all duration-500 hover:-translate-y-0.5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
        <motion.circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ pathLength: scrollYProgress }} />
      </svg>
      <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}

// Soft fade and lift when moving between pages.
export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);
  return (
    <motion.div key={pathname} initial={first.current ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
