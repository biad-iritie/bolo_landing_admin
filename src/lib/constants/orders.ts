export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";
export type PaymentMethod = "cash" | "mobile_money" | "card" | "bank_transfer";

export interface Order {
  id: string;
  promotionId: string;
  promotion: {
    id: string;
    product: {
      id: string;
      name: string;
      category: string;
      regularPrice: number;
      description: string;
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

export interface OrderFilters {
  startDate?: string;
  endDate?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  search?: string;
}

export const ORDER_STATUS = {
  pending: {
    label: "En attente",
    color: "bg-yellow-100 text-yellow-800",
  },
  confirmed: {
    label: "Confirmée",
    color: "bg-blue-100 text-blue-800",
  },
  processing: {
    label: "En traitement",
    color: "bg-purple-100 text-purple-800",
  },
  delivered: {
    label: "Livrée",
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Annulée",
    color: "bg-red-100 text-red-800",
  },
} as const;

export const PAYMENT_STATUS = {
  pending: {
    label: "En attente",
    color: "bg-yellow-100 text-yellow-800",
  },
  paid: {
    label: "Payé",
    color: "bg-green-100 text-green-800",
  },
  failed: {
    label: "Échoué",
    color: "bg-red-100 text-red-800",
  },
} as const;

export const PAYMENT_METHOD = {
  cash: {
    label: "Espèces",
  },
  mobile_money: {
    label: "Mobile Money",
  },
  card: {
    label: "Carte",
  },
  bank_transfer: {
    label: "Virement bancaire",
  },
} as const;
