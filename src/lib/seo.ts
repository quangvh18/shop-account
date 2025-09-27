// SEO utility functions

export const generateMetaTitle = (title: string, siteName: string = "Shop Premium") => {
  return `${title} | ${siteName}`;
};

export const generateMetaDescription = (description: string, maxLength: number = 160) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

export const generateKeywords = (keywords: string[]) => {
  return keywords.join(', ');
};

export const generateCanonicalUrl = (path: string, baseUrl: string = "https://www.shopacc.pro.vn") => {
  return `${baseUrl}${path}`;
};

export const generateOpenGraphImage = (imagePath: string, baseUrl: string = "https://www.shopacc.pro.vn") => {
  return `${baseUrl}${imagePath}`;
};

// Breadcrumb helper
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// FAQ helper
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Product review helper
export const generateReviewSchema = (productName: string, rating: number, reviewCount: number) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount
    }
  };
};

// Image optimization helper
export const getOptimizedImageUrl = (imagePath: string, width?: number, quality: number = 80) => {
  const baseUrl = "https://www.shopacc.pro.vn";
  if (!width) return `${baseUrl}${imagePath}`;
  return `${baseUrl}${imagePath}?w=${width}&q=${quality}`;
};

// Social sharing helper
export const generateSocialMeta = (title: string, description: string, image: string, url: string) => {
  return {
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "og:url": url,
    "og:type": "website",
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image
  };
};
