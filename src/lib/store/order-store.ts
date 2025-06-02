import { create } from "zustand";
import { Order } from "@/lib/constants/orders";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
} from "@/lib/constants/orders";

type OrderStatus = keyof typeof ORDER_STATUS;
type PaymentStatus = keyof typeof PAYMENT_STATUS;
type PaymentMethod = keyof typeof PAYMENT_METHOD;

interface OrderStore {
  orders: Order[];
  filters: {
    status: OrderStatus | "all";
    paymentStatus: PaymentStatus | "all";
    search: string;
  };
  setFilters: (filters: Partial<OrderStore["filters"]>) => void;
  getOrders: (filters?: Partial<OrderStore["filters"]>) => Order[];
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => Order;
  updatePaymentStatus: (id: string, status: PaymentStatus) => Order;
  updatePaymentMethod: (id: string, method: PaymentMethod) => Order;
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
        name: "T-shirt BOLO Premium",
        description: "T-shirt 100% coton avec logo BOLO",
        category: "vetements",
        regularPrice: 15000,
      },
      promoPrice: 13500,
      promoDiscount: 10,
    },
    customer: {
      name: "Jean Dupont",
      phone: "+225 07 07 07 07 07",
      email: "jean.dupont@email.com",
    },
    quantity: 2,
    totalAmount: 27000,
    paymentMethod: "mobile_money",
    paymentStatus: "pending",
    orderStatus: "pending",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "ORD002",
    promotionId: "PROM002",
    promotion: {
      id: "PROM002",
      product: {
        id: "PROD002",
        name: "Casquette BOLO",
        description: "Casquette ajustable avec logo brodé",
        category: "accessoires",
        regularPrice: 8000,
      },
      promoPrice: 7200,
      promoDiscount: 10,
    },
    customer: {
      name: "Marie Koné",
      phone: "+225 01 01 01 01 01",
      email: "marie.kone@email.com",
    },
    quantity: 1,
    totalAmount: 7200,
    paymentMethod: "cash",
    paymentStatus: "paid",
    orderStatus: "confirmed",
    createdAt: "2024-03-19T15:30:00Z",
    updatedAt: "2024-03-19T15:45:00Z",
  },
  {
    id: "ORD003",
    promotionId: "PROM003",
    promotion: {
      id: "PROM003",
      product: {
        id: "PROD003",
        name: "Sweat BOLO",
        description: "Sweat à capuche avec logo imprimé",
        category: "vetements",
        regularPrice: 25000,
      },
      promoPrice: 22500,
      promoDiscount: 10,
    },
    customer: {
      name: "Amadou Traoré",
      phone: "+225 05 05 05 05 05",
      email: "amadou.traore@email.com",
    },
    quantity: 2,
    totalAmount: 45000,
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "processing",
    createdAt: "2024-03-18T09:15:00Z",
    updatedAt: "2024-03-18T14:30:00Z",
  },
  {
    id: "ORD004",
    promotionId: "PROM004",
    promotion: {
      id: "PROM004",
      product: {
        id: "PROD004",
        name: "Sac BOLO",
        description: "Sac en toile avec logo brodé",
        category: "accessoires",
        regularPrice: 12000,
      },
      promoPrice: 10800,
      promoDiscount: 10,
    },
    customer: {
      name: "Fatou Ouattara",
      phone: "+225 03 03 03 03 03",
      email: "fatou.ouattara@email.com",
    },
    quantity: 1,
    totalAmount: 10800,
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    orderStatus: "delivered",
    createdAt: "2024-03-17T11:20:00Z",
    updatedAt: "2024-03-17T16:45:00Z",
  },
  {
    id: "ORD005",
    promotionId: "PROM005",
    promotion: {
      id: "PROM005",
      product: {
        id: "PROD005",
        name: "T-shirt BOLO Classic",
        description: "T-shirt basique avec logo imprimé",
        category: "vetements",
        regularPrice: 12000,
      },
      promoPrice: 10800,
      promoDiscount: 10,
    },
    customer: {
      name: "Koffi Yao",
      phone: "+225 09 09 09 09 09",
      email: "koffi.yao@email.com",
    },
    quantity: 1,
    totalAmount: 10800,
    paymentMethod: "mobile_money",
    paymentStatus: "failed",
    orderStatus: "cancelled",
    createdAt: "2024-03-16T14:10:00Z",
    updatedAt: "2024-03-16T15:30:00Z",
  },
];

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: mockOrders,
  filters: {
    status: "all",
    paymentStatus: "all",
    search: "",
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  getOrders: (filters = {}) => {
    const { orders } = get();
    return orders.filter((order) => {
      if (
        filters.status &&
        filters.status !== "all" &&
        order.orderStatus !== filters.status
      )
        return false;
      if (
        filters.paymentStatus &&
        filters.paymentStatus !== "all" &&
        order.paymentStatus !== filters.paymentStatus
      )
        return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          order.customer.name.toLowerCase().includes(searchLower) ||
          order.customer.phone.includes(searchLower) ||
          order.id.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  },
  getOrder: (id) => get().orders.find((order) => order.id === id),
  updateOrderStatus: (id, status) => {
    const updatedOrder = get().orders.find((order) => order.id === id);
    if (!updatedOrder) throw new Error("Order not found");
    const newOrder = {
      ...updatedOrder,
      orderStatus: status,
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? newOrder : order)),
    }));
    return newOrder;
  },
  updatePaymentStatus: (id, status) => {
    const updatedOrder = get().orders.find((order) => order.id === id);
    if (!updatedOrder) throw new Error("Order not found");
    const newOrder = {
      ...updatedOrder,
      paymentStatus: status,
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? newOrder : order)),
    }));
    return newOrder;
  },
  updatePaymentMethod: (id, method) => {
    const updatedOrder = get().orders.find((order) => order.id === id);
    if (!updatedOrder) throw new Error("Order not found");
    const newOrder = {
      ...updatedOrder,
      paymentMethod: method,
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? newOrder : order)),
    }));
    return newOrder;
  },
}));
