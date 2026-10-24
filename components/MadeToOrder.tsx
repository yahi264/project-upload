import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, Package, Ruler, Stamp } from "lucide-react";
import { Reveal } from "./Reveal";
import { getT, type Locale } from "@/lib/i18n";

const points = [
  { title: "mtoLogo", text: "mtoLogoT", icon: Stamp, img: "/images/p/branded-pillow-set-1.webp" },
  { title: "mtoColour", text: "mtoColourT", icon: Palette, img: "/images/p/polyester-yarn-1.webp" },
  { title: "mtoSpec", text: "mtoSpecT", icon: Ruler, img: "/images/p/twill-weave-fabric-3.webp" },
  { title: "mtoPack", text: "mtoPackT", icon: Package, img: "/images/p/business-gift-set-1.webp" },
] as const;

// Full section for the home page: made to order, with the customer's brand.
export function MadeToOrder({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold" /> {t("mtoEyebrow")}
            </p>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">{t("mtoTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="leading-relaxed text-fg-muted">{t("mtoText")}</p>
            <Link href={`/${locale}/request`} className="btn-dark group mt-8">
              {t("mtoCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group h-full bg-paper shadow-sm shadow-ink/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-ink/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={p.img} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
                    <span className="absolute start-4 top-4 flex h-11 w-11 items-center justify-center bg-paper text-fg shadow">
                      <Icon className="h-5 w-5" strokeWidth={1.4} />
                    </span>
                    <span className="absolute bottom-3 end-4 font-display text-4xl text-cream/90 drop-shadow">0{i + 1}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{t(p.title)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t(p.text)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Compact band for collection and category pages.
export function MadeToOrderBand({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <Image src="/images/p/branded-pillow-set-1.webp" alt="" fill sizes="100vw" quality={75} className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60 rtl:bg-gradient-to-l" />
      <div className="container-x relative grid gap-8 py-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <p className="eyebrow text-gold-light">{t("mtoEyebrow")}</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">{t("mtoTitle")}</h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.title} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold-light" strokeWidth={1.4} /> {t(p.title)}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:text-end">
          <Link href={`/${locale}/request`} className="btn-light group">
            {t("mtoCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Short note shown on every product page.
export function MadeToOrderNote({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="flex gap-4 border-s-2 border-gold bg-paper-2/70 p-5">
      <Stamp className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
      <p className="text-sm leading-relaxed text-fg">{t("mtoNote")}</p>
    </div>
  );
}
