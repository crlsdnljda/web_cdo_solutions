import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from 'motion/react';

const technologies = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Mautic',
  'WooCommerce',
  'Prestashop',
  'Shopify',
  'WhatsApp API',
  'TicketBAI',
  'Verifactu',
  'AWS',
  'Docker',
  'PostgreSQL',
];

const technologiesReversed = [...technologies].reverse();

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 100,
  });

  // Skew the whole section based on scroll velocity
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [3, 0, -3]);
  const scaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.98, 1, 0.98]);

  // Update speed based on velocity
  useEffect(() => {
    const unsubscribe = smoothVelocity.on('change', (velocity) => {
      const multiplier = 1 + Math.abs(velocity) * 0.001;
      setSpeedMultiplier(Math.min(3, multiplier));
    });
    return () => unsubscribe();
  }, [smoothVelocity]);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative overflow-hidden border-y border-border/50 bg-card/30"
    >
      {/* Background gradient for fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <motion.div style={{ skewX, scaleY }} className="space-y-4">
        {/* First row - moving left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30 / speedMultiplier,
                ease: 'linear',
              },
            }}
          >
            {[...technologies, ...technologies].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground/20 hover:text-primary/40 transition-colors cursor-default flex-shrink-0"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Second row - moving right (different speed) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25 / speedMultiplier,
                ease: 'linear',
              },
            }}
          >
            {[...technologiesReversed, ...technologiesReversed].map((tech, i) => (
              <span
                key={`${tech}-rev-${i}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-primary/30 hover:text-primary/60 transition-colors cursor-default flex-shrink-0"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
