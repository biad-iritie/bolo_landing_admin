"use client";

import { useState } from "react";
import { useOrderHistoryStore } from "@/lib/store/order-history-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
} from "@/lib/constants/orders";

interface OrderHistoryProps {
  orderId: string;
}

type OrderHistoryType =
  | "status_change"
  | "payment_change"
  | "payment_method_change";

const historyTypeColors: Record<OrderHistoryType, string> = {
  status_change: "bg-blue-100 text-blue-800",
  payment_change: "bg-green-100 text-green-800",
  payment_method_change: "bg-purple-100 text-purple-800",
};

const historyTypeLabels: Record<OrderHistoryType, string> = {
  status_change: "Changement de statut",
  payment_change: "Changement de paiement",
  payment_method_change: "Changement de méthode de paiement",
};

export function OrderHistory({ orderId }: OrderHistoryProps) {
  const [filter, setFilter] = useState<OrderHistoryType | "all">("all");
  const history = useOrderHistoryStore((state) => state.history);
  const entries = history.filter(
    (entry) =>
      entry.orderId === orderId && (filter === "all" || entry.type === filter)
  );

  const getLabel = (type: OrderHistoryType, value: string) => {
    switch (type) {
      case "status_change":
        return ORDER_STATUS[value as keyof typeof ORDER_STATUS].label;
      case "payment_change":
        return PAYMENT_STATUS[value as keyof typeof PAYMENT_STATUS].label;
      case "payment_method_change":
        return PAYMENT_METHOD[value as keyof typeof PAYMENT_METHOD].label;
      default:
        return value;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Historique</CardTitle>
        <Select
          value={filter}
          onValueChange={(value) =>
            setFilter(value as OrderHistoryType | "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="status_change">Changements de statut</SelectItem>
            <SelectItem value="payment_change">
              Changements de paiement
            </SelectItem>
            <SelectItem value="payment_method_change">
              Changements de méthode
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="flex items-center justify-center py-4">
            <p className="text-muted-foreground">Aucun historique</p>
          </div>
        ) : (
          <div className="relative space-y-6">
            {entries.map((entry, index) => (
              <div key={entry.createdAt} className="relative flex gap-4">
                {index < entries.length - 1 && (
                  <div className="absolute left-4 top-8 h-full w-0.5 bg-border" />
                )}
                <div className="relative z-10 mt-1 h-8 w-8 rounded-full border bg-background" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge className={historyTypeColors[entry.type]}>
                      {historyTypeLabels[entry.type]}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p>
                      Changé de{" "}
                      <span className="font-medium">
                        {getLabel(entry.type, entry.previousValue)}
                      </span>{" "}
                      à{" "}
                      <span className="font-medium">
                        {getLabel(entry.type, entry.newValue)}
                      </span>
                      {entry.reason && (
                        <span className="block text-sm text-muted-foreground">
                          Raison: {entry.reason}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Par {entry.changedBy.name} ({entry.changedBy.role})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
