import { Product, currency } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Eye, Star, Sparkles } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isHot = discount >= 50;

  // Generate consistent random rating based on product id
  const hashCode = (str: string) => str.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const seed = Math.abs(hashCode(product.id));
  const rating = 4.5 + (seed % 6) / 10; // 4.5 to 5.0
  const reviewCount = 50 + (seed % 150); // 50 to 200 reviews
  const filledStars = Math.floor(rating);

  return (
    <Card className="group overflow-hidden card-premium card-glow h-full border-border/50">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-36 sm:h-40 lg:h-44 object-cover transition-all duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Badges container */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex flex-col gap-1.5">
              {isHot && (
                <span className="badge-hot flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  HOT
                </span>
              )}
            </div>

            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg shadow-red-500/25 font-bold px-2.5 py-1">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-primary hover:text-white">
                <Eye className="h-4 w-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-primary hover:text-white">
                <ShoppingCart className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4 space-y-3 flex flex-col flex-1 bg-gradient-to-b from-transparent to-muted/20">
          {/* Category tag */}
          {product.category && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({rating.toFixed(1)}) · {reviewCount}</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="price-current">
                {currency(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="price-original text-xs">
                  {currency(product.originalPrice)}
                </span>
                <span className="text-[10px] font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                  Tiết kiệm {currency(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2 mt-auto">
            <Button asChild className="w-full btn-hero h-10 text-sm font-semibold">
              <Link to={`/product/${product.slug}`} className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Xem chi tiết
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
