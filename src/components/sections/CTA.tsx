import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useContactModal } from '@/context/ContactModalContext';

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-100px' });
  const { openModal } = useContactModal();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const smoothGlowScale = useSpring(glowScale, { stiffness: 100, damping: 30 });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const smoothFloatY1 = useSpring(floatY1, { stiffness: 100, damping: 30 });
  const smoothFloatY2 = useSpring(floatY2, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"
        style={{ y: smoothBackgroundY }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"
        style={{ scale: smoothGlowScale }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 border border-primary/30 rounded-xl"
        style={{ y: smoothFloatY1, rotate: 12 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 border border-primary/20 rounded-full"
        style={{ y: smoothFloatY2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ¿Listo para{' '}
            <span className="gradient-text">transformar tu negocio</span>?
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Cuéntanos tu proyecto y te ayudaremos a encontrar la mejor solución
            para tu empresa.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button size="xl" className="group glow" onClick={openModal}>
              Solicitar presupuesto
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
