import { create } from "zustand";
import {
  Promotion,
  PromotionStatus,
  CreatePromotionData,
  UpdatePromotionData,
} from "@/lib/types/promotion";
import { useProductStore } from "./product-store";

interface PromotionStore {
  promotions: Promotion[];
  isLoading: boolean;
  error: string | null;
  createPromotion: (data: CreatePromotionData) => Promise<Promotion>;
  updatePromotion: (
    id: string,
    data: UpdatePromotionData
  ) => Promise<Promotion>;
  deletePromotion: (id: string) => Promise<void>;
  updatePromotionStatus: (
    id: string,
    status: PromotionStatus
  ) => Promise<Promotion>;
}

// Mock data for development
const mockPromotions: Promotion[] = [
  {
    id: "1",
    product: {
      id: "p1",
      name: "Riz Basmati Premium",
      description: "Riz basmati de première qualité, 1kg",
      category: "groceries",
      regularPrice: 2500,
      partnerId: "partner1",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    productId: "p1",
    promoPrice: 2000,
    promoDiscount: 20,
    stockQuantity: 100,
    lowStockThreshold: 20,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    product: {
      id: "p2",
      name: "Smartphone XYZ",
      description: "Dernier modèle avec les meilleures fonctionnalités",
      category: "electronics",
      regularPrice: 150000,
      partnerId: "partner1",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    productId: "p2",
    promoPrice: 135000,
    promoDiscount: 10,
    stockQuantity: 15,
    lowStockThreshold: 5,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const usePromotionStore = create<PromotionStore>((set, get) => ({
  promotions: mockPromotions,
  isLoading: false,
  error: null,

  createPromotion: async (data: CreatePromotionData) => {
    const product = useProductStore
      .getState()
      .products.find((p) => p.id === data.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const newPromotion: Promotion = {
      id: Math.random().toString(36).substr(2, 9),
      productId: data.productId,
      product,
      promoPrice: data.promoPrice,
      promoDiscount: data.promoDiscount,
      stockQuantity: data.stockQuantity,
      lowStockThreshold: data.lowStockThreshold || 10,
      status: data.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      promotions: [...state.promotions, newPromotion],
    }));

    return newPromotion;
  },

  updatePromotion: async (id: string, data: UpdatePromotionData) => {
    const updatedPromotion = get().promotions.find((p) => p.id === id);
    if (!updatedPromotion) {
      throw new Error("Promotion not found");
    }

    const newPromotion: Promotion = {
      ...updatedPromotion,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      promotions: state.promotions.map((p) => (p.id === id ? newPromotion : p)),
    }));

    return newPromotion;
  },

  deletePromotion: async (id: string) => {
    set((state) => ({
      promotions: state.promotions.filter((p) => p.id !== id),
    }));
  },

  updatePromotionStatus: async (id: string, status: PromotionStatus) => {
    const promotion = get().promotions.find((p) => p.id === id);
    if (!promotion) {
      throw new Error("Promotion not found");
    }

    return get().updatePromotion(id, { status });
  },
}));
