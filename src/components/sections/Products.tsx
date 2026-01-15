import { useRef } from 'react';
import {
  Mail,
  MessageCircle,
  ShoppingCart,
  FileText,
  Truck,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useContactModal } from '@/context/ContactModalContext';

const products = [
  {
    id: 'mautic',
    name: 'Mautic E-commerce',
    description:
      'Instancias de Mautic personalizadas con módulos propios para e-commerce. Automatiza tu marketing con segmentación avanzada, scoring de leads y campañas multicanal.',
    icon: Mail,
    features: [
      'Módulos personalizados para tiendas online',
      'Integración con WooCommerce, Prestashop, Shopify',
      'Automatización de carritos abandonados',
      'Segmentación avanzada de clientes',
    ],
    status: 'available',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'whatsapp-bots',
    name: 'WhatsApp Bots',
    description:
      'Bots inteligentes para WhatsApp Business. Automatiza la atención al cliente, gestión de pedidos y notificaciones con respuestas personalizadas.',
    icon: MessageCircle,
    features: [
      'Respuestas automáticas 24/7',
      'Integración con CRM y tiendas',
      'Flujos de conversación personalizados',
      'Notificaciones de pedidos y envíos',
    ],
    status: 'available',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'vuki',
    name: 'Vuki.es',
    description:
      'Plataforma de gestión integral para negocios. Simplifica la administración de tu empresa con herramientas potentes y fáciles de usar.',
    icon: Globe,
    features: [
      'Gestión de clientes y proyectos',
      'Facturación y presupuestos',
      'Panel de control intuitivo',
      'Informes y estadísticas',
    ],
    status: 'available',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ticketbai',
    name: 'API TicketBAI',
    description:
      'API propia para la integración con el sistema TicketBAI del País Vasco. Cumple con la normativa fiscal de forma sencilla y automatizada.',
    icon: FileText,
    features: [
      'Generación de facturas conformes',
      'Firma electrónica automática',
      'Envío a Hacienda Foral',
      'Integración con ERP y TPV',
    ],
    status: 'available',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'verifactu',
    name: 'API Verifactu',
    description:
      'Solución para el sistema Verifactu de verificación de facturas electrónicas. Adaptada a la nueva normativa española de facturación.',
    icon: ShoppingCart,
    features: [
      'Cumplimiento normativa 2025',
      'Verificación en tiempo real',
      'Registro de facturas',
      'Compatible con software de facturación',
    ],
    status: 'available',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'transportistas',
    name: 'App Transportistas',
    description:
      'Aplicación en desarrollo para la gestión integral de empresas de transporte. Control de flotas, rutas, entregas y documentación.',
    icon: Truck,
    features: [
      'Gestión de flotas y conductores',
      'Optimización de rutas',
      'Tracking en tiempo real',
      'Documentación digital',
    ],
    status: 'development',
    color: 'from-amber-500 to-yellow-500',
  },
];

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = product.icon;
  const { openModal } = useContactModal();

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-full p-6 md:p-8 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Status badge */}
        {product.status === 'development' && (
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-medium text-amber-500">En desarrollo</span>
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} mb-6`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {product.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: index * 0.1 + i * 0.05 + 0.2 }}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.color} mt-1.5 flex-shrink-0`} />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <Button
            variant="ghost"
            className="group/btn p-0 h-auto hover:bg-transparent"
            onClick={openModal}
          >
            <span className="flex items-center gap-2 text-primary">
              {product.status === 'development' ? 'Más información' : 'Solicitar demo'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const { openModal } = useContactModal();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: smoothBackgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
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
            Soluciones
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Nuestros <span className="gradient-text">Productos</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Herramientas y plataformas propias diseñadas para impulsar tu negocio.
            Soluciones listas para usar o personalizables según tus necesidades.
          </motion.p>
        </motion.div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-6">
            ¿Necesitas una solución personalizada? Desarrollamos productos a medida.
          </p>
          <Button size="lg" className="glow" onClick={openModal}>
            Hablemos de tu proyecto
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
