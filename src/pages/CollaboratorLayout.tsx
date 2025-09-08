import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const CollaboratorLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const isActive = (to: string) => pathname === to;
  return (
    <div className="min-h-screen grid grid-cols-12 font-admin">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r bg-card/60 p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">CTV</div>
          <div>
            <div className="text-sm font-semibold leading-tight">Cộng tác viên</div>
            <div className="text-xs text-muted-foreground">Tạo mã mời</div>
          </div>
        </div>
        <nav className="space-y-1">
          <Link to="/collaborator" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive('/collaborator') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Bảng điều khiển</Link>
        </nav>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Quay về trang chủ</Link>
          <button
            onClick={async ()=>{ await signOut(); navigate('/admin/login', { replace: true }); }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >Đăng xuất</button>
        </div>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default CollaboratorLayout;

