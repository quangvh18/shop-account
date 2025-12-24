import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, Product } from "@/data/products";
import { getAccountTypeLogo } from "@/data/accountLogos";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, SlidersHorizontal, Package, Grid3X3, LayoutGrid, X, Sparkles } from "lucide-react";

const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[];
const types = Array.from(new Set(products.map(p => p.accountType).filter(Boolean))) as NonNullable<Product["accountType"]>[];

const Search = () => {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [category, setCategory] = useState<string>(sp.get("category") ?? "all");
  const [type, setType] = useState<string>(sp.get("type") ?? "all");
  const [min, setMin] = useState<number>(Number(sp.get("min") ?? "0"));
  const [max, setMax] = useState<number>(Number(sp.get("max") ?? "10000000"));
  const [sort, setSort] = useState<string>(sp.get("sort") ?? "default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (!q || p.name.toLowerCase().includes(q.toLowerCase())) &&
      (category === "all" || p.category === category) &&
      (type === "all" || p.accountType === type) &&
      (p.price >= min) && (p.price <= max)
    );
    switch (sort) {
      case "price-asc":
        list = list.slice().sort((a, b) => a.price - b.price); break;
      case "price-desc":
        list = list.slice().sort((a, b) => b.price - a.price); break;
      case "sold":
        list = list.slice().sort((a, b) => ((b.originalPrice ?? b.price) - b.price) - ((a.originalPrice ?? a.price) - a.price)); break;
    }
    return list;
  }, [q, category, type, min, max, sort]);

  const apply = () => {
    const params: Record<string, string> = {};
    if (q) params.q = q;
    if (category) params.category = category;
    if (type) params.type = type;
    if (min) params.min = String(min);
    if (max && max !== 10000000) params.max = String(max);
    if (sort !== "default") params.sort = sort;
    setSp(params, { replace: true });
  };

  const clearFilters = () => {
    setQ("");
    setCategory("all");
    setType("all");
    setMin(0);
    setMax(10000000);
    setSort("default");
    setSp({}, { replace: true });
  };

  const hasActiveFilters = q || category !== "all" || type !== "all" || min > 0 || max < 10000000 || sort !== "default";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Helmet>
        <title>Tìm kiếm sản phẩm – Shop Premium</title>
        <meta name="description" content="Tìm kiếm sản phẩm theo danh mục, loại tài khoản, mức giá và sắp xếp." />
        <link rel="canonical" href="/search" />
      </Helmet>

      <Header />

      <main className="flex-1 container mx-auto px-4 mt-6 pb-8 animate-fade-in">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Khám phá sản phẩm</h1>
              <p className="text-muted-foreground text-sm">Tìm kiếm tài khoản số & phần mềm bản quyền</p>
            </div>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-between rounded-xl border-2"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Bộ lọc tìm kiếm
            </span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </Button>
        </div>

        <section className="grid gap-6 md:grid-cols-12">
          {/* Filters Sidebar */}
          <aside className={`md:col-span-3 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <Card className="sticky top-24 border-border/50 shadow-lg shadow-black/5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Bộ lọc
                </h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-white/80 hover:text-white hover:bg-white/10 h-8"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Xóa
                  </Button>
                )}
              </div>
              <CardContent className="p-4 space-y-5">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tìm kiếm</label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Nhập tên sản phẩm..."
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="pl-10 rounded-xl border-2 h-11"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Danh mục</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="rounded-xl border-2 h-11">
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🏷️ Tất cả danh mục</SelectItem>
                      {categories.map(c => (
                        <SelectItem key={c} value={c}>
                          {c === "AI" && "🤖"}
                          {c === "Giải trí" && "🎮"}
                          {c === "Âm nhạc" && "🎵"}
                          {c === "Học tập" && "📚"}
                          {c === "Video Editor" && "🎬"}
                          {c === "Office" && "💼"}
                          {c === "Design" && "🎨"}
                          {c === "Lập trình" && "💻"}
                          {c === "Bảo mật" && "🔒"}
                          {c === "Productivity" && "📊"}
                          {" "}{c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Account Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loại tài khoản</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="rounded-xl border-2 h-11">
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🏷️ Tất cả loại</SelectItem>
                      {types.map(t => {
                        const logo = getAccountTypeLogo(t);
                        const Icon = logo?.icon;
                        return (
                          <SelectItem key={t} value={t}>
                            <span className="flex items-center gap-2">
                              {Icon && <Icon className="w-4 h-4" style={{ color: logo?.color }} />}
                              {t}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Khoảng giá (VNĐ)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Từ</span>
                      <Input
                        type="number"
                        min={0}
                        value={min}
                        onChange={(e) => setMin(Math.max(0, Number(e.target.value) || 0))}
                        className="rounded-xl border-2 h-10"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Đến</span>
                      <Input
                        type="number"
                        min={0}
                        value={max}
                        onChange={(e) => setMax(Math.max(0, Number(e.target.value) || 0))}
                        className="rounded-xl border-2 h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sắp xếp</label>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="rounded-xl border-2 h-11">
                      <SelectValue placeholder="Mặc định" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">⭐ Mặc định</SelectItem>
                      <SelectItem value="price-asc">💰 Giá thấp → cao</SelectItem>
                      <SelectItem value="price-desc">💎 Giá cao → thấp</SelectItem>
                      <SelectItem value="sold">🔥 Bán chạy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full h-12 btn-hero font-semibold" onClick={apply}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Áp dụng bộ lọc
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <section className="md:col-span-9">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{filtered.length}</span>
                <span className="text-muted-foreground">sản phẩm được tìm thấy</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg bg-muted">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, index) => (
                  <div
                    key={p.id}
                    className="animate-fade-in opacity-0"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-border/50 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-muted flex items-center justify-center">
                      <SearchIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Không tìm thấy sản phẩm</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Thử thay đổi từ khóa hoặc bộ lọc để tìm được sản phẩm phù hợp
                      </p>
                    </div>
                    <Button variant="outline" onClick={clearFilters} className="mt-4">
                      Xóa bộ lọc
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
