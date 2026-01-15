import { useRef } from 'react';
import { Clock, Euro, Award, Zap, Users, TrendingUp } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';

const features = [
  {
    icon: Clock,
    title: 'Horario Extendido',
    description: 'Atención de 8:00 a 23:00h de lunes a viernes.',
  },
  {
    icon: Euro,
    title: 'Precio Transparente',
    description: 'Entre 30€ y 60€/h según complejidad. Sin sorpresas.',
  },
  {
    icon: Zap,
    title: 'Inicio Inmediato',
    description: 'Los proyectos inician tan pronto recibimos la orden.',
  },
  {
    icon: Award,
    title: 'Garantía de Formación',
    description: 'Formamos a tu equipo para que puedan continuar el trabajo.',
  },
  {
    icon: Users,
    title: 'Descuentos',
    description: 'Precios especiales para proyectos a largo plazo.',
  },
  {
    icon: TrendingUp,
    title: 'Control de Horas',
    description: 'Registro en tiempo real de horas y tareas realizadas.',
  },
];

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(sectionRef, { speed: 0.15, direction: 'down' });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/50 relative overflow-hidden"
    >
      {/* Parallax background element */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="text-primary font-medium mb-4 block">
            Metodología
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ¿Cómo <span className="gradient-text">trabajamos</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Nuestra metodología se centra en la eficiencia, transparencia y
            resultados medibles.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-4 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
