import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RotatingImages } from "@/components/RotatingImages";
import { Certificates } from "@/components/Certificates";
import { divisions } from "@/lib/catalog";
import { getT, isLocale, tr, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return { title: t("navAbout"), description: t("aboutP1") };
}

const values = [
  ["vQuality", "jacquard-guest-towel-set-1"],
  ["vWarranty", "pure-white-quilted-1"],
  ["vDesign", "grey-damask-robe-1"],
  ["vExclusivity", "leopard-luxe-1"],
  ["vMaterials", "waffle-pique-blanket-2"],
  ["vDurability", "anchor-towel-set-3"],
] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);

  return (
    <>
      <PageHero
        eyebrow={t("aboutEyebrow")}
        title={t("aboutTitle")}
        image="/images/p/spa-toiletry-set-1.webp"
        crumbs={[{ href: `/${l}`, label: t("home") }, { href: `/${l}/about`, label: t("navAbout") }]}
      />

      <section className="container-x grid gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <p className="eyebrow text-gold">Pamukkale · Denizli</p>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight">{t("aboutH")}</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 leading-relaxed text-steel">
          <p>{t("aboutP1")}</p>
          <p>{t("aboutP2")}</p>
        </Reveal>
      </section>

      <section className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {divisions.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.08}>
            <Link href={`/${l}/collections/${d.slug}`} className="group relative block aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105">
                <RotatingImages images={d.gallery} alt={tr(d.name, l)} delay={i * 1500} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <p className="absolute bottom-6 start-6 font-display text-3xl text-cream">{tr(d.name, l)}</p>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-px bg-navy/10 md:grid-cols-3">
          {([["pillar1", "pillar1t"], ["pillar2", "pillar2t"], ["pillar3", "pillar3t"]] as const).map(([h, p], i) => (
            <Reveal key={h} delay={i * 0.1} className="h-full bg-cream p-10">
              <p className="font-display text-5xl text-gold/70">0{i + 1}</p>
              <h3 className="mt-6 font-display text-2xl">{t(h)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-steel">{t(p)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-cream lg:py-32">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-light">Hieron</p>
            <h2 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t("valuesTitle")}</h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {values.map(([k, img], i) => (
              <Reveal key={k} delay={(i % 3) * 0.08}>
                <div className="group relative aspect-[16/10] overflow-hidden">
                  <Image src={`/images/p/${img}.webp`} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-ink/45 transition-colors duration-500 group-hover:bg-ink/25" />
                  <p className="absolute inset-0 flex items-center justify-center font-display text-2xl sm:text-4xl">{t(k)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Certificates locale={l} />
    </>
  );
}
