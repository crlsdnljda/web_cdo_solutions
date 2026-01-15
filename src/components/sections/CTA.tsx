import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMouseParallax } from '@/hooks/useParallax';

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosition = useMouseParallax(0.015);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
        }}
      />

      {/* Floating elements */}
      <div
        className="absolute top-20 left-20 w-20 h-20 border border-primary/30 rounded-xl rotate-12"
        style={{
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px) rotate(12deg)`,
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-16 h-16 border border-primary/20 rounded-full"
        style={{
          transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-8">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para{' '}
            <span className="gradient-text">transformar tu negocio</span>?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Cuéntanos tu proyecto y te ayudaremos a encontrar la mejor solución
            para tu empresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="group glow">
              <Link to="/contacto">
                Solicitar presupuesto
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="mailto:info@cdo.solutions">info@cdo.solutions</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
