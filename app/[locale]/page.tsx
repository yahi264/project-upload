import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { RotatingImages } from "@/components/RotatingImages";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { Certificates } from "@/components/Certificates";
import { MadeToOrder } from "@/components/MadeToOrder";
import { divisions, getProduct, products, productsInDivision } from "@/lib/catalog";
import { getT, isLocale, tr, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const featured = [
  "jacquard-suite-towel-set",
  "tropical-hibiscus",
  "colorblock-sherpa-hoodie",
  "classic-shawl-robe-set",
  "gold-stripe-noir",
  "printed-bucket-hat",
  "golden-stripe-satin",
  "sailboat",
  "red-planner-gift-set",
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);
  const base = `/${l}`;

  const marquee = [t("mtoEyebrow"), t("mtoMarquee"), t("pureCotton"), "ISO 9001:2015", "OEKO-TEX®", "GOTS", "GRS", t("techDobby"), t("techJacquard"), t("techEmbroidery"), "Denizli · Türkiye"];
  const steps = [
    [t("step1"), t("step1t")],
    [t("step2"), t("step2t")],
    [t("step3"), t("step3t")],
    [t("step4"), t("step4t")],
  ];

  return (
    <>
      <Hero locale={l} />

      <section className="overflow-hidden border-y border-silver/10 bg-navy py-5 text-silver" dir="ltr">
        <div className="flex w-max animate-marquee">
          {[...marquee, ...marquee].map((f, i) => (
            <span key={i} className="eyebrow flex items-center gap-10 whitespace-nowrap px-5">
              {f}
              <span className="h-1 w-1 rotate-45 bg-gold" />
            </span>
          ))}
        </div>
      </section>

      {/* Three divisions */}
      <section className="container-x py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">{t("navCollections")}</p>
          <h2 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t("threeLines")}</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.12}>
              <Link href={`${base}/collections/${d.slug}`} className="group relative block aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[1.6s] ease-out group-hover:scale-105">
                  <RotatingImages images={d.gallery} alt={tr(d.name, l)} delay={i * 1500} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="eyebrow text-gold-light">
                    {productsInDivision(d.slug).length} {t("products")}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-cream">{tr(d.name, l)}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver">{tr(d.tagline, l)}</p>
                  <span className="mt-6 inline-flex items-center gap-3 border-b border-cream/40 pb-1 text-xs uppercase tracking-[0.25em] text-cream transition-colors group-hover:border-cream">
                    {t("discover")} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <MadeToOrder locale={l} />

      {/* Introduction */}
      <section className="bg-sand/50">
        <div className="container-x grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <p className="eyebrow text-gold">{t("introEyebrow")}</p>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">{t("introTitle")}</h2>
            <p className="mt-8 leading-relaxed text-steel">{t("introText")}</p>
            <Link href={`${base}/about`} className="group eyebrow mt-10 inline-flex items-center gap-3 text-navy">
              {t("ourStory")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.5} />
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="relative pb-10">
            <div className="relative aspect-[4/5] w-4/5 overflow-hidden">
              <Image src="/images/p/shawl-collar-terry-robe-1.webp" alt="" fill sizes="(min-width:1024px) 40vw, 80vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 end-0 aspect-square w-1/2 overflow-hidden border-8 border-cream">
              <Image src="/images/p/waffle-weave-towels-3.webp" alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -start-4 top-10 hidden bg-navy px-6 py-5 text-cream shadow-xl sm:block">
              <p className="font-display text-4xl">100%</p>
              <p className="eyebrow mt-1 text-silver">{t("pureCotton")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branding */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative grid grid-cols-2 gap-4 lg:order-2">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
              <Image src="/images/p/anchor-towel-set-1.webp" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src="/images/p/golf-towel-2.webp" alt="" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image src="/images/p/branded-pillow-set-1.webp" alt="" fill sizes="25vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow text-gold-light">{t("brandEyebrow")}</p>
              <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">{t("brandTitle")}</h2>
              <p className="mt-6 max-w-lg leading-relaxed text-silver">{t("brandText")}</p>
            </Reveal>
            <div className="mt-12 divide-y divide-silver/15 border-y border-silver/15">
              {(["techDobby", "techJacquard", "techEmbroidery"] as const).map((k, i) => (
                <Reveal key={k} delay={i * 0.1} className="grid gap-2 py-7 sm:grid-cols-[11rem_1fr]">
                  <h3 className="font-display text-2xl text-cream">{t(k)}</h3>
                  <p className="text-sm leading-relaxed text-silver">{t(`${k}Text` as "techDobbyText")}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-24 lg:py-32">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-gold">{t("newSeason")}</p>
            <h2 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t("selected")}</h2>
          </div>
          <Link href={`${base}/collections`} className="group eyebrow inline-flex items-center gap-3">
            {t("allN", { n: products.length })}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.5} />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 0.1}>
              <ProductCard product={getProduct(s)!} locale={l} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-24 text-cream lg:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">{t("howWeWork")}</p>
            <h2 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t("howTitle")}</h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-silver/15 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.1} className="h-full bg-navy p-8 lg:p-10">
                <p className="font-display text-5xl text-gold-light/80">0{i + 1}</p>
                <h3 className="mt-8 font-display text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-silver">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Certificates locale={l} />

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-28 text-center text-cream">
        <Image src="/images/p/complete-room-set-2.webp" alt="" fill sizes="100vw" quality={75} className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/90" />
        <Reveal className="container-x relative">
          <Image src="/images/site/logo-mark.png" alt="" width={48} height={60} className="mx-auto h-14 w-auto" />
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl font-light leading-tight sm:text-6xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-6 max-w-xl text-silver">{t("ctaText")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={`${base}/request`} className="btn-light">{t("navQuote")}</Link>
            <Link href={`${base}/collections`} className="btn-outline-light">{t("browse")}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
