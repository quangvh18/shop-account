import { Helmet } from "react-helmet-async";

interface EnhancedSchemaProps {
  type: 'faq' | 'review' | 'localBusiness' | 'video';
  data: any;
}

const EnhancedSchema = ({ type, data }: EnhancedSchemaProps) => {
  const generateSchema = () => {
    switch (type) {
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.questions.map((q: any) => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        };

      case 'review':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount
          },
          "review": data.reviews.map((review: any) => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": review.author
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating
            },
            "reviewBody": review.text
          }))
        };

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Shop Premium",
          "description": "Cửa hàng tài khoản số uy tín #1 Việt Nam",
          "url": "https://www.shopacc.pro.vn",
          "telephone": "+84-344-396-798",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "VN"
          },
          "openingHours": "Mo-Su 00:00-23:59",
          "priceRange": "$$"
        };

      case 'video':
        return {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": data.title,
          "description": data.description,
          "thumbnailUrl": data.thumbnail,
          "uploadDate": data.uploadDate,
          "duration": data.duration
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default EnhancedSchema;
