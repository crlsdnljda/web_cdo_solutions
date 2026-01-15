import { useRef } from 'react';
import { Clock, Euro, Award, Zap, Users, TrendingUp } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'motion/react';

const features = [
  {
    icon: Clock,
    title: 'Horario Extendido',
    description: 'Atención de 8:00 a 23:00h de lunes a viernes.',
  },
  {
    icon: Euro,
    title: 'Facturación por Horas',
    description: 'Cobramos por hora trabajada. Precio acordado en contrato.',
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
    title: 'Proyectos a Medida',
    description: 'Condiciones especiales para colaboraciones a largo plazo.',
  },
  {
    icon: TrendingUp,
    title: 'Control de Horas',
    description: 'Registro en tiempo real de horas y tareas realizadas.',
  },
];

export function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const leftBlobY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const rightBlobY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const smoothLeftY = useSpring(leftBlobY, { stiffness: 100, damping: 30 });
  const smoothRightY = useSpring(rightBlobY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/50 relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ y: smoothLeftY }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ y: smoothRightY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="flex gap-4"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex-shrink-0">
        <motion.div
          className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <feature.icon className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
      </div>
    </motion.div>
  );
}
