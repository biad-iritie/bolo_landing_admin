import { create } from "zustand";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/lib/types/order";

export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
  ordersByPaymentMethod: Record<PaymentMethod, number>;
  ordersByPaymentStatus: Record<PaymentStatus, number>;
}

export interface OrderTrend {
  date: string;
  orders: number;
  revenue: number;
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
}

export interface DashboardStore {
  metrics: DashboardMetrics | null;
  trends: OrderTrend[];
  isLoading: boolean;
  error: string | null;
  filters: DashboardFilters;

  // Actions
  getMetrics: (filters?: DashboardFilters) => Promise<DashboardMetrics>;
  getTrends: (filters?: DashboardFilters) => Promise<OrderTrend[]>;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  resetFilters: () => void;
}

// Mock data for development
const mockMetrics: DashboardMetrics = {
  totalOrders: 150,
  totalRevenue: 15000000,
  averageOrderValue: 100000,
  ordersByStatus: {
    pending: 30,
    confirmed: 45,
    processing: 25,
    delivered: 40,
    cancelled: 10,
  },
  ordersByPaymentMethod: {
    cash: 60,
    mobile_money: 45,
    card: 30,
    bank_transfer: 15,
  },
  ordersByPaymentStatus: {
    pending: 35,
    paid: 100,
    failed: 15,
  },
};

const mockTrends: OrderTrend[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    orders: Math.floor(Math.random() * 10) + 1,
    revenue: (Math.floor(Math.random() * 10) + 1) * 100000,
  };
});

export const useDashboardStore = create<DashboardStore>((set) => ({
  metrics: null,
  trends: [],
  isLoading: false,
  error: null,
  filters: {},

  getMetrics: async (filters?: DashboardFilters) => {
    set({ isLoading: true, error: null });
    try {
      // In a real application, this would be an API call
      // For now, we'll return mock data
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      set({ metrics: mockMetrics, isLoading: false });
      return mockMetrics;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },

  getTrends: async (filters?: DashboardFilters) => {
    set({ isLoading: true, error: null });
    try {
      // In a real application, this would be an API call
      // For now, we'll return mock data
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      set({ trends: mockTrends, isLoading: false });
      return mockTrends;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  resetFilters: () => set({ filters: {} }),
}));
