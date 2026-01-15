import { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'motion/react';

interface ScrollVelocityTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

export function ScrollVelocityText({
  children,
  baseVelocity = 2,
  className = '',
}: ScrollVelocityTextProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(velocityFactor, (v) => {
    const direction = v < 0 ? -1 : 1;
    baseX.current += direction * baseVelocity + v * 0.01;
    return `${baseX.current % 100}%`;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className={`flex ${className}`} style={{ x }}>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
      </motion.div>
    </div>
  );
}

// Marquee infinito que responde a la velocidad del scroll
export function VelocityMarquee({
  children,
  direction = 'left',
  speed = 20,
  className = '',
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  const baseSpeed = direction === 'left' ? -speed : speed;

  const x = useTransform(smoothVelocity, [-1000, 0, 1000], [
    `${baseSpeed * 2}%`,
    '0%',
    `${-baseSpeed * 2}%`,
  ]);

  return (
    <div className="overflow-hidden">
      <motion.div
        className={`flex gap-8 ${className}`}
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 50 / speed * 10,
            ease: 'linear',
          },
        }}
        style={{ x }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Sección con efecto skew basado en velocidad
export function VelocitySection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 100,
  });

  const skewY = useTransform(smoothVelocity, [-2000, 0, 2000], [-3, 0, 3]);
  const scale = useTransform(smoothVelocity, (v) => 1 + Math.abs(v) * 0.00005);
  const scaleClamped = useTransform(scale, (s) => Math.min(1.02, s));

  return (
    <motion.div
      className={className}
      style={{
        skewY,
        scale: scaleClamped,
      }}
    >
      {children}
    </motion.div>
  );
}
