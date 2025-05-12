import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import {
  Product,
  ProductStatus,
  CreateProductData,
  UpdateProductData,
} from "@/lib/types/product";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  // Actions
  createProduct: (data: CreateProductData) => Promise<Product>;
  updateProduct: (id: string, data: UpdateProductData) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  updateProductStatus: (id: string, status: ProductStatus) => Promise<Product>;
  // Mock data initialization
  initializeMockData: () => void;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description: "Un smartphone dernier cri avec des fonctionnalités avancées",
    category: "electronics",
    regularPrice: 699.99,
    promoPrice: 599.99,
    promoDiscount: 15,
    stockQuantity: 50,
    lowStockThreshold: 10,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "T-shirt Premium",
    description: "T-shirt en coton bio de haute qualité",
    category: "clothing",
    regularPrice: 29.99,
    promoPrice: 19.99,
    promoDiscount: 33,
    stockQuantity: 100,
    lowStockThreshold: 20,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Huile d'olive extra vierge",
    description: "Huile d'olive pressée à froid, 1L",
    category: "groceries",
    regularPrice: 15.99,
    promoPrice: 12.99,
    promoDiscount: 19,
    stockQuantity: 75,
    lowStockThreshold: 15,
    status: "inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  createProduct: async (data: CreateProductData) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct: Product = {
        id: uuidv4(),
        ...data,
        lowStockThreshold: data.lowStockThreshold ?? 10,
        status: "inactive",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        products: [...state.products, newProduct],
        isLoading: false,
      }));

      return newProduct;
    } catch (error) {
      set({ error: "Failed to create product", isLoading: false });
      throw error;
    }
  },

  updateProduct: async (id: string, data: UpdateProductData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProduct = get().products.find((p) => p.id === id);
      if (!updatedProduct) {
        throw new Error("Product not found");
      }

      const newProduct: Product = {
        ...updatedProduct,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        products: state.products.map((p) => (p.id === id ? newProduct : p)),
        isLoading: false,
      }));

      return newProduct;
    } catch (error) {
      set({ error: "Failed to update product", isLoading: false });
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete product", isLoading: false });
      throw error;
    }
  },

  updateProductStatus: async (id: string, status: ProductStatus) => {
    return get().updateProduct(id, { id, status });
  },

  initializeMockData: () => {
    set({ products: mockProducts });
  },
}));
