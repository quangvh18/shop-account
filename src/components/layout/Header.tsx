import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Package, Menu, Flame, PercentCircle, BriefcaseBusiness, Search, Sparkles, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [q, setQ] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const displayName = (user as any)?.user_metadata?.name || (user?.email?.split("@")[0] || "Tài khoản");

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
      ? "glass shadow-lg shadow-black/5"
      : "bg-transparent"
      }`}>
      {/* Top banner - hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto flex items-center justify-between py-2.5 px-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <Flame className="h-4 w-4 animate-pulse" />
              <span className="font-medium">Sản phẩm mua nhiều</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <PercentCircle className="h-4 w-4" />
              <span className="font-medium">Khuyến mãi HOT</span>
            </div>
            <div
              className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate('/recruitment')}
            >
              <BriefcaseBusiness className="h-4 w-4" />
              <span className="font-medium">Tuyển dụng</span>
            </div>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
            onClick={() => navigate('/collaborator/register')}
          >
            <Crown className="h-4 w-4" />
            <span className="font-medium">Kiếm tiền cùng Shop Premium</span>
            <Sparkles className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto flex items-center gap-4 py-3 lg:py-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative h-11 w-11 sm:h-12 sm:w-12">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">A</span>
            </div>
          </div>
          <div className="flex flex-col leading-tight hidden sm:block">
            <span className="text-xl font-bold gradient-text">
              Shop Premium
            </span>
          </div>
        </Link>

        {/* Search bar - hidden on mobile */}
        <div className="flex-1 hidden md:block max-w-2xl mx-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Tìm kiếm sản phẩm"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="h-11 pl-11 pr-4 rounded-xl border-border/50 bg-muted/50 focus:bg-background transition-all duration-300"
              />
              <Button
                variant="default"
                onClick={handleSearch}
                className="absolute right-1 h-9 px-5 rounded-lg btn-hero"
              >
                Tìm
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {/* Desktop navigation */}
          <Button variant="ghost" className="hidden lg:inline-flex gap-2 font-medium hover:bg-primary/5 hover:text-primary" asChild>
            <Link to="/search">
              <Package className="h-4 w-4" />
              Sản phẩm
            </Link>
          </Button>

          {/* Cart button */}
          <Button variant="default" asChild className="h-10 px-3 sm:px-4 btn-hero group">
            <Link to="/cart" className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-primary text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {count}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-medium">Giỏ hàng</span>
            </Link>
          </Button>

          {/* Auth (desktop) */}
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/login')}
                className="rounded-xl border-2 hover:border-primary hover:text-primary transition-colors"
              >
                Đăng nhập
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="font-medium hover:bg-primary/5"
              >
                {displayName}
              </Button>
              <Button
                variant="outline"
                onClick={async () => { await signOut(); navigate('/', { replace: true }); }}
                className="rounded-xl"
              >
                Đăng xuất
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden h-10 w-10 rounded-xl border-2 hover:border-primary hover:bg-primary/5">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
              {/* Mobile menu header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">Shop Premium</div>
                    <div className="text-sm text-white/80">Tài khoản số chính hãng</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Mobile search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    className="pl-10 h-12 rounded-xl"
                    autoFocus={false}
                  />
                </div>

                {/* Mobile navigation */}
                <div className="space-y-2">
                  <Link
                    to="/search"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-medium">Tất cả sản phẩm</span>
                  </Link>

                  {!user ? (
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); navigate('/admin/login'); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors w-full text-left"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-xs text-white font-bold">?</span>
                      </div>
                      <span className="font-medium">Đăng nhập</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => { setIsMobileMenuOpen(false); navigate('/admin'); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors w-full text-left"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{displayName.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="font-medium">{displayName}</span>
                      </button>
                      <button
                        onClick={async () => { setIsMobileMenuOpen(false); await signOut(); navigate('/', { replace: true }); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/5 text-destructive transition-colors w-full text-left"
                      >
                        <span className="font-medium">Đăng xuất</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile top banner info */}
                <div className="pt-4 border-t space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Khuyến mãi</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Flame className="h-4 w-4 text-orange-500" />
                      </div>
                      <span>Sản phẩm mua nhiều</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <PercentCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Khuyến mãi HOT</span>
                    </div>
                    <Link
                      to="/collaborator/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Crown className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="text-primary font-medium">Kiếm tiền cùng chúng tôi</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
