import { siteConfig } from "./siteConfig";
import { BlogPost } from "./blog";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.companyName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}/images/og-image.jpg`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "500.000 VNĐ - 2.000.000 VNĐ",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Số 88, Đường Đa Phúc",
      addressLocality: "Thị trấn Sóc Sơn",
      addressRegion: "Huyện Sóc Sơn, Hà Nội",
      postalCode: "100000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.2447999,
      longitude: 105.8491823,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:30",
      },
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.zaloPage,
      siteConfig.social.youtube,
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Sóc Sơn, Hà Nội" },
      { "@type": "AdministrativeArea", name: "Đông Anh, Hà Nội" },
      { "@type": "AdministrativeArea", name: "Mê Linh, Hà Nội" },
    ],
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith("http") ? it.item : `${siteConfig.url}${it.item}`,
    })),
  };
}
