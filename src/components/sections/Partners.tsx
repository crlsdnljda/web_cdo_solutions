import { useRef } from 'react';
import { useParallax } from '@/hooks/useParallax';

const partnerCategories = [
  {
    name: 'Transportistas',
    partners: ['FedEx', 'GLS', 'InPost', 'Mondial Relay', 'MRW', 'SEUR', 'Correos'],
  },
  {
    name: 'Logística',
    partners: ['Outvio', 'REVER', 'ShippyPro', 'Sendcloud'],
  },
  {
    name: 'Email Marketing',
    partners: ['Connectif', 'Klaviyo', 'Mailchimp', 'SalesManago'],
  },
  {
    name: 'Pasarelas de Pago',
    partners: ['PayPal', 'Stripe', 'SeQura', 'Klarna'],
  },
  {
    name: 'Marketplaces',
    partners: ['Amazon', 'Zalando', 'Spartoo', 'Miinto'],
  },
];

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(sectionRef, { speed: 0.08 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 geometric-bg opacity-20"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="text-primary font-medium mb-4 block">Ecosistema</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Nuestros <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Trabajamos con las mejores plataformas y servicios del mercado para
            ofrecerte soluciones de calidad.
          </p>
        </div>

        {/* Partners by category */}
        <div className="space-y-12">
          {partnerCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="animate-on-scroll"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.partners.map((partner) => (
                  <div
                    key={partner}
                    className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors duration-300"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground/60 mt-12 animate-on-scroll">
          *Actualmente contamos con más partners además de los mencionados
        </p>
      </div>
    </section>
  );
}
