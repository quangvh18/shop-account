import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, Heart, Shield, Zap, Clock, CreditCard, ChevronRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 sm:mt-20 lg:mt-24 relative">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      {/* Trust badges section */}
      <div className="border-t border-b bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "Bảo hành uy tín", desc: "100% chính hãng", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: Zap, title: "Giao hàng nhanh", desc: "Tự động 24/7", color: "text-yellow-500", bg: "bg-yellow-500/10" },
              { icon: Clock, title: "Hỗ trợ tận tâm", desc: "Phản hồi nhanh", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: CreditCard, title: "Thanh toán an toàn", desc: "Đa phương thức", color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="flex items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{title}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 group">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 group-hover:shadow-xl transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Shop Premium
                  </div>
                  <div className="text-xs text-slate-400">Tài khoản số chính hãng</div>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
                Chuyên cung cấp tài khoản số, phần mềm bản quyền với giá tốt nhất. Giao hàng tự động, uy tín, hỗ trợ khách hàng 24/7.
              </p>

              {/* Social/Contact */}
              <div className="flex items-center gap-3">
                <a
                  href="https://zalo.me/g/kqdtcp205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 transition-colors group"
                >
                  <MessageCircle className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:vuhuyquang2k@gmail.com"
                  className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors group"
                >
                  <Mail className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div className="pt-4 space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>0987.328.409</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>0344.396.798</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span>vuhiepktth@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span>vuhuyquang2k@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  Sản phẩm
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { label: "Tất cả sản phẩm", to: "/search" },
                    { label: "AI Tools", to: "/search?category=AI" },
                    { label: "Streaming", to: "/search?category=Giải%20trí" },
                    { label: "Âm nhạc", to: "/search?category=Âm%20nhạc" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                  Danh mục
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { label: "Video Editor", to: "/search?category=Video%20Editor" },
                    { label: "Học tập", to: "/search?category=Học%20tập" },
                    { label: "VPN & Bảo mật", to: "/search?category=Bảo%20mật" },
                    { label: "Office", to: "/search?category=Office" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-pink-500 to-orange-500" />
                  Pháp lý
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { label: "Điều khoản sử dụng", to: "/terms" },
                    { label: "Chính sách bảo mật", to: "/privacy" },
                    { label: "Chính sách đổi trả", to: "/terms" },
                    { label: "Tuyển dụng", to: "/recruitment" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500" />
                  Hỗ trợ
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { label: "Trung tâm hỗ trợ", to: "/contact" },
                    { label: "Hướng dẫn mua hàng", to: "/contact" },
                    { label: "Câu hỏi thường gặp", to: "/contact" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/collaborator/register"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all mt-2"
                >
                  Trở thành CTV
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                © {currentYear} Shop Premium. All rights reserved.
              </div>
              <div className="flex items-center gap-1">
                Được phát triển với
                <Heart className="h-4 w-4 text-red-400 fill-red-400 animate-pulse mx-1" />
                tại Việt Nam 🇻🇳
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
