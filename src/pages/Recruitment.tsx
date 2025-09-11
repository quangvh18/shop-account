import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Recruitment = () => (
  <>
    <Helmet>
      <title>Tuyển dụng nhân viên CSKH - Shop Premium | Cơ hội việc làm hấp dẫn</title>
      <meta name="description" content="Tuyển dụng nhân viên chăm sóc khách hàng tại Shop Premium. Lương hấp dẫn, môi trường làm việc năng động. Ứng tuyển ngay!" />
      <meta name="keywords" content="tuyển dụng, việc làm, nhân viên CSKH, shop premium, cộng tác viên, làm việc part-time" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`${import.meta.env.VITE_PUBLIC_SITE_URL}/recruitment`} />
      
      {/* Open Graph */}
      <meta property="og:title" content="Tuyển dụng nhân viên CSKH - Shop Premium" />
      <meta property="og:description" content="Tuyển dụng nhân viên chăm sóc khách hàng tại Shop Premium. Lương hấp dẫn, môi trường làm việc năng động." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}/recruitment`} />
      <meta property="og:image" content={`${import.meta.env.VITE_PUBLIC_SITE_URL}/org.jpg`} />
      <meta property="og:site_name" content="Shop Premium" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Tuyển dụng nhân viên CSKH - Shop Premium" />
      <meta name="twitter:description" content="Tuyển dụng nhân viên chăm sóc khách hàng tại Shop Premium. Lương hấp dẫn, môi trường làm việc năng động." />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 mt-6 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 Tuyển dụng: Nhân viên Chăm sóc Khách hàng</h1>
      <div className="prose max-w-2xl">
        <h2 className="mt-6">📄 Thông tin chung</h2>
        <ul>
          <li><b>Vị trí:</b> Nhân viên CSKH</li>
          <li><b>Độ tuổi:</b> 18 – 27 tuổi</li>
          <li><b>Ưu tiên:</b> Học sinh, sinh viên</li>
        </ul>
        <h2 className="mt-6">⏳ Thời gian làm việc</h2>
        <ul>
          <li>4h/ngày, 6 ngày/tuần</li>
          <li>Có thể linh động theo giờ giấc tùy tính chất công việc</li>
        </ul>
        <h2 className="mt-6">💵 Thu nhập</h2>
        <ul>
          <li>Thu nhập dựa trên hiệu quả công việc</li>
        </ul>
        <h2 className="mt-6">💼 Mô tả công việc</h2>
        <ul>
          <li>Chăm sóc khách hàng qua các kênh: Fanpage, Email, Zalo</li>
          <li>Thực hiện các nhiệm vụ liên quan đến chăm sóc khách hàng</li>
        </ul>
        <h2 className="mt-6">📘 Yêu cầu</h2>
        <ul>
          <li>Tốc độ gõ: ≥ 40 WPM (kiểm tra tại <a href="https://10fastfingers.com" target="_blank" rel="noopener noreferrer">10fastfingers.com</a>)</li>
          <li>Kỹ năng giao tiếp tốt, làm việc nhóm</li>
        </ul>
        <div className="mt-8 p-4 bg-blue-50 rounded text-base">
          <b>Liên hệ ứng tuyển qua Zalo:</b> <a href="https://zalo.me/0344396798" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">0344.396.798</a>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded text-base">
          <p className="mb-2"><b>Hoặc đăng ký trực tiếp:</b></p>
          <Link 
            to="/collaborator/register" 
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Đăng ký làm cộng tác viên
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Recruitment;
