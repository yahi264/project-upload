import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, Layers, Handshake, SlidersHorizontal } from "lucide-react";
import { Reveal } from "./Reveal";
import { exportText as x } from "@/lib/export-content";
import { name, productsIn } from "@/lib/catalog";
import { tr, type Locale } from "@/lib/i18n";

const icons = [Globe2, Layers, SlidersHorizontal, Handshake];

export function ExportShowcase({ locale }: { locale: Locale }) {
  const l = locale;
  const fabrics = productsIn("fabrics");
  const yarns = productsIn("yarns");

  return (
    <>
      {/* Story */}
      <section className="container-x grid gap-16 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-gold">{tr(x.eyebrow, l)}</p>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">{tr(x.title, l)}</h2>
          <p className="mt-8 text-lg font-light leading-relaxed text-fg">{tr(x.lead, l)}</p>
          {x.body.map((p, i) => (
            <p key={i} className="mt-6 leading-relaxed text-fg-muted">{tr(p, l)}</p>
          ))}
        </Reveal>
        <Reveal delay={0.12} className="grid grid-cols-2 gap-3 lg:col-span-6">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden">
            <Image src="/images/p/export-warehouse-pallets.webp" alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src="/images/p/cotton-yarn-1.webp" alt="" fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src="/images/p/twill-weave-fabric-3.webp" alt="" fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Strengths */}
      <section className="bg-navy py-20 text-cream">
        <div className="container-x">
        <div className="grid gap-px bg-silver/15 sm:grid-cols-2 lg:grid-cols-4">
          {x.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title.en} delay={i * 0.08} className="h-full bg-navy p-8">
                <Icon className="h-7 w-7 text-gold-light" strokeWidth={1.2} />
                <h3 className="mt-6 font-display text-2xl">{tr(p.title, l)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">{tr(p.text, l)}</p>
              </Reveal>
            );
          })}
        </div>
        </div>
      </section>

      {/* Range at a glance */}
      <section className="container-x py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">{tr(x.rangeTitle, l)}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal className="bg-card p-8 shadow-sm shadow-ink/5 sm:p-10">
            <h3 className="font-display text-3xl">{tr(x.fabrics, l)}</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="eyebrow text-fg-muted">{tr(x.weaves, l)}</dt><dd className="mt-1.5">{tr(x.weaveList, l)}</dd></div>
              <div><dt className="eyebrow text-fg-muted">{tr(x.finishes, l)}</dt><dd className="mt-1.5">{tr(x.finishList, l)}</dd></div>
            </dl>
            {/* Weave swatches, each linking to its fabric */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {fabrics.map((p) => (
                <Link key={p.slug} href={`/${l}/products/${p.slug}`} className="group" title={name(p, l)}>
                  <span className="relative block aspect-square overflow-hidden rounded-full ring-1 ring-fg/10">
                    <Image src={p.images[0].src} alt={name(p, l)} fill sizes="96px" className="scale-150 object-cover transition-transform duration-700 group-hover:scale-[1.8]" />
                  </span>
                  <span className="mt-2 block text-center text-[11px] leading-tight text-fg-muted group-hover:text-fg">
                    {name(p, l).replace(/ (Weave )?Fabric$/, "")}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="bg-card p-8 shadow-sm shadow-ink/5 sm:p-10">
            <h3 className="font-display text-3xl">{tr(x.yarns, l)}</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="eyebrow text-fg-muted">{tr(x.compositions, l)}</dt><dd className="mt-1.5">{tr(x.compositionList, l)}</dd></div>
              <div><dt className="eyebrow text-fg-muted">{tr(x.colour, l)}</dt><dd className="mt-1.5">{tr(x.colourList, l)}</dd></div>
            </dl>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {yarns.map((p) => (
                <Link key={p.slug} href={`/${l}/products/${p.slug}`} className="group">
                  <span className="relative block aspect-square overflow-hidden ring-1 ring-fg/10">
                    <Image src={p.images[0].src} alt={name(p, l)} fill sizes="140px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="mt-2 block text-[11px] leading-tight text-fg-muted group-hover:text-fg">{name(p, l)}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Industries */}
        <Reveal className="mt-14 flex flex-col gap-6 border-t border-fg/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-fg-muted">{tr(x.industries, l)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {x.industryList.map((i) => (
                <li key={i.en} className="border border-fg/15 px-3 py-1.5 text-xs text-fg">{tr(i, l)}</li>
              ))}
            </ul>
          </div>
          <Link href={`/${l}/request`} className="btn-dark group shrink-0">
            {tr(x.cta, l)}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
