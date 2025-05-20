import {
  Product,
  ProductFilters,
  ProductListResponse,
  CreateProductData,
  UpdateProductData,
} from "./types";
import { v4 as uuidv4 } from "uuid";

// Mock product database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Pommes Bio",
    description: "Pommes biologiques locales",
    category: "groceries",
    regularPrice: 2500,
    promoPrice: 2000,
    promoDiscount: 20,
    stockQuantity: 50,
    lowStockThreshold: 10,
    imageUrl: "/products/apples.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smartphone XYZ",
    description: "Dernier modèle avec écran OLED",
    category: "electronics",
    regularPrice: 450000,
    promoPrice: 400000,
    promoDiscount: 11,
    stockQuantity: 15,
    lowStockThreshold: 5,
    imageUrl: "/products/phone.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to filter products
const filterProducts = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  return products.filter((product) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !product.name.toLowerCase().includes(searchLower) &&
        !product.description?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.status && product.status !== filters.status) {
      return false;
    }

    if (filters.lowStock && product.stockQuantity > product.lowStockThreshold) {
      return false;
    }

    return true;
  });
};

// Mock API service
export const mockProductApi = {
  async getProducts(
    page = 1,
    limit = 10,
    filters: ProductFilters = {}
  ): Promise<ProductListResponse> {
    await delay(800);

    const filteredProducts = filterProducts(mockProducts, filters);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = filteredProducts.slice(start, end);

    return {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
      },
    };
  },

  async getProduct(id: string): Promise<Product> {
    await delay(500);

    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error("Produit non trouvé");
    }

    return product;
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    await delay(1000);

    const newProduct: Product = {
      id: uuidv4(),
      ...data,
      lowStockThreshold: data.lowStockThreshold ?? 10,
      imageUrl: data.image ? `/products/${data.image.name}` : undefined,
      status: "inactive",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProducts.push(newProduct);
    return newProduct;
  },

  async updateProduct(data: UpdateProductData): Promise<Product> {
    await delay(800);

    const index = mockProducts.findIndex((p) => p.id === data.id);
    if (index === -1) {
      throw new Error("Produit non trouvé");
    }

    const updatedProduct: Product = {
      ...mockProducts[index],
      ...data,
      lowStockThreshold:
        data.lowStockThreshold ?? mockProducts[index].lowStockThreshold,
      updatedAt: new Date().toISOString(),
      // In a real app, we would handle image upload
      imageUrl: data.image
        ? `/products/${data.image.name}`
        : mockProducts[index].imageUrl,
    };

    // In a real app, we would use a database
    (mockProducts as Product[])[index] = updatedProduct;
    return updatedProduct;
  },

  async deleteProduct(id: string): Promise<void> {
    await delay(500);

    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Produit non trouvé");
    }

    // In a real app, we would use a database
    (mockProducts as Product[]).splice(index, 1);
  },
};
