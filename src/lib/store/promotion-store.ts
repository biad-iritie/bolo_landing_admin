import { create } from "zustand";
import {
  Promotion,
  PromotionStatus,
  CreatePromotionData,
  UpdatePromotionData,
} from "@/lib/types/promotion";

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
    name: "Pommes Fraîches",
    description: "Pommes rouges fraîches de saison",
    category: "groceries",
    regularPrice: 2500,
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
    name: "Smartphone XYZ",
    description: "Dernier modèle avec les meilleures fonctionnalités",
    category: "electronics",
    regularPrice: 150000,
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
    const newPromotion: Promotion = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: data.status || "active",
      lowStockThreshold: data.lowStockThreshold || 10,
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
