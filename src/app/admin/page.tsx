"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/use-auth";
import { Store, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const stats = [
    {
      title: "Statut du magasin",
      value: user?.storeStatus === "approved" ? "Approuvé" : "En attente",
      icon: Store,
      description:
        user?.storeStatus === "approved"
          ? "Votre magasin est actif"
          : "En attente d'approbation",
      color:
        user?.storeStatus === "approved" ? "text-green-500" : "text-yellow-500",
      onClick: undefined,
    },
    {
      title: "Promotions",
      value: "0",
      icon: Package,
      description: "Promotions en ligne",
      color: "text-blue-500",
      onClick: () => router.push("/admin/promotions"),
    },
    {
      title: "Commandes",
      value: "0",
      icon: ShoppingCart,
      description: "Commandes en attente",
      color: "text-purple-500",
      onClick: () => router.push("/admin/orders?tab=list&status=pending"),
    },
    {
      title: "Ventes",
      value: "0 €",
      icon: TrendingUp,
      description: "Ventes du mois",
      color: "text-emerald-500",
      onClick: undefined,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue, {user?.businessName}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={cn(
              "transition-colors",
              stat.onClick && "cursor-pointer hover:bg-accent"
            )}
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {user?.storeStatus !== "approved" && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-yellow-800">
              <Store className="h-5 w-5" />
              <h3 className="font-semibold">En attente d&apos;approbation</h3>
            </div>
            <p className="mt-2 text-sm text-yellow-700">
              Votre compte est en cours de vérification. Vous pourrez accéder à
              toutes les fonctionnalités une fois approuvé. Nous vous
              notifierons par email dès que votre compte sera activé.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Commencez par ajouter vos produits et configurer votre magasin.
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aucune activité récente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
