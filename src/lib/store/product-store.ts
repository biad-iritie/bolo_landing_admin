import { create } from "zustand";
import {
  Product,
  ProductStatus,
  CreateProductData,
  UpdateProductData,
  ProductSearchResult,
  ProductSearchParams,
} from "@/lib/types/product";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchProducts: (
    params: ProductSearchParams
  ) => Promise<ProductSearchResult[]>;
  createProduct: (data: CreateProductData) => Promise<Product>;
  updateProduct: (id: string, data: UpdateProductData) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  updateProductStatus: (id: string, status: ProductStatus) => Promise<Product>;
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Pommes Fraîches",
    description: "Pommes rouges fraîches de saison",
    category: "groceries",
    regularPrice: 2500,
    partnerId: "partner1",
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
    partnerId: "partner1",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  isLoading: false,
  error: null,

  searchProducts: async ({
    query,
  }: // category,
  // partnerId,
  ProductSearchParams) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const products = get().products.filter((product) => {
      // const matchesPartner = product.partnerId === partnerId;
      // const matchesCategory = category ? product.category === category : true;

      const matchesQuery = query
        ? product.name.toLowerCase().includes(query.toLowerCase())
        : // || product.description?.toLowerCase().includes(query.toLowerCase())
          true;

      // return matchesPartner && matchesCategory && matchesQuery;
      return matchesQuery;
    });
    return products.map(
      ({ id, name, category, regularPrice, description }) => ({
        id,
        name,
        category,
        regularPrice,
        description,
      })
    );
  },

  createProduct: async (data: CreateProductData) => {
    // Check for duplicate product
    const existingProduct = get().products.find(
      (p) =>
        p.name.toLowerCase() === data.name.toLowerCase() &&
        p.category === data.category &&
        p.partnerId === data.partnerId
    );

    if (existingProduct) {
      throw new Error(
        "Un produit avec ce nom existe déjà dans cette catégorie"
      );
    }

    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: data.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      products: [...state.products, newProduct],
    }));

    return newProduct;
  },

  updateProduct: async (id: string, data: UpdateProductData) => {
    const updatedProduct = get().products.find((p) => p.id === id);
    if (!updatedProduct) {
      throw new Error("Produit non trouvé");
    }

    // If name or category is being updated, check for duplicates
    if (data.name || data.category) {
      const newName =
        data.name?.toLowerCase() || updatedProduct.name.toLowerCase();
      const newCategory = data.category || updatedProduct.category;

      const duplicateProduct = get().products.find(
        (p) =>
          p.id !== id &&
          p.name.toLowerCase() === newName &&
          p.category === newCategory &&
          p.partnerId === updatedProduct.partnerId
      );

      if (duplicateProduct) {
        throw new Error(
          "Un produit avec ce nom existe déjà dans cette catégorie"
        );
      }
    }

    const newProduct: Product = {
      ...updatedProduct,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      products: state.products.map((p) => (p.id === id ? newProduct : p)),
    }));

    return newProduct;
  },

  deleteProduct: async (id: string) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  updateProductStatus: async (id: string, status: ProductStatus) => {
    const product = get().products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Produit non trouvé");
    }

    return get().updateProduct(id, { status });
  },
}));
