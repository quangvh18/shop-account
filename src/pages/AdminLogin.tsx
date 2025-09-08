import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
	const navigate = useNavigate();
	const location = useLocation() as any;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signInWithPassword } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Vui lòng nhập email và mật khẩu.");
			return;
		}
		const { error } = await signInWithPassword(email, password);
		if (error) {
			setError(error);
			return;
		}
		// Điều hướng theo vai trò
		const { data: userData } = await supabase.auth.getUser();
		const adminEmailsRaw = (import.meta as any).env?.VITE_ADMIN_EMAILS as string | undefined;
		const adminEmails = adminEmailsRaw ? adminEmailsRaw.split(",").map((e: string) => e.trim().toLowerCase()) : [];
		const userEmail = (userData.user?.email || "").toLowerCase();
		const isAdmin = adminEmails.length > 0 && adminEmails.includes(userEmail);
		const from: string | undefined = location.state?.from;
		if (isAdmin) {
			// Chỉ cho phép quay lại các route trong /admin
			const target = from && from.startsWith("/admin") ? from : "/admin";
			navigate(target, { replace: true });
			return;
		}
		// CTV: không quay lại /admin để tránh vòng lặp
		const target = from && from.startsWith("/collaborator") ? from : "/collaborator";
		navigate(target, { replace: true });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
			<div className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm">
				<div className="mb-6 text-center">
					<div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">AM</div>
					<h1 className="text-lg font-semibold">Đăng nhập quản trị</h1>
					<p className="text-sm text-muted-foreground">Chỉ dành cho quản trị viên</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">Email</label>
						<input
							type="email"
							className="w-full h-10 border rounded-md px-3 input-focus"
							placeholder="Nhập email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoFocus
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Mật khẩu</label>
						<input
							type="password"
							className="w-full h-10 border rounded-md px-3 input-focus"
							placeholder="Nhập mật khẩu"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error ? <div className="text-sm text-red-600">{error}</div> : null}
					<Button type="submit" className="w-full">Đăng nhập</Button>
				</form>
				<div className="mt-4 text-center">
					<Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Quay về trang chủ</Link>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;

