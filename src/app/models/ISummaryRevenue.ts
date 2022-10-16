export interface ITodayRevenueResponse {
  admin_id: number;
  total_revenue: number;
}

export interface IDailyRevenueResponse {
  id: number;
  admin_id: number;
  total_revenue: number;
  created_at: number;
  updated_at: number;
}
