import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ThankYou = () => {
  const [orderInfo, setOrderInfo] = useState<{
    orderId?: string;
    customerName?: string;
    customerZalo?: string;
  }>({});

  useEffect(() => {
    // Get order info from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId') || 'N/A';
    const customerName = urlParams.get('name') || localStorage.getItem('customerName') || 'Khách hàng';
    const customerZalo = urlParams.get('zalo') || localStorage.getItem('customerZalo') || 'Chưa cung cấp';

    setOrderInfo({ orderId, customerName, customerZalo });

    // Clean up localStorage
    localStorage.removeItem('customerName');
    localStorage.removeItem('customerZalo');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cảm ơn bạn đã đặt hàng! – Shop Premium</title>
        <meta name="description" content="Cảm ơn bạn đã đặt hàng tại Shop Premium. Liên hệ Zalo 0344396798 để được hỗ trợ nhanh nhất." />
        <link rel="canonical" href="/thankyou" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-green-600">🎉 Cảm ơn bạn đã đặt hàng!</h1>
            <p className="text-lg text-muted-foreground">
              Đơn hàng của bạn đã được ghi nhận và thông báo đã được gửi đến admin qua Zalo.
            </p>
          </div>

          {/* Order Info Card */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Thông tin đơn hàng</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mã đơn hàng</label>
                  <p className="text-lg font-semibold">{orderInfo.orderId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tên khách hàng</label>
                  <p className="text-lg font-semibold">{orderInfo.customerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Số Zalo</label>
                  <p className="text-lg font-semibold">{orderInfo.customerZalo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Thời gian</label>
                  <p className="text-lg font-semibold">
                    {new Date().toLocaleString('vi-VN', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Bước tiếp theo</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Thông báo đã được gửi</h3>
                    <p className="text-muted-foreground text-sm">
                      Thông tin đơn hàng đã được gửi đến admin qua Zalo/Telegram để xử lý nhanh nhất.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Giao hàng tự động</h3>
                    <p className="text-muted-foreground text-sm">
                      Tài khoản sẽ được giao tự động trong vòng 5-15 phút sau khi xác nhận thanh toán.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Hỗ trợ 24/7</h3>
                    <p className="text-muted-foreground text-sm">
                      Nếu có bất kỳ vấn đề gì, liên hệ ngay với chúng tôi để được hỗ trợ.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              variant="hero" 
              className="flex items-center gap-2"
            >
              <a 
                href="https://zalo.me/g/fkawmh287" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Liên hệ Zalo
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <a 
                href="tel:0344396798"
              >
                <Phone className="h-4 w-4" />
                Gọi điện
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
