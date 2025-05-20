"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, BarChart3, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { usePromotionStore } from "@/lib/store/promotion-store";
import { PromotionCategory, PromotionStatus } from "@/lib/types/promotion";

const categoryLabels: Record<PromotionCategory, string> = {
  groceries: "Épicerie",
  electronics: "Électronique",
  clothing: "Vêtements",
  home: "Maison",
  beauty: "Beauté",
  sports: "Sports",
  other: "Autre",
};

const statusLabels: Record<PromotionStatus, string> = {
  active: "Actif",
  inactive: "Inactif",
};

const statusColors: Record<PromotionStatus, "default" | "secondary"> = {
  active: "default",
  inactive: "secondary",
};

export default function PromotionsPage() {
  const router = useRouter();
  const { promotions } = usePromotionStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PromotionCategory | "all">("all");
  const [status, setStatus] = useState<PromotionStatus | "all">("all");

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch = search
      ? promotion.name.toLowerCase().includes(search.toLowerCase()) ||
        promotion.description?.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory =
      category !== "all" ? promotion.category === category : true;
    const matchesStatus = status !== "all" ? promotion.status === status : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: promotions.length,
    active: promotions.filter((p) => p.status === "active").length,
    lowStock: promotions.filter((p) => p.stockQuantity <= p.lowStockThreshold)
      .length,
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground">
            Gérez vos promotions et suivez leur performance
          </p>
        </div>
        <Button onClick={() => router.push("/admin/promotions/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Promotion
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Promotions
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active} promotions actives
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promotions Actives
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.active / stats.total) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lowStock}</div>
            <p className="text-xs text-muted-foreground">
              Nécessite réapprovisionnement
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Liste des Promotions</CardTitle>
              <CardDescription>
                Gérez et suivez toutes vos promotions
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select
                value={category}
                onValueChange={(v) =>
                  setCategory(v as PromotionCategory | "all")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as PromotionStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix régulier</TableHead>
                <TableHead>Prix promo</TableHead>
                <TableHead>Remise</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow
                  key={promotion.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() =>
                    router.push(`/admin/promotions/${promotion.id}/edit`)
                  }
                >
                  <TableCell className="font-medium">
                    {promotion.name}
                  </TableCell>
                  <TableCell>{categoryLabels[promotion.category]}</TableCell>
                  <TableCell>
                    {promotion.regularPrice.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>
                    {promotion.promoPrice.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>{promotion.promoDiscount}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        promotion.stockQuantity <= promotion.lowStockThreshold
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {promotion.stockQuantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[promotion.status]}>
                      {statusLabels[promotion.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/promotions/${promotion.id}/edit`);
                      }}
                    >
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
