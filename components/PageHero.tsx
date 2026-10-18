import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  image?: string;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-cream sm:pb-20 sm:pt-44">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" quality={75} className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </>
      )}
      <div className="container-x relative">
        {crumbs.length > 0 && (
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-silver/70" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3 w-3 rtl:-scale-x-100" />}
                <Link href={c.href} className="hover:text-cream">{c.label}</Link>
              </span>
            ))}
          </nav>
        )}
        <p className="eyebrow text-gold-light">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-light leading-[1.1] sm:text-6xl lg:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl leading-relaxed text-silver">{text}</p>}
        {children}
      </div>
    </section>
  );
}
