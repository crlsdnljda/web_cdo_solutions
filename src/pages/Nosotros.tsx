import { useEffect, useRef } from 'react';
import {
  Target,
  Users,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useMouseParallax } from '@/hooks/useParallax';
import { useContactModal } from '@/context/ContactModalContext';
import { SEO, getNosotrosPageSchemas } from '@/components/seo';

const values = [
  {
    icon: Target,
    title: 'Enfoque en Resultados',
    description:
      'Nos centramos en optimizar procesos y generar oportunidades de venta medibles.',
  },
  {
    icon: Zap,
    title: 'Eficiencia',
    description:
      'Automatizamos todo lo posible para mejorar la productividad de tu empresa.',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description:
      'Trabajamos con empresas de gran tamaño brindando soporte y optimización constante.',
  },
  {
    icon: Shield,
    title: 'Confidencialidad',
    description:
      'Mantenemos la discreción absoluta sobre las empresas con las que trabajamos.',
  },
];

const highlights = [
  'Optimización y automatización de procesos',
  'Campañas de marketing digital efectivas',
  'Experiencias visuales impactantes',
  'Tecnología de vanguardia',
  'Soporte continuo y formación',
];

export function Nosotros() {
  const heroRef = useRef<HTMLElement>(null);
  const mousePosition = useMouseParallax(0.02);
  const { openModal } = useContactModal();
  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <SEO
        title="Nosotros"
        description="Conoce a cdo.solutions, agencia especializada en soluciones digitales para e-commerce con enfoque en resultados."
        canonical="https://cdo.solutions/nosotros"
        schemas={getNosotrosPageSchemas()}
      />
      {/* Hero */}
      <section
        ref={heroRef}
        className="py-16 md:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 geometric-bg opacity-20" />

        {/* Floating elements */}
        <div
          className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-primary/10 rounded-2xl rotate-12"
          style={{
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px) rotate(12deg)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium mb-4 block">
              Sobre Nosotros
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Agencia de{' '}
              <span className="gradient-text">Proyectos Digitales</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              En cdo.solutions, ofrecemos soluciones integrales para empresas
              con tiendas online. Nuestro enfoque se centra en optimizar
              procesos, automatizar tareas, potenciar campañas de marketing
              digital y crear experiencias visuales impactantes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="text-primary font-medium mb-4 block">
                Nuestra Misión
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Optimizar y automatizar{' '}
                <span className="gradient-text">tu negocio</span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Nuestro objetivo es optimizar y automatizar todos los procesos
                posibles dentro de tu empresa para mejorar la eficiencia.
              </p>
              <p className="text-muted-foreground mb-8">
                En el área de marketing, nos enfocamos en crear oportunidades de
                venta y en mejorar la competitividad de tu empresa en relación a
                otras en el mercado.
              </p>

              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative animate-on-scroll [animation-delay:200ms]">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                    CDO
                  </div>
                  <div className="text-xl text-muted-foreground">
                    .solutions
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30 rounded-xl rotate-12" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
            <span className="text-primary font-medium mb-4 block">
              Nuestros Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Lo que nos <span className="gradient-text">define</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <span className="text-primary font-medium mb-4 block">
              Experiencia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Colaboramos con{' '}
              <span className="gradient-text">grandes empresas</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Colaboramos con empresas de gran tamaño, muchas con grandes
              facturaciones anuales y cuentan con un extenso recorrido en el
              mercado, a quienes brindamos soporte y optimización constante.
            </p>
            <p className="text-sm text-muted-foreground/60 italic">
              *No podemos dar información sobre las empresas con las que
              trabajamos por motivos de confidencialidad.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a
            alcanzar tus objetivos.
          </p>
          <Button size="lg" onClick={openModal}>
            Contactar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
