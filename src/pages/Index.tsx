import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/marketing/HeroSection";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
              "https://zalo.me/0344396798"
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
      <main className="flex-1 container mx-auto px-4 animate-fade-in">
        <HeroSection />
        
        <section className="mt-8 sm:mt-12 lg:mt-16 pb-8">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-responsive-xl font-bold gradient-text">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground text-responsive">
                Khám phá bộ sưu tập tài khoản số, phần mềm bản quyền và AI tools được yêu thích nhất tại Shop Premium
              </p>
            </div>
            <Button variant="outline" className="btn-soft w-fit" asChild>
              <Link to="/search">
                Khám phá
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, index) => (
              <div 
                key={p.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
