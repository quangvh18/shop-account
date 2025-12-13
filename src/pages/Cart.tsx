import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Shield, Zap, CreditCard, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Cart = () => {
  const { detailed, total, setQty, remove } = useCart();
  const navigate = useNavigate();

  const totalSaved = detailed.reduce((acc, item) => {
    if (item.product.originalPrice) {
      return acc + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Helmet>
        <title>Giỏ hàng – Shop Premium</title>
        <meta name="description" content="Kiểm tra sản phẩm trong giỏ hàng của bạn và tiến hành thanh toán." />
        <link rel="canonical" href="/cart" />
      </Helmet>

      <Header />

      <main className="flex-1 container mx-auto mt-4 sm:mt-8 px-4 pb-8 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại mua sắm
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Giỏ hàng của bạn</h1>
              <p className="text-muted-foreground text-sm">{detailed.length} sản phẩm</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {detailed.map((item, index) => {
              const discount = item.product.originalPrice
                ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
                : 0;

              return (
                <Card
                  key={item.productId}
                  className="overflow-hidden border-border/50 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product image */}
                      <div className="relative w-full sm:w-52 h-44 sm:h-44 bg-muted overflow-hidden flex-shrink-0 group">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {discount > 0 && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg">
                            -{discount}%
                          </Badge>
                        )}
                        {item.product.status === "in_stock" && (
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                            Còn hàng
                          </Badge>
                        )}
                      </div>

                      {/* Product details */}
                      <div className="flex-1 p-5 space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                to={`/product/${item.product.slug}`}
                                className="font-semibold text-lg leading-tight hover:text-primary transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              {item.product.category && (
                                <p className="text-xs font-medium text-primary/70 mt-1">{item.product.category}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(item.productId)}
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-xl flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Tài khoản chính chủ · Giao hàng tự động</p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Số lượng:</span>
                            <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setQty(item.productId, Math.max(1, item.quantity - 1))}
                                className="h-8 w-8 rounded-lg hover:bg-background transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                aria-label="Số lượng"
                                value={item.quantity}
                                onChange={(e) => setQty(item.productId, Math.max(1, Number(e.target.value) || 1))}
                                className="w-12 text-center h-8 border-0 bg-transparent font-semibold"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setQty(item.productId, item.quantity + 1)}
                                className="h-8 w-8 rounded-lg hover:bg-background transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-bold text-xl gradient-text">
                              {currency(item.product.price * item.quantity)}
                            </div>
                            {item.product.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                {currency(item.product.originalPrice * item.quantity)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {detailed.length === 0 && (
              <Card className="border-border/50 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Giỏ hàng trống</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
                      </p>
                    </div>
                    <Button asChild className="btn-hero px-8" size="lg">
                      <Link to="/" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Khám phá sản phẩm
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Checkout sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Order summary card */}
              <Card className="border-border/50 shadow-xl shadow-black/5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Tổng đơn hàng
                  </h2>
                </div>
                <CardContent className="p-6 space-y-5">
                  {/* Order summary */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tạm tính ({detailed.length} sản phẩm)</span>
                      <span className="font-medium">{currency(total)}</span>
                    </div>
                    {totalSaved > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">💸 Tiết kiệm được</span>
                        <span className="text-green-600 font-semibold">-{currency(totalSaved)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Phí giao hàng</span>
                      <span className="text-green-600 font-medium">Miễn phí</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">Tổng thanh toán</span>
                        <span className="text-2xl font-bold gradient-text">{currency(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <Button
                    className="w-full h-14 text-base font-semibold btn-hero"
                    disabled={detailed.length === 0}
                    onClick={() => navigate('/checkout')}
                  >
                    Tiến hành thanh toán
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link to="/">Tiếp tục mua sắm</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Trust badges */}
              <Card className="border-border/50 shadow-lg shadow-black/5">
                <CardContent className="p-4 space-y-3">
                  {[
                    { icon: Shield, text: "Bảo hành chính chủ", color: "text-green-500" },
                    { icon: Zap, text: "Giao hàng tự động 24/7", color: "text-yellow-500" },
                    { icon: CreditCard, text: "Thanh toán an toàn", color: "text-blue-500" },
                  ].map(({ icon: Icon, text, color }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span>{text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
