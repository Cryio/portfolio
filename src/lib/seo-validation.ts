// Helper function to validate SEO metadata structure
// Use this to test metadata in your pages

export const validateSEOMetadata = (metadata: any) => {
  const checks = {
    title: !!metadata.title && metadata.title.length > 0,
    description: !!metadata.description && metadata.description.length > 0,
    keywords: Array.isArray(metadata.keywords) && metadata.keywords.length > 0,
    canonical: metadata.alternates?.canonical === "https://srachetrai.dev" || 
              metadata.metadataBase?.href === "https://srachetrai.dev/",
    openGraph: {
      type: metadata.openGraph?.type === "website",
      url: metadata.openGraph?.url === "https://srachetrai.dev",
      siteName: !!metadata.openGraph?.siteName,
      images: Array.isArray(metadata.openGraph?.images) && metadata.openGraph.images.length > 0,
    },
    twitter: {
      card: !!metadata.twitter?.card,
      site: !!metadata.twitter?.site,
      images: Array.isArray(metadata.twitter?.images) && metadata.twitter.images.length > 0,
    },
    robots: !!metadata.robots?.index && !!metadata.robots?.follow,
  };

  return {
    isValid: Object.values(checks).every(v => 
      typeof v === 'boolean' ? v : Object.values(v).every(v => v)
    ),
    checks,
  };
};

// Usage in testing:
// import { validateSEOMetadata } from '@/lib/seo-validation'
// import { metadata } from '@/app/layout'
// const result = validateSEOMetadata(metadata)
// console.log(result)

export default validateSEOMetadata;
