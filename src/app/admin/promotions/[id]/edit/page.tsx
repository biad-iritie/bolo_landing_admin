"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/lib/store/product-store";
import { ProductForm } from "@/components/products/product-form";
import { Product } from "@/lib/types/promotion";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const { products } = useProductStore();
  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Produit non trouvé");
    }
  }, [params.id, products]);

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
