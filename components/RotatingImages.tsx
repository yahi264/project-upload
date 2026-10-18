"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Cross-fades through a set of photos with a slow zoom. `delay` staggers cards
// so neighbouring collections change one after another, not all at once.
// Stops while off-screen and for visitors who prefer reduced motion.
export function RotatingImages({
  images,
  alt,
  sizes,
  delay = 0,
  interval = 6000,
  quality = 85,
}: {
  images: string[];
  alt: string;
  sizes: string;
  delay?: number;
  interval?: number;
  quality?: number;
}) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setActive((n) => (n + 1) % images.length);
      timer = setInterval(() => setActive((n) => (n + 1) % images.length), interval);
    }, interval / 2 + delay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [visible, images.length, interval, delay]);

  return (
    <div ref={ref} className="absolute inset-0">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === active ? alt : ""}
          fill
          sizes={sizes}
          quality={quality}
          className={`object-cover will-change-transform ${
            i === active
              ? "scale-100 opacity-100 [transition:opacity_1.6s_ease,transform_8s_ease-out]"
              : "scale-[1.08] opacity-0 [transition:opacity_1.6s_ease,transform_0s_linear_1.6s]"
          }`}
        />
      ))}
      {/* Position indicator */}
      <div className="absolute end-5 top-5 z-10 flex gap-1.5" aria-hidden>
        {images.map((src, i) => (
          <span key={src} className="h-0.5 w-5 overflow-hidden bg-cream/30">
            <span
              className={`block h-full bg-cream ${i === active ? "w-full transition-[width] ease-linear" : "w-0"}`}
              style={i === active && visible ? { transitionDuration: `${interval}ms` } : undefined}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
