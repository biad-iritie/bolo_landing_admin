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
  status: ProductStatus;
  image?: File;
  createdAt: string;
  updatedAt: string;
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
