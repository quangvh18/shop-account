import React, { useEffect } from "react";
import { useAccounts } from "@/context/AccountContext";
import dailyNotificationService from "@/lib/dailyNotification";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
	const { accounts, getExpiringAccounts } = useAccounts();

	// Start daily notification service
	useEffect(() => {
		const getExpiringAccountsCallback = () => {
			return getExpiringAccounts(2).map(account => ({
				id: account.id,
				contactInfo: account.contactInfo,
				accountType: account.accountType,
				endDate: account.endDate,
				daysLeft: Math.ceil((new Date(account.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
			}));
		};

		// Start daily check
		dailyNotificationService.startDailyCheck(getExpiringAccountsCallback);

		// Cleanup on unmount
		return () => {
			dailyNotificationService.stopDailyCheck();
		};
	}, [accounts]); // Changed dependency to accounts instead of getExpiringAccounts

	// Calculate stats
	const totalAccounts = accounts.length;
	const activeAccounts = accounts.filter(acc => acc.status === 'active').length;
	const expiredAccounts = accounts.filter(acc => acc.status === 'expired').length;
	const totalRevenue = accounts.reduce((sum, acc) => sum + acc.revenue, 0);
	const totalProfit = accounts.reduce((sum, acc) => sum + acc.profit, 0);

	// Time-based stats
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const weekStart = new Date(today);
	weekStart.setDate(today.getDate() - today.getDay());
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

	const todayAccounts = accounts.filter(acc => {
		const createdDate = new Date(acc.createdAt);
		return createdDate >= today;
	});

	const weekAccounts = accounts.filter(acc => {
		const createdDate = new Date(acc.createdAt);
		return createdDate >= weekStart;
	});

	const monthAccounts = accounts.filter(acc => {
		const createdDate = new Date(acc.createdAt);
		return createdDate >= monthStart;
	});

	const todayStats = {
		orders: todayAccounts.length,
		revenue: todayAccounts.reduce((sum, acc) => sum + acc.revenue, 0),
		profit: todayAccounts.reduce((sum, acc) => sum + acc.profit, 0)
	};

	const weekStats = {
		orders: weekAccounts.length,
		revenue: weekAccounts.reduce((sum, acc) => sum + acc.revenue, 0),
		profit: weekAccounts.reduce((sum, acc) => sum + acc.profit, 0)
	};

	const monthStats = {
		orders: monthAccounts.length,
		revenue: monthAccounts.reduce((sum, acc) => sum + acc.revenue, 0),
		profit: monthAccounts.reduce((sum, acc) => sum + acc.profit, 0)
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("vi-VN", { 
			style: "currency", 
			currency: "VND" 
		}).format(amount);
	};

	// Prepare chart data for last 7 days
	const getChartData = () => {
		const data = [];
		for (let i = 6; i >= 0; i--) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			const dayEnd = new Date(dayStart);
			dayEnd.setDate(dayEnd.getDate() + 1);

			const dayAccounts = accounts.filter(acc => {
				const createdDate = new Date(acc.createdAt);
				return createdDate >= dayStart && createdDate < dayEnd;
			});

			data.push({
				date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
				orders: dayAccounts.length,
				revenue: dayAccounts.reduce((sum, acc) => sum + acc.revenue, 0),
				profit: dayAccounts.reduce((sum, acc) => sum + acc.profit, 0)
			});
		}
		return data;
	};

	const chartData = getChartData();

	// Aggregate collaborator commission by ref
	const collabMap: Record<string, { total: number; count: number }> = {};
	accounts.forEach(acc => {
		if (acc.collaboratorRef && acc.collaboratorCommission) {
			const key = acc.collaboratorRef;
			if (!collabMap[key]) collabMap[key] = { total: 0, count: 0 };
			collabMap[key].total += acc.collaboratorCommission || 0;
			collabMap[key].count += 1;
		}
	});
	const collabList = Object.entries(collabMap)
		.map(([ref, v]) => ({ ref, total: v.total, count: v.count }))
		.sort((a, b) => b.total - a.total)
		.slice(0, 8);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
				<StatCard title="Tổng số tài khoản" value={totalAccounts.toString()} />
				<StatCard title="Đang hoạt động" value={activeAccounts.toString()} tone="success" />
				<StatCard title="Đã hết hạn" value={expiredAccounts.toString()} tone="danger" />
				<StatCard title="Tổng doanh thu" value={formatCurrency(totalRevenue)} />
				<StatCard title="Tổng lợi nhuận" value={formatCurrency(totalProfit)} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Box title="Thống kê 7 ngày qua">
					<div className="h-[280px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip 
									formatter={(value, name) => [
										name === 'revenue' || name === 'profit' ? formatCurrency(Number(value)) : value,
										name === 'orders' ? 'Đơn hàng' : name === 'revenue' ? 'Doanh thu' : 'Lợi nhuận'
									]}
								/>
								<Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
								<Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
								<Line type="monotone" dataKey="profit" stroke="#ffc658" strokeWidth={2} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</Box>
				<div className="space-y-4">
					<Box title="Hôm nay">
						<div className="space-y-2">
							<div className="text-xl font-semibold">{todayStats.orders} tài khoản</div>
							<div className="text-sm text-muted-foreground">Doanh thu: {formatCurrency(todayStats.revenue)}</div>
							<div className="text-sm text-muted-foreground">Lợi nhuận: {formatCurrency(todayStats.profit)}</div>
						</div>
					</Box>
					<Box title="Tuần này">
						<div className="space-y-2">
							<div className="text-xl font-semibold">{weekStats.orders} tài khoản</div>
							<div className="text-sm text-muted-foreground">Doanh thu: {formatCurrency(weekStats.revenue)}</div>
							<div className="text-sm text-muted-foreground">Lợi nhuận: {formatCurrency(weekStats.profit)}</div>
						</div>
					</Box>
					<Box title="Tháng này">
						<div className="space-y-2">
							<div className="text-xl font-semibold">{monthStats.orders} tài khoản</div>
							<div className="text-sm text-muted-foreground">Doanh thu: {formatCurrency(monthStats.revenue)}</div>
							<div className="text-sm text-muted-foreground">Lợi nhuận: {formatCurrency(monthStats.profit)}</div>
						</div>
					</Box>
					<Box title="Top CTV theo hoa hồng (8 gần nhất)">
						<div className="space-y-2 text-sm">
							{collabList.length === 0 ? (
								<div className="text-muted-foreground">Chưa có dữ liệu</div>
							) : (
								collabList.map(item => (
									<div key={item.ref} className="flex items-center justify-between">
										<div>Mã ref: <span className="font-medium">{item.ref}</span></div>
										<div className="font-semibold">{new Intl.NumberFormat('vi-VN').format(item.total)} đ</div>
									</div>
								))
							)}
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard; 