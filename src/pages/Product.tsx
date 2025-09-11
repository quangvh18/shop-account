import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, currency } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
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

  return (
    <>
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
  <main className="container mx-auto px-4 mt-6 min-h-[60vh] grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={product.image} alt={product.name} className="w-full rounded-xl" />
        </div>
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Sản phẩm</div>
            <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-primary">{currency(product.price)}</div>
            {product.originalPrice && (
              <div className="text-muted-foreground line-through">{currency(product.originalPrice)}</div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Nhập thông tin tài khoản (bắt buộc)</h3>
            {/* <Input placeholder="Tên khách hàng" value={name} onChange={e=>setName(e.target.value)} /> */}
            <Input placeholder="Email đăng nhập" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <Input placeholder="Mã 2FA (nếu có)" value={twofa} onChange={e=>setTwofa(e.target.value)} />
            {error && <div className="text-sm text-red-500 pt-1">{error}</div>}
            <div className="text-sm text-muted-foreground">Hướng dẫn lấy mã sẽ hiển thị trong quá trình thanh toán.</div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="hero" onClick={handleAdd}>Mua ngay</Button>
            <Button variant="soft" onClick={handleAddOnly}>Thêm vào giỏ</Button>
          </div>
        </div>
      </main>

      {/* Product Details Section */}
      {product.description && (
        <section className="container mx-auto px-4 mt-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Mô tả chi tiết</h2>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
            
            {/* Additional Product Info */}
            <div className="grid gap-6 mt-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin sản phẩm</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Danh mục:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại tài khoản:</span>
                    <span className="font-medium">{product.accountType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <Badge variant={product.status === "in_stock" ? "default" : "destructive"}>
                      {product.status === "in_stock" ? "Còn hàng" : "Hết hàng"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cam kết dịch vụ</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Tài khoản chính chủ 100%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Hỗ trợ kỹ thuật 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Giao hàng tự động sau thanh toán</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Bảo hành trong thời gian sử dụng</span>
                  </li>
                </ul>
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
    </>
  );
};

export default Product;
