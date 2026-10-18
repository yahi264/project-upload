// Products and their photos come from lib/products.json (generated from the Hieron_Files photo library).
// Server pages import from here; client components that only need the menu import "./structure".
import data from "./products.json";
import type { DivisionSlug, Product } from "./structure";
import { exportDescriptions } from "./export-content";
export * from "./structure";

export const products: Product[] = (data as Array<Omit<Product, "division"> & { division: string }>).map((p) => ({
  ...p,
  division: (p.division === "promo" ? "promotion" : p.division) as DivisionSlug,
  description: exportDescriptions[p.slug],
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (category: string) => products.filter((p) => p.category === category);
export const productsInDivision = (division: string) => products.filter((p) => p.division === division);
