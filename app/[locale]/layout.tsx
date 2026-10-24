import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Amiri, Cormorant_Garamond, Jost, Tajawal } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialButtons } from "@/components/SocialButtons";
import { IntroCurtain, ScrollProgress } from "@/components/LuxuryTouches";
import { BackToTop, PageFade, SmoothScroll } from "@/components/LuxuryMotion";
import { themeScript } from "@/components/ThemeToggle";
import { RequestListProvider } from "@/components/RequestList";
import { dirOf, getT, isLocale, locales, type Locale } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const jost = Jost({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["300", "400", "500"], variable: "--font-jost" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500"], variable: "--font-tajawal" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return {
    title: { default: `Hieron — ${t("heroTitleA")} ${t("heroTitleB")}`, template: "%s · Hieron" },
    description: t("heroText"),
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <html
      lang={l}
      dir={dirOf(l)}
      className={`${cormorant.variable} ${jost.variable} ${amiri.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        <IntroCurtain />
        <ScrollProgress />
        <RequestListProvider>
          <Header locale={l} />
          <main>
            <PageFade>{children}</PageFade>
          </main>
          <Footer locale={l} />
          <SocialButtons locale={l} />
          <BackToTop label={getT(l)("backToTop")} />
        </RequestListProvider>
      </body>
    </html>
  );
}
