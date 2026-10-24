import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { categoriesIn, certificates, company, divisions } from "@/lib/structure";
import { socialIcons, socials } from "./SocialButtons";
import { getT, tr, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const base = `/${locale}`;
  return (
    <footer className="bg-ink text-silver">
      <div className="container-x grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Image src="/images/site/logo.png" alt="Hieron" width={120} height={123} className="h-24 w-auto" />
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-silver/70">{t("footerText")}</p>
          <div className="mt-8 flex items-center gap-3">
            {certificates.map((c) => (
              <span key={c.name} className="flex h-12 w-12 items-center justify-center rounded bg-card p-1.5" title={c.name}>
                <Image src={c.logo} alt={c.name} width={40} height={40} className="h-full w-full object-contain" />
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-silver/25 text-silver transition-colors hover:border-gold-light hover:text-gold-light">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>{socialIcons[s.key]}</svg>
              </a>
            ))}
          </div>
        </div>

        {divisions.map((d) => (
          <div key={d.slug} className="lg:col-span-2">
            <Link href={`${base}/collections/${d.slug}`} className="eyebrow text-gold-light hover:text-cream">
              {tr(d.name, locale)}
            </Link>
            <ul className="mt-6 space-y-2.5 text-sm">
              {categoriesIn(d.slug).map((c) => (
                <li key={c.slug}>
                  <Link href={`${base}/collections/${d.slug}/${c.slug}`} className="transition-colors hover:text-cream">
                    {tr(c.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="border-t border-silver/10 pt-10 sm:col-span-2 lg:col-span-12 lg:flex lg:items-start lg:justify-between lg:gap-10">
          <p className="eyebrow text-gold-light">{t("contact")}</p>
          <ul className="mt-6 flex flex-col gap-4 text-sm lg:mt-0 lg:flex-row lg:flex-wrap lg:gap-x-10">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-cream">{company.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href={`mailto:${company.email}`} className="hover:text-cream">{company.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href={`https://${company.website}`} className="hover:text-cream">{company.website}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              {tr(company.location, locale)}
            </li>
          </ul>
          <ul className="mt-8 flex gap-6 text-sm lg:mt-0">
            <li><Link href={`${base}/about`} className="hover:text-cream">{t("navAbout")}</Link></li>
            <li><Link href={`${base}/request`} className="hover:text-cream">{t("navQuote")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-silver/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-silver/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. {t("rights")}</p>
          <p>Hotel · Home · Promotion · Export — 2026</p>
        </div>
      </div>
    </footer>
  );
}
