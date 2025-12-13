import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, currency } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Sparkles, ShoppingCart, Zap, Shield, Clock, Star, ChevronRight, Package, CreditCard, MessageCircle, ArrowLeft } from "lucide-react";
import InternalLinks from "@/components/seo/InternalLinks";

const Product = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const navigate = useNavigate();
  const { add } = useCart();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twofa, setTwofa] = useState("");
  const [error, setError] = useState("");

  if (!product) return <div className="p-8">Không tìm thấy sản phẩm.</div>;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Generate consistent random rating based on product id
  const hashCode = (str: string) => str.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const seed = Math.abs(hashCode(product.id));
  const rating = 4.5 + (seed % 6) / 10; // 4.5 to 5.0
  const reviewCount = 50 + (seed % 150); // 50 to 200 reviews
  const soldCount = 100 + (seed % 400); // 100 to 500 sold
  const filledStars = Math.floor(rating);

  const validate = () => {
    if (!email.trim()) return "Vui lòng nhập email đăng nhập.";
    if (!password.trim()) return "Vui lòng nhập mật khẩu.";
    return "";
  };

  const handleAdd = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    // Store account credentials for order notification
    localStorage.setItem('accountEmail', email);
    localStorage.setItem('accountPassword', password);
    if (twofa) localStorage.setItem('accountTwoFA', twofa);
    add(product.id, 1, { email, password, twofa });
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{product.name} đã được thêm.</span>
        </div>
      )
    });
    navigate("/cart");
  };


  const handleAddOnly = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    localStorage.setItem('accountEmail', email);
    localStorage.setItem('accountPassword', password);
    if (twofa) localStorage.setItem('accountTwoFA', twofa);
    add(product.id, 1, { email, password, twofa });
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{product.name} đã được thêm.</span>
        </div>
      )
    });
  };

  const features = [
    { icon: Zap, text: "Giao hàng tự động", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Shield, text: "Bảo hành chính chủ", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: Clock, text: "Hỗ trợ 24/7", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: CreditCard, text: "Thanh toán an toàn", color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Helmet>
        <title>{product.name} - Mua giá rẻ tại Shop Premium | Tài khoản chính chủ</title>
        <meta name="description" content={`Mua ${product.name} giá tốt nhất tại Shop Premium. Tài khoản chính chủ 100%, giao hàng tự động 24/7, bảo hành đầy đủ. Giá chỉ từ ${currency(product.price)}.`} />
        <meta name="keywords" content={`${product.name}, ${product.tags.join(', ')}, tài khoản ${product.category?.toLowerCase()}, mua ${product.name} giá rẻ, shop premium`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${import.meta.env.VITE_PUBLIC_SITE_URL}/product/${product.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - Mua giá rẻ tại Shop Premium`} />
        <meta property="og:description" content={`Mua ${product.name} giá tốt nhất tại Shop Premium. Tài khoản chính chủ 100%, giao hàng tự động 24/7.`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}/product/${product.slug}`} />
        <meta property="og:image" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}${product.image}`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:site_name" content="Shop Premium" />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="VND" />
        <meta property="product:availability" content={product.status === "in_stock" ? "in stock" : "out of stock"} />
        <meta property="product:category" content={product.category || ""} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - Mua giá rẻ tại Shop Premium`} />
        <meta name="twitter:description" content={`Mua ${product.name} giá tốt nhất tại Shop Premium. Tài khoản chính chủ 100%, giao hàng tự động 24/7.`} />
        <meta name="twitter:image" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}${product.image}`} />

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description || `Mua ${product.name} giá tốt nhất tại Shop Premium`,
            "image": `${import.meta.env.VITE_PUBLIC_SITE_URL}${product.image}`,
            "brand": {
              "@type": "Brand",
              "name": "Shop Premium"
            },
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "VND",
              "availability": product.status === "in_stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "Shop Premium"
              },
              "url": `${import.meta.env.VITE_PUBLIC_SITE_URL}/product/${product.slug}`
            },
            "category": product.category,
            "sku": product.id,
            "url": `${import.meta.env.VITE_PUBLIC_SITE_URL}/product/${product.slug}`
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": `${import.meta.env.VITE_PUBLIC_SITE_URL}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": product.category || "Sản phẩm",
                "item": `${import.meta.env.VITE_PUBLIC_SITE_URL}/search?category=${product.category?.toLowerCase()}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": `${import.meta.env.VITE_PUBLIC_SITE_URL}/product/${product.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1 container mx-auto px-4 mt-6 animate-fade-in">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
            Sản phẩm
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Product Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-white shadow-xl shadow-black/5 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-video object-contain bg-gradient-to-br from-gray-50 to-gray-100 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="badge-sale">-{discount}%</span>
                )}
                {product.status === "in_stock" && (
                  <span className="badge-new">Còn hàng</span>
                )}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {features.map(({ icon: Icon, text, color, bg }) => (
                <div key={text} className={`flex items-center gap-2 p-3 rounded-xl ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center gap-4 flex-wrap">
              {product.category && (
                <Link
                  to={`/search?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-semibold uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {product.category}
                </Link>
              )}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-1">({rating.toFixed(1)}) · {soldCount}+ đã bán</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold leading-tight">{product.name}</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
              ))}
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-primary/10">
              <div className="flex items-end gap-3 flex-wrap">
                <div className="text-3xl lg:text-4xl font-bold gradient-text">
                  {currency(product.price)}
                </div>
                {product.originalPrice && (
                  <>
                    <div className="text-lg text-muted-foreground line-through decoration-red-400/50">
                      {currency(product.originalPrice)}
                    </div>
                    <span className="badge-hot">-{discount}%</span>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  ✨ Tiết kiệm {currency(product.originalPrice - product.price)}
                </div>
              )}
            </div>

            {/* Account Form */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg shadow-black/5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Package className="h-5 w-5 text-primary" />
                Nhập thông tin tài khoản của bạn
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    placeholder="Email đăng nhập"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-12 pl-4 rounded-xl border-2 focus:border-primary transition-colors"
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-12 pl-4 rounded-xl border-2 focus:border-primary transition-colors"
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Mã 2FA (nếu có)"
                    value={twofa}
                    onChange={e => setTwofa(e.target.value)}
                    className="h-12 pl-4 rounded-xl border-2 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                  ⚠️ {error}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                💡 Hướng dẫn chi tiết sẽ hiển thị trong quá trình thanh toán
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAdd}
                className="flex-1 h-14 btn-hero text-base font-semibold"
              >
                <Zap className="h-5 w-5 mr-2" />
                Mua ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleAddOnly}
                className="flex-1 h-14 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-base font-semibold"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ
              </Button>
            </div>

            {/* Contact CTA */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Cần hỗ trợ?</p>
                <p className="text-xs text-muted-foreground">Liên hệ Zalo để được tư vấn miễn phí</p>
              </div>
              <a
                href="https://zalo.me/0344396798"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Chat ngay
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Product Details Section */}
      {product.description && (
        <section className="container mx-auto px-4 mt-12 mb-12 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Mô tả chi tiết</h2>
            </div>
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg shadow-black/5">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Internal Links Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <InternalLinks currentProductId={product.id} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
