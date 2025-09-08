import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "@/context/AccountContext";
import { Account } from "@/types/account";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";

const StatusBadge = ({ status }: { status: Account['status'] }) => {
	const toneClass = {
		active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
		expiring: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
		expired: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
	}[status];
	
	const label = {
		active: "Đang hoạt động",
		expiring: "Sắp hết hạn",
		expired: "Đã hết hạn",
	}[status];
	
	return <span className={`px-2 py-0.5 rounded text-xs font-medium ${toneClass}`}>{label}</span>;
};

const AdminAccounts: React.FC = () => {
	const navigate = useNavigate();
	const { accounts, deleteAccount } = useAccounts();
	const [pageSize, setPageSize] = useState(20);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<Account['status'] | "">("");

	const filteredAccounts = accounts.filter(account => {
		const matchesSearch = account.contactInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			account.contactInfo.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			account.accountType.toLowerCase().includes(searchTerm.toLowerCase());
		
		let matchesStatus = true;
		if (statusFilter === "expiring") {
			// Sắp hết hạn: đang hoạt động và <= 2 ngày nữa
			const now = new Date();
			const endDate = new Date(account.endDate);
			const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
			matchesStatus = account.status === "active" && diffDays <= 2 && diffDays > 0;
		} else if (statusFilter) {
			matchesStatus = account.status === statusFilter;
		}
		
		return matchesSearch && matchesStatus;
	});

	// Phân trang
	const totalPages = Math.ceil(filteredAccounts.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const paginatedAccounts = filteredAccounts.slice(startIndex, startIndex + pageSize);

	const handleDelete = (id: number) => {
		if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
			deleteAccount(id);
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("vi-VN", { 
			style: "currency", 
			currency: "VND" 
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("vi-VN");
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Quản lý tài khoản</h1>
					<p className="text-sm text-muted-foreground">Quản lý và theo dõi các tài khoản đã bán</p>
				</div>
				<Button onClick={() => navigate("/admin/accounts/add")}>
					<Plus className="h-4 w-4 mr-2" />
					Thêm tài khoản
				</Button>
			</div>

			<div className="rounded-xl border bg-white">
				<div className="p-4 border-b font-semibold">Bộ lọc và tìm kiếm</div>
				<div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3">
					<input 
						className="md:col-span-6 input-focus h-10 border rounded-md px-3" 
						placeholder="Tìm theo tên, email, loại tài khoản..." 
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<select 
						className="md:col-span-3 h-10 border rounded-md px-2"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value as Account['status'] | "")}
					>
						<option value="">Tất cả trạng thái</option>
						<option value="active">Đang hoạt động</option>
						<option value="expiring">Sắp hết hạn</option>
						<option value="expired">Đã hết hạn</option>
					</select>
					<div className="md:col-span-3 flex gap-2">
						<Button 
							variant="outline" 
							onClick={() => {
								setSearchTerm("");
								setStatusFilter("");
							}}
						>
							Xóa bộ lọc
						</Button>
					</div>
				</div>
			</div>

			<div className="rounded-xl border overflow-hidden bg-white">
				<div className="flex items-center justify-between p-3 border-b bg-muted/20">
					<div className="text-sm text-muted-foreground">
						Hiển thị {startIndex + 1}-{Math.min(startIndex + pageSize, filteredAccounts.length)} trong {filteredAccounts.length} tài khoản (tổng {accounts.length})
					</div>
					<div className="flex items-center gap-2">
						<select
							value={pageSize}
							onChange={(e) => setPageSize(parseInt(e.target.value))}
							className="h-9 border rounded-md px-2 bg-background"
						>
							<option value={20}>20</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-muted/40">
							<tr className="border-b text-left">
								<th className="px-3">Liên hệ</th>
								<th className="px-3">Loại tài khoản</th>
								<th className="px-3">Bắt đầu</th>
								<th className="px-3">Hết hạn</th>
								<th className="px-3">Trạng thái</th>
								<th className="px-3">Chi phí</th>
								<th className="px-3">Doanh thu</th>
								<th className="px-3">Lợi nhuận</th>
								<th className="px-3">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredAccounts.length === 0 ? (
								<tr>
									<td colSpan={8} className="py-8 text-center text-muted-foreground">
										Không có tài khoản nào
									</td>
								</tr>
							) : (
								paginatedAccounts.map((account) => (
									<tr key={account.id} className="border-b/60">
										<td className="px-3">
											<div>
												<div className="font-medium">{account.contactInfo.name}</div>
												{account.contactInfo.contact && (
													<div className="text-xs text-muted-foreground">{account.contactInfo.contact}</div>
												)}
											</div>
										</td>
										<td className="px-3">
											<Badge variant="secondary">{account.accountType}</Badge>
										</td>
										<td className="px-3">{formatDate(account.startDate)}</td>
										<td className="px-3">{formatDate(account.endDate)}</td>
										<td className="px-3">
											<StatusBadge status={account.status} />
										</td>
										<td className="px-3">{formatCurrency(account.cost)}</td>
										<td className="px-3">{formatCurrency(account.revenue)}</td>
										<td className="px-3">{formatCurrency(account.profit)}</td>
										<td className="px-3">
											<div className="flex gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => navigate(`/admin/accounts/edit/${account.id}`)}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDelete(account.id)}
													className="text-red-600 hover:text-red-700"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				
				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between p-4 border-t">
						<div className="text-sm text-muted-foreground">
							Trang {currentPage} / {totalPages}
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
							>
								Trước
							</Button>
							{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
								const page = i + 1;
								return (
									<Button
										key={page}
										variant={currentPage === page ? "default" : "outline"}
										size="sm"
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</Button>
								);
							})}
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
								disabled={currentPage === totalPages}
							>
								Sau
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminAccounts; 