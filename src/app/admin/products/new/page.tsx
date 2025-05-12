"use client";

import { ProductForm } from "@/components/products/product-form";

export default function NewProductPage() {
  return (
    <div className="container mx-auto py-6">
      <ProductForm mode="create" />
    </div>
  );
}
