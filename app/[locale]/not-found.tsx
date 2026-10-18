"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getT, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const { locale } = useParams<{ locale: string }>();
  const l = locale && isLocale(locale) ? locale : "en";
  const t = getT(l);
  return (
    <section className="flex min-h-[80vh] items-center bg-ink text-cream">
      <div className="container-x text-center">
        <p className="eyebrow text-gold-light">404</p>
        <h1 className="mt-6 font-display text-5xl font-light">{t("notFound")}</h1>
        <Link href={`/${l}/collections`} className="btn-light mt-10">{t("backToCollection")}</Link>
      </div>
    </section>
  );
}
