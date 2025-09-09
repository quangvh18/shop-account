import { createContext, useContext, useEffect, useState } from "react";
import { Account, CreateAccountData, UpdateAccountData } from "@/types/account";
import { supabase } from "@/lib/supabase";
import { calculateCollaboratorCommissionPct } from "@/lib/utils";

type AccountContextType = {
  accounts: Account[];
  addAccount: (data: CreateAccountData) => Promise<void>;
  updateAccount: (data: UpdateAccountData) => Promise<void>;
  deleteAccount: (id: number) => Promise<void>;
  getAccount: (id: number) => Account | undefined;
  getExpiringAccounts: (days?: number) => Account[];
  loading: boolean;
};

const AccountContext = createContext<AccountContextType | null>(null);

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data, error } = await supabase
          .from("accounts")
          .select("*")
          .order("createdat", { ascending: false });
        if (error) throw error;
        const mapped: Account[] = (data || []).map((row: any) => ({
          id: typeof row.id === 'string' ? parseInt(row.id.replace(/\D/g, '').slice(-8), 10) : Number(row.id),
          uuid: String(row.id), // Lưu UUID gốc
          contactInfo: row.contactInfo ?? row.contactinfo,
          accountType: row.accountType ?? row.accounttype,
          startDate: row.startDate ?? row.startdate,
          endDate: row.endDate ?? row.enddate,
          cost: (row.cost ?? 0),
          revenue: (row.revenue ?? 0),
          profit: row.profit ?? Math.max(0, (row.revenue ?? 0) - (row.cost ?? 0)),
          customerAccount: row.customerAccount ?? row.customeraccount,
          shopAccount: row.shopAccount ?? row.shopaccount,
          collaboratorRef: row.collaboratorRef ?? row.collaborator_ref,
          collaboratorCommissionPct: row.collaboratorCommissionPct ?? row.collaborator_commission_pct,
          collaboratorCommission: row.collaboratorCommission ?? row.collaborator_commission,
          status: row.status ?? getAccountStatus((row.endDate ?? row.enddate) as string),
          createdAt: row.createdAt ?? row.createdat,
          updatedAt: row.updatedAt ?? row.updatedat,
        }));
        setAccounts(mapped);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching accounts:", err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
    };
    fetchAccounts();
  }, []);

  const addAccount = async (data: CreateAccountData) => {
    const nowIso = new Date().toISOString();
    const newRecord = {
      contactinfo: data.contactInfo,
      accounttype: data.accountType,
      startdate: data.startDate,
      enddate: data.endDate,
      cost: data.cost,
      revenue: data.revenue,
      profit: Math.max(0, (data.revenue || 0) - (data.cost || 0)),
      customeraccount: data.customerAccount,
      shopaccount: data.shopAccount,
      ...(data.collaboratorRef && { collaborator_ref: data.collaboratorRef }),
      ...(data as any).collaboratorCommissionPct !== undefined && { collaborator_commission_pct: (data as any).collaboratorCommissionPct },
      ...(data as any).collaboratorCommission !== undefined && { collaborator_commission: (data as any).collaboratorCommission },
      // Chỉ thêm status nếu có
      ...(data.status && { status: data.status }),
      createdat: nowIso,
      updatedat: nowIso,
    };
    const { data: inserted, error } = await supabase
      .from("accounts")
      .insert(newRecord)
      .select("*")
      .single();
    if (error) throw error;
    const account: Account = {
      id: typeof inserted.id === 'string' ? parseInt(inserted.id.replace(/\D/g, '').slice(-8), 10) : Number(inserted.id),
      uuid: String(inserted.id), // Lưu UUID gốc
      contactInfo: inserted.contactInfo ?? inserted.contactinfo,
      accountType: inserted.accountType ?? inserted.accounttype,
      startDate: inserted.startDate ?? inserted.startdate,
      endDate: inserted.endDate ?? inserted.enddate,
      cost: inserted.cost ?? 0,
      revenue: inserted.revenue ?? 0,
      profit: inserted.profit ?? Math.max(0, (inserted.revenue ?? 0) - (inserted.cost ?? 0)),
      customerAccount: inserted.customerAccount ?? inserted.customeraccount,
      shopAccount: inserted.shopAccount ?? inserted.shopaccount,
      collaboratorRef: inserted.collaboratorRef ?? inserted.collaborator_ref,
      collaboratorCommissionPct: inserted.collaboratorCommissionPct ?? inserted.collaborator_commission_pct,
      collaboratorCommission: inserted.collaboratorCommission ?? inserted.collaborator_commission,
      status: inserted.status ?? getAccountStatus((inserted.endDate ?? inserted.enddate) as string),
      createdAt: inserted.createdAt ?? inserted.createdat,
      updatedAt: inserted.updatedAt ?? inserted.updatedat,
    };
    setAccounts(prev => [account, ...prev]);
  };

  const updateAccount = async (data: UpdateAccountData) => {
    const nowIso = new Date().toISOString();
    const existing = accounts.find(a => a.id === data.id);
    
    if (!existing) {
      throw new Error("Account not found");
    }
    
    // Tính toán lại hoa hồng nếu có thay đổi về revenue, cost hoặc collaboratorRef
    const newRevenue = data.revenue ?? existing.revenue ?? 0;
    const newCost = data.cost ?? existing.cost ?? 0;
    const newCollaboratorRef = data.collaboratorRef ?? existing.collaboratorRef;
    const newProfit = Math.max(0, newRevenue - newCost);
    
    let commissionPct = 0;
    let commission = 0;
    
    // Chỉ tính hoa hồng nếu có collaboratorRef và không rỗng
    if (newCollaboratorRef && newCollaboratorRef.trim() !== '') {
      commissionPct = calculateCollaboratorCommissionPct(newProfit);
      commission = Math.round(newProfit * commissionPct);
    }
    
    const updatedPayload: any = {
      contactinfo: data.contactInfo ?? existing.contactInfo,
      accounttype: data.accountType ?? existing.accountType,
      startdate: data.startDate ?? existing.startDate,
      enddate: data.endDate ?? existing.endDate,
      cost: newCost,
      revenue: newRevenue,
      profit: newProfit,
      customeraccount: data.customerAccount ?? existing.customerAccount,
      shopaccount: data.shopAccount ?? existing.shopAccount,
      // Cập nhật thông tin cộng tác viên
      ...(data.collaboratorRef !== undefined && { collaborator_ref: data.collaboratorRef }),
      collaborator_commission_pct: commissionPct,
      collaborator_commission: commission,
      // Chỉ thêm status nếu cột tồn tại
      ...(data.status && { status: data.status }),
      updatedat: nowIso,
    };
    
    // Dùng UUID gốc để update
    const { data: updated, error } = await supabase
      .from("accounts")
      .update(updatedPayload)
      .eq("id", existing.uuid) // Dùng UUID gốc
      .select("*")
      .single();
    
    if (error) {
      console.error("Update error:", error);
      throw error;
    }
    setAccounts(prev => prev.map(account => 
      account.id === data.id 
        ? { 
            id: typeof updated.id === 'string' ? parseInt(updated.id.replace(/\D/g, '').slice(-8), 10) : Number(updated.id),
            uuid: String(updated.id), // Lưu UUID gốc
            contactInfo: updated.contactInfo ?? updated.contactinfo,
            accountType: updated.accountType ?? updated.accounttype,
            startDate: updated.startDate ?? updated.startdate,
            endDate: updated.endDate ?? updated.enddate,
            cost: updated.cost ?? 0,
            revenue: updated.revenue ?? 0,
            profit: updated.profit ?? Math.max(0, (updated.revenue ?? 0) - (updated.cost ?? 0)),
            customerAccount: updated.customerAccount ?? updated.customeraccount,
            shopAccount: updated.shopAccount ?? updated.shopaccount,
            collaboratorRef: updated.collaboratorRef ?? updated.collaborator_ref,
            collaboratorCommissionPct: updated.collaboratorCommissionPct ?? updated.collaborator_commission_pct,
            collaboratorCommission: updated.collaboratorCommission ?? updated.collaborator_commission,
            status: updated.status ?? getAccountStatus((updated.endDate ?? updated.enddate) as string),
            createdAt: updated.createdAt ?? updated.createdat,
            updatedAt: updated.updatedAt ?? updated.updatedat,
          }
        : account
    ));
  };

  const deleteAccount = async (id: number) => {
    const existing = accounts.find(a => a.id === id);
    if (!existing) {
      throw new Error("Account not found");
    }
    
    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", existing.uuid); // Dùng UUID gốc
    if (error) throw error;
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  const getAccount = (id: number) => {
    return accounts.find(account => account.id === id);
  };

  const getExpiringAccounts = (days: number = 2) => {
    const now = new Date();
    const threshold = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return accounts.filter(account => {
      const endDate = new Date(account.endDate);
      return endDate <= threshold && endDate > now;
    });
  };

  const getAccountStatus = (endDate: string): Account['status'] => {
    const now = new Date();
    const end = new Date(endDate);
    const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'expired';
    return 'active';
  };

  const value: AccountContextType = {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getExpiringAccounts,
    loading,
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccounts must be used within AccountProvider");
  return context;
};
