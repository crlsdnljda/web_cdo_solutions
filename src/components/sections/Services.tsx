import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Megaphone,
  ShoppingCart,
  Palette,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useParallax } from '@/hooks/useParallax';

const services = [
  {
    icon: Code2,
    title: 'Desarrollo Web y Automatización',
    description:
      'Creación de páginas web, landing pages y automatización de procesos con APIs y herramientas como n8n.',
    href: '/servicios#desarrollo',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    description:
      'Campañas de email marketing, automatización de redes sociales y desarrollo de embudos de venta.',
    href: '/servicios#marketing',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce y Envíos',
    description:
      'Desarrollo de tiendas online, gestión de envíos y devoluciones con las mejores plataformas.',
    href: '/servicios#ecommerce',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Palette,
    title: 'Diseño Gráfico',
    description:
      'Diseño de material publicitario, contenido para redes sociales y motion graphics.',
    href: '/servicios#diseno',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Headphones,
    title: 'Soporte y Consultoría',
    description:
      'Asesoramiento tecnológico, análisis de datos y soporte técnico integral.',
    href: '/servicios#consultoria',
    color: 'from-green-500 to-emerald-500',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(sectionRef, { speed: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-16 animate-on-scroll">
          <span className="text-primary font-medium mb-4 block">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Soluciones integrales para tu{' '}
            <span className="gradient-text">negocio digital</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ofrecemos un amplio catálogo de servicios diseñados para optimizar y
            hacer crecer tu empresa.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full hover:border-primary/50 transition-all duration-300 group-hover:-translate-y-1">
                <CardHeader className="space-y-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                    {service.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
