import { useEffect, useRef } from 'react';
import {
  Mail,
  MessageCircle,
  Globe,
  FileText,
  Truck,
  ShoppingCart,
  ArrowRight,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useContactModal } from '@/context/ContactModalContext';
import { SEO, getProductosPageSchemas } from '@/components/seo';

const products = [
  {
    id: 'mautic',
    name: 'Mautic E-commerce',
    tagline: 'Marketing Automation para tiendas online',
    description:
      'Instancias de Mautic personalizadas con módulos propios desarrollados específicamente para e-commerce. Automatiza todo tu marketing con segmentación avanzada, scoring de leads y campañas multicanal que convierten.',
    icon: Mail,
    color: 'from-orange-500 to-red-500',
    status: 'available',
    features: [
      'Módulos personalizados para WooCommerce, Prestashop y Shopify',
      'Automatización de carritos abandonados con secuencias inteligentes',
      'Segmentación avanzada por comportamiento de compra',
      'Scoring de leads basado en interacciones',
      'Campañas multicanal: email, SMS, push notifications',
      'Integración con tu CRM y herramientas existentes',
    ],
    useCases: [
      'Recuperación de carritos abandonados',
      'Secuencias de bienvenida personalizadas',
      'Campañas de reactivación de clientes',
      'Upselling y cross-selling automatizado',
    ],
  },
  {
    id: 'whatsapp-bots',
    name: 'WhatsApp Bots',
    tagline: 'Automatización inteligente para WhatsApp Business',
    description:
      'Bots avanzados para WhatsApp Business que automatizan la atención al cliente, gestión de pedidos y notificaciones. Respuestas personalizadas 24/7 que mejoran la experiencia del cliente.',
    icon: MessageCircle,
    color: 'from-green-500 to-emerald-500',
    status: 'available',
    features: [
      'Respuestas automáticas inteligentes 24/7',
      'Integración con CRM y tiendas online',
      'Flujos de conversación personalizados y ramificados',
      'Notificaciones de pedidos, envíos y entregas',
      'Catálogo de productos interactivo',
      'Transferencia a agente humano cuando sea necesario',
    ],
    useCases: [
      'Atención al cliente automatizada',
      'Seguimiento de pedidos en tiempo real',
      'Reservas y citas',
      'Encuestas de satisfacción',
    ],
  },
  {
    id: 'vuki',
    name: 'Vuki.es',
    tagline: 'Gestión integral para tu negocio',
    description:
      'Plataforma de gestión empresarial todo-en-uno. Simplifica la administración de tu empresa con herramientas potentes, intuitivas y diseñadas para el día a día de tu negocio.',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    status: 'available',
    link: 'https://vuki.es',
    features: [
      'Gestión completa de clientes y contactos',
      'Seguimiento de proyectos y tareas',
      'Facturación y presupuestos profesionales',
      'Panel de control con métricas clave',
      'Informes y estadísticas detalladas',
      'Acceso desde cualquier dispositivo',
    ],
    useCases: [
      'Gestión de clientes y leads',
      'Control de proyectos',
      'Facturación recurrente',
      'Análisis de rendimiento',
    ],
  },
  {
    id: 'ticketbai',
    name: 'API TicketBAI',
    tagline: 'Cumplimiento fiscal automatizado para Euskadi',
    description:
      'API propia para la integración con el sistema TicketBAI de las Haciendas Forales del País Vasco. Cumple con la normativa fiscal de forma sencilla, automatizada y sin complicaciones.',
    icon: FileText,
    color: 'from-purple-500 to-violet-500',
    status: 'available',
    features: [
      'Generación automática de facturas conformes',
      'Firma electrónica integrada',
      'Envío automático a Hacienda Foral',
      'Integración con ERP, TPV y software de gestión',
      'Panel de control para seguimiento',
      'Soporte para Bizkaia, Gipuzkoa y Araba',
    ],
    useCases: [
      'Comercios y tiendas físicas',
      'E-commerce con operaciones en Euskadi',
      'Profesionales autónomos',
      'Empresas con facturación recurrente',
    ],
  },
  {
    id: 'verifactu',
    name: 'API Verifactu',
    tagline: 'Preparado para la normativa 2025',
    description:
      'Solución completa para el sistema Verifactu de verificación de facturas electrónicas. Adaptada a la nueva normativa española de facturación que entrará en vigor próximamente.',
    icon: ShoppingCart,
    color: 'from-pink-500 to-rose-500',
    status: 'available',
    features: [
      'Cumplimiento total normativa 2025',
      'Verificación de facturas en tiempo real',
      'Registro automático de operaciones',
      'Compatible con cualquier software de facturación',
      'API REST fácil de integrar',
      'Documentación completa y soporte técnico',
    ],
    useCases: [
      'Software de facturación',
      'ERPs y sistemas de gestión',
      'Plataformas e-commerce',
      'Aplicaciones de contabilidad',
    ],
  },
  {
    id: 'transportistas',
    name: 'App Transportistas',
    tagline: 'Gestión integral de flotas y entregas',
    description:
      'Aplicación en desarrollo para la gestión completa de empresas de transporte. Control total de flotas, rutas optimizadas, entregas en tiempo real y documentación digital.',
    icon: Truck,
    color: 'from-amber-500 to-yellow-500',
    status: 'development',
    features: [
      'Gestión completa de flotas y conductores',
      'Optimización inteligente de rutas',
      'Tracking en tiempo real de vehículos',
      'Documentación digital de entregas',
      'App móvil para conductores',
      'Panel de control para gestores',
    ],
    useCases: [
      'Empresas de transporte y logística',
      'Repartidores y mensajería',
      'Flotas comerciales',
      'Última milla',
    ],
  },
];

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = product.icon;
  const { openModal } = useContactModal();

  return (
    <motion.section
      ref={ref}
      id={product.id}
      className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-card/50' : ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              {product.status === 'development' && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-xs font-medium text-amber-500">En desarrollo</span>
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h2>
            <p className={`text-lg font-medium mb-4 bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
              {product.tagline}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button onClick={openModal}>
                {product.status === 'development' ? 'Reservar acceso' : 'Solicitar demo'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {product.link && (
                <Button variant="outline" asChild>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    Visitar web
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Features & Use Cases */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Características principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 text-primary`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Casos de uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.useCases.map((useCase, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-sm text-primary border border-primary/20"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function Productos() {
  const { openModal } = useContactModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <SEO
        title="Productos"
        description="Herramientas y plataformas propias: Mautic E-commerce, WhatsApp Bots, Vuki, API TicketBAI, Verifactu y más."
        canonical="https://cdo.solutions/productos"
        schemas={getProductosPageSchemas()}
      />
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 geometric-bg opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.span
              className="text-primary font-medium mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Productos
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Soluciones propias{' '}
              <span className="gradient-text">listas para usar</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Herramientas y plataformas desarrolladas por nosotros para resolver
              problemas reales del comercio electrónico. Probadas, optimizadas y
              listas para impulsar tu negocio.
            </motion.p>

            {/* Quick links */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`#${product.id}`}
                  className={`px-4 py-2 rounded-full border border-border hover:border-primary/50 transition-colors text-sm font-medium text-muted-foreground hover:text-primary`}
                >
                  {product.name}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas algo diferente?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Desarrollamos productos a medida para resolver necesidades específicas
              de tu negocio. Cuéntanos tu idea y la hacemos realidad.
            </p>
            <Button size="lg" className="glow" onClick={openModal}>
              Hablemos de tu proyecto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
