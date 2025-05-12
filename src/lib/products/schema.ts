import { z } from "zod";

export const productCategorySchema = z.enum([
  "groceries",
  "electronics",
  "clothing",
  "home",
  "beauty",
  "sports",
  "other",
]);

export const productStatusSchema = z.enum(["active", "inactive"]);

const baseProductSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  category: productCategorySchema,
  regularPrice: z.number().min(0, "Le prix doit être positif"),
  promoPrice: z.number().min(0, "Le prix promo doit être positif"),
  promoDiscount: z
    .number()
    .min(0)
    .max(100, "La remise doit être entre 0 et 100%"),
  stockQuantity: z.number().int().min(0, "La quantité doit être positive"),
  lowStockThreshold: z
    .number()
    .int()
    .min(0, "Le seuil doit être positif")
    .default(10),
  image: z.instanceof(File).optional(),
});

export const createProductSchema = baseProductSchema.refine(
  (data) => {
    // If promoPrice is set, promoDiscount should not be set
    if (data.promoPrice && data.promoDiscount) {
      return false;
    }
    // If promoDiscount is set, promoPrice should not be set
    if (data.promoDiscount && data.promoPrice) {
      return false;
    }
    return true;
  },
  {
    message:
      "Vous devez spécifier soit un prix promo, soit un pourcentage de remise, mais pas les deux",
  }
);

export const updateProductSchema = z
  .object({
    id: z.string(),
    status: productStatusSchema.optional(),
  })
  .merge(baseProductSchema.partial());

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
