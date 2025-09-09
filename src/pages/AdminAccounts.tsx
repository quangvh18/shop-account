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
		<div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-xl sm:text-2xl font-bold tracking-tight">Quản lý tài khoản</h1>
					<p className="text-xs sm:text-sm text-muted-foreground">Quản lý và theo dõi các tài khoản đã bán</p>
				</div>
				<Button onClick={() => navigate("/admin/accounts/add")} className="w-full sm:w-auto">
					<Plus className="h-4 w-4 mr-2" />
					<span className="hidden sm:inline">Thêm tài khoản</span>
					<span className="sm:hidden">Thêm</span>
				</Button>
			</div>

			<div className="rounded-xl border bg-white">
				<div className="p-3 sm:p-4 border-b font-semibold text-sm sm:text-base">Bộ lọc và tìm kiếm</div>
				<div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					<input 
						className="sm:col-span-2 input-focus h-9 sm:h-10 border rounded-md px-3 text-sm" 
						placeholder="Tìm theo tên, email, loại tài khoản..." 
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<select 
						className="h-9 sm:h-10 border rounded-md px-2 text-sm"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value as Account['status'] | "")}
					>
						<option value="">Tất cả trạng thái</option>
						<option value="active">Đang hoạt động</option>
						<option value="expiring">Sắp hết hạn</option>
						<option value="expired">Đã hết hạn</option>
					</select>
					<Button 
						variant="outline" 
						onClick={() => {
							setSearchTerm("");
							setStatusFilter("");
						}}
						className="h-9 sm:h-10 text-xs sm:text-sm"
					>
						Xóa bộ lọc
					</Button>
				</div>
			</div>

			<div className="rounded-xl border overflow-hidden bg-white">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b bg-muted/20 gap-2">
					<div className="text-xs sm:text-sm text-muted-foreground">
						Hiển thị {startIndex + 1}-{Math.min(startIndex + pageSize, filteredAccounts.length)} trong {filteredAccounts.length} tài khoản (tổng {accounts.length})
					</div>
					<div className="flex items-center gap-2">
						<select
							value={pageSize}
							onChange={(e) => setPageSize(parseInt(e.target.value))}
							className="h-8 sm:h-9 border rounded-md px-2 bg-background text-xs sm:text-sm"
						>
							<option value={20}>20</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-xs sm:text-sm">
						<thead className="bg-muted/40">
							<tr className="border-b text-left">
								<th className="px-2 sm:px-3 py-2">Liên hệ</th>
								<th className="px-2 sm:px-3 py-2 hidden sm:table-cell">Loại tài khoản</th>
								<th className="px-2 sm:px-3 py-2 hidden lg:table-cell">Bắt đầu</th>
								<th className="px-2 sm:px-3 py-2 hidden lg:table-cell">Hết hạn</th>
								<th className="px-2 sm:px-3 py-2">Trạng thái</th>
								<th className="px-2 sm:px-3 py-2 hidden sm:table-cell">Chi phí</th>
								<th className="px-2 sm:px-3 py-2 hidden sm:table-cell">Doanh thu</th>
								<th className="px-2 sm:px-3 py-2">Lợi nhuận</th>
								<th className="px-2 sm:px-3 py-2">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredAccounts.length === 0 ? (
								<tr>
									<td colSpan={9} className="py-8 text-center text-muted-foreground">
										Không có tài khoản nào
									</td>
								</tr>
							) : (
								paginatedAccounts.map((account) => (
									<tr key={account.id} className="border-b/60">
										<td className="px-2 sm:px-3 py-2">
											<div>
												<div className="font-medium text-xs sm:text-sm truncate max-w-[120px]">{account.contactInfo.name}</div>
												{account.contactInfo.contact && (
													<div className="text-xs text-muted-foreground truncate max-w-[120px]">{account.contactInfo.contact}</div>
												)}
												{/* Mobile: Show additional info */}
												<div className="sm:hidden text-xs text-muted-foreground mt-1">
													<div>{account.accountType}</div>
													<div>{formatDate(account.startDate)} - {formatDate(account.endDate)}</div>
													<div>Chi phí: {formatCurrency(account.cost)}</div>
													<div>Doanh thu: {formatCurrency(account.revenue)}</div>
												</div>
											</div>
										</td>
										<td className="px-2 sm:px-3 py-2 hidden sm:table-cell">
											<Badge variant="secondary" className="text-xs">{account.accountType}</Badge>
										</td>
										<td className="px-2 sm:px-3 py-2 hidden lg:table-cell text-xs">{formatDate(account.startDate)}</td>
										<td className="px-2 sm:px-3 py-2 hidden lg:table-cell text-xs">{formatDate(account.endDate)}</td>
										<td className="px-2 sm:px-3 py-2">
											<StatusBadge status={account.status} />
										</td>
										<td className="px-2 sm:px-3 py-2 hidden sm:table-cell text-xs">{formatCurrency(account.cost)}</td>
										<td className="px-2 sm:px-3 py-2 hidden sm:table-cell text-xs">{formatCurrency(account.revenue)}</td>
										<td className="px-2 sm:px-3 py-2 text-xs font-semibold">{formatCurrency(account.profit)}</td>
										<td className="px-2 sm:px-3 py-2">
											<div className="flex gap-1 sm:gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => navigate(`/admin/accounts/edit/${account.id}`)}
													className="h-7 w-7 p-0"
												>
													<Edit className="h-3 w-3 sm:h-4 sm:w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDelete(account.id)}
													className="text-red-600 hover:text-red-700 h-7 w-7 p-0"
												>
													<Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
					<div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-t gap-2">
						<div className="text-xs sm:text-sm text-muted-foreground">
							Trang {currentPage} / {totalPages}
						</div>
						<div className="flex items-center gap-1 sm:gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
								className="text-xs px-2 py-1 h-7"
							>
								Trước
							</Button>
							{Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
								const page = i + 1;
								return (
									<Button
										key={page}
										variant={currentPage === page ? "default" : "outline"}
										size="sm"
										onClick={() => setCurrentPage(page)}
										className="text-xs px-2 py-1 h-7 w-7"
									>
										{page}
									</Button>
								);
							})}
							{totalPages > 3 && (
								<span className="text-xs text-muted-foreground px-1">...</span>
							)}
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
								disabled={currentPage === totalPages}
								className="text-xs px-2 py-1 h-7"
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