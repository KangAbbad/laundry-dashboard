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

export interface ITransactionRequest {
  admin_id: number;
  weight: number;
  notes: string;
  total_price: number;
  status: string;
}
