import React from "react";

const StatCard = ({ title, value, tone = "default", helper }: { title: string; value: string; tone?: "default" | "success" | "warning" | "danger"; helper?: string }) => {
	const toneClasses = {
		default: "border bg-white",
		success: "border bg-emerald-50",
		warning: "border bg-amber-50",
		danger: "border bg-rose-50",
	};
	return (
		<div className={`p-5 rounded-xl ${toneClasses[tone]}`}> 
			<div className="text-sm text-muted-foreground">{title}</div>
			<div className="text-3xl font-bold mt-1 tracking-tight">{value}</div>
			{helper ? <div className="text-xs text-muted-foreground mt-1">{helper}</div> : null}
		</div>
	);
};

const Box = ({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) => (
	<div className="rounded-xl border bg-white">
		<div className="flex items-center justify-between p-4 border-b">
			<div className="font-semibold">{title}</div>
			{right}
		</div>
		<div className="p-4">{children}</div>
	</div>
);

const AdminDashboard: React.FC = () => {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
				<StatCard title="Tổng số tài khoản" value="150" />
				<StatCard title="Đang hoạt động" value="98" tone="success" />
				<StatCard title="Sắp hết hạn" value="12" helper="≤ 7 ngày" tone="warning" />
				<StatCard title="Đã hết hạn" value="40" tone="danger" />
				<StatCard title="Tổng doanh thu" value="25.8M VNĐ" />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Box title="Thống kê theo thời gian">
					<div className="h-[280px] rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground text-sm">Biểu đồ (sẽ thêm)</div>
				</Box>
				<div className="space-y-4">
					<Box title="Hôm nay">
						<div className="text-xl font-semibold">3 tài khoản</div>
						<div className="text-sm text-muted-foreground">650K VNĐ doanh thu</div>
					</Box>
					<Box title="Tuần này">
						<div className="text-xl font-semibold">18 tài khoản</div>
						<div className="text-sm text-muted-foreground">3.2M VNĐ doanh thu</div>
					</Box>
					<Box title="Tháng này">
						<div className="text-xl font-semibold">45 tài khoản</div>
						<div className="text-sm text-muted-foreground">8.8M VNĐ doanh thu</div>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard; 