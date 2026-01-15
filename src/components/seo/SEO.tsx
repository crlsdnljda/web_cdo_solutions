import { Helmet } from 'react-helmet-async';
import { company } from '@/config/company';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  schemas?: Record<string, unknown>[];
}

/**
 * Componente SEO para meta tags y structured data
 */
export function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  schemas = [],
}: SEOProps) {
  const baseUrl = company.websiteUrl;
  const siteName = company.name;

  const seoTitle = title ? `${title} | ${siteName}` : `${siteName} - Soluciones Digitales para E-commerce`;
  const seoDescription =
    description ||
    'Agencia especializada en desarrollo web, marketing digital, automatización y consultoría para empresas de comercio electrónico.';
  const seoImage = image || `${baseUrl}/og-image.jpg`;
  const seoCanonical = canonical || baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoCanonical} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Additional Meta */}
      <meta name="author" content={siteName} />
      <meta name="geo.region" content="ES-BI" />
      <meta name="geo.placename" content="Bilbao" />

      {/* JSON-LD Schemas */}
      {schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)}
        </script>
      )}
    </Helmet>
  );
}
