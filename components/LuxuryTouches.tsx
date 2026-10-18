"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

// Opening curtain shown once per visit: the logo appears over a drawn gold line, then lifts away.
export function IntroCurtain() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("hieron-intro") === "1";
      sessionStorage.setItem("hieron-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const id = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2300);
    return () => {
      clearTimeout(id);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/images/site/logo.png" alt="" width={120} height={123} priority className="h-28 w-auto" />
            </motion.div>
            <motion.span
              className="mt-8 block h-px w-48 origin-center bg-gradient-to-r from-transparent via-gold-light to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="eyebrow mt-5 text-silver/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Textile &amp; Promotion · Denizli
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Thin gold line at the top of the window that fills as the visitor scrolls.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-gold-light to-gold rtl:origin-right"
      aria-hidden
    />
  );
}
