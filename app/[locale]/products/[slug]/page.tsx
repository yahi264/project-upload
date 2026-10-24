import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { AddToRequest } from "@/components/AddToRequest";
import { Gallery } from "@/components/Gallery";
import { MadeToOrderNote } from "@/components/MadeToOrder";
import { ProductCard } from "@/components/ProductCard";
import { getCategory, getDivision, getProduct, name, products, productsIn } from "@/lib/catalog";
import { getT, isLocale, locales, tr, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProduct(slug);
  if (!p || !isLocale(locale)) return {};
  const c = getCategory(p.category)!;
  return {
    title: name(p, locale),
    description: `${tr(c.name, locale)} — ${tr(c.tagline, locale)}`,
    openGraph: { images: [p.images[0].src] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product || !isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);
  const category = getCategory(product.category)!;
  const division = getDivision(product.division)!;
  const siblings = productsIn(category.slug);
  const index = siblings.findIndex((p) => p.slug === product.slug);
  const related = [1, 2, 3]
    .map((k) => siblings[(index + k) % siblings.length])
    .filter((p, k, arr) => p.slug !== product.slug && arr.findIndex((x) => x.slug === p.slug) === k);
  const label = name(product, l);

  return (
    <>
      <div className="h-[64px] bg-ink" />
      <section className="container-x py-10 lg:py-14">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-fg-muted" aria-label="Breadcrumb">
          <Link href={`/${l}/collections`} className="hover:text-fg">{t("navCollections")}</Link>
          <ChevronRight className="h-3 w-3 rtl:-scale-x-100" />
          <Link href={`/${l}/collections/${division.slug}`} className="hover:text-fg">{tr(division.name, l)}</Link>
          <ChevronRight className="h-3 w-3 rtl:-scale-x-100" />
          <Link href={`/${l}/collections/${division.slug}/${category.slug}`} className="hover:text-fg">{tr(category.name, l)}</Link>
          <ChevronRight className="h-3 w-3 rtl:-scale-x-100" />
          <span className="text-fg">{label}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <Gallery images={product.images} alt={label} locale={l} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow text-gold">{tr(division.name, l)} · {tr(category.name, l)}</p>
            <h1 className="mt-4 font-display text-5xl font-light leading-tight">{label}</h1>
            <p className="mt-5 leading-relaxed text-fg-muted">{tr(product.description ?? category.tagline, l)}</p>

            <dl className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
              {category.specs.map((s) => (
                <div key={s.label.en} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-fg-muted">{tr(s.label, l)}</dt>
                  <dd>{tr(s.value, l)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <MadeToOrderNote locale={l} />
            </div>

            <div className="mt-10">
              <AddToRequest slug={product.slug} categorySlug={category.slug} locale={l} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-2/50 py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-4xl font-light">{t("more")} {tr(category.name, l)}</h2>
              <Link href={`/${l}/collections/${division.slug}/${category.slug}`} className="eyebrow shrink-0 hover:text-gold">{t("viewAll")}</Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} locale={l} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
