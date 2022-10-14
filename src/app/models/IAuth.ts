export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    access_token: string;
    token_type: string;
  };
  status: number;
  message: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  phone: string;
  name: string;
  id_card: string;
  address: string;
  password: string;
}

export interface IAdminInfo {
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
