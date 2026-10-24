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
  const [step, setStep] = useState<number>(unit.steps[0]);
  const [added, setAdded] = useState(false);

  const choice = (active: boolean) =>
    `border px-4 py-2 text-sm transition-colors ${active ? "border-fg bg-fg text-paper" : "border-fg/20 hover:border-fg"}`;

  return (
    <div className="space-y-8">
      {category.sizes.length > 1 && (
      <fieldset>
        <legend className="eyebrow text-fg-muted">{t("size")}</legend>
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
        <legend className="eyebrow text-fg-muted">{t("finish")}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.options.map((o, k) => (
            <button key={k} type="button" onClick={() => setOption(k)} className={choice(option === k)}>
              {tr(o, locale)}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="qty" className="eyebrow text-fg-muted">{t(unit.qty)}</label>
        <div className="mt-3 flex w-48 items-center border border-fg/20" dir="ltr">
          <button type="button" aria-label={t("decrease")} onClick={() => setQuantity((q) => Math.max(unit.min, q - step))} className="p-3 hover:bg-paper-2">
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <input
            id="qty"
            type="number"
            min={unit.min}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || unit.min)}
            onBlur={() => setQuantity((q) => Math.max(unit.min, q))}
            className="w-full bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button type="button" aria-label={t("increase")} onClick={() => setQuantity((q) => q + step)} className="p-3 hover:bg-paper-2">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        {unit.steps.length > 1 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-fg-muted">
            <span>{t("stepBy")}</span>
            {unit.steps.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                aria-pressed={step === s}
                className={`min-w-10 border px-2.5 py-1 transition-colors ${step === s ? "border-gold bg-gold/10 text-fg" : "border-fg/15 hover:border-fg/40"}`}
              >
                +{s}
              </button>
            ))}
          </div>
        )}
        {unit.min > 1 && <p className="mt-2 text-xs text-fg-muted">{t("minQty", { n: unit.min })}</p>}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            add({ slug, size, option, quantity: Math.max(unit.min, quantity) });
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
      <p className="text-xs leading-relaxed text-fg-muted">{t("noPayment")}</p>
    </div>
  );
}
