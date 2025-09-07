import chatgptImg from "@/assets/chatgpt-update.png";
import chatgptShareImg from "@/assets/chatgpt-share.png";
import claudeImg from "@/assets/claude-1m.png";
import youtubeImg from "@/assets/youtube-1y.png";
import youtube6Img from "@/assets/youtube-6m.png";
import duolingoImg from "@/assets/douligo-1y.png";
import spotify3Img from "@/assets/spotify-3m.png";
import spotifyImg from "@/assets/spotify-1y.png";
import spotify6Img from "@/assets/spotify-6m.png";
import capcut1mImg from "@/assets/capcut-1m.png";
import capcut1yImg from "@/assets/capcut-1y.png";
import netflix1mImg from "@/assets/netflix-1m.png";
import grok1mImg from "@/assets/grok-1m.png";
import googleOne1yImg from "@/assets/google-one-2tb-1y.png";
import perplexityPro12mImg from "@/assets/perplexity-pro-12m.png";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // VND
  originalPrice?: number;
  tags: string[];
  image: string;
  status?: "in_stock" | "out_of_stock";
  description?: string;
  category?: string;
  accountType?:
    | "ChatGPT Plus"
    | "YouTube Premium"
    | "Duolingo Super"
    | "Spotify Premium"
    | "Claude Pro"
    | "CapCut Pro"
    | "Gemini Pro"
    | "Netflix Premium"
    | "SuperGrok"
    | "Google One"
    | "Perplexity Pro";
};

export const products: Product[] = [
  {
    id: "chatgpt-plus",
    slug: "chatgpt-plus-1-thang-tai-khoan-chinh-chu",
    name: "ChatGPT Plus 1 tháng - TK chính chủ",
    price: 390000,
    originalPrice: 500000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgptImg,
    status: "in_stock",
    description:
      "Nâng cấp tài khoản ChatGPT Plus chính chủ trong 1 tháng. Hỗ trợ hướng dẫn chi tiết và bảo hành trong thời gian sử dụng.",
    category: "AI",
    accountType: "ChatGPT Plus",
  },
  {
    id: "chatgpt-plus-share",
    slug: "chatgpt-plus-1-thang-tai-khoan-share",
    name: "ChatGPT Plus 1 tháng - TK share",
    price: 120000,
    originalPrice: 500000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgptShareImg,
    status: "in_stock",
    description:
      "Nâng cấp tài khoản ChatGPT Plus chính chủ trong 1 tháng. Hỗ trợ hướng dẫn chi tiết và bảo hành trong thời gian sử dụng.",
    category: "AI",
    accountType: "ChatGPT Plus",
  },
  {
    id: "youtube-premium-1y",
    slug: "youtube-premium-1-nam",
    name: "YouTube Premium 1 năm + Music",
    price: 540000,
    originalPrice: 1290000,
    tags: ["youtube", "music", "video"],
    image: youtubeImg,
    status: "in_stock",
    description:
      "Gói YouTube Premium 1 năm – xem video không quảng cáo, nghe nhạc nền, tải ngoại tuyến.",
    category: "Giải trí",
    accountType: "YouTube Premium",
  },
  {
    id: "youtube-premium-6m",
    slug: "youtube-premium-6-thang",
    name: "YouTube Premium 6 tháng + Music",
    price: 300000,
    originalPrice: 645000,
    tags: ["youtube", "music", "video"],
    image: youtube6Img,
    status: "in_stock",
    description:
      "Gói YouTube Premium 6 tháng – xem video không quảng cáo, nghe nhạc nền, tải ngoại tuyến.",
    category: "Giải trí",
    accountType: "YouTube Premium",
  },
  {
    id: "duolingo-super",
    slug: "duolingo-super-1-nam",
    name: "Duolingo Super 1 năm - TK chính chủ",
    price: 260000,
    originalPrice: 479000,
    tags: ["education"],
    image: duolingoImg,
    status: "in_stock",
    description:
      "Tài khoản Duolingo Super chính chủ trong 1 năm. Truy cập không giới hạn các khóa học, không quảng cáo, và các tính năng premium.",
    category: "Học tập",
    accountType: "Duolingo Super",
  },
  {
    id: "spotify-premium-3-thang",
    slug: "spotify-premium-3-thang",
    name: "Spotify Premium 3 tháng - TK chính chủ",
    price: 140000,
    originalPrice: 177000,
    tags: ["music", "spotify"],
    image: spotify3Img,
    status: "in_stock",
    description:
      "Tài khoản Spotify Premium chính chủ trong 3 tháng. Nghe nhạc không quảng cáo, tải nhạc ngoại tuyến, chất lượng cao.",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "spotify-premium-6-thang",
    slug: "spotify-premium-6-thang",
    name: "Spotify Premium 6 tháng - TK chính chủ",
    price: 260000,
    originalPrice: 354000,
    tags: ["music", "spotify"],
    image: spotify6Img,
    status: "in_stock",
    description:
      "Tài khoản Spotify Premium chính chủ trong 6 tháng. Nghe nhạc không quảng cáo, tải nhạc ngoại tuyến, chất lượng cao.",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "spotify-premium",
    slug: "spotify-premium-1-nam",
    name: "Spotify Premium 1 năm - TK chính chủ",
    price: 420000,
    originalPrice: 708000,
    tags: ["music", "spotify"],
    image: spotifyImg,
    status: "in_stock",
    description:
      "Tài khoản Spotify Premium chính chủ trong 1 năm. Nghe nhạc không quảng cáo, tải nhạc ngoại tuyến, chất lượng cao.",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "claude-1m",
    slug: "claude-1m",
    name: "Claude Pro 20$ 1 tháng - TK chính chủ",
    price: 390000,
    originalPrice: 500000,
    tags: ["ai", "claude"],
    image: claudeImg,
    status: "in_stock",
    description:
      "Tài khoản Claude Pro chính chủ với $20 credit trong 1 tháng. Truy cập Claude Sonnet 3.5, xử lý tài liệu, phân tích dữ liệu.",
    category: "AI",
    accountType: "Claude Pro",
  },
  {
    id: "capcut-1m",
    slug: "capcut-1m",
    name: "CapCut Pro 1 tháng - TK chính chủ",
    price: 140000,
    originalPrice: 290000,
    tags: ["video", "capcut"],
    image: capcut1mImg,
    status: "in_stock",
    description:
      "Tài khoản CapCut Pro chính chủ trong 1 tháng. Truy cập tất cả hiệu ứng premium, xuất video chất lượng cao, không watermark.",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "capcut-1y",
    slug: "capcut-1y",
    name: "CapCut Pro 1 năm - TK chính chủ",
    price: 750000,
    originalPrice: 1900000,
    tags: ["video", "capcut"],
    image: capcut1yImg,
    status: "in_stock",
    description:
      "Tài khoản CapCut Pro chính chủ trong 1 năm. Truy cập tất cả hiệu ứng premium, xuất video chất lượng cao, không watermark.",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "netflix-1m",
    slug: "netflix-1m",
    name: "Netflix 1 tháng - TK chính chủ",
    price: 79000,
    originalPrice: 114000,
    tags: ["movie", "netflix"],
    image: netflix1mImg,
    status: "in_stock",
    description:
      "Tài khoản Netflix Premium chính chủ trong 1 tháng. Xem phim không giới hạn, chất lượng 4K, nhiều thiết bị.",
    category: "Giải trí",
    accountType: "Netflix Premium",
  },
  {
    id: "grok-1m",
    slug: "grok-1m",
    name: "SuperGrok 1 tháng - TK chính chủ",
    price: 390000,
    originalPrice: 750000,
    tags: ["ai", "grok"],
    image: grok1mImg,
    status: "in_stock",
    description:
      "Tài khoản SuperGrok chính chủ trong 1 tháng. AI chatbot của X (Twitter) với khả năng truy cập thông tin real-time.",
    category: "AI",
    accountType: "SuperGrok",
  },
  {
    id: "google-one-2tb-1m",
    slug: "google-one-2tb-1-thang",
    name: "Google One 2TB 1 tháng + Gemini Pro",
    price: 100000,
    originalPrice: 500000,
    tags: ["ai", "gemini", "google one", "notebook lm", "veo 3"],
    image: googleOne1yImg,
    status: "in_stock",
    description:
      "Tài khoản Google One 2TB chính chủ trong 1 tháng. Bao gồm Gemini Pro, NotebookLM, Veo 3, và nhiều tính năng AI khác.",
    category: "AI",
    accountType: "Google One",
  },
  {
    id: "google-one-2tb-1y",
    slug: "google-one-2tb-1-nam",
    name: "Google One 2TB 1 năm + Gemini Pro",
    price: 900000,
    originalPrice: 6000000,
    tags: ["ai", "gemini", "google one", "notebook lm", "veo 3"],
    image: googleOne1yImg,
    status: "in_stock",
    description:
      "Tài khoản Google One 2TB chính chủ trong 1 năm. Bao gồm Gemini Pro, NotebookLM, Veo 3, và nhiều tính năng AI khác.",
    category: "AI",
    accountType: "Google One",
  },
  {
    id: "perplexity-pro-12m",
    slug: "perplexity-pro-12m",
    name: "Perplexity Pro 12 tháng - TK chính chủ",
    price: 380000,
    originalPrice: 6000000,
    tags: ["ai", "perplexity"],
    image: perplexityPro12mImg,
    status: "in_stock",
    description:
      "Tài khoản Perplexity Pro chính chủ trong 12 tháng. AI search engine với khả năng tìm kiếm và phân tích thông tin chính xác.",
    category: "AI",
    accountType: "Perplexity Pro",
  },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
