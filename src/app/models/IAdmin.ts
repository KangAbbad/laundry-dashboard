export interface IAdmin {
  id: number;
  username: string;
  email: string;
  phone: string;
  idCard: string;
  name: string;
  address: string;
  password?: string;
  created_at: number;
  updated_at: number;
}

export interface IAdminRequest {
  username: string;
  email: string;
  phone: string;
  name: string;
  id_card: string;
  address: string;
  password: string;
}
