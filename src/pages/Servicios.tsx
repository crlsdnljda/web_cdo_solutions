import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Megaphone,
  ShoppingCart,
  Palette,
  Headphones,
  Globe,
  Bot,
  MessageSquare,
  Link2,
  Mail,
  Share2,
  Image,
  Target,
  Store,
  Truck,
  RotateCcw,
  Scale,
  FileImage,
  Instagram,
  ShoppingBag,
  ImagePlus,
  Video,
  Settings,
  BarChart3,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useParallax';

const services = [
  {
    id: 'desarrollo',
    icon: Code2,
    title: 'Desarrollo Web y Automatización',
    description:
      'Soluciones personalizadas para optimizar tus procesos online y mejorar la eficiencia.',
    color: 'from-blue-500 to-cyan-500',
    features: [
      {
        icon: Globe,
        title: 'Desarrollo de Webs y Landing Pages',
        description:
          'Creación de páginas web, tiendas online y landing pages optimizadas para mejorar la conversión.',
      },
      {
        icon: Bot,
        title: 'Automatización de Procesos',
        description:
          'Integración de APIs y herramientas como n8n para automatizar tareas repetitivas.',
      },
      {
        icon: MessageSquare,
        title: 'Chatbots y Atención al Cliente',
        description:
          'Creación e integración de chatbots para mejorar la atención al cliente.',
      },
      {
        icon: Link2,
        title: 'Integración de Plataformas',
        description:
          'Conexión de herramientas y sistemas para mejorar la conectividad en las operaciones.',
      },
    ],
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing Digital y Comunicación',
    description:
      'Impulsa tu presencia online y maximiza la conversión con campañas efectivas.',
    color: 'from-purple-500 to-pink-500',
    features: [
      {
        icon: Mail,
        title: 'Gestión de Email Marketing',
        description:
          'Campañas personalizadas con Klaviyo, Conectif, MailChimp y similares.',
      },
      {
        icon: Share2,
        title: 'Automatización de Redes Sociales',
        description:
          'Gestión y programación de publicaciones con Later, Metricool y n8n.',
      },
      {
        icon: Image,
        title: 'Creación de Contenido Visual',
        description:
          'Diseño gráfico, edición de imágenes y producción de videos promocionales.',
      },
      {
        icon: Target,
        title: 'Desarrollo de Embudos de Venta',
        description:
          'Landing pages y embudos optimizados para convertir visitantes en clientes.',
      },
    ],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce y Gestión de Envíos',
    description:
      'Mejora la experiencia de compra y optimiza la logística de tu tienda online.',
    color: 'from-orange-500 to-yellow-500',
    features: [
      {
        icon: Store,
        title: 'Desarrollo de Tiendas Online',
        description:
          'Implementación en PrestaShop, Shopify, WooCommerce con experiencia de compra fluida.',
      },
      {
        icon: Truck,
        title: 'Gestión de Envíos',
        description:
          'Integración de ShippyPro, Outvio y otras soluciones logísticas.',
      },
      {
        icon: RotateCcw,
        title: 'Gestión de Devoluciones',
        description:
          'Implementación de ITS Rever, Outvio para gestión eficiente de devoluciones.',
      },
      {
        icon: Scale,
        title: 'Soporte Legal',
        description:
          'Abogados expertos que asesoran y dan seguimiento a tu e-commerce.',
      },
    ],
  },
  {
    id: 'diseno',
    icon: Palette,
    title: 'Diseño Gráfico y Creatividad',
    description:
      'Potencia la imagen de tu marca con soluciones visuales profesionales.',
    color: 'from-pink-500 to-rose-500',
    features: [
      {
        icon: FileImage,
        title: 'Diseño de Material Publicitario',
        description:
          'Banners, flyers, carteles y recursos para campañas online y offline.',
      },
      {
        icon: Instagram,
        title: 'Diseño para Redes Sociales',
        description:
          'Gráficos visuales adaptados a Instagram, Facebook, LinkedIn.',
      },
      {
        icon: ShoppingBag,
        title: 'Diseño para E-commerce',
        description:
          'Imágenes de productos, banners promocionales y elementos visuales.',
      },
      {
        icon: ImagePlus,
        title: 'Edición de Imágenes',
        description:
          'Mejora y retoque de fotografías para presentación profesional.',
      },
      {
        icon: Video,
        title: 'Motion Graphics',
        description:
          'Animaciones para pantallas digitales en tiendas físicas.',
      },
    ],
  },
  {
    id: 'consultoria',
    icon: Headphones,
    title: 'Soporte y Consultoría Técnica',
    description:
      'Asesoría e implementación de soluciones tecnológicas para tu negocio.',
    color: 'from-green-500 to-emerald-500',
    features: [
      {
        icon: Settings,
        title: 'Consultoría Tecnológica',
        description:
          'Asesoramiento en implementación de herramientas y soluciones digitales.',
      },
      {
        icon: BarChart3,
        title: 'Análisis de Datos',
        description:
          'Generación de informes y seguimiento del rendimiento.',
      },
      {
        icon: Wrench,
        title: 'Soporte Técnico Integral',
        description:
          'Mantenimiento y resolución de incidencias en sistemas web.',
      },
    ],
  },
];

export function Servicios() {
  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 geometric-bg opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium mb-4 block">
              Servicios
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Soluciones digitales{' '}
              <span className="gradient-text">completas</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ofrecemos un catálogo integral de servicios para optimizar,
              automatizar y hacer crecer tu negocio digital.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-card/50' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Service header */}
              <div className="animate-on-scroll">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg mb-6`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {service.description}
                </p>
                <Button asChild>
                  <Link to="/contacto">
                    Solicitar información
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Service features */}
              <div className="grid gap-4">
                {service.features.map((feature, featureIndex) => (
                  <Card
                    key={feature.title}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${featureIndex * 100}ms` }}
                  >
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-18">
                      <CardDescription className="text-base ml-14">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
        <div className="container mx-auto px-4 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas un servicio personalizado?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Las herramientas mencionadas son ejemplos y pueden ser sustituidas
            según las necesidades de tu proyecto.
          </p>
          <Button asChild size="lg">
            <Link to="/contacto">
              Contactar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
