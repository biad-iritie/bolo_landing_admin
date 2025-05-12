import { create } from "zustand";
import { Product, ProductFilters, ProductSort } from "./types";
import { mockProductApi } from "./mock-api";
import { toast } from "sonner";

interface ProductState {
  // Data
  products: Product[];
  selectedProduct: Product | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };

  // UI State
  isLoading: boolean;
  filters: ProductFilters;
  sort: ProductSort;

  // Actions
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSort: (sort: ProductSort) => void;
  setPage: (page: number) => void;
  setSelectedProduct: (product: Product | null) => void;

  // Data Actions
  fetchProducts: () => Promise<void>;
  createProduct: (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProduct: (data: Partial<Product> & { id: string }) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial State
  products: [],
  selectedProduct: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  isLoading: false,
  filters: {},
  sort: {
    field: "createdAt",
    direction: "desc",
  },

  // UI Actions
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 }, // Reset to first page
    }));
    get().fetchProducts();
  },

  setSort: (sort) => {
    set({ sort });
    get().fetchProducts();
  },

  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
    get().fetchProducts();
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },

  // Data Actions
  fetchProducts: async () => {
    const { pagination, filters, sort } = get();
    set({ isLoading: true });

    try {
      const response = await mockProductApi.getProducts(
        pagination.page,
        pagination.limit,
        filters
      );

      // Sort products
      const sortedProducts = [...response.products].sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sort.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });

      set({
        products: sortedProducts,
        pagination: response.pagination,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors du chargement des produits";
      toast.error(message);
      set({ isLoading: false });
    }
  },

  createProduct: async (data) => {
    set({ isLoading: true });
    try {
      await mockProductApi.createProduct(data);
      toast.success("Produit créé avec succès");
      get().fetchProducts();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du produit";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (data) => {
    set({ isLoading: true });
    try {
      await mockProductApi.updateProduct(data);
      toast.success("Produit mis à jour avec succès");
      get().fetchProducts();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour du produit";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true });
    try {
      await mockProductApi.deleteProduct(id);
      toast.success("Produit supprimé avec succès");
      get().fetchProducts();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du produit";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
