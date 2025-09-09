import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useAccounts } from "@/context/AccountContext";
import { CreateAccountData } from "@/types/account";
import { calculateCollaboratorCommissionPct } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const AddAccount = () => {
  const navigate = useNavigate();
  const { addAccount } = useAccounts();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<CreateAccountData>({
    contactInfo: {
      name: "",
      contact: "",
    },
    accountType: "",
    startDate: "",
    endDate: "",
    cost: 0,
    revenue: 0,
    customerAccount: {
      email: "",
      password: "",
      twofa: "",
    },
    shopAccount: {
      email: "",
      password: "",
      twofa: "",
    },
    status: 'active' as const,
    collaboratorRef: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.contactInfo.name.trim()) {
        toast({
          title: "Lỗi",
          description: "Vui lòng nhập tên khách hàng",
          variant: "destructive"
        });
        return;
      }

      if (!formData.accountType.trim()) {
        toast({
          title: "Lỗi", 
          description: "Vui lòng chọn loại tài khoản",
          variant: "destructive"
        });
        return;
      }

      if (!formData.startDate || !formData.endDate) {
        toast({
          title: "Lỗi",
          description: "Vui lòng nhập ngày bắt đầu và kết thúc",
          variant: "destructive"
        });
        return;
      }

      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        toast({
          title: "Lỗi",
          description: "Ngày kết thúc phải sau ngày bắt đầu",
          variant: "destructive"
        });
        return;
      }

      // Tính hoa hồng theo LỢI NHUẬN nếu có mã ref
      const profit = Math.max(0, (formData.revenue || 0) - (formData.cost || 0));
      const commissionPct = formData.collaboratorRef ? calculateCollaboratorCommissionPct(profit) : 0;
      const commission = Math.round(profit * commissionPct);

      await addAccount({
        ...formData,
        // lưu thêm nếu có ref
        // @ts-ignore: backend map
        collaboratorCommissionPct: commissionPct,
        // @ts-ignore
        collaboratorCommission: commission,
      } as any);
      
      toast({
        title: "Thành công",
        description: "Đã thêm tài khoản mới"
      });

      navigate("/admin/accounts");
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm tài khoản",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (section: keyof CreateAccountData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  return (
    <>
      <Helmet>
        <title>Thêm tài khoản – Admin</title>
      </Helmet>
      
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/accounts")}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Thêm tài khoản mới</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin liên hệ */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Tên khách hàng *</Label>
                  <Input
                    id="name"
                    value={formData.contactInfo.name}
                    onChange={(e) => updateFormData('contactInfo', 'name', e.target.value)}
                    placeholder="Nhập tên khách hàng"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact" className="text-sm">Liên lạc</Label>
                  <Input
                    id="contact"
                    value={formData.contactInfo.contact}
                    onChange={(e) => updateFormData('contactInfo', 'contact', e.target.value)}
                    placeholder="Zalo/SĐT/Facebook/Telegram..."
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cộng tác viên (Affiliate) */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Cộng tác viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="collabRef" className="text-sm">Mã mời CTV</Label>
                  <Input
                    id="collabRef"
                    value={formData.collaboratorRef}
                    onChange={(e) => setFormData(prev => ({ ...prev, collaboratorRef: e.target.value }))}
                    placeholder="Nhập ref nếu có"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {formData.collaboratorRef ? (
                      <>
                        <div>
                          Hoa hồng dự kiến: {(() => { const p = Math.max(0, (formData.revenue || 0) - (formData.cost || 0)); return Math.round(p * calculateCollaboratorCommissionPct(p)).toLocaleString('vi-VN'); })()} đ
                        </div>
                        <div>
                          Tỷ lệ: {(() => { const p = Math.max(0, (formData.revenue || 0) - (formData.cost || 0)); return (calculateCollaboratorCommissionPct(p) * 100).toFixed(0); })()}%
                        </div>
                      </>
                    ) : (
                      <div>Nhập mã mời để tính hoa hồng</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin tài khoản */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Thông tin tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="accountType" className="text-sm">Loại tài khoản *</Label>
                  <Input
                    id="accountType"
                    value={formData.accountType}
                    onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
                    placeholder="ChatGPT Plus, YouTube Premium, ..."
                    className="mt-1"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:col-span-2">
                  <div>
                    <Label htmlFor="startDate" className="text-sm">Ngày bắt đầu *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-sm">Ngày kết thúc *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cost" className="text-sm">Chi phí (VNĐ)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData(prev => ({ ...prev, cost: Number(e.target.value) }))}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="revenue" className="text-sm">Tổng thu (VNĐ)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, revenue: Number(e.target.value) }))}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-sm">Trạng thái</Label>
                  <select
                    id="status"
                    className="h-10 border rounded-md px-2 w-full mt-1 text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'expired' }))}
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="expired">Đã hết hạn</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tài khoản khách hàng */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Tài khoản khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerEmail" className="text-sm">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerAccount.email}
                    onChange={(e) => updateFormData('customerAccount', 'email', e.target.value)}
                    placeholder="customer@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPassword" className="text-sm">Mật khẩu</Label>
                  <Input
                    id="customerPassword"
                    type="password"
                    value={formData.customerAccount.password}
                    onChange={(e) => updateFormData('customerAccount', 'password', e.target.value)}
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="customerTwoFA" className="text-sm">Mã 2FA</Label>
                  <Input
                    id="customerTwoFA"
                    value={formData.customerAccount.twofa}
                    onChange={(e) => updateFormData('customerAccount', 'twofa', e.target.value)}
                    placeholder="123456"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tài khoản cửa hàng */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Tài khoản cửa hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shopEmail" className="text-sm">Email</Label>
                  <Input
                    id="shopEmail"
                    type="email"
                    value={formData.shopAccount.email}
                    onChange={(e) => updateFormData('shopAccount', 'email', e.target.value)}
                    placeholder="shop@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="shopPassword" className="text-sm">Mật khẩu</Label>
                  <Input
                    id="shopPassword"
                    type="password"
                    value={formData.shopAccount.password}
                    onChange={(e) => updateFormData('shopAccount', 'password', e.target.value)}
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="shopTwoFA" className="text-sm">Mã 2FA</Label>
                  <Input
                    id="shopTwoFA"
                    value={formData.shopAccount.twofa}
                    onChange={(e) => updateFormData('shopAccount', 'twofa', e.target.value)}
                    placeholder="123456"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin/accounts")}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto order-1 sm:order-2">
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Đang lưu..." : "Lưu tài khoản"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAccount;

