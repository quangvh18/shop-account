import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import qrImage from "@/assets/qrcode.webp";
import notificationService from "@/lib/notification";
import { useEffect, useState } from "react";
import { getStoredRef, fetchCollaboratorByRef, type Collaborator } from "@/lib/referral";

const Payment = () => {
  const { total, clear, detailed } = useCart();
  const navigate = useNavigate();
  const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
  const [isProcessing, setIsProcessing] = useState(false);
  const [collab, setCollab] = useState<Collaborator | null>(null);

  useEffect(() => {
    const ref = getStoredRef();
    if (!ref) return;
    fetchCollaboratorByRef(ref).then(setCollab).catch(() => {});
  }, []);

  const onDone = async () => {
    setIsProcessing(true);
    
    try {
      // Get customer info from localStorage (stored during checkout)
      const customerName = localStorage.getItem('customerName') || 'Khách hàng';
      const customerZalo = localStorage.getItem('customerZalo') || 'Chưa cung cấp';
      
      // Prepare order data for notification
      const accountEmail = localStorage.getItem('accountEmail') || '';
      const accountPassword = localStorage.getItem('accountPassword') || '';
      const accountTwoFA = localStorage.getItem('accountTwoFA') || '';
      const orderData = {
        orderId,
        customerName,
        customerZalo,
        items: detailed.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
          credentials: item.credentials,
        })),
        total,
        accountEmail,
        accountPassword,
        accountTwoFA,
        timestamp: new Date().toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        ...(collab ? {
          collaboratorRef: collab.ref,
          collaboratorName: collab.display_name,
          collaboratorEmail: collab.email,
          collaboratorPhone: collab.phone,
        } : {})
      };

      // Send notification to Telegram only (per request)
      const telegramSent = await notificationService.sendTelegramNotification(orderData);
      
      // Clear cart and show success message
      clear();
      
      // Show success toast reflecting Telegram notification only
      const notificationText = telegramSent 
        ? 'Thông báo đã được gửi qua Telegram.'
        : 'Thông báo Telegram sẽ được gửi trong giây lát.';

      toast({
        title: "Thanh toán thành công!",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Cảm ơn bạn đã đặt hàng. {notificationText} Liên hệ Zalo 0344396798 để được hỗ trợ nhanh nhất.</span>
          </div>
        ),
      });

      // Clean up localStorage
      localStorage.removeItem('customerName');
      localStorage.removeItem('customerZalo');
      localStorage.removeItem('accountEmail');
      localStorage.removeItem('accountPassword');
      localStorage.removeItem('accountTwoFA');
      
      setTimeout(() => {
        const params = new URLSearchParams({
          orderId,
          name: customerName,
          zalo: customerZalo,
        });
        navigate(`/thankyou?${params.toString()}`);
      }, 600);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ hỗ trợ.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán – Shop Premium</title>
        <meta name="description" content="Quét mã QR để thanh toán đơn hàng tại Shop Premium." />
        <link rel="canonical" href="/payment" />
      </Helmet>
      <Header />
  <main className="container mx-auto mt-8 min-h-[60vh]">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">1</span>
            <span>Giỏ hàng</span>
            <div className="h-px w-10 bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">2</span>
            <span>Xác nhận</span>
            <div className="h-px w-10 bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">3</span>
            <span>Thanh toán</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-lg border p-4">
            <h1 className="mb-4 text-xl font-bold">Chuyển khoản ngân hàng - Mua siêu tốc</h1>
            <div className="text-sm text-muted-foreground">Số tiền: <span className="font-semibold text-foreground">{currency(total)}</span></div>
            <div className="mt-4 flex items-center justify-center">
              <div className="rounded-md border bg-white p-3">
                <img
                  src={qrImage}
                  alt="Mã QR thanh toán"
                  width={240}
                  height={240}
                  className="block"
                />
              </div>
            </div>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm">
              <li>Mở ứng dụng Mobile Banking của ngân hàng.</li>
              <li>Chọn Thanh Toán và quét mã QR bên cạnh.</li>
              <li>Không thay đổi nội dung chuyển khoản để hệ thống xử lý tự động.</li>
            </ol>
            <div className="mt-6 flex justify-end">
              <Button 
                variant="hero" 
                onClick={onDone}
                disabled={isProcessing}
                className="min-w-[120px]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  'Hoàn tất'
                )}
              </Button>
            </div>
          </section>
          <aside className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Mã đơn hàng</div>
            <div className="text-2xl font-extrabold tracking-widest">{orderId}</div>
            <div className="mt-4">Tổng tiền phải thanh toán</div>
            <div className="text-2xl font-extrabold text-primary">{currency(total)}</div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
