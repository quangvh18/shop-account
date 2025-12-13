import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import hero1 from "@/assets/hero-capcut.webp";
import hero2 from "@/assets/hero-youtube.webp";
import hero3 from "@/assets/hero-netflix.webp";
import { Link } from "react-router-dom";
import { Gamepad2, GraduationCap, Brain, Video, Music, ChevronRight, Zap, TrendingUp, Shield, Clock } from "lucide-react";
import designBg from "@/assets/thiet-ke.webp";
import aiBg from "@/assets/ai.webp";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const slides = [
  { img: hero1, alt: "CapCut Pro", title: "CapCut Pro", desc: "Edit video chuyên nghiệp" },
  { img: hero2, alt: "YouTube Premium", title: "YouTube Premium", desc: "Xem video không quảng cáo" },
  { img: hero3, alt: "Netflix Premium", title: "Netflix Premium", desc: "Phim hay không giới hạn" },
];

const categories = [
  { label: "AI & ChatGPT", icon: Brain, to: "/search?category=AI", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50" },
  { label: "Giải trí", icon: Gamepad2, to: "/search?category=Gi%E1%BA%A3i%20tr%C3%AD", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
  { label: "Âm nhạc", icon: Music, to: "/search?category=%C3%82m%20nh%E1%BA%A1c", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50" },
  { label: "Học tập", icon: GraduationCap, to: "/search?category=H%E1%BB%8Dc%20t%E1%BA%ADp", color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-50" },
  { label: "Video Editor", icon: Video, to: "/search?category=Video%20Editor", color: "from-red-500 to-pink-500", bgColor: "bg-red-50" },
];

const features = [
  { icon: Zap, text: "Giao hàng tự động", color: "text-yellow-500" },
  { icon: Shield, text: "Bảo hành uy tín", color: "text-green-500" },
  { icon: Clock, text: "Hỗ trợ 24/7", color: "text-blue-500" },
  { icon: TrendingUp, text: "Giá tốt nhất", color: "text-purple-500" },
];

const HeroSection = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="mt-4 space-y-6">
      {/* Main Hero Grid */}
      <div className="grid grid-cols-12 gap-4 lg:gap-6 items-stretch md:h-[360px]">
        {/* Left categories - hidden on mobile */}
        <aside className="hidden md:block md:col-span-3 h-full animate-fade-in">
          <nav className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-3 h-full flex flex-col shadow-lg shadow-black/5">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">📦</span>
              </div>
              <h2 className="font-bold text-xs gradient-text">DANH MỤC</h2>
            </div>
            <ul className="space-y-0.5 flex-1">
              {categories.map(({ label, icon: Icon, to, bgColor }, index) => (
                <li key={label} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in opacity-0" >
                  <Link
                    to={to}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className={`w-7 h-7 rounded-lg ${bgColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium text-xs flex-1">{label}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Stats */}
            <div className="mt-2 pt-2 border-t">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <div className="text-sm font-bold gradient-text">500+</div>
                  <div className="text-[10px] text-muted-foreground">Sản phẩm</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                  <div className="text-sm font-bold text-green-600">5000+</div>
                  <div className="text-[10px] text-muted-foreground">Đã bán</div>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Center carousel */}
        <div className="col-span-12 md:col-span-6 h-[200px] md:h-full animate-fade-in stagger-1">
          <h2 className="sr-only">Khuyến mại đặc biệt</h2>
          <div className="h-full w-full relative group rounded-2xl overflow-hidden shadow-xl shadow-black/10">
            <Carousel
              className="w-full h-full"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{ loop: true }}
            >
              <CarouselContent className="-ml-0 h-full">
                {slides.map((s, i) => (
                  <CarouselItem key={i} className="pl-0 relative">
                    <img
                      src={s.img}
                      alt={s.alt}
                      loading="eager"
                      className="w-full h-[200px] md:h-[360px] object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <div className="flex items-center gap-2 mb-1 md:mb-2">
                        <span className="badge-hot">HOT</span>
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">{s.title}</h3>
                      <p className="text-white/80 text-xs md:text-sm">{s.desc}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white border-0 shadow-lg" />
              <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white border-0 shadow-lg" />
            </Carousel>

            {/* Carousel indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-colors cursor-pointer" />
              ))}
            </div>
          </div>
        </div>

        {/* Right banners - hidden on mobile */}
        <aside className="hidden md:grid md:col-span-3 gap-4 h-full animate-fade-in stagger-2">
          <h2 className="sr-only">Sản phẩm khuyến mại</h2>
          <Link
            to="/search?category=B%E1%BA%A3o%20m%E1%BA%ADt"
            className="relative rounded-2xl overflow-hidden group shadow-lg shadow-black/5 border border-border/50"
          >
            <img src={designBg} alt="VPN" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg drop-shadow-lg">Thiết kế & Design</h3>
              <p className="text-white/70 text-xs">Canva Pro, Figma...</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            to="/search?category=AI"
            className="relative rounded-2xl overflow-hidden group shadow-lg shadow-black/5 border border-border/50"
          >
            <img src={aiBg} alt="AI" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="badge-hot mb-2">HOT</span>
              <h3 className="text-white font-bold text-lg drop-shadow-lg">AI Tools</h3>
              <p className="text-white/70 text-xs">ChatGPT, Claude, Gemini...</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </aside>
      </div>

      {/* Features Strip */}
      <div className="animate-fade-in stagger-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, text, color }, index) => (
            <div
              key={text}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <span className="font-medium text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
