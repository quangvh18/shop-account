import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Contact = () => (
  <>
    <Helmet>
      <title>Liên hệ – Shop Premium</title>
      <meta name="description" content="Liên hệ bộ phận hỗ trợ Shop Premium." />
      <link rel="canonical" href="/contact" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 mt-6">
      <h1 className="text-2xl font-bold">Liên hệ</h1>
      <section className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="sr-only">Gửi tin nhắn</h2>
          <Input placeholder="Tên của bạn" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Nội dung" />
          <Button>Gửi</Button>
        </div>
        <div className="text-sm text-muted-foreground">
          <h2 className="font-semibold mb-2">Thông tin liên hệ</h2>
          <p>Hoặc liên hệ qua Zalo: <a href="https://zalo.me/0344396798" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">0344.396.798</a></p>
        </div>
      </section>
      <Footer />
    </main>
  </>
);

export default Contact;
