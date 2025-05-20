import * as z from "zod";

export const promotionStatusSchema = z.enum(["active", "inactive"]);

const basePromotionSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  category: z.enum([
    "groceries",
    "electronics",
    "clothing",
    "home",
    "beauty",
    "sports",
    "other",
  ] as const),
  regularPrice: z.number().min(0, "Le prix doit être positif"),
  promoPrice: z.number().min(0, "Le prix doit être positif"),
  promoDiscount: z
    .number()
    .min(0)
    .max(100, "La remise doit être entre 0 et 100"),
  stockQuantity: z.number().min(0, "Le stock doit être positif"),
  lowStockThreshold: z.number().min(0, "Le seuil doit être positif"),
});

export const createPromotionSchema = basePromotionSchema.refine(
  (data) => {
    if (data.promoPrice >= data.regularPrice) {
      return false;
    }
    const calculatedDiscount =
      ((data.regularPrice - data.promoPrice) / data.regularPrice) * 100;
    return Math.abs(calculatedDiscount - data.promoDiscount) < 0.01;
  },
  {
    message: "Le prix promotionnel doit être inférieur au prix régulier",
    path: ["promoPrice"],
  }
);

export const updatePromotionSchema = z
  .object({
    status: promotionStatusSchema.optional(),
  })
  .merge(basePromotionSchema.partial());

export type CreatePromotionInput = z.infer<typeof createPromotionSchema>;
export type UpdatePromotionInput = z.infer<typeof updatePromotionSchema>;
