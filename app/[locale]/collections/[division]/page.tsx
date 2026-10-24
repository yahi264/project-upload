import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Snowflake } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { Reveal } from "@/components/Reveal";
import { ExportShowcase } from "@/components/ExportShowcase";
import { ChristmasFeature } from "@/components/ChristmasFeature";
import { MadeToOrderBand } from "@/components/MadeToOrder";
import { categoriesIn, divisions, featuredCategory, getDivision, productsIn, productsInDivision } from "@/lib/catalog";
import { getT, isLocale, locales, tr, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; division: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => divisions.map((d) => ({ locale, division: d.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, division } = await params;
  const d = getDivision(division);
  if (!d || !isLocale(locale)) return {};
  return { title: tr(d.name, locale), description: tr(d.intro, locale) };
}

export default async function DivisionPage({ params }: Props) {
  const { locale, division } = await params;
  const d = getDivision(division);
  if (!d || !isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);
  const cats = categoriesIn(d.slug);

  return (
    <>
      <PageHero
        eyebrow={tr(d.tagline, l)}
        title={tr(d.name, l)}
        text={tr(d.intro, l)}
        image={d.cover}
        crumbs={[
          { href: `/${l}`, label: t("home") },
          { href: `/${l}/collections`, label: t("navCollections") },
          { href: `/${l}/collections/${d.slug}`, label: tr(d.name, l) },
        ]}
      />

      {d.slug === "export" && <ExportShowcase locale={l} />}
      {d.slug === "promotion" && <ChristmasFeature locale={l} />}

      <section className="container-x py-20">
        <div className={`grid gap-4 ${cats.length <= 2 ? "md:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
          {cats.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.06}>
              <Link href={`/${l}/collections/${d.slug}/${c.slug}`} className={`group relative block overflow-hidden ${cats.length <= 2 ? "aspect-[16/9]" : "aspect-[4/5]"} ${c.slug === featuredCategory ? "ring-2 ring-gold ring-offset-4 ring-offset-cream" : ""}`}>
                <Image
                  src={c.cover}
                  alt={tr(c.name, l)}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                {c.slug === featuredCategory && (
                  <span className="eyebrow absolute start-4 top-4 inline-flex items-center gap-1.5 bg-gold px-2.5 py-1 text-ink">
                    <Snowflake className="h-3 w-3" strokeWidth={1.6} /> {t("xmasBadge")}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="eyebrow text-gold-light">{productsIn(c.slug).length} {t("designs")}</p>
                    <h2 className="mt-1.5 font-display text-xl leading-tight text-cream sm:text-2xl">{tr(c.name, l)}</h2>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-cream opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100" strokeWidth={1.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <MadeToOrderBand locale={l} />

      <section className="container-x py-24">
        <h2 className="mb-6 font-display text-4xl font-light">{t("navAll")}</h2>
        <CatalogBrowser products={productsInDivision(d.slug)} locale={l} division={d.slug} />
      </section>
    </>
  );
}
