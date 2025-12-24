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
import githubImg from "@/assets/github-student-park.webp"
import jetbrainsImg from "@/assets/jetbrains-1y.webp"
import lovableImg from "@/assets/lovable-2m.webp"
import passwordIndividualImg from "@/assets/password-individual-1y.webp"
import notionPlusImg from "@/assets/notion-plus-ai-1y.webp"

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
  | "Microsoft 365"
  | "Canva Pro"
  | "GitHub Copilot Pro"
  | "JetBrains"
  | "Lovable Pro"
  | "1Password Individual"
  | "Notion Plus"
  ;
};

export const products: Product[] = [
  {
    id: "notion-plus-1y",
    slug: "notion-plus-1y",
    name: "Notion Plus 1 năm",
    price: 140000,
    originalPrice: 1280000,
    tags: ["notion", "productivity"],
    image: notionPlusImg,
    status: "in_stock",
    description: `Gói Notion Plus 1 năm, nâng cấp không gian làm việc cá nhân với nhiều tính năng vượt trội.

Quyền lợi nổi bật:
- Truy cập Notion Plus trong 1 năm
- Upload file không giới hạn (vs 5MB ở Free)
- Lịch sử phiên bản không giới hạn (vs 7 ngày ở Free)
- Mời không giới hạn số lượng guests
- Sync trên mọi thiết bị (Web, Desktop, Mobile)
- 100+ template chuyên nghiệp sẵn có
- Tích hợp với Google Drive, Slack, GitHub
- Advanced permissions và sharing options
- Database với views linh hoạt (Table, Board, Calendar, Gallery)
- AI Assistant để viết, chỉnh sửa và tóm tắt nội dung
- Custom domain cho public pages
- Priority customer support 24/7`,
    category: "Productivity",
    accountType: "Notion Plus",
  },
  {
    id: "lovable-pro-2m",
    slug: "lovable-pro-2m",
    name: "Lovable Pro 2 tháng",
    price: 80000,
    originalPrice: 1350000,
    tags: ["lovable", "frontend"],
    image: lovableImg,
    status: "in_stock",
    description: `Gói Lovable Pro 2 tháng, giải pháp tối ưu cho việc phát triển ứng dụng web nhanh chóng với AI.

Quyền lợi nổi bật:
- Truy cập Lovable Pro trong 2 tháng
- Tạo và deploy ứng dụng web không giới hạn
- AI code generation với Claude Sonnet 4
- Chỉnh sửa code trực tiếp trong editor
- Tự động deploy lên hosting miễn phí
- Tích hợp Supabase để quản lý database
- Responsive design tự động cho mọi thiết bị
- Custom domain và SSL certificate miễn phí
- Component library phong phú (React, Tailwind CSS)
- Export source code đầy đủ
- Preview realtime khi phát triển
- Hỗ trợ TypeScript và modern web standards`,
    category: "Lập trình",
    accountType: "Lovable Pro",
  },
  {
    id: "1password-individual-1y",
    slug: "1password-individual-1y",
    name: "1Password Individual 1 năm",
    price: 350000,
    originalPrice: 860000,
    tags: ["1password", "password", "security"],
    image: passwordIndividualImg,
    status: "in_stock",
    description: `Gói 1Password Individual 1 năm, phù hợp cho người dùng muốn bảo mật tài khoản và thông tin cá nhân.

Quyền lợi nổi bật:
- Truy cập 1Password Individual trong 1 năm
- Lưu trữ không giới hạn mật khẩu, thẻ tín dụng, ghi chú bảo mật
- Đồng bộ trên mọi thiết bị (Windows, Mac, iOS, Android)
- Tự động điền mật khẩu trên trình duyệt và ứng dụng
- Watchtower: Cảnh báo mật khẩu yếu, bị rò rỉ hoặc lỗi thời
- Kho lưu trữ riêng tư với mã hóa end-to-end
- Hỗ trợ xác thực 2 yếu tố (2FA)
- Chế độ du lịch: Ẩn vault nhạy cảm khi qua biên giới`,
    category: "Bảo mật",
    accountType: "1Password Individual",
  },
  {
    id: "github-copilot-pro-2y",
    slug: "github-copilot-pro-2y",
    name: "GitHub Copilot Student Pack 2 năm",
    price: 560000,
    originalPrice: 6000000,
    tags: ["github", "coding", "ai"],
    image: githubImg,
    status: "in_stock",
    description: `Tài khoản GitHub Student Developer Pack cho phép bạn hưởng các lợi ích sau:

- Các tính năng GitHub Pro, xem chi tiết tại đây

- GitHub Student Developer Pack partner offers cho bạn rất nhiều lợi ích đến từ các partners của GitHub như VS Code, Microsoft Azure, Heroku, MongoDB...

- GitHub Campus đào tạo chuyên nghiệp cho các ứng viên đủ điều kiện.`,
    category: "Lập trình",
    accountType: "GitHub Copilot Pro",
  },
  {
    id: "jetbrains-1y",
    slug: "jetbrains-1y",
    name: "JetBrains All Products Pack (1 năm)",
    price: 460000,
    originalPrice: 6900000,
    tags: ["jetbrains", "coding", "ai"],
    image: jetbrainsImg,
    status: "in_stock",
    description: `JetBrains All Products Pack 1 năm: Truy cập toàn bộ bộ công cụ lập trình đỉnh cao của JetBrains bao gồm IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, ReSharper, và nhiều hơn nữa.

- Hỗ trợ đa ngôn ngữ, refactoring thông minh.
- Tích hợp AI Assistant giúp tăng tốc độ coding.
- Công cụ debug và profile hiệu năng mạnh mẽ.`,
    category: "Lập trình",
    accountType: "JetBrains",
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
    description: `Canva Pro 1 năm: Mở khóa toàn bộ tính năng thiết kế cao cấp.

- Truy cập kho thư viện khổng lồ với hơn 100 triệu ảnh, video, âm thanh và graphics.
- Sử dụng các công cụ AI mạnh mẽ như Magic Resize, Background Remover, và Magic Studio.
- Hỗ trợ Brand Kit để quản lý thương hiệu và làm việc nhóm hiệu quả.`,
    category: "Design",
    accountType: "Canva Pro",
  },
  {
    id: "google-ai-ultra-1m",
    slug: "google-ai-ultra-1m",
    name: "Google AI Ultra (45k Credit VEO 3) 1 tháng",
    price: 119000,
    originalPrice: 6500000,
    tags: ["ai", "veo 3"],
    image: googleAiUltraImg,
    status: "in_stock",
    description: `Google AI Ultra 1 tháng: Trải nghiệm sức mạnh AI tối thượng.

- Truy cập Gemini Advanced với mô hình AI mạnh mẽ nhất (Ultra 1.0/Pro 1.5).
- Bao gồm 45k Credit Veo 3 để tạo video chất lượng cao.
- Sử dụng NotebookLM với hạn mức nâng cao cho nghiên cứu và phân tích dữ liệu.`,
    category: "Design",
    accountType: "Canva Pro",
  },
  {
    id: "google-one-2tb-1m",
    slug: "google-one-2tb-1-thang",
    name: "Google One 2TB 1 tháng + Gemini Pro",
    price: 40000,
    originalPrice: 500000,
    tags: ["ai", "gemini", "google one", "notebook lm", "veo 3"],
    image: googleOne1yImg,
    status: "in_stock",
    description: `Google One AI Premium 2TB (1 tháng): Gói thành viên cao cấp nhất của Google.

- Sở hữu 2TB dung lượng lưu trữ đám mây an toàn cho Google Photos, Drive, Gmail.
- Đặc quyền truy cập Gemini Advanced với mô hình AI mạnh mẽ nhất.
- Tích hợp Gemini vào Gmail, Docs, Slides, Sheets giúp tăng hiệu suất làm việc.`,
    category: "AI",
    accountType: "Google One",
  },
  {
    id: "google-one-2tb-1y",
    slug: "google-one-2tb-1-nam",
    name: "Google One 2TB 1 năm + Gemini Pro",
    price: 400000,
    originalPrice: 6000000,
    tags: ["ai", "gemini", "google one", "notebook lm", "veo 3"],
    image: googleOne1yImg,
    status: "in_stock",
    description: `Google One AI Premium 2TB (1 năm): Giải pháp lưu trữ và AI toàn diện.

- 2TB lưu trữ đám mây chia sẻ cho gia đình (lên đến 5 thành viên).
- Truy cập không giới hạn Gemini Advanced và các mô hình AI mới nhất.
- Các lợi ích độc quyền của Google One: Hỗ trợ chuyên gia, chỉnh sửa ảnh nâng cao trong Google Photos.`,
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
    description: `Perplexity Pro 1 năm: Công cụ tìm kiếm AI mạnh mẽ nhất.

- Chuyển đổi linh hoạt giữa các mô hình AI hàng đầu: GPT-4o, Claude 3.5 Sonnet, Grok.
- Pro Search: Tìm kiếm chuyên sâu với khả năng lập luận đa bước và trích dẫn nguồn uy tín.
- Upload file không giới hạn để phân tích dữ liệu và tóm tắt tài liệu.`,
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
    description: `Microsoft 365 Personal 1 năm: Giải pháp làm việc chuyên nghiệp.

- Cài đặt bộ ứng dụng Office cao cấp (Word, Excel, PowerPoint, Outlook) trên tối đa 5 thiết bị.
- Tặng kèm 1TB lưu trữ đám mây OneDrive với tính năng bảo mật Personal Vault.
- Hỗ trợ các tính năng AI và mẫu thiết kế cao cấp trong ứng dụng.`,
    category: "Office",
    accountType: "Microsoft 365",
  },
  {
    id: "chatgpt-plus-3m",
    slug: "chatgpt-plus-3-thang-tai-khoan-chinh-chu",
    name: "ChatGPT Plus 3 tháng - Đăng ký lần đầu",
    price: 920000,
    originalPrice: 1500000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgpt3mImg,
    status: "in_stock",
    description: `ChatGPT Plus 3 tháng: Mở khóa sức mạnh AI tiên tiến nhất.

- Truy cập ưu tiên vào GPT-4o, o1-preview và các mô hình mới nhất.
- Sử dụng DALL·E 3 để tạo hình ảnh nghệ thuật chất lượng cao.
- Phân tích dữ liệu nâng cao, upload file và trò chuyện giọng nói (Voice Mode).`,
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
    description: `ChatGPT Plus 6 tháng: Trải nghiệm AI liền mạch và mạnh mẽ.

- Truy cập ổn định và nhanh chóng vào các mô hình GPT-4o, o1-preview.
- Khai thác kho GPTs tùy chỉnh đa dạng từ cộng đồng.
- Tính năng Advanced Data Analysis giúp xử lý số liệu và biểu đồ phức tạp.`,
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
    description: `ChatGPT Plus 1 tháng (Share): Giải pháp tiết kiệm chi phí.

- Trải nghiệm các tính năng cốt lõi của ChatGPT Plus với mức giá phải chăng.
- Truy cập GPT-4o và các mô hình tiên tiến.
- Phù hợp cho nhu cầu sử dụng cơ bản và trải nghiệm công nghệ mới.`,
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
    description: `YouTube Premium 1 năm: Giải trí không giới hạn.

- Xem video hoàn toàn không quảng cáo trên mọi thiết bị.
- Tính năng phát trong nền (Background Play) và Picture-in-Picture.
- Tặng kèm YouTube Music Premium: Nghe nhạc chất lượng cao, tắt màn hình vẫn phát.`,
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
    description: `YouTube Premium 6 tháng: Trải nghiệm xem video đỉnh cao.

- Không còn bị làm phiền bởi quảng cáo khi xem video.
- Tải video xuống để xem offline khi không có mạng.
- Thưởng thức kho nhạc khổng lồ với YouTube Music Premium miễn phí đi kèm.`,
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
    description: `Duolingo Super 1 năm: Học ngoại ngữ nhanh hơn và vui hơn.

- Loại bỏ hoàn toàn quảng cáo gián đoạn quá trình học.
- Trái tim vô hạn (Unlimited Hearts) giúp bạn học thoải mái không lo sai.
- Luyện tập cá nhân hóa và thực hiện bài kiểm tra Huyền thoại không giới hạn.`,
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
    description: `Spotify Premium 3 tháng: Âm nhạc không giới hạn.

- Nghe nhạc không quảng cáo, chất lượng âm thanh cao cấp.
- Tải nhạc nghe offline mọi lúc mọi nơi.
- Chuyển bài không giới hạn (Unlimited Skips) và phát bất kỳ bài nào bạn thích.`,
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
    description: `Spotify Premium 6 tháng: Thế giới âm nhạc trong tầm tay.

- Tận hưởng âm nhạc chất lượng cao, không bị gián đoạn.
- Tính năng Spotify Connect điều khiển nhạc linh hoạt trên mọi thiết bị.
- Kho Podcast khổng lồ và các playlist được cá nhân hóa riêng cho bạn.`,
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
    description: `Spotify Premium 1 năm: Trải nghiệm âm nhạc trọn vẹn.

- Tiết kiệm hơn với gói dài hạn.
- Nghe nhạc offline, không quảng cáo, chất lượng âm thanh vòm.
- Tạo và chia sẻ playlist không giới hạn với bạn bè.`,
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
    description: `Claude Pro 1 tháng: Trợ lý AI thông minh và tinh tế.

- Truy cập các mô hình mạnh nhất: Claude 3.5 Sonnet, Claude 3 Opus.
- Cửa sổ ngữ cảnh lớn (Context Window) xử lý tài liệu dài và code phức tạp.
- Tính năng Projects giúp quản lý kiến thức và làm việc theo dự án hiệu quả.`,
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
    description: `CapCut Pro 1 tháng: Biên tập video chuyên nghiệp trên mọi thiết bị.

- Mở khóa kho hiệu ứng, chuyển cảnh và bộ lọc Pro độc quyền.
- Các tính năng AI: Xóa nền, Tự động tạo phụ đề, Chỉnh sửa cơ thể.
- Xuất video chất lượng 4K sắc nét, không dính logo (watermark).`,
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
    description: `CapCut Pro 1 năm: Sáng tạo video không giới hạn.

- Truy cập đầy đủ các công cụ chỉnh sửa nâng cao và kho tài nguyên Pro.
- Đồng bộ đám mây (Cloud Sync) giúp chỉnh sửa liền mạch trên điện thoại và máy tính.
- Cập nhật liên tục các trend và mẫu template mới nhất.`,
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
    description: `Netflix Premium 6 tháng: Rạp phim tại gia.

- Xem phim chất lượng 4K Ultra HD và HDR sống động.
- Âm thanh Spatial Audio đắm chìm.
- Xem đồng thời trên 4 thiết bị, phù hợp cho cả gia đình.`,
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
    description: `SuperGrok 1 tháng: AI Chatbot thời gian thực từ xAI.

- Tích hợp dữ liệu trực tiếp từ nền tảng X (Twitter) để cập nhật tin tức nhanh nhất.
- Chế độ 'Fun Mode' mang lại trải nghiệm trò chuyện hài hước và độc đáo.
- Khả năng lập luận mạnh mẽ và xử lý hình ảnh (Multimodal).`,
    category: "AI",
    accountType: "SuperGrok",
  }
];

export const currency = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
