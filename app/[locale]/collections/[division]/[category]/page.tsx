import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { MadeToOrderBand } from "@/components/MadeToOrder";
import { categories, categoriesIn, getCategory, getDivision, productsIn } from "@/lib/catalog";
import { getT, isLocale, locales, tr, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; division: string; category: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => categories.map((c) => ({ locale, division: c.division, category: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c || !isLocale(locale)) return {};
  return { title: tr(c.name, locale), description: tr(c.tagline, locale) };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, division, category } = await params;
  const c = getCategory(category);
  const d = getDivision(division);
  if (!c || !d || c.division !== d.slug || !isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);
  const list = productsIn(c.slug);
  const others = categoriesIn(d.slug).filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHero
        eyebrow={tr(d.name, l)}
        title={tr(c.name, l)}
        text={tr(c.tagline, l)}
        image={c.cover}
        crumbs={[
          { href: `/${l}`, label: t("home") },
          { href: `/${l}/collections`, label: t("navCollections") },
          { href: `/${l}/collections/${d.slug}`, label: tr(d.name, l) },
          { href: `/${l}/collections/${d.slug}/${c.slug}`, label: tr(c.name, l) },
        ]}
      >
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-silver/15 pt-6">
          {c.specs.map((s) => (
            <div key={s.label.en}>
              <dt className="eyebrow text-silver/60">{tr(s.label, l)}</dt>
              <dd className="mt-1 text-sm text-cream">{tr(s.value, l)}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="container-x py-20">
        <p className="text-sm text-fg-muted">
          {list.length} {list.length === 1 ? t("product1") : t("products")}
        </p>
        <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} locale={l} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      <MadeToOrderBand locale={l} />

      <section className="bg-paper-2/50 py-20">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <p className="eyebrow text-gold">{t("continueExploring")}</p>
            <Link href={`/${l}/collections/${d.slug}`} className="group eyebrow inline-flex items-center gap-2">
              {tr(d.name, l)} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {others.map((o) => (
              <Link key={o.slug} href={`/${l}/collections/${d.slug}/${o.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={o.cover} alt="" fill sizes="(min-width:1024px) 16vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-3 font-display text-lg leading-tight">{tr(o.name, l)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
