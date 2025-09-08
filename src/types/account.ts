export interface Account {
  id: number;
  uuid: string; // Lưu UUID gốc từ DB
  contactInfo: {
    name: string;
    contact: string; // Zalo/SĐT/Facebook/Telegram...
  };
  accountType: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  cost: number; // Chi phí
  revenue: number; // Tổng thu
  profit: number; // Lợi nhuận (revenue - cost)
  collaboratorRef?: string; // Mã mời CTV (nếu có)
  collaboratorCommissionPct?: number; // % hoa hồng
  collaboratorCommission?: number; // Số tiền hoa hồng
  customerAccount: {
    email: string;
    password: string;
    twofa?: string;
  };
  shopAccount: {
    email: string;
    password: string;
    twofa?: string;
  };
  status: 'active' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountData {
  contactInfo: Account['contactInfo'];
  accountType: string;
  startDate: string;
  endDate: string;
  cost: number;
  revenue: number;
  customerAccount: Account['customerAccount'];
  shopAccount: Account['shopAccount'];
  status: Account['status'];
  collaboratorRef?: string;
}

export interface UpdateAccountData extends Partial<CreateAccountData> {
  id: number;
}