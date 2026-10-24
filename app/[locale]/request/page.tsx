import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RequestForm, type ProductLite } from "@/components/RequestForm";
import { company, products } from "@/lib/catalog";
import { getT, isLocale, tr, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return { title: t("navQuote"), description: t("requestText") };
}

const catalog: ProductLite = Object.fromEntries(
  products.map((p) => [p.slug, { name: p.name, category: p.category, image: p.images[0] }]),
);

export default async function RequestPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero
        eyebrow={t("navQuote")}
        title={t("requestTitle")}
        text={t("requestText")}
        crumbs={[{ href: `/${l}`, label: t("home") }, { href: `/${l}/request`, label: t("navQuote") }]}
      />
      <section className="container-x py-20">
        <RequestForm locale={l} catalog={catalog} />
      </section>
      <section className="border-t border-fg/10">
        <div className="container-x flex flex-col gap-6 py-12 text-sm text-fg-muted sm:flex-row sm:flex-wrap sm:gap-12">
          <p className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {t("preferEmail")} <a href={`mailto:${company.email}`} className="text-fg underline-offset-4 hover:underline">{company.email}</a>
          </p>
          <p className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} dir="ltr" className="text-fg">{company.phone}</a>
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {tr(company.location, l)}
          </p>
        </div>
      </section>
    </>
  );
}
