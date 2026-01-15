import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';

const partnerCategories = [
  {
    name: 'Transportistas',
    partners: [
      { name: 'FedEx', url: 'https://www.fedex.com' },
      { name: 'GLS', url: 'https://www.gls-spain.es' },
      { name: 'InPost', url: 'https://inpost.es' },
      { name: 'Mondial Relay', url: 'https://www.mondialrelay.es' },
      { name: 'MRW', url: 'https://www.mrw.es' },
      { name: 'SEUR', url: 'https://www.seur.com' },
      { name: 'Correos', url: 'https://www.correos.es' },
    ],
  },
  {
    name: 'Logística',
    partners: [
      { name: 'Outvio', url: 'https://outvio.com' },
      { name: 'REVER', url: 'https://rfrm.io' },
      { name: 'ShippyPro', url: 'https://www.shippypro.com' },
      { name: 'Sendcloud', url: 'https://www.sendcloud.es' },
    ],
  },
  {
    name: 'Email Marketing',
    partners: [
      { name: 'Connectif', url: 'https://connectif.ai' },
      { name: 'Klaviyo', url: 'https://www.klaviyo.com' },
      { name: 'Mailchimp', url: 'https://mailchimp.com' },
      { name: 'SalesManago', url: 'https://www.salesmanago.com' },
    ],
  },
  {
    name: 'Pasarelas de Pago',
    partners: [
      { name: 'PayPal', url: 'https://www.paypal.com' },
      { name: 'Stripe', url: 'https://stripe.com' },
      { name: 'SeQura', url: 'https://www.sequra.com' },
      { name: 'Klarna', url: 'https://www.klarna.com' },
    ],
  },
  {
    name: 'Marketplaces',
    partners: [
      { name: 'Amazon', url: 'https://www.amazon.es' },
      { name: 'Zalando', url: 'https://www.zalando.es' },
      { name: 'Spartoo', url: 'https://www.spartoo.es' },
      { name: 'Miinto', url: 'https://www.miinto.es' },
    ],
  },
];

function PartnerCategory({
  category,
  index,
}: {
  category: (typeof partnerCategories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <h3 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-4">
        {category.partners.map((partner, partnerIndex) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.1 + partnerIndex * 0.05 }}
            whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
          >
            <span className="text-sm font-medium text-muted-foreground">
              {partner.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 geometric-bg opacity-20"
        style={{ y: smoothBackgroundY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="text-primary font-medium mb-4 block"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ecosistema
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Nuestros <span className="gradient-text">Partners</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Trabajamos con las mejores plataformas y servicios del mercado para
            ofrecerte soluciones de calidad.
          </motion.p>
        </motion.div>

        {/* Partners by category */}
        <div className="space-y-12">
          {partnerCategories.map((category, categoryIndex) => (
            <PartnerCategory
              key={category.name}
              category={category}
              index={categoryIndex}
            />
          ))}
        </div>

        {/* Note */}
        <motion.p
          className="text-center text-sm text-muted-foreground/60 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          *Actualmente contamos con más partners además de los mencionados
        </motion.p>
      </div>
    </section>
  );
}
