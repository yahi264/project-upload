"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getT, type Locale } from "@/lib/i18n";

// Runs before the page is shown (see layout) so the saved mode never flashes.
export const themeScript = `(function(){try{var t=localStorage.getItem("hieron-theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

export function ThemeToggle({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");
    html.classList.add("theme-switching");
    html.classList.toggle("dark", next);
    setTimeout(() => html.classList.remove("theme-switching"), 600);
    try {
      localStorage.setItem("hieron-theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  const label = dark ? t("lightMode") : t("darkMode");
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-silver/25 text-silver transition-colors hover:border-gold-light hover:text-gold-light"
    >
      <Sun className={`absolute h-4 w-4 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} strokeWidth={1.5} />
      <Moon className={`absolute h-4 w-4 transition-all duration-500 ${dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} strokeWidth={1.5} />
    </button>
  );
}
