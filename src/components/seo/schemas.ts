import { company } from '@/config/company';

// Base URL del sitio
const baseUrl = company.websiteUrl;

/**
 * Schema de Organización
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/og-image.jpg`,
    description:
      'Agencia especializada en soluciones digitales para e-commerce. Desarrollo web, marketing digital, automatización y consultoría técnica.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bilbao',
      addressRegion: 'Bizkaia',
      addressCountry: 'ES',
      streetAddress: company.address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: company.email,
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [company.social.linkedin, company.social.instagram].filter(Boolean),
    taxID: company.cif,
  };
}

/**
 * Schema de Negocio Local
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: company.name,
    image: `${baseUrl}/og-image.jpg`,
    url: baseUrl,
    telephone: company.phone || undefined,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bilbao',
      addressRegion: 'Bizkaia',
      addressCountry: 'ES',
      streetAddress: company.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.263,
      longitude: -2.935,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '23:00',
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceType: [
      'Desarrollo Web',
      'Marketing Digital',
      'E-commerce',
      'Diseño Gráfico',
      'Consultoría Tecnológica',
    ],
  };
}

/**
 * Schema de WebSite con SearchAction
 */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: company.name,
    description:
      'Soluciones digitales para e-commerce: desarrollo web, marketing, automatización y más.',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'es-ES',
  };
}

/**
 * Schema de página web genérica
 */
export function getWebPageSchema(options: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: { name: string; url: string }[];
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${options.url}/#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'es-ES',
  };

  if (options.breadcrumb && options.breadcrumb.length > 0) {
    schema.breadcrumb = {
      '@id': `${options.url}/#breadcrumb`,
    };
  }

  return schema;
}

/**
 * Schema de Breadcrumb
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1]?.url || baseUrl}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Schema de Servicio
 */
export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  features?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceType: service.name,
    ...(service.features && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${service.name} - Características`,
        itemListElement: service.features.map((feature, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: feature,
          },
          position: index + 1,
        })),
      },
    }),
  };
}

/**
 * Schema de Producto/Software
 */
export function getProductSchema(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  features?: string[];
  status?: 'available' | 'development';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    url: product.url,
    applicationCategory: product.category || 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability:
        product.status === 'development'
          ? 'https://schema.org/PreOrder'
          : 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
      },
    },
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    ...(product.features && {
      featureList: product.features.join(', '),
    }),
  };
}

/**
 * Schema de FAQ
 */
export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Schema de AboutPage
 */
export function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${baseUrl}/nosotros/#webpage`,
    url: `${baseUrl}/nosotros`,
    name: `Sobre Nosotros - ${company.name}`,
    description:
      'Conoce a cdo.solutions, agencia especializada en soluciones digitales para e-commerce con enfoque en resultados.',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'es-ES',
  };
}

/**
 * Schema de ContactPage
 */
export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${baseUrl}/#contactpage`,
    url: baseUrl,
    name: `Contacto - ${company.name}`,
    description:
      'Contacta con cdo.solutions para consultas sobre desarrollo web, marketing digital y soluciones e-commerce.',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    mainEntity: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'es-ES',
  };
}

/**
 * Schema de página de servicios profesionales
 */
export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/servicios/#service`,
    name: `Servicios - ${company.name}`,
    description:
      'Servicios de desarrollo web, marketing digital, e-commerce, diseño gráfico y consultoría técnica para empresas.',
    url: `${baseUrl}/servicios`,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo de Servicios',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Desarrollo Web y Automatización',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de Webs y Landing Pages' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatización de Procesos' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chatbots y Atención al Cliente' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integración de Plataformas' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Marketing Digital y Comunicación',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de Email Marketing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatización de Redes Sociales' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Creación de Contenido Visual' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de Embudos de Venta' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'E-commerce y Gestión de Envíos',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de Tiendas Online' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de Envíos' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de Devoluciones' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Soporte Legal' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Diseño Gráfico y Creatividad',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de Material Publicitario' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño para Redes Sociales' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño para E-commerce' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motion Graphics' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Soporte y Consultoría Técnica',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoría Tecnológica' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Análisis de Datos' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Soporte Técnico Integral' } },
          ],
        },
      ],
    },
  };
}

/**
 * Genera todos los schemas para la página principal
 */
export function getHomePageSchemas() {
  return [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getLocalBusinessSchema(),
    getWebPageSchema({
      name: `${company.name} - Soluciones Digitales para E-commerce`,
      description:
        'Agencia especializada en desarrollo web, marketing digital, automatización y consultoría para empresas de comercio electrónico.',
      url: baseUrl,
      breadcrumb: [{ name: 'Inicio', url: baseUrl }],
    }),
    getBreadcrumbSchema([{ name: 'Inicio', url: baseUrl }]),
  ];
}

/**
 * Genera todos los schemas para la página de servicios
 */
export function getServiciosPageSchemas() {
  const serviciosUrl = `${baseUrl}/servicios`;
  return [
    getWebPageSchema({
      name: `Servicios - ${company.name}`,
      description:
        'Servicios de desarrollo web, marketing digital, e-commerce, diseño gráfico y consultoría técnica.',
      url: serviciosUrl,
      breadcrumb: [
        { name: 'Inicio', url: baseUrl },
        { name: 'Servicios', url: serviciosUrl },
      ],
    }),
    getBreadcrumbSchema([
      { name: 'Inicio', url: baseUrl },
      { name: 'Servicios', url: serviciosUrl },
    ]),
    getProfessionalServiceSchema(),
  ];
}

/**
 * Genera todos los schemas para la página de productos
 */
export function getProductosPageSchemas() {
  const productosUrl = `${baseUrl}/productos`;

  const products = [
    {
      name: 'Mautic E-commerce',
      description: 'Instancias de Mautic personalizadas con módulos propios para e-commerce.',
      category: 'MarketingAutomation',
      status: 'available' as const,
    },
    {
      name: 'WhatsApp Bots',
      description: 'Bots inteligentes para WhatsApp Business con automatización de atención al cliente.',
      category: 'BusinessApplication',
      status: 'available' as const,
    },
    {
      name: 'Vuki.es',
      description: 'Plataforma de gestión integral para negocios.',
      category: 'BusinessApplication',
      status: 'available' as const,
    },
    {
      name: 'API TicketBAI',
      description: 'API para integración con el sistema TicketBAI del País Vasco.',
      category: 'FinanceApplication',
      status: 'available' as const,
    },
    {
      name: 'API Verifactu',
      description: 'Solución para el sistema Verifactu de verificación de facturas electrónicas.',
      category: 'FinanceApplication',
      status: 'available' as const,
    },
    {
      name: 'App Transportistas',
      description: 'Aplicación para gestión integral de empresas de transporte.',
      category: 'BusinessApplication',
      status: 'development' as const,
    },
  ];

  return [
    getWebPageSchema({
      name: `Productos - ${company.name}`,
      description:
        'Herramientas y plataformas propias: Mautic, WhatsApp Bots, Vuki, TicketBAI, Verifactu y más.',
      url: productosUrl,
      breadcrumb: [
        { name: 'Inicio', url: baseUrl },
        { name: 'Productos', url: productosUrl },
      ],
    }),
    getBreadcrumbSchema([
      { name: 'Inicio', url: baseUrl },
      { name: 'Productos', url: productosUrl },
    ]),
    ...products.map((product) =>
      getProductSchema({
        ...product,
        url: `${productosUrl}#${product.name.toLowerCase().replace(/\s+/g, '-')}`,
      })
    ),
  ];
}

/**
 * Genera todos los schemas para la página de nosotros
 */
export function getNosotrosPageSchemas() {
  const nosotrosUrl = `${baseUrl}/nosotros`;
  return [
    getAboutPageSchema(),
    getBreadcrumbSchema([
      { name: 'Inicio', url: baseUrl },
      { name: 'Nosotros', url: nosotrosUrl },
    ]),
  ];
}

/**
 * Genera schemas para páginas legales
 */
export function getLegalPageSchemas(page: 'privacidad' | 'terminos' | 'cookies') {
  const pageConfig = {
    privacidad: {
      name: 'Política de Privacidad',
      description: `Política de privacidad y protección de datos de ${company.name}.`,
    },
    terminos: {
      name: 'Términos y Condiciones',
      description: `Términos y condiciones de uso de los servicios de ${company.name}.`,
    },
    cookies: {
      name: 'Política de Cookies',
      description: `Información sobre el uso de cookies en ${company.name}.`,
    },
  };

  const config = pageConfig[page];
  const pageUrl = `${baseUrl}/${page}`;

  return [
    getWebPageSchema({
      name: `${config.name} - ${company.name}`,
      description: config.description,
      url: pageUrl,
      breadcrumb: [
        { name: 'Inicio', url: baseUrl },
        { name: config.name, url: pageUrl },
      ],
    }),
    getBreadcrumbSchema([
      { name: 'Inicio', url: baseUrl },
      { name: config.name, url: pageUrl },
    ]),
  ];
}
