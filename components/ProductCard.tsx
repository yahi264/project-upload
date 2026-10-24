import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { Img } from "./Img";
import { getCategory, name, type Product } from "@/lib/structure";
import { tr, type Locale } from "@/lib/i18n";

export function ProductCard({ product, locale, priority = false }: { product: Product; locale: Locale; priority?: boolean }) {
  const category = getCategory(product.category);
  const [first, second] = product.images;
  const label = name(product, locale);
  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Img
          img={first}
          alt={label}
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        {/* A second photo fades in on hover when the product has one */}
        {second && (
          <Img
            img={second}
            alt=""
            sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
        {product.images.length > 1 && (
          <span className="absolute bottom-3 start-3 flex items-center gap-1.5 bg-ink/60 px-2 py-1 text-[11px] text-cream backdrop-blur-sm">
            <Images className="h-3.5 w-3.5" strokeWidth={1.5} /> {product.images.length}
          </span>
        )}
        <span className="absolute end-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-paper text-fg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.5} />
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl leading-snug text-fg">{label}</h3>
        {category && <span className="eyebrow shrink-0 text-end text-fg-muted">{tr(category.name, locale).split(/[,&]/)[0].trim()}</span>}
      </div>
    </Link>
  );
}
