export type ProductCategory =
  | "groceries"
  | "electronics"
  | "clothing"
  | "home"
  | "beauty"
  | "sports"
  | "other";

export type ProductStatus = "active" | "inactive";

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  regularPrice: number;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold: number;
  imageUrl?: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  category?: ProductCategory;
  status?: ProductStatus;
  lowStock?: boolean;
}

export interface ProductSort {
  field: keyof Product;
  direction: "asc" | "desc";
}

export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ProductListResponse {
  products: Product[];
  pagination: ProductPagination;
}

export interface CreateProductData {
  name: string;
  description?: string;
  category: ProductCategory;
  regularPrice: number;
  promoPrice: number;
  promoDiscount: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  image?: File;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
  status?: ProductStatus;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
