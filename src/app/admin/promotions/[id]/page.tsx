"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePromotionStore } from "@/lib/store/promotion-store";
import { Promotion } from "@/lib/types/promotion";
import { toast } from "sonner";

const statusColors: Record<
  Promotion["status"],
  "default" | "secondary" | "destructive"
> = {
  active: "default",
  inactive: "secondary",
};

const statusLabels: Record<Promotion["status"], string> = {
  active: "Actif",
  inactive: "Inactif",
};

export default function PromotionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { promotions, deletePromotion } = usePromotionStore();
  const [promotion, setPromotion] = useState<Promotion | undefined>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const foundPromotion = promotions.find((p) => p.id === params.id);
    if (foundPromotion) {
      setPromotion(foundPromotion);
    } else {
      toast.error("Promotion non trouvée");
      router.push("/admin/promotions");
    }
  }, [params.id, promotions, router]);

  const handleDelete = async () => {
    if (promotion) {
      try {
        await deletePromotion(promotion.id);
        toast.success("Promotion supprimée avec succès");
        router.push("/admin/promotions");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression de la promotion"
        );
      }
    }
  };

  if (!promotion) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {promotion.name}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/admin/promotions/${promotion.id}/edit`)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="mt-1">{promotion.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Catégorie
              </h3>
              <p className="mt-1 capitalize">{promotion.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Statut
              </h3>
              <Badge variant={statusColors[promotion.status]} className="mt-1">
                {statusLabels[promotion.status]}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails du stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Prix régulier
              </h3>
              <p className="mt-1">
                {promotion.regularPrice.toLocaleString()} FCFA
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Prix promo
              </h3>
              <p className="mt-1">
                {promotion.promoPrice.toLocaleString()} FCFA
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Remise
              </h3>
              <p className="mt-1">{promotion.promoDiscount}%</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Stock disponible
              </h3>
              <p className="mt-1">{promotion.stockQuantity} unités</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Dernière mise à jour
              </h3>
              <p className="mt-1">
                {new Date(promotion.updatedAt).toLocaleDateString("fr-FR", {
                  dateStyle: "long",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la promotion</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette promotion ? Cette action
              est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
