import Link from "next/link";
import { ArrowRight, Snowflake } from "lucide-react";
import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { featuredCategory, name, productsIn } from "@/lib/catalog";
import { getT, type Locale } from "@/lib/i18n";

// Scattered snowflakes behind the banner: [inset-inline-start %, top %, size px, opacity]
const flakes = [
  [4, 12, 22, 0.25], [18, 70, 14, 0.2], [31, 22, 10, 0.3], [46, 84, 18, 0.15],
  [58, 8, 12, 0.25], [71, 60, 26, 0.12], [86, 18, 16, 0.3], [94, 76, 12, 0.2],
] as const;

// Highlighted seasonal banner at the top of the Promotion page.
export function ChristmasFeature({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const items = productsIn(featuredCategory);
  if (items.length === 0) return null;
  const href = `/${locale}/collections/promotion/${featuredCategory}`;

  return (
    <section className="container-x pt-20">
      <Reveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#5c0f1b] via-[#7a1626] to-[#123222] text-cream ring-1 ring-gold/60">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {flakes.map(([x, y, size, opacity], i) => (
              <Snowflake
                key={i}
                className="absolute text-cream"
                style={{ insetInlineStart: `${x}%`, top: `${y}%`, width: size, height: size, opacity }}
                strokeWidth={1.2}
              />
            ))}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-3 border border-gold/40" />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-center lg:p-16">
            <div className="lg:col-span-5">
              <span className="eyebrow inline-flex items-center gap-2 bg-gold px-3 py-1.5 text-ink">
                <Snowflake className="h-3.5 w-3.5" strokeWidth={1.6} /> {t("xmasBadge")}
              </span>
              <p className="eyebrow mt-8 text-gold-light">{t("xmasEyebrow")}</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">{t("xmasTitle")}</h2>
              <p className="mt-6 leading-relaxed text-cream/80">{t("xmasText")}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={href} className="btn-light group">
                  {t("xmasCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.5} />
                </Link>
                <Link href={`/${locale}/request`} className="btn-outline-light">{t("navQuote")}</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:col-span-7">
              {items.slice(0, 4).map((p) => (
                <Link key={p.slug} href={`/${locale}/products/${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden ring-1 ring-gold/30">
                  <Img
                    img={p.images[0]}
                    alt={name(p, locale)}
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 p-3 font-display text-lg leading-tight text-cream sm:p-4 sm:text-xl">{name(p, locale)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
