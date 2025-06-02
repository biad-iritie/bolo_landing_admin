// Types
type PaymentMethod = "cash" | "mobile_money" | "card" | "bank_transfer";
type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered"
  | "cancelled";
type PaymentStatus = "pending" | "paid" | "failed";

interface OrderFilters {
  startDate?: string;
  endDate?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  search?: string;
}

interface OrderStore {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  // Actions
  getOrders: (filters: OrderFilters) => Promise<Order[]>;
  getOrder: (id: string) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<Order>;
  updatePaymentStatus: (id: string, status: PaymentStatus) => Promise<Order>;
}

// Mock data for development
const mockOrders: Order[] = [
  {
    id: "ORD001",
    promotionId: "PROM001",
    promotion: {
      id: "PROM001",
      product: {
        id: "PROD001",
        name: "Smartphone XYZ",
        category: "electronics",
        regularPrice: 150000,
        // ... other product fields
      },
      promoPrice: 135000,
      promoDiscount: 10,
      // ... other promotion fields
    },
    customer: {
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com",
    },
    quantity: 1,
    totalAmount: 135000,
    paymentMethod: "mobile_money",
    paymentStatus: "paid",
    orderStatus: "confirmed",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:30:00Z",
  },
  // ... more mock orders
];
