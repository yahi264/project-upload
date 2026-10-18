import { z } from "zod";

// Shared validation for the quote request form (used by the browser and the API).
export const requestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  company: z.string().trim().min(2, "Please enter your hotel or company"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  rooms: z.string().trim().max(20).optional().or(z.literal("")),
  branding: z.boolean(),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  locale: z.enum(["en", "fr", "tr", "ar", "ru"]).optional(),
  items: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        category: z.string(),
        size: z.string(),
        option: z.string(),
        quantity: z.number().int().positive().max(10_000_000),
        unit: z.enum(["pcs", "m", "kg"]).optional(),
      }),
    )
    .max(100),
  website: z.string().max(0).optional(), // honeypot: real visitors leave it empty
});

export type RequestInput = z.infer<typeof requestSchema>;
