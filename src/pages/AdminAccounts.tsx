import React, { useState } from "react";

const Badge = ({ tone, children }: { tone: "neutral" | "success" | "warning" | "danger"; children: React.ReactNode }) => {
	const toneClass = {
		neutral: "bg-muted text-foreground/80",
		success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
		warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
		danger: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
	}[tone];
	return <span className={`px-2 py-0.5 rounded text-xs font-medium ${toneClass}`}>{children}</span>;
};

const AdminAccounts: React.FC = () => {
	const [pageSize, setPageSize] = useState(20);
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Quản lý tài khoản</h1>
					<p className="text-sm text-muted-foreground">Quản lý và theo dõi các tài khoản đã bán</p>
				</div>
				<button className="h-9 px-3 rounded-md bg-primary text-primary-foreground">+ Thêm tài khoản</button>
			</div>

			<div className="rounded-xl border bg-white">
				<div className="p-4 border-b font-semibold">Bộ lọc và tìm kiếm</div>
				<div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-3">
					<input className="md:col-span-6 input-focus h-10 border rounded-md px-3" placeholder="Tìm theo liên hệ hoặc tài khoản hàng..." />
					<select className="md:col-span-3 h-10 border rounded-md px-2">
						<option value="">Loại tài khoản</option>
					</select>
					<select className="md:col-span-2 h-10 border rounded-md px-2">
						<option value="">Trạng thái</option>
						<option value="active">Đang hoạt động</option>
						<option value="expiring">Sắp hết hạn</option>
						<option value="expired">Đã hết hạn</option>
					</select>
					<button className="md:col-span-1 h-10 px-4 rounded-md bg-primary text-primary-foreground">Tìm</button>
				</div>
			</div>

			<div className="rounded-xl border overflow-hidden bg-white">
				<div className="flex items-center justify-between p-3 border-b bg-muted/20">
					<div className="text-sm text-muted-foreground">Hiển thị 10 trong tổng số 10 tài khoản</div>
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
								<th className="py-2 px-3">ID</th>
								<th className="px-3">Liên hệ</th>
								<th className="px-3">Loại tài khoản</th>
								<th className="px-3">Tài khoản hàng</th>
								<th className="px-3">Trạng thái</th>
								<th className="px-3">Giá</th>
								<th className="px-3">Hết hạn</th>
								<th className="px-3">Ngày tạo</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b/60">
								<td className="py-2 px-3">#1</td>
								<td className="px-3">nguyenvana@gmail.com</td>
								<td className="px-3"><Badge tone="neutral">ChatGPT Plus</Badge></td>
								<td className="px-3">premium_chatgpt_001</td>
								<td className="px-3"><Badge tone="success">Đang hoạt động</Badge></td>
								<td className="px-3">200.000 VNĐ</td>
								<td className="px-3">15/12/2024</td>
								<td className="px-3">15/1/2024</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex items-center justify-between p-3 border-t bg-muted/20">
					<div className="text-xs text-muted-foreground">Trang 1 / 1</div>
					<div className="flex items-center justify-end gap-2">
						<button className="px-3 py-1.5 border rounded-md bg-background hover:bg-muted">Trước</button>
						<button className="px-3 py-1.5 border rounded-md bg-background hover:bg-muted">Sau</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminAccounts; 