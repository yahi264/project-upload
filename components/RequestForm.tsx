"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { requestSchema } from "@/lib/request-schema";
import { company, getCategory, unitInfo, type Img } from "@/lib/structure";
import { getT, tr, type Key, type Locale, type T } from "@/lib/i18n";
import { useRequestList } from "./RequestList";

const formSchema = requestSchema.omit({ items: true, locale: true });
type FormValues = import("zod").infer<typeof formSchema>;

// Minimal product info the form needs, keyed by slug.
export type ProductLite = Record<string, { name: T; category: string; image: Img }>;

const errorKey: Partial<Record<keyof FormValues, Key>> = { name: "errName", company: "errCompany", email: "errEmail" };

export function RequestForm({ locale, catalog }: { locale: Locale; catalog: ProductLite }) {
  const t = getT(locale);
  const { items, update, remove, clear } = useRequestList();
  const [sentId, setSentId] = useState<string | null>(null);
  const [serverError, setServerError] = useState(false);
  // On the GitHub Pages copy there is no server: the request is sent by WhatsApp or email instead.
  const [staticMsg, setStaticMsg] = useState<string | null>(null);
  const known = items.filter((i) => catalog[i.slug]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { branding: true } });

  const onSubmit = async (values: FormValues) => {
    setServerError(false);
    // Products are sent in English so the team reads every request the same way.
    const lines = known.map((i) => {
      const p = catalog[i.slug];
      const c = getCategory(p.category)!;
      return {
        slug: i.slug,
        name: p.name.en,
        category: c.name.en,
        size: c.sizes[i.size]?.en ?? "",
        option: c.options[i.option]?.en ?? "",
        quantity: i.quantity,
        unit: c.unit,
      };
    });
    // Hosted on Cenuta: a PHP script on the same site emails the request (NEXT_PUBLIC_REQUEST_ENDPOINT).
    // GitHub Pages copy (NEXT_PUBLIC_STATIC=1, no endpoint): the client sends it by WhatsApp or email instead.
    const endpoint = process.env.NEXT_PUBLIC_REQUEST_ENDPOINT;
    if (!endpoint && process.env.NEXT_PUBLIC_STATIC === "1") {
      const v = values;
      setStaticMsg(
        [
          "Hieron — quote request",
          `Name: ${v.name}`,
          `Company: ${v.company}`,
          `Email: ${v.email}`,
          v.phone && `Phone: ${v.phone}`,
          v.country && `Country: ${v.country}`,
          v.rooms && `Rooms / volume: ${v.rooms}`,
          `Custom branding: ${v.branding ? "Yes" : "No"}`,
          " ",
          ...(lines.length ? lines.map((i) => `• ${i.name} — ${i.size}, ${i.option} × ${i.quantity} ${i.unit}`) : ["(general request)"]),
          v.message && `\nMessage: ${v.message}`,
        ]
          .filter((x): x is string => typeof x === "string" && x !== "")
          .join("\n"),
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const res = await fetch(endpoint || "/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, locale, items: lines }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setServerError(true);
    setSentId(data.id);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (staticMsg) {
    const text = encodeURIComponent(staticMsg);
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1} />
        <h2 className="mt-8 font-display text-4xl font-light">{t("staticReady")}</h2>
        <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap bg-card p-5 text-start text-xs leading-relaxed text-fg-muted" dir="ltr">{staticMsg}</pre>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={`https://wa.me/${company.whatsapp}?text=${text}`} target="_blank" rel="noopener noreferrer" onClick={clear} className="btn-dark">{t("whatsapp")}</a>
          <a href={`mailto:${company.email}?subject=${encodeURIComponent("Quote request")}&body=${text}`} onClick={clear} className="btn-outline-dark">{company.email}</a>
        </div>
      </motion.div>
    );
  }

  if (sentId) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1} />
        <h2 className="mt-8 font-display text-4xl font-light">{t("thanksTitle")}</h2>
        <p className="mt-4 text-fg-muted">{t("thanksText", { id: sentId })}</p>
        <Link href={`/${locale}/collections`} className="btn-dark mt-10">{t("continueBrowsing")}</Link>
      </motion.div>
    );
  }

  const err = (k: keyof FormValues) => (errors[k] ? (errorKey[k] ? t(errorKey[k]!) : String(errors[k]?.message)) : undefined);

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl">{t("yourSelection")}</h2>
            <span className="text-sm text-fg-muted">{known.length} {t("items")}</span>
          </div>

          {known.length === 0 ? (
            <div className="mt-6 border border-dashed border-fg/20 p-8 text-center">
              <p className="text-sm text-fg-muted">{t("emptyList")}</p>
              <Link href={`/${locale}/collections`} className="btn-outline-dark mt-5">{t("browse")}</Link>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              <AnimatePresence initial={false}>
                {known.map((item) => {
                  const p = catalog[item.slug];
                  const c = getCategory(p.category)!;
                  const label = tr(p.name, locale);
                  const unit = unitInfo[c.unit];
                  return (
                    <motion.li key={item.id} layout exit={{ opacity: 0, height: 0 }} className="flex gap-4 overflow-hidden py-4">
                      <Link href={`/${locale}/products/${item.slug}`} className="relative h-20 w-28 shrink-0 overflow-hidden" style={{ backgroundColor: p.image.color }}>
                        <Image src={p.image.src} alt={label} fill sizes="112px" className="object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg leading-tight">{label}</p>
                            <p className="mt-1 text-xs text-fg-muted">
                              {c.sizes.length > 1 && c.sizes[item.size] && `${tr(c.sizes[item.size], locale)} · `}
                              {c.options[item.option] && tr(c.options[item.option], locale)}
                            </p>
                          </div>
                          <button onClick={() => remove(item.id)} aria-label={`${t("remove")} ${label}`} className="p-1 text-fg-muted hover:text-fg">
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="mt-2 flex w-36 items-center border border-fg/15 text-sm" dir="ltr">
                          <button type="button" aria-label={t("decrease")} onClick={() => update(item.id, { quantity: Math.max(unit.min, item.quantity - unit.steps[0]) })} className="p-1.5 hover:bg-paper-2">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => update(item.id, { quantity: Math.max(unit.min, Number(e.target.value) || unit.min) })}
                            className="w-full bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                            aria-label={t(unit.qty)}
                          />
                          <button type="button" aria-label={t("increase")} onClick={() => update(item.id, { quantity: item.quantity + unit.steps[0] })} className="p-1.5 hover:bg-paper-2">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="mt-1 block text-[11px] text-fg-muted">{t(unit.short)}</span>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="lg:col-span-7">
        <h2 className="font-display text-3xl">{t("yourDetails")}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <Field label={t("fName")} error={err("name")}>
            <input {...register("name")} className="field" autoComplete="name" />
          </Field>
          <Field label={t("fCompany")} error={err("company")}>
            <input {...register("company")} className="field" autoComplete="organization" />
          </Field>
          <Field label={t("fEmail")} error={err("email")}>
            <input {...register("email")} type="email" dir="ltr" className="field text-start" autoComplete="email" />
          </Field>
          <Field label={t("fPhone")} error={err("phone")}>
            <input {...register("phone")} type="tel" dir="ltr" className="field text-start" autoComplete="tel" />
          </Field>
          <Field label={t("fCountry")} error={err("country")}>
            <input {...register("country")} className="field" autoComplete="country-name" />
          </Field>
          <Field label={t("fRooms")} error={err("rooms")}>
            <input {...register("rooms")} className="field" />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("fMessage")} error={err("message")}>
              <textarea {...register("message")} rows={5} className="field resize-none" />
            </Field>
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm sm:col-span-2">
            <input type="checkbox" {...register("branding")} className="mt-0.5 h-4 w-4 accent-gold" />
            <span>{t("fBranding")}</span>
          </label>
          {/* Honeypot field, hidden from people */}
          <input {...register("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        </div>

        {serverError && <p className="mt-6 text-sm text-red-700">{t("errServer")}</p>}

        <button type="submit" disabled={isSubmitting} className="btn-dark mt-10 w-full sm:w-auto">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("send")}
        </button>
        <p className="mt-4 text-xs text-fg-muted">{t("privacy")}</p>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-fg-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}
