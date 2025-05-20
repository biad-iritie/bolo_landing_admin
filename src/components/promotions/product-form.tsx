"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { usePromotionStore } from "@/lib/store/promotion-store";
import {
  Promotion,
  CreatePromotionData,
  UpdatePromotionData,
  PromotionCategory,
} from "@/lib/types/promotion";
import {
  createPromotionSchema,
  updatePromotionSchema,
} from "@/lib/promotions/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FormValues = {
  id?: string;
  name: string;
  description?: string;
  category: PromotionCategory;
  regularPrice: number;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  status?: "active" | "inactive";
};

interface BaseFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
  defaultValues: FormValues;
  schema: z.ZodType<Partial<FormValues>>;
}

function BasePromotionForm({ onSubmit, defaultValues, schema }: BaseFormProps) {
  const form = useForm<FormValues & FieldValues>({
    resolver: zodResolver(schema as z.ZodType<FormValues & FieldValues>),
    defaultValues,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {defaultValues.id ? "Modifier la Promotion" : "Nouvelle Promotion"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description du produit"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="groceries">Épicerie</SelectItem>
                      <SelectItem value="electronics">Électronique</SelectItem>
                      <SelectItem value="clothing">Vêtements</SelectItem>
                      <SelectItem value="home">Maison</SelectItem>
                      <SelectItem value="beauty">Beauté</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="regularPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix régulier</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promoPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix promotionnel</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="promoDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remise (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="lowStockThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seuil de stock bas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="10"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            >
              {defaultValues.id ? "Mettre à jour" : "Créer"}
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

interface PromotionFormProps {
  mode: "create" | "edit";
  promotion?: Promotion;
}

export function PromotionForm({ mode, promotion }: PromotionFormProps) {
  const router = useRouter();
  const { createPromotion, updatePromotion } = usePromotionStore();

  const handleSubmit = async (data: FormValues) => {
    try {
      if (mode === "create") {
        await createPromotion(data as CreatePromotionData);
        toast.success("Promotion créée avec succès");
      } else {
        const { id, ...updateData } = data;
        if (!id) {
          toast.error("ID de la promotion manquant");
          return;
        }
        await updatePromotion(id, updateData as UpdatePromotionData);
        toast.success("Promotion mise à jour avec succès");
      }
      router.push("/admin/promotions");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        mode === "create"
          ? "Erreur lors de la création de la promotion"
          : "Erreur lors de la mise à jour de la promotion"
      );
    }
  };

  const defaultValues =
    mode === "create"
      ? {
          name: "",
          description: "",
          category: "other" as const,
          regularPrice: 0,
          promoPrice: 0,
          promoDiscount: 0,
          stockQuantity: 0,
          lowStockThreshold: 10,
        }
      : promotion
      ? {
          id: promotion.id,
          name: promotion.name,
          description: promotion.description,
          category: promotion.category,
          regularPrice: promotion.regularPrice,
          promoPrice: promotion.promoPrice,
          promoDiscount: promotion.promoDiscount,
          stockQuantity: promotion.stockQuantity,
          lowStockThreshold: promotion.lowStockThreshold,
          status: promotion.status,
        }
      : {
          name: "",
          description: "",
          category: "other" as const,
          regularPrice: 0,
          promoPrice: 0,
          promoDiscount: 0,
          stockQuantity: 0,
          lowStockThreshold: 10,
        };

  if (!defaultValues) {
    return null;
  }

  return (
    <BasePromotionForm
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={
        mode === "create"
          ? (createPromotionSchema as z.ZodType<Partial<FormValues>>)
          : (updatePromotionSchema as z.ZodType<Partial<FormValues>>)
      }
    />
  );
}
