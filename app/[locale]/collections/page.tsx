import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { products } from "@/lib/catalog";
import { getT, isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return { title: t("catalogueTitle"), description: t("catalogueText") };
}

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero
        eyebrow={`${products.length} ${t("products")}`}
        title={t("catalogueTitle")}
        text={t("catalogueText")}
        image="/images/p/promo-textiles.webp"
        crumbs={[{ href: `/${l}`, label: t("home") }, { href: `/${l}/collections`, label: t("navCollections") }]}
      />
      <section className="container-x pb-28">
        <CatalogBrowser products={products} locale={l} />
      </section>
    </>
  );
}
