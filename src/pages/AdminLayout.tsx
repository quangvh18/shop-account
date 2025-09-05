import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users2, BarChart3, Settings } from "lucide-react";

const AdminLayout = () => {
	const { pathname } = useLocation();
	const isActive = (to: string) => pathname === to;

	const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
		<Link
			to={to}
			className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
				isActive(to) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
			}`}
		>
			<Icon className="h-4 w-4" />
			{label}
		</Link>
	);

	return (
		<div className="min-h-screen grid grid-cols-12 font-admin">
			{/* Sidebar */}
			<aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r bg-card/60 p-4">
				<div className="flex items-center gap-2 mb-4">
					<div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">AM</div>
					<div>
						<div className="text-sm font-semibold leading-tight">Account Manager</div>
						<div className="text-xs text-muted-foreground">Quản lý bán tài khoản</div>
					</div>
				</div>
				<nav className="space-y-1">
					<NavItem to="/admin" icon={LayoutDashboard} label="Tổng quan" />
					<NavItem to="/admin/accounts" icon={Users2} label="Quản lý tài khoản" />
					<div className="opacity-60 cursor-not-allowed">
						<NavItem to="/admin/stats" icon={BarChart3} label="Thống kê" />
					</div>
					<div className="opacity-60 cursor-not-allowed">
						<NavItem to="/admin/settings" icon={Settings} label="Cài đặt" />
					</div>
				</nav>
				<div className="mt-6">
					<Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Quay về trang chủ</Link>
				</div>
			</aside>

			{/* Content */}
			<main className="col-span-12 md:col-span-9 lg:col-span-10 p-5">
				<Outlet />
			</main>
		</div>
	);
};

export default AdminLayout; 