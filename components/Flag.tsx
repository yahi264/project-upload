import type { Locale } from "@/lib/i18n";

// Small inline flags for the language menu (emoji flags don't display on Windows).
// Arabic uses the flag of the United Arab Emirates; change it here if you prefer another.
export function Flag({ locale, className = "h-3.5 w-5" }: { locale: Locale; className?: string }) {
  const common = { className: `${className} shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15)]`, "aria-hidden": true };
  switch (locale) {
    case "en": // United Kingdom
      return (
        <svg viewBox="0 0 60 30" preserveAspectRatio="none" {...common}>
          <clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "fr":
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" {...common}>
          <path fill="#002654" d="M0 0h1v2H0z" />
          <path fill="#fff" d="M1 0h1v2H1z" />
          <path fill="#CE1126" d="M2 0h1v2H2z" />
        </svg>
      );
    case "tr": // Türkiye
      return (
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none" {...common}>
          <path fill="#E30A17" d="M0 0h1200v800H0z" />
          <circle cx="425" cy="400" r="200" fill="#fff" />
          <circle cx="475" cy="400" r="160" fill="#E30A17" />
          <path fill="#fff" d="M583.334 400l180.901-58.779-111.804 153.885V305.894l111.804 153.885z" />
        </svg>
      );
    case "ar": // United Arab Emirates
      return (
        <svg viewBox="0 0 12 6" preserveAspectRatio="none" {...common}>
          <path fill="#00732F" d="M0 0h12v2H0z" />
          <path fill="#fff" d="M0 2h12v2H0z" />
          <path fill="#000" d="M0 4h12v2H0z" />
          <path fill="#FF0000" d="M0 0h3v6H0z" />
        </svg>
      );
    case "ru":
      return (
        <svg viewBox="0 0 9 6" preserveAspectRatio="none" {...common}>
          <path fill="#fff" d="M0 0h9v2H0z" />
          <path fill="#0039A6" d="M0 2h9v2H0z" />
          <path fill="#D52B1E" d="M0 4h9v2H0z" />
        </svg>
      );
  }
}
