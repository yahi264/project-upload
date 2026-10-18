import Image from "next/image";
import { Reveal } from "./Reveal";
import { certificates } from "@/lib/structure";
import { getT, type Locale } from "@/lib/i18n";

export function Certificates({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="bg-sand/60 py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-gold">{t("certEyebrow")}</p>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">{t("certTitle")}</h2>
          <p className="mt-6 leading-relaxed text-steel">{t("certText")}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:col-span-7">
          {certificates.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="flex h-full items-center gap-5 bg-white p-6 shadow-sm shadow-ink/5 transition-shadow hover:shadow-lg">
                <div className="relative h-20 w-20 shrink-0">
                  <Image src={c.logo} alt={c.name} fill sizes="80px" className="object-contain" />
                </div>
                <div>
                  <p className="font-display text-xl text-navy">{c.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-steel">{t(c.key)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
