"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus } from "lucide-react";
import { useRequestList } from "./RequestList";
import { getCategory, unitInfo } from "@/lib/structure";
import { getT, tr, type Locale } from "@/lib/i18n";

export function AddToRequest({ slug, categorySlug, locale }: { slug: string; categorySlug: string; locale: Locale }) {
  const t = getT(locale);
  const category = getCategory(categorySlug)!;
  const { add } = useRequestList();
  const [size, setSize] = useState(0);
  const [option, setOption] = useState(0);
  const unit = unitInfo[category.unit];
  const [quantity, setQuantity] = useState<number>(unit.start);
  const [added, setAdded] = useState(false);

  const choice = (active: boolean) =>
    `border px-4 py-2 text-sm transition-colors ${active ? "border-navy bg-navy text-cream" : "border-navy/20 hover:border-navy"}`;

  return (
    <div className="space-y-8">
      {category.sizes.length > 1 && (
      <fieldset>
        <legend className="eyebrow text-steel">{t("size")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.sizes.map((s, k) => (
            <button key={k} type="button" onClick={() => setSize(k)} className={choice(size === k)}>
              {tr(s, locale)}
            </button>
          ))}
        </div>
      </fieldset>
      )}

      <fieldset>
        <legend className="eyebrow text-steel">{t("finish")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.options.map((o, k) => (
            <button key={k} type="button" onClick={() => setOption(k)} className={choice(option === k)}>
              {tr(o, locale)}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="qty" className="eyebrow text-steel">{t(unit.qty)}</label>
        <div className="mt-3 flex w-48 items-center border border-navy/20" dir="ltr">
          <button type="button" aria-label={t("decrease")} onClick={() => setQuantity((q) => Math.max(1, q - unit.step))} className="p-3 hover:bg-sand">
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
            className="w-full bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button type="button" aria-label={t("increase")} onClick={() => setQuantity((q) => q + unit.step)} className="p-3 hover:bg-sand">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            add({ slug, size, option, quantity: Math.max(1, quantity) });
            setAdded(true);
          }}
          className="btn-dark min-w-60"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Check className="h-4 w-4" /> {t("added")}
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {t("addToRequest")}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        {added && (
          <Link href={`/${locale}/request`} className="btn-outline-dark">{t("viewRequest")}</Link>
        )}
      </div>
      <p className="text-xs leading-relaxed text-steel">{t("noPayment")}</p>
    </div>
  );
}
