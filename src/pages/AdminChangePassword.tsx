import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const AdminChangePassword = () => {
	const { user } = useAuth();
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [msg, setMsg] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMsg("");
		setErr("");
		if (!password || password.length < 8) {
			setErr("Mật khẩu phải tối thiểu 8 ký tự.");
			return;
		}
		if (password !== confirm) {
			setErr("Mật khẩu nhập lại không khớp.");
			return;
		}
		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password });
		setLoading(false);
		if (error) {
			setErr(error.message);
			return;
		}
		setMsg("Đổi mật khẩu thành công.");
		setPassword("");
		setConfirm("");
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold tracking-tight">Đổi mật khẩu</h1>
			<div className="rounded-xl border bg-white p-4 max-w-md">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="text-sm text-muted-foreground">Email: {user?.email}</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Mật khẩu mới</label>
						<input className="w-full h-10 border rounded-md px-3 input-focus" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Tối thiểu 8 ký tự" />
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Nhập lại mật khẩu</label>
						<input className="w-full h-10 border rounded-md px-3 input-focus" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Nhập lại" />
					</div>
					{err ? <div className="text-sm text-red-600">{err}</div> : null}
					{msg ? <div className="text-sm text-emerald-600">{msg}</div> : null}
					<Button type="submit" disabled={loading}>{loading ? "Đang lưu..." : "Lưu"}</Button>
				</form>
			</div>
		</div>
	);
};

export default AdminChangePassword;

