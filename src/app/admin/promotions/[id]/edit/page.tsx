"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePromotionStore } from "@/lib/store/promotion-store";
import { PromotionForm } from "@/components/promotions/promotion-form";
import { Promotion } from "@/lib/types/promotion";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const { promotions } = usePromotionStore();
  const [promotion, setPromotion] = useState<Promotion | undefined>();
  const partnerId = "1";
  useEffect(() => {
    const foundPromotion = promotions.find((p) => p.id === params.id);
    if (foundPromotion) {
      setPromotion(foundPromotion);
    } else {
      toast.error("Promotion non trouvée");
    }
  }, [params.id, promotions]);

  if (!promotion) {
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <PromotionForm mode="edit" promotion={promotion} partnerId={partnerId} />
    </div>
  );
}
