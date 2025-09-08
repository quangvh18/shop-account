import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
	user: any | null;
	sessionLoading: boolean;
	signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>
	signOut: () => Promise<void>;
	isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any | null>(null);
	const [sessionLoading, setSessionLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		const init = async () => {
			const { data } = await supabase.auth.getUser();
			if (!mounted) return;
			setUser(data.user ?? null);
			setSessionLoading(false);
		};
		init();
		const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
			setUser(session?.user ?? null);
			// Sync pending name/phone from localStorage after login
			try {
				if (session?.user) {
					const meta = session.user.user_metadata || {};
					const pendingName = localStorage.getItem('pendingName');
					const pendingPhone = localStorage.getItem('pendingPhone');
					if ((!meta.name || !String(meta.name).trim()) && pendingName) {
						await supabase.auth.updateUser({ data: { name: pendingName } });
						localStorage.removeItem('pendingName');
					}
					if ((!meta.phone || !String(meta.phone).trim()) && pendingPhone) {
						await supabase.auth.updateUser({ data: { phone: pendingPhone } });
						localStorage.removeItem('pendingPhone');
					}
				}
			} catch {}
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);

	const normalizeAuthErrorVi = (raw?: string): string => {
		const msg = (raw || "").toLowerCase();
		if (msg.includes("email not confirmed") || msg.includes("email not confirmed")) {
			return "Email chưa được xác minh. Vui lòng kiểm tra hộp thư và xác nhận.";
		}
		if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
			return "Email hoặc mật khẩu không đúng.";
		}
		if (msg.includes("user not found") || msg.includes("no user found")) {
			return "Không tìm thấy tài khoản.";
		}
		return "Không thể đăng nhập. Vui lòng thử lại sau.";
	};

	const signInWithPassword = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) return { error: normalizeAuthErrorVi(error.message) };
		return {};
	};

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	const adminEmailsRaw = (import.meta as any).env?.VITE_ADMIN_EMAILS as string | undefined;
	const adminEmails = useMemo(() => (adminEmailsRaw ? adminEmailsRaw.split(",").map(e => e.trim().toLowerCase()) : []), [adminEmailsRaw]);
	// Default deny: only allow when list exists AND contains user email
	const isAdmin = !!(user && adminEmails.length > 0 && adminEmails.includes((user.email || "").toLowerCase()));

	const value: AuthContextType = { user, sessionLoading, signInWithPassword, signOut, isAdmin };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};

