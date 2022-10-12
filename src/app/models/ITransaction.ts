export interface ITransaction {
  id: number;
  admin_id: number;
  weight: number;
  total_price: number;
  notes: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
