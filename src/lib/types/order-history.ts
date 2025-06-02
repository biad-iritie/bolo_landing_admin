import { OrderStatus, PaymentStatus } from "./order";

export type OrderHistoryType =
  | "status_change"
  | "payment_change"
  | "cancellation"
  | "note";

export interface OrderHistoryMetadata {
  status?: {
    from: string;
    to: string;
  };
  payment?: {
    from: string;
    to: string;
  };
  cancellation?: {
    reason: string;
  };
  note?: {
    content: string;
  };
}

export interface OrderHistoryEntry {
  id: string;
  orderId: string;
  type: OrderHistoryType;
  previousValue: string;
  newValue: string;
  reason?: string;
  changedBy: {
    id: string;
    name: string;
    role: string;
  };
  changedAt: string;
  metadata?: OrderHistoryMetadata;
}

export interface OrderHistoryFilters {
  startDate?: string;
  endDate?: string;
  type?: OrderHistoryType;
  changedBy?: string;
}

export interface OrderHistoryStore {
  entries: OrderHistoryEntry[];
  isLoading: boolean;
  error: string | null;

  // Actions
  getOrderHistory: (
    orderId: string,
    filters?: OrderHistoryFilters
  ) => Promise<OrderHistoryEntry[]>;
  addHistoryEntry: (
    entry: Omit<OrderHistoryEntry, "id" | "changedAt">
  ) => Promise<OrderHistoryEntry>;
}
