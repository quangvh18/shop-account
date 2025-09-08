import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { useAccounts } from "@/context/AccountContext";
import { Account, UpdateAccountData } from "@/types/account";
import { toast } from "@/hooks/use-toast";

const EditAccount: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { getAccount, updateAccount } = useAccounts();
	const [loading, setLoading] = useState(false);
	const [account, setAccount] = useState<Account | null>(null);

	useEffect(() => {
		if (!id) return;
		const found = getAccount(Number(id));
		if (!found) return;
		setAccount(found);
	}, [id, getAccount]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!account) return;
		setLoading(true);

		try {
			if (!account.contactInfo.name.trim()) {
				toast({ title: "Lỗi", description: "Vui lòng nhập tên khách hàng", variant: "destructive" });
				return;
			}
			if (!account.accountType.trim()) {
				toast({ title: "Lỗi", description: "Vui lòng chọn loại tài khoản", variant: "destructive" });
				return;
			}
			if (!account.startDate || !account.endDate) {
				toast({ title: "Lỗi", description: "Vui lòng nhập ngày bắt đầu và kết thúc", variant: "destructive" });
				return;
			}
			if (new Date(account.startDate) >= new Date(account.endDate)) {
				toast({ title: "Lỗi", description: "Ngày kết thúc phải sau ngày bắt đầu", variant: "destructive" });
				return;
			}

			const payload: UpdateAccountData = {
				id: account.id,
				contactInfo: account.contactInfo,
				accountType: account.accountType,
				startDate: account.startDate,
				endDate: account.endDate,
				cost: account.cost,
				revenue: account.revenue,
				customerAccount: account.customerAccount,
				shopAccount: account.shopAccount,
				status: account.status,
			};
			await updateAccount(payload);
			toast({ title: "Thành công", description: "Đã cập nhật tài khoản" });
			navigate("/admin/accounts");
		} catch (error) {
			toast({ title: "Lỗi", description: "Có lỗi xảy ra khi cập nhật tài khoản", variant: "destructive" });
		} finally {
			setLoading(false);
		}
	};

	if (!account) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button variant="ghost" onClick={() => navigate("/admin/accounts")} className="flex items-center gap-2">
						<ArrowLeft className="h-4 w-4" />
						Quay lại
					</Button>
					<h1 className="text-2xl font-bold tracking-tight">Không tìm thấy tài khoản</h1>
				</div>
			</div>
		);
	}

	return (
		<>
			<Helmet>
				<title>Chỉnh sửa tài khoản – Admin</title>
			</Helmet>

			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button 
						variant="ghost" 
						onClick={() => navigate("/admin/accounts")}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Quay lại
					</Button>
					<h1 className="text-2xl font-bold tracking-tight">Chỉnh sửa tài khoản</h1>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Thông tin liên hệ</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Tên khách hàng *</Label>
									<Input
										id="name"
										value={account.contactInfo.name}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, contactInfo: { ...prev.contactInfo, name: e.target.value }}) : prev)}
										placeholder="Nhập tên khách hàng"
										required
									/>
								</div>
								<div>
									<Label htmlFor="contact">Liên lạc</Label>
									<Input
										id="contact"
										value={account.contactInfo.contact}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, contactInfo: { ...prev.contactInfo, contact: e.target.value }}) : prev)}
										placeholder="Zalo/SĐT/Facebook/Telegram..."
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Thông tin tài khoản</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="accountType">Loại tài khoản *</Label>
									<Input
										id="accountType"
										value={account.accountType}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, accountType: e.target.value }) : prev)}
										placeholder="ChatGPT Plus, YouTube Premium, ..."
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4 md:col-span-2">
									<div>
										<Label htmlFor="startDate">Ngày bắt đầu *</Label>
										<Input
											id="startDate"
											type="date"
											value={account.startDate}
											onChange={(e) => setAccount(prev => prev ? ({ ...prev, startDate: e.target.value }) : prev)}
											required
										/>
									</div>
									<div>
										<Label htmlFor="endDate">Ngày kết thúc *</Label>
										<Input
											id="endDate"
											type="date"
											value={account.endDate}
											onChange={(e) => setAccount(prev => prev ? ({ ...prev, endDate: e.target.value }) : prev)}
											required
										/>
									</div>
								</div>
								<div>
									<Label htmlFor="cost">Chi phí (VNĐ)</Label>
									<Input
										id="cost"
										type="number"
										value={account.cost}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, cost: Number(e.target.value) }) : prev)}
										placeholder="0"
									/>
								</div>
								<div>
									<Label htmlFor="revenue">Tổng thu (VNĐ)</Label>
									<Input
										id="revenue"
										type="number"
										value={account.revenue}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, revenue: Number(e.target.value) }) : prev)}
										placeholder="0"
									/>
								</div>
								<div>
									<Label htmlFor="status">Trạng thái</Label>
						<select
							id="status"
							className="h-10 border rounded-md px-2 w-full"
							value={account.status}
							onChange={(e) => setAccount(prev => prev ? ({ ...prev, status: e.target.value as 'active' | 'expired' }) : prev)}
						>
							<option value="active">Đang hoạt động</option>
							<option value="expired">Đã hết hạn</option>
						</select>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Tài khoản khách hàng</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="customerEmail">Email</Label>
									<Input
										id="customerEmail"
										type="email"
										value={account.customerAccount.email}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, customerAccount: { ...prev.customerAccount, email: e.target.value } }) : prev)}
										placeholder="customer@example.com"
									/>
								</div>
								<div>
									<Label htmlFor="customerPassword">Mật khẩu</Label>
									<Input
										id="customerPassword"
										type="password"
										value={account.customerAccount.password}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, customerAccount: { ...prev.customerAccount, password: e.target.value } }) : prev)}
										placeholder="••••••••"
									/>
								</div>
								<div>
									<Label htmlFor="customerTwoFA">Mã 2FA</Label>
									<Input
										id="customerTwoFA"
										value={account.customerAccount.twofa}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, customerAccount: { ...prev.customerAccount, twofa: e.target.value } }) : prev)}
										placeholder="123456"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Tài khoản cửa hàng</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="shopEmail">Email</Label>
									<Input
										id="shopEmail"
										type="email"
										value={account.shopAccount.email}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, shopAccount: { ...prev.shopAccount, email: e.target.value } }) : prev)}
										placeholder="shop@example.com"
									/>
								</div>
								<div>
									<Label htmlFor="shopPassword">Mật khẩu</Label>
									<Input
										id="shopPassword"
										type="password"
										value={account.shopAccount.password}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, shopAccount: { ...prev.shopAccount, password: e.target.value } }) : prev)}
										placeholder="••••••••"
									/>
								</div>
								<div>
									<Label htmlFor="shopTwoFA">Mã 2FA</Label>
									<Input
										id="shopTwoFA"
										value={account.shopAccount.twofa}
										onChange={(e) => setAccount(prev => prev ? ({ ...prev, shopAccount: { ...prev.shopAccount, twofa: e.target.value } }) : prev)}
										placeholder="123456"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-4">
						<Button 
							type="button" 
							variant="outline" 
							onClick={() => navigate("/admin/accounts")}
						>
							Hủy
						</Button>
						<Button type="submit" disabled={loading}>
							<Save className="h-4 w-4 mr-2" />
							{loading ? "Đang lưu..." : "Lưu thay đổi"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditAccount;
