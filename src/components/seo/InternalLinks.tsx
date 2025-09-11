import { Link } from "react-router-dom";
import { products } from "@/data/products";

interface InternalLinksProps {
  currentProductId?: string;
  limit?: number;
}

const InternalLinks = ({ currentProductId, limit = 4 }: InternalLinksProps) => {
  // Get related products (same category or random if no category match)
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, limit);

  const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || '';
  
  const popularKeywords = [
    { text: "ChatGPT Plus", url: "/search?q=chatgpt" },
    { text: "YouTube Premium", url: "/search?q=youtube" },
    { text: "Spotify Premium", url: "/search?q=spotify" },
    { text: "Netflix", url: "/search?q=netflix" },
    { text: "AI Tools", url: "/search?q=ai" },
    { text: "Tài khoản số", url: "/search" },
  ];

  return (
    <div className="space-y-6">
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Sản phẩm liên quan</h3>
          <div className="flex flex-wrap gap-2">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Keywords */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Từ khóa phổ biến</h3>
        <div className="flex flex-wrap gap-2">
          {popularKeywords.map((keyword, index) => (
            <Link
              key={index}
              to={keyword.url}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 hover:text-gray-900 transition-colors"
            >
              {keyword.text}
            </Link>
          ))}
        </div>
      </div>

      {/* Category Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Danh mục sản phẩm</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/search?category=ai"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            AI Tools
          </Link>
          <Link
            to="/search?category=giải trí"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Giải trí
          </Link>
          <Link
            to="/search?category=âm nhạc"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Âm nhạc
          </Link>
          <Link
            to="/search?category=học tập"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Học tập
          </Link>
          <Link
            to="/search?category=video editor"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Video Editor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternalLinks;
