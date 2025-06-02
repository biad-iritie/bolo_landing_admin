"use client";

import { useEffect, useState } from "react";
import { useOrderStore } from "@/lib/store/order-store";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  CalendarIcon,
  Download,
  Package,
  ArrowUpRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHOD,
} from "@/lib/constants/orders";

interface OrderFilters {
  startDate?: string;
  endDate?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  search?: string;
}

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

// Add mock data for reporting dashboard
const mockMetrics = {
  totalOrders: 1234,
  totalRevenue: 5678900,
  averageOrderValue: 4602,
  conversionRate: 3.2,
  ordersByStatus: {
    pending: 45,
    confirmed: 78,
    processing: 123,
    delivered: 890,
    cancelled: 98,
  },
  ordersByPaymentMethod: {
    cash: 234,
    mobile_money: 567,
    card: 345,
    bank_transfer: 88,
  },
  dailyOrders: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split("T")[0],
    orders: Math.floor(Math.random() * 50) + 20,
    revenue: Math.floor(Math.random() * 250000) + 100000,
  })),
  hourlyDistribution: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    orders: Math.floor(Math.random() * 30) + 5,
  })),
};

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<OrderFilters>(() => {
    // Initialize filters based on URL parameters
    const status = searchParams.get("status") as OrderStatus | null;
    return status ? { status } : {};
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const currentDate = new Date();
  const getOrders = useOrderStore((state) => state.getOrders);

  // Get initial tab from URL or default to "reporting"
  const initialTab = searchParams.get("tab") || "reporting";

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getOrders(filters);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setFilters((prev: OrderFilters) => ({ ...prev, search: value }));
  };

  const handleStatusChange = (value: OrderStatus) => {
    setFilters((prev: OrderFilters) => ({ ...prev, status: value }));
  };

  const handlePaymentStatusChange = (value: PaymentStatus) => {
    setFilters((prev: OrderFilters) => ({ ...prev, paymentStatus: value }));
  };

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setFilters((prev: OrderFilters) => ({ ...prev, paymentMethod: value }));
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // In a real app, fetch data for the selected time range
  };

  const handleExport = () => {
    // In a real app, generate and download a report
    console.log("Exporting report...");
  };

  const formatTooltipValue = (value: number, name: string) => [
    name === "orders"
      ? value.toLocaleString()
      : `${value.toLocaleString()} FCFA`,
    name === "orders" ? "Commandes" : "Revenus",
  ];

  const formatTooltipLabel = (date: string) =>
    format(new Date(date), "dd MMMM yyyy", { locale: fr });

  const handleOrderClick = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
        <p className="text-muted-foreground">
          Gérez et suivez les commandes de vos clients
        </p>
      </div>

      <Tabs defaultValue={initialTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="reporting">Tableau de bord</TabsTrigger>
          <TabsTrigger value="list">Liste des commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="reporting" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Tableau de bord des commandes
              </h2>
              <p className="text-muted-foreground">
                Analysez les performances et les tendances de vos commandes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 derniers jours</SelectItem>
                  <SelectItem value="30d">30 derniers jours</SelectItem>
                  <SelectItem value="90d">90 derniers jours</SelectItem>
                  <SelectItem value="1y">1 an</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !currentDate && "text-muted-foreground"
                )}
                onClick={() => {
                  // In a real app, this would open a date picker
                  console.log("Date picker clicked");
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(currentDate, "MMMM yyyy", { locale: fr })}
              </Button>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Metrics Cards */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total des commandes
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockMetrics.totalOrders.toLocaleString("fr-FR")}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +12.3%
                  </span>
                  par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
            {/* ... other metric cards ... */}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Charts */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Tendances des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockMetrics.dailyOrders}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(date) =>
                          format(new Date(date), "dd/MM", { locale: fr })
                        }
                      />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={formatTooltipValue}
                        labelFormatter={formatTooltipLabel}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="orders"
                        stroke="#8884d8"
                        name="orders"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#82ca9d"
                        name="revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* ... other charts ... */}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-8"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <Select
                  onValueChange={handleStatusChange}
                  value={filters.status || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut de la commande" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ORDER_STATUS).map(([value, { label }]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={handlePaymentStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut du paiement" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PAYMENT_STATUS).map(
                      ([value, { label }]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Select onValueChange={handlePaymentMethodChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Méthode de paiement" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PAYMENT_METHOD).map(
                      ([value, { label }]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Chargement...
                      </TableCell>
                    </TableRow>
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Aucune commande trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.customer.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.promotion.product.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.promotion.product.category}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.totalAmount.toLocaleString("fr-FR")} FCFA
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge
                              className={
                                PAYMENT_STATUS[order.paymentStatus].color
                              }
                            >
                              {PAYMENT_STATUS[order.paymentStatus].label}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {PAYMENT_METHOD[order.paymentMethod].label}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={ORDER_STATUS[order.orderStatus].color}
                          >
                            {ORDER_STATUS[order.orderStatus].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
