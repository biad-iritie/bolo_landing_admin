"use client";

import { PromotionForm } from "@/components/promotions/promotion-form";

export default function NewProductPage() {
  const partnerId = "1";
  return (
    <div className="container mx-auto py-6">
      <PromotionForm mode="create" partnerId={partnerId} />
    </div>
  );
}
