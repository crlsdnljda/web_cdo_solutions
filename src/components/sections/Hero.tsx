import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMouseParallax } from '@/hooks/useParallax';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mousePosition = useMouseParallax(0.02);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 geometric-bg opacity-30" />

      {/* Floating geometric shapes with parallax */}
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-32 h-32 border border-primary/20 rounded-2xl rotate-12"
        style={{
          transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px) rotate(12deg)`,
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-primary/10 rounded-full"
        style={{
          transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Agencia de Proyectos Digitales
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in [animation-delay:100ms]">
            Transformamos tu{' '}
            <span className="gradient-text glow-text">negocio digital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:200ms]">
            Soluciones integrales para empresas con tiendas online. Optimizamos
            procesos, automatizamos tareas y potenciamos tu marketing digital.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:300ms]">
            <Button asChild size="xl" className="group">
              <Link to="/contacto">
                Empezar proyecto
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50 animate-fade-in [animation-delay:400ms]">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                5+
              </div>
              <div className="text-sm text-muted-foreground">
                Áreas de servicio
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                30+
              </div>
              <div className="text-sm text-muted-foreground">Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                8-23h
              </div>
              <div className="text-sm text-muted-foreground">Disponibilidad</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
