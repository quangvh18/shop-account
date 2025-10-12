import chatgptImg from "@/assets/chatgpt-update.webp";
import chatgpt3mImg from "@/assets/chatgpt-3m.webp";
import chatgpt6mImg from "@/assets/chatgpt-6m.webp";
import chatgptShareImg from "@/assets/chatgpt-share.webp";
import claudeImg from "@/assets/claude-1m.webp";
import youtubeImg from "@/assets/youtube-1y.webp";
import youtube6Img from "@/assets/youtube-6m.webp";
import duolingoImg from "@/assets/douligo-1y.webp";
import spotify3Img from "@/assets/spotify-3m.webp";
import spotifyImg from "@/assets/spotify-1y.webp";
import spotify6Img from "@/assets/spotify-6m.webp";
import capcut1mImg from "@/assets/capcut-1m.webp";
import capcut1yImg from "@/assets/capcut-1y.webp";
import netflix1mImg from "@/assets/netflix-1m.webp";
import grok1mImg from "@/assets/grok-1m.webp";
import googleOne1yImg from "@/assets/google-one-2tb-1y.webp";
import perplexityPro12mImg from "@/assets/perplexity-pro-12m.webp";
import microsoft1yImg from "@/assets/microsoft-1y.webp";
import canvaImg from "@/assets/canva-pro-1y.webp";
import googleAiUltraImg from "@/assets/google-ai-ultra.webp"

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
    | "Perplexity Pro"
    | "Microsoft"
    | "Canva Pro";
};

export const products: Product[] = [
  {
    id: "chatgpt-plus-3m",
    slug: "chatgpt-plus-3-thang-tai-khoan-chinh-chu",
    name: "ChatGPT Plus 3 tháng - Đăng ký lần đầu",
    price: 920000,
    originalPrice: 1500000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgpt3mImg,
    status: "in_stock",
    description:
      "ChatGPT Plus 3 tháng chính chủ. Truy cập GPT-4o, GPT-4.1 và GPT-5 (bao gồm GPT-5-thinking). Hỗ trợ Advanced Data Analysis, upload file, GPT Store, tạo hình ảnh DALL·E.",
    category: "AI",
    accountType: "ChatGPT Plus",
  },
  {
    id: "chatgpt-plus-6m",
    slug: "chatgpt-plus-6-thang-tai-khoan-chinh-chu",
    name: "ChatGPT Plus 6 tháng - Đăng ký lần đầu",
    price: 1750000,
    originalPrice: 3000000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgpt6mImg,
    status: "in_stock",
    description:
      "ChatGPT Plus 6 tháng chính chủ. Truy cập GPT-4o, GPT-4.1 và GPT-5 (có GPT-5-thinking). Bao gồm Advanced Data Analysis, tạo hình ảnh DALL·E, GPT Store và tính năng API cao cấp.",
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
      "ChatGPT Plus 1 tháng (share). Truy cập GPT-4o, GPT-4.1 và GPT-5. Tốc độ nhanh, ưu tiên giờ cao điểm. Một số tính năng nâng cao có thể bị giới hạn.",
    category: "AI",
    accountType: "ChatGPT Plus",
  },
  {
    id: "youtube-premium-1y",
    slug: "youtube-premium-1-nam",
    name: "YouTube Premium 1 năm + Music",
    price: 580000,
    originalPrice: 1290000,
    tags: ["youtube", "music", "video"],
    image: youtubeImg,
    status: "in_stock",
    description:
      "YouTube Premium 12 tháng: video không quảng cáo, phát nền, tải offline. Bao gồm YouTube Music: nghe nhạc không quảng cáo, phát nền, tải nhạc chất lượng cao.",
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
      "YouTube Premium 6 tháng: xem video không quảng cáo, phát trong nền, tải offline. Bao gồm YouTube Music: nghe nhạc nền, không quảng cáo, playlist không giới hạn.",
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
      "Duolingo Super 12 tháng: học ngôn ngữ không giới hạn, không quảng cáo, unlimited hearts, checkpoint nâng cao, luyện tập cá nhân hoá.",
    category: "Học tập",
    accountType: "Duolingo Super",
  },
  {
    id: "spotify-premium-3-thang",
    slug: "spotify-premium-3-thang",
    name: "Spotify Premium 3 tháng - TK chính chủ",
    price: 140000,
    originalPrice: 195000,
    tags: ["music", "spotify"],
    image: spotify3Img,
    status: "in_stock",
    description:
      "Spotify Premium 3 tháng: nghe nhạc không quảng cáo, tải ngoại tuyến, phát chất lượng cao 320kbps, skip không giới hạn.",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "spotify-premium-6-thang",
    slug: "spotify-premium-6-thang",
    name: "Spotify Premium 6 tháng - TK chính chủ",
    price: 270000,
    originalPrice: 390000,
    tags: ["music", "spotify"],
    image: spotify6Img,
    status: "in_stock",
    description:
      "Spotify Premium 6 tháng: toàn bộ nhạc, podcast không giới hạn. Không quảng cáo, phát ngoại tuyến, chất lượng cao, bỏ qua bài hát không giới hạn.",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "spotify-premium",
    slug: "spotify-premium-1-nam",
    name: "Spotify Premium 1 năm - TK chính chủ",
    price: 450000,
    originalPrice: 780000,
    tags: ["music", "spotify"],
    image: spotifyImg,
    status: "in_stock",
    description:
      "Spotify Premium 12 tháng: nghe nhạc, podcast không giới hạn. Chất lượng cao (320kbps/lossless), không quảng cáo, phát ngoại tuyến, bỏ qua bài hát thoải mái.",
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
      "Claude Pro 1 tháng với $20 credit. Truy cập Claude 3.5 Sonnet và Claude 3.5 Opus. Hỗ trợ viết nội dung dài, phân tích dữ liệu, upload tài liệu lớn.",
    category: "AI",
    accountType: "Claude Pro",
  },
  {
    id: "capcut-1m",
    slug: "capcut-1m",
    name: "CapCut Pro 1 tháng",
    price: 65000,
    originalPrice: 290000,
    tags: ["video", "capcut"],
    image: capcut1mImg,
    status: "in_stock",
    description:
      "CapCut Pro 1 tháng: kho hiệu ứng premium, template cao cấp, AI background remover, auto caption, xuất video 4K không watermark.",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "capcut-1y",
    slug: "capcut-1y",
    name: "CapCut Pro 1 năm",
    price: 589000,
    originalPrice: 1900000,
    tags: ["video", "capcut"],
    image: capcut1yImg,
    status: "in_stock",
    description:
      "CapCut Pro 12 tháng: đầy đủ hiệu ứng cao cấp, template, AI edit, xuất video 4K không watermark. Hỗ trợ multi-device, cloud sync.",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "netflix-6m",
    slug: "netflix-6m",
    name: "Netflix 6 tháng",
    price: 460000,
    originalPrice: 684000,
    tags: ["movie", "netflix"],
    image: netflix1mImg,
    status: "in_stock",
    description:
      "Netflix Premium 6 tháng: xem phim, series không giới hạn. Chất lượng 4K HDR, Dolby Atmos, nhiều profile, xem đồng thời trên nhiều thiết bị.",
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
      "SuperGrok 1 tháng: truy cập Grok-1.5 (xAI). AI chatbot của X (Twitter), khả năng trả lời real-time, khai thác dữ liệu mạng xã hội, tìm kiếm thông tin tức thì.",
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
      "Google One 2TB 1 tháng: 2TB lưu trữ đám mây. Bao gồm Gemini Pro (Gemini 1.5 Flash/Pro), NotebookLM, Veo 3, quyền lợi credit AI mới.",
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
      "Google One 2TB 12 tháng: 2TB lưu trữ. Bao gồm Gemini Pro (Gemini 1.5 Flash/Pro), NotebookLM, Veo 3 và quyền lợi credit AI. Chia sẻ nhóm gia đình.",
    category: "AI",
    accountType: "Google One",
  },
  {
    id: "perplexity-pro-12m",
    slug: "perplexity-pro-12m",
    name: "Perplexity Pro 12 tháng - TK chính chủ",
    price: 399000,
    originalPrice: 6000000,
    tags: ["ai", "perplexity"],
    image: perplexityPro12mImg,
    status: "in_stock",
    description:
      "Perplexity Pro 12 tháng: AI search engine chính xác. Truy cập đa model: GPT-4o, GPT-4.1, GPT-5 (OpenAI), Claude 3.5 Sonnet & Opus (Anthropic), Grok-1.5 (xAI).",
    category: "AI",
    accountType: "Perplexity Pro",
  },
  {
    id: "microsoft-1y",
    slug: "microsoft-1y",
    name: "Microsoft 1 năm - TK chính chủ",
    price: 360000,
    originalPrice: 1299000,
    tags: ["office 365", "microsoft", "onedrive", "teams", "outlook", "excel", "powerpoint", "word"],
    image: microsoft1yImg,
    status: "in_stock",
    description:
      "Microsoft 12 tháng: Office 365, OneDrive, Teams, Outlook, Excel, PowerPoint, Word. Hỗ trợ nhiều thiết bị, multi-device, cloud sync.",
    category: "Office",
    accountType: "Microsoft",
  },
  {
    id: "canva-pro-1y",
    slug: "canva-pro-1y",
    name: "Canva Pro 1 năm",
    price: 169000,
    originalPrice: 1500000,
    tags: ["canva", "design"],
    image: canvaImg,
    status: "in_stock",
    description:
      "Canva Pro 12 tháng: thiết kế đồ họa, video, infographic, logo, banner, social media, presentation. Hỗ trợ nhiều thiết bị, multi-device, cloud sync.",
    category: "Design",
    accountType: "Canva Pro",
  },
  {
    id: "google-ai-ultra-1m",
    slug: "google-ai-ultra-1m",
    name: "Google AI Ultra (45k Credit VEO 3) 1 tháng",
    price: 199000,
    originalPrice: 6500000,
    tags: ["ai", "veo 3"],
    image: googleAiUltraImg,
    status: "in_stock",
    description:
      "Google AI Ultra 1 tháng: tạo video Veo 3 thoả thích, trải nghiệm Whisk — biến hình ảnh/thông tin thành video ngắn. Sửa dụng NotebookLM với hạn mức cao hơn.",
    category: "Design",
    accountType: "Canva Pro",
  },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
