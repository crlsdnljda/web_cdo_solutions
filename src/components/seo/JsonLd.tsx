import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Componente para inyectar JSON-LD estructurado en el head
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(data);

  return (
    <Helmet>
      <script type="application/ld+json">{jsonLdString}</script>
    </Helmet>
  );
}
