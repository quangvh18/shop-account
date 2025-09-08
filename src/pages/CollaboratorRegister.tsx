import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const CollaboratorRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }
    if (!/^\d{9,11}$/.test(phone.trim())) {
      setError("Số điện thoại không hợp lệ (9-11 số).");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu tối thiểu 8 ký tự.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    setLoading(true);
    const emailRedirectTo = `${window.location.origin}/collaborator`;
    const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo } });
    if (error) {
      setLoading(false);
      setError("Không thể đăng ký. Vui lòng thử lại sau.");
      return;
    }
    // Lưu phone vào user metadata (nếu đã có session)
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase.auth.updateUser({ data: { phone } });
    }
    setLoading(false);
    setMessage("Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản, sau đó đăng nhập.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Đăng ký tài khoản CTV</title>
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-md">
        <Card className="shadow-soft">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Đăng ký tài khoản CTV</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input className="w-full h-10 border rounded-md px-3 input-focus" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@domain.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <input className="w-full h-10 border rounded-md px-3 input-focus" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="0987..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <input className="w-full h-10 border rounded-md px-3 input-focus" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Tối thiểu 8 ký tự" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nhập lại mật khẩu</label>
                <input className="w-full h-10 border rounded-md px-3 input-focus" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Nhập lại" />
              </div>
              {error ? <div className="text-sm text-red-600">{error}</div> : null}
              {message ? <div className="text-sm text-emerald-600">{message}</div> : null}
              <Button type="submit" disabled={loading}>{loading ? "Đang đăng ký..." : "Đăng ký"}</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CollaboratorRegister;

