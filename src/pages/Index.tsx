import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/marketing/HeroSection";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Sparkles, TrendingUp, Users, Star, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/marketing/AnnouncementBar";

const stats = [
  { number: "5000+", label: "Khách hàng tin tưởng", icon: Users, gradient: "from-blue-500 to-cyan-500", bgGradient: "from-blue-500/20 to-cyan-500/20" },
  { number: "500+", label: "Sản phẩm đa dạng", icon: Sparkles, gradient: "from-purple-500 to-pink-500", bgGradient: "from-purple-500/20 to-pink-500/20" },
  { number: "99%", label: "Đánh giá 5 sao", icon: Star, gradient: "from-yellow-500 to-orange-500", bgGradient: "from-yellow-500/20 to-orange-500/20" },
  { number: "24/7", label: "Hỗ trợ trực tuyến", icon: TrendingUp, gradient: "from-green-500 to-emerald-500", bgGradient: "from-green-500/20 to-emerald-500/20" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Helmet>
        <title>Shop Premium – Mua tài khoản số, phần mềm bản quyền giá rẻ nhất Việt Nam</title>
        <meta name="description" content="Shop Premium - Cửa hàng tài khoản số uy tín #1 Việt Nam. Mua ChatGPT Plus, YouTube Premium, Spotify, Netflix, AI tools giá rẻ. Giao hàng tự động 24/7, bảo hành chính chủ." />
        <meta name="keywords" content="tài khoản số, phần mềm bản quyền, ChatGPT Plus, YouTube Premium, Spotify Premium, Netflix, AI tools, mua tài khoản giá rẻ, shop premium" />
        <meta name="author" content="Shop Premium" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${import.meta.env.VITE_PUBLIC_SITE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:title" content="Shop Premium – Mua tài khoản số, phần mềm bản quyền giá rẻ nhất Việt Nam" />
        <meta property="og:description" content="Cửa hàng tài khoản số uy tín #1 Việt Nam. Mua ChatGPT Plus, YouTube Premium, Spotify, Netflix, AI tools giá rẻ. Giao hàng tự động 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}/`} />
        <meta property="og:image" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}/org.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Shop Premium" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop Premium – Mua tài khoản số, phần mềm bản quyền giá rẻ nhất Việt Nam" />
        <meta name="twitter:description" content="Cửa hàng tài khoản số uy tín #1 Việt Nam. Mua ChatGPT Plus, YouTube Premium, Spotify, Netflix, AI tools giá rẻ." />
        <meta name="twitter:image" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}/org.jpg`} />

        {/* Additional SEO */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="alternate" hrefLang="vi" href={`${import.meta.env.VITE_PUBLIC_SITE_URL}/`} />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Shop Premium",
            "url": import.meta.env.VITE_PUBLIC_SITE_URL,
            "logo": `${import.meta.env.VITE_PUBLIC_SITE_URL}/org.jpg`,
            "description": "Cửa hàng tài khoản số uy tín #1 Việt Nam. Mua ChatGPT Plus, YouTube Premium, Spotify, Netflix, AI tools giá rẻ. Giao hàng tự động 24/7, bảo hành chính chủ.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "VN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+84-344-396-798",
              "contactType": "customer service",
              "availableLanguage": "Vietnamese"
            },
            "sameAs": [
              "https://zalo.me/g/fkawmh287"
            ],
            "foundingDate": "2024",
            "numberOfEmployees": "1-10",
            "industry": "E-commerce",
            "knowsAbout": [
              "Tài khoản số",
              "Phần mềm bản quyền",
              "AI tools",
              "Streaming services",
              "Digital products"
            ]
          })}
        </script>

        {/* Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Shop Premium",
            "url": import.meta.env.VITE_PUBLIC_SITE_URL,
            "description": "Cửa hàng tài khoản số uy tín #1 Việt Nam",
            "publisher": {
              "@type": "Organization",
              "name": "Shop Premium"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${import.meta.env.VITE_PUBLIC_SITE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <Header />

      <AnnouncementBar />

      <main className="flex-1 container mx-auto px-4">
        <h1 className="sr-only">Shop Premium - Cửa hàng tài khoản số uy tín #1 Việt Nam</h1>

        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <section className="my-10 lg:my-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {stats.map(({ number, label, icon: Icon, gradient, bgGradient }, index) => (
              <div
                key={label}
                className="relative overflow-hidden p-5 rounded-2xl bg-white border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in opacity-0"
                style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {/* Background gradient decoration */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity`} />

                {/* Animated ring */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-dashed border-primary/20 group-hover:rotate-180 transition-transform duration-700" />

                <div className="relative">
                  {/* Icon with gradient background */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Number with gradient */}
                  <div className={`text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {number}
                  </div>

                  {/* Label */}
                  <div className="text-xs lg:text-sm text-muted-foreground mt-1 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="pb-12">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Nổi bật</span>
              </div>
              <h2 className="text-responsive-xl font-bold">
                <span className="gradient-text">Sản phẩm</span> được yêu thích
              </h2>
              <p className="text-muted-foreground text-responsive max-w-xl">
                Khám phá bộ sưu tập tài khoản số, phần mềm bản quyền và AI tools được yêu thích nhất
              </p>
            </div>
            <Button variant="outline" className="btn-soft w-fit group" asChild>
              <Link to="/search" className="flex items-center gap-2">
                Xem tất cả
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, index) => (
              <div
                key={p.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Load more CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" className="btn-hero px-8" asChild>
              <Link to="/search" className="flex items-center gap-2">
                Khám phá thêm sản phẩm
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12 lg:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8 lg:p-12">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Bạn cần hỗ trợ?
                </h3>
                <p className="text-white/80 max-w-md">
                  Liên hệ ngay với chúng tôi qua Zalo để được tư vấn miễn phí và nhận ưu đãi đặc biệt!
                </p>
              </div>

              <a
                href="https://zalo.me/g/fkawmh287"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
              >
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Chat Zalo ngay
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
