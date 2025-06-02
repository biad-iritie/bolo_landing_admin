import { create } from "zustand";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered"
  | "cancelled";
type PaymentStatus = "pending" | "paid" | "failed";
type PaymentMethod = "cash" | "mobile_money" | "card" | "bank_transfer";

type OrderHistoryType =
  | "status_change"
  | "payment_change"
  | "payment_method_change";

interface OrderHistoryEntry {
  orderId: string;
  type: OrderHistoryType;
  previousValue: OrderStatus | PaymentStatus | PaymentMethod;
  newValue: OrderStatus | PaymentStatus | PaymentMethod;
  reason?: string;
  changedBy: {
    id: string;
    name: string;
    role: string;
  };
  metadata: {
    status?: {
      from: OrderStatus;
      to: OrderStatus;
    };
    payment?: {
      from: PaymentStatus;
      to: PaymentStatus;
    };
    paymentMethod?: {
      from: PaymentMethod;
      to: PaymentMethod;
    };
  };
  createdAt: string;
}

interface OrderHistoryStore {
  history: OrderHistoryEntry[];
  addHistoryEntry: (
    entry: Omit<OrderHistoryEntry, "createdAt">
  ) => Promise<void>;
}

const mockHistory: OrderHistoryEntry[] = [
  // ORD001 - T-shirt Premium (Complete journey)
  {
    orderId: "ORD001",
    type: "status_change",
    previousValue: "pending",
    newValue: "confirmed",
    reason: "Commande validée après vérification du stock",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-20T10:15:00Z",
    metadata: {
      status: {
        from: "pending",
        to: "confirmed",
      },
    },
  },
  {
    orderId: "ORD001",
    type: "payment_change",
    previousValue: "pending",
    newValue: "paid",
    reason: "Paiement mobile money reçu (Orange Money)",
    changedBy: {
      id: "USER002",
      name: "Système de paiement",
      role: "system",
    },
    createdAt: "2024-03-20T10:20:00Z",
    metadata: {
      payment: {
        from: "pending",
        to: "paid",
      },
    },
  },
  {
    orderId: "ORD001",
    type: "status_change",
    previousValue: "confirmed",
    newValue: "processing",
    reason: "Commande en cours de préparation",
    changedBy: {
      id: "USER003",
      name: "Amadou Traoré",
      role: "warehouse",
    },
    createdAt: "2024-03-20T11:30:00Z",
    metadata: {
      status: {
        from: "confirmed",
        to: "processing",
      },
    },
  },

  // ORD002 - Casquette (Simple journey)
  {
    orderId: "ORD002",
    type: "payment_method_change",
    previousValue: "mobile_money",
    newValue: "cash",
    reason: "Client a demandé de payer à la livraison",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-19T15:30:00Z",
    metadata: {
      paymentMethod: {
        from: "mobile_money",
        to: "cash",
      },
    },
  },
  {
    orderId: "ORD002",
    type: "status_change",
    previousValue: "pending",
    newValue: "confirmed",
    reason: "Commande confirmée pour paiement à la livraison",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-19T15:35:00Z",
    metadata: {
      status: {
        from: "pending",
        to: "confirmed",
      },
    },
  },
  {
    orderId: "ORD002",
    type: "payment_change",
    previousValue: "pending",
    newValue: "paid",
    reason: "Paiement reçu en espèces à la livraison",
    changedBy: {
      id: "USER004",
      name: "Fatou Ouattara",
      role: "delivery",
    },
    createdAt: "2024-03-19T15:45:00Z",
    metadata: {
      payment: {
        from: "pending",
        to: "paid",
      },
    },
  },

  // ORD003 - Sweat (Complex journey)
  {
    orderId: "ORD003",
    type: "payment_method_change",
    previousValue: "mobile_money",
    newValue: "card",
    reason:
      "Problème avec l'application mobile money, client a opté pour la carte",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-18T09:15:00Z",
    metadata: {
      paymentMethod: {
        from: "mobile_money",
        to: "card",
      },
    },
  },
  {
    orderId: "ORD003",
    type: "payment_change",
    previousValue: "pending",
    newValue: "paid",
    reason: "Paiement par carte Visa accepté",
    changedBy: {
      id: "USER002",
      name: "Système de paiement",
      role: "system",
    },
    createdAt: "2024-03-18T09:20:00Z",
    metadata: {
      payment: {
        from: "pending",
        to: "paid",
      },
    },
  },
  {
    orderId: "ORD003",
    type: "status_change",
    previousValue: "pending",
    newValue: "confirmed",
    reason: "Commande confirmée après paiement",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-18T09:25:00Z",
    metadata: {
      status: {
        from: "pending",
        to: "confirmed",
      },
    },
  },
  {
    orderId: "ORD003",
    type: "status_change",
    previousValue: "confirmed",
    newValue: "processing",
    reason: "Commande en cours de préparation",
    changedBy: {
      id: "USER003",
      name: "Amadou Traoré",
      role: "warehouse",
    },
    createdAt: "2024-03-18T14:30:00Z",
    metadata: {
      status: {
        from: "confirmed",
        to: "processing",
      },
    },
  },

  // ORD004 - Sac (Completed journey)
  {
    orderId: "ORD004",
    type: "payment_change",
    previousValue: "pending",
    newValue: "paid",
    reason: "Virement bancaire reçu",
    changedBy: {
      id: "USER002",
      name: "Système de paiement",
      role: "system",
    },
    createdAt: "2024-03-17T11:20:00Z",
    metadata: {
      payment: {
        from: "pending",
        to: "paid",
      },
    },
  },
  {
    orderId: "ORD004",
    type: "status_change",
    previousValue: "pending",
    newValue: "confirmed",
    reason: "Commande confirmée après réception du paiement",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-17T11:25:00Z",
    metadata: {
      status: {
        from: "pending",
        to: "confirmed",
      },
    },
  },
  {
    orderId: "ORD004",
    type: "status_change",
    previousValue: "confirmed",
    newValue: "processing",
    reason: "Commande en cours de préparation",
    changedBy: {
      id: "USER003",
      name: "Amadou Traoré",
      role: "warehouse",
    },
    createdAt: "2024-03-17T14:30:00Z",
    metadata: {
      status: {
        from: "confirmed",
        to: "processing",
      },
    },
  },
  {
    orderId: "ORD004",
    type: "status_change",
    previousValue: "processing",
    newValue: "delivered",
    reason: "Commande livrée et reçue par le client",
    changedBy: {
      id: "USER004",
      name: "Fatou Ouattara",
      role: "delivery",
    },
    createdAt: "2024-03-17T16:45:00Z",
    metadata: {
      status: {
        from: "processing",
        to: "delivered",
      },
    },
  },

  // ORD005 - T-shirt Classic (Failed journey)
  {
    orderId: "ORD005",
    type: "payment_change",
    previousValue: "pending",
    newValue: "failed",
    reason: "Transaction mobile money échouée - Solde insuffisant",
    changedBy: {
      id: "USER002",
      name: "Système de paiement",
      role: "system",
    },
    createdAt: "2024-03-16T14:10:00Z",
    metadata: {
      payment: {
        from: "pending",
        to: "failed",
      },
    },
  },
  {
    orderId: "ORD005",
    type: "status_change",
    previousValue: "pending",
    newValue: "cancelled",
    reason: "Commande annulée suite à l'échec du paiement",
    changedBy: {
      id: "USER001",
      name: "Marie Koné",
      role: "admin",
    },
    createdAt: "2024-03-16T15:30:00Z",
    metadata: {
      status: {
        from: "pending",
        to: "cancelled",
      },
    },
  },
];

export const useOrderHistoryStore = create<OrderHistoryStore>((set) => ({
  history: mockHistory,
  addHistoryEntry: async (entry) => {
    const newEntry = {
      ...entry,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      history: [...state.history, newEntry],
    }));
  },
}));
