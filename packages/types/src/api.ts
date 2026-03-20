export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activePackages: number;
  registeredUsers: number;
  bookingsToday: number;
  revenueThisMonth: number;
  recentBookings: BookingSummary[];
  topDestinations: Array<{ name: string; count: number }>;
}

export interface BookingSummary {
  id: string;
  customerName: string;
  type: string;
  amount: number;
  status: string;
  date: string;
}
