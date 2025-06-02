"use client";

import { useEffect, useState, use } from "react";
import { useOrderStore } from "@/lib/store/order-store";
import { useOrderHistoryStore } from "@/lib/store/order-history-store";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { OrderHistory } from "@/components/orders/order-history";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
  type OrderStatus,
  type PaymentStatus,
  type PaymentMethod,
} from "@/lib/constants/orders";

interface Order {
  id: string;
  promotionId: string;
  promotion: {
    id: string;
    product: {
      id: string;
      name: string;
      category: string;
      regularPrice: number;
    };
    promoPrice: number;
    promoDiscount: number;
  };
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  quantity: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);
  const [pendingPaymentStatus, setPendingPaymentStatus] =
    useState<PaymentStatus | null>(null);
  const [pendingPaymentMethod, setPendingPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const getOrder = useOrderStore((state) => state.getOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const updatePaymentStatus = useOrderStore(
    (state) => state.updatePaymentStatus
  );
  const updatePaymentMethod = useOrderStore(
    (state) => state.updatePaymentMethod
  );
  const addHistoryEntry = useOrderHistoryStore(
    (state) => state.addHistoryEntry
  );

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    setIsLoading(true);
    try {
      const data = await getOrder(id);
      if (data) {
        setOrder(data);
      }
    } catch (error) {
      console.error("Error loading order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderStatusChange = async (status: OrderStatus) => {
    if (!order) return;
    setPendingStatus(status);
    setShowStatusDialog(true);
  };

  const handlePaymentStatusChange = async (status: PaymentStatus) => {
    if (!order) return;
    setPendingPaymentStatus(status);
    setShowPaymentDialog(true);
  };

  const handlePaymentMethodChange = async (method: PaymentMethod) => {
    if (!order) return;
    setPendingPaymentMethod(method);
    setShowPaymentMethodDialog(true);
  };

  const confirmOrderStatusChange = async (reason?: string) => {
    if (!order || !pendingStatus) return;
    setIsUpdating(true);
    try {
      const updatedOrder = await updateOrderStatus(order.id, pendingStatus);
      if (updatedOrder) {
        setOrder(updatedOrder);
      }

      // Add history entry
      await addHistoryEntry({
        orderId: order.id,
        type: "status_change",
        previousValue: order.orderStatus,
        newValue: pendingStatus,
        reason,
        changedBy: {
          id: "USER001", // This would come from auth in a real app
          name: "Admin User",
          role: "admin",
        },
        metadata: {
          status: {
            from: order.orderStatus,
            to: pendingStatus,
          },
        },
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
      setShowStatusDialog(false);
      setPendingStatus(null);
    }
  };

  const confirmPaymentStatusChange = async (reason?: string) => {
    if (!order || !pendingPaymentStatus) return;
    setIsUpdating(true);
    try {
      const updatedOrder = await updatePaymentStatus(
        order.id,
        pendingPaymentStatus
      );
      setOrder(updatedOrder);

      // Add history entry
      await addHistoryEntry({
        orderId: order.id,
        type: "payment_change",
        previousValue: order.paymentStatus,
        newValue: pendingPaymentStatus,
        reason,
        changedBy: {
          id: "USER001", // This would come from auth in a real app
          name: "Admin User",
          role: "admin",
        },
        metadata: {
          payment: {
            from: order.paymentStatus,
            to: pendingPaymentStatus,
          },
        },
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      setIsUpdating(false);
      setShowPaymentDialog(false);
      setPendingPaymentStatus(null);
    }
  };

  const confirmPaymentMethodChange = async (reason?: string) => {
    if (!order || !pendingPaymentMethod) return;
    setIsUpdating(true);
    try {
      const updatedOrder = await updatePaymentMethod(
        order.id,
        pendingPaymentMethod
      );
      setOrder(updatedOrder);

      // Add history entry
      await addHistoryEntry({
        orderId: order.id,
        type: "payment_method_change",
        previousValue: order.paymentMethod,
        newValue: pendingPaymentMethod,
        reason,
        changedBy: {
          id: "USER001",
          name: "Admin User",
          role: "admin",
        },
        metadata: {
          paymentMethod: {
            from: order.paymentMethod,
            to: pendingPaymentMethod,
          },
        },
      });
    } catch (error) {
      console.error("Error updating payment method:", error);
    } finally {
      setIsUpdating(false);
      setShowPaymentMethodDialog(false);
      setPendingPaymentMethod(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Commande non trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.push("/admin/orders?tab=list")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Commande {order.id}
          </h1>
          <p className="text-muted-foreground">
            Créée le {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations client</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nom</p>
              <p>{order.customer.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Téléphone
              </p>
              <p>{order.customer.phone}</p>
            </div>
            {order.customer.email && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p>{order.customer.email}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails de la commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Produit
              </p>
              <p>{order.promotion.product.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.promotion.product.category}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Quantité
              </p>
              <p>{order.quantity}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Prix unitaire
              </p>
              <p>{order.promotion.promoPrice.toLocaleString()} FCFA</p>
              <p className="text-sm text-muted-foreground">
                Remise: {order.promotion.promoDiscount}%
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Montant total
              </p>
              <p className="text-lg font-bold">
                {order.totalAmount.toLocaleString()} FCFA
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statut de la commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Statut actuel
              </p>
              <Badge className={ORDER_STATUS[order.orderStatus].color}>
                {ORDER_STATUS[order.orderStatus].label}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Mettre à jour le statut
              </p>
              <Select
                value={order.orderStatus}
                onValueChange={handleOrderStatusChange}
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="delivered">Livrée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statut du paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Statut actuel
              </p>
              <Badge className={PAYMENT_STATUS[order.paymentStatus].color}>
                {PAYMENT_STATUS[order.paymentStatus].label}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Méthode de paiement
              </p>
              <Select
                value={order.paymentMethod}
                onValueChange={handlePaymentMethodChange}
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PAYMENT_METHOD).map(([value, { label }]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Mettre à jour le statut
              </p>
              <Select
                value={order.paymentStatus}
                onValueChange={handlePaymentStatusChange}
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <OrderHistory orderId={order.id} />

      <ConfirmationDialog
        isOpen={showStatusDialog}
        onClose={() => {
          setShowStatusDialog(false);
          setPendingStatus(null);
        }}
        onConfirm={confirmOrderStatusChange}
        title="Confirmer le changement de statut"
        description={`Êtes-vous sûr de vouloir changer le statut de la commande de "${
          ORDER_STATUS[order.orderStatus].label
        }" à "${pendingStatus ? ORDER_STATUS[pendingStatus].label : ""}"?`}
        requireReason={pendingStatus === "cancelled"}
        reasonLabel="Raison de l'annulation"
        reasonPlaceholder="Entrez la raison de l'annulation..."
        variant={pendingStatus === "cancelled" ? "destructive" : "default"}
      />

      <ConfirmationDialog
        isOpen={showPaymentDialog}
        onClose={() => {
          setShowPaymentDialog(false);
          setPendingPaymentStatus(null);
        }}
        onConfirm={confirmPaymentStatusChange}
        title="Confirmer le changement de statut de paiement"
        description={`Êtes-vous sûr de vouloir changer le statut de paiement de "${
          PAYMENT_STATUS[order.paymentStatus].label
        }" à "${
          pendingPaymentStatus ? PAYMENT_STATUS[pendingPaymentStatus].label : ""
        }"?`}
        requireReason={pendingPaymentStatus === "failed"}
        reasonLabel="Raison de l'échec"
        reasonPlaceholder="Entrez la raison de l'échec du paiement..."
        variant={pendingPaymentStatus === "failed" ? "destructive" : "default"}
      />

      <ConfirmationDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => {
          setShowPaymentMethodDialog(false);
          setPendingPaymentMethod(null);
        }}
        onConfirm={confirmPaymentMethodChange}
        title="Confirmer le changement de méthode de paiement"
        description={`Êtes-vous sûr de vouloir changer la méthode de paiement de "${
          PAYMENT_METHOD[order.paymentMethod].label
        }" à "${
          pendingPaymentMethod ? PAYMENT_METHOD[pendingPaymentMethod].label : ""
        }"?`}
        requireReason={true}
        reasonLabel="Raison du changement"
        reasonPlaceholder="Entrez la raison du changement de méthode de paiement..."
        variant="default"
      />
    </div>
  );
}
