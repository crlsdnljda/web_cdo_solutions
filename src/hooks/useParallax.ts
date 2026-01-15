import { useEffect, useRef, useState } from 'react';
import {
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useVelocity,
} from 'motion/react';

type ScrollOffsetValue = 'start' | 'end' | 'center' | `${number}` | `${number}px` | `${number}%`;
type ScrollOffset = `${ScrollOffsetValue} ${ScrollOffsetValue}`;

// Hook para parallax con scroll suave
export function useParallaxScroll(
  offset: [ScrollOffset, ScrollOffset] = ['start end', 'end start']
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  return { ref, scrollYProgress };
}

// Hook para efecto parallax en Y
export function useParallaxY(speed: number = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return { ref, y: smoothY };
}

// Hook para efecto de escala con scroll
export function useParallaxScale(minScale: number = 0.8, maxScale: number = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return { ref, scale: smoothScale };
}

// Hook para efecto de opacidad con scroll
export function useParallaxOpacity() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return { ref, opacity: smoothOpacity };
}

// Hook para rotación con scroll
export function useParallaxRotate(degrees: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return { ref, rotate: smoothRotate };
}

// Hook combinado para múltiples efectos
export function useParallaxCombined(config: {
  ySpeed?: number;
  scaleRange?: [number, number];
  rotateRange?: [number, number];
} = {}) {
  const { ySpeed = 50, scaleRange = [0.95, 1], rotateRange = [-5, 5] } = config;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-ySpeed, ySpeed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return { ref, y: smoothY, scale: smoothScale, rotate: smoothRotate };
}

// Hook para detectar si está en viewport
export function useInViewport(options?: { once?: boolean; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.3,
  });

  return { ref, isInView };
}

// Hook para animaciones al entrar en viewport (compatibilidad)
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Hook para parallax con mouse
export function useMouseParallax(intensity: number = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return position;
}

// Mantener compatibilidad con useParallax anterior
export function useParallax(
  ref: React.RefObject<HTMLElement>,
  options: { speed?: number; direction?: 'up' | 'down' } = {}
) {
  const [offset, setOffset] = useState(0);
  const { speed = 0.5, direction = 'up' } = options;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;

      if (relativeScroll > 0) {
        const newOffset = relativeScroll * speed * (direction === 'up' ? -1 : 1);
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed, direction]);

  return offset;
}

// Hook para velocidad de scroll
export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { scrollY, scrollVelocity, smoothVelocity };
}

// Hook para skew basado en velocidad de scroll
export function useVelocitySkew(factor: number = 0.002) {
  const { smoothVelocity } = useScrollVelocity();
  const skewY = useTransform(smoothVelocity, [-3000, 0, 3000], [-factor * 3000, 0, factor * 3000]);
  const skewYClamped = useTransform(skewY, (v) => Math.max(-15, Math.min(15, v)));

  return skewYClamped;
}

// Hook para escala basada en velocidad
export function useVelocityScale(minScale: number = 0.98, maxScale: number = 1.02) {
  const { smoothVelocity } = useScrollVelocity();
  const scale = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [minScale, 1, maxScale]
  );

  return scale;
}

// Hook para dirección de scroll
export function useScrollDirection() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle');

  useEffect(() => {
    const unsubscribe = scrollVelocity.on('change', (velocity) => {
      if (velocity > 50) {
        setDirection('down');
      } else if (velocity < -50) {
        setDirection('up');
      } else {
        setDirection('idle');
      }
    });

    return () => unsubscribe();
  }, [scrollVelocity]);

  return { direction, scrollVelocity };
}

// Hook para texto con efecto de velocidad (stretch)
export function useVelocityText(baseScale: number = 1) {
  const { smoothVelocity } = useScrollVelocity();

  const scaleX = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [baseScale * 0.95, baseScale, baseScale * 0.95]
  );

  const scaleY = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [baseScale * 1.05, baseScale, baseScale * 1.05]
  );

  return { scaleX, scaleY };
}

// Hook combinado de velocidad con múltiples efectos
export function useVelocityEffects(config: {
  skewFactor?: number;
  scaleFactor?: number;
  opacityFactor?: number;
} = {}) {
  const { skewFactor = 0.003, scaleFactor = 0.02, opacityFactor = 0.0002 } = config;
  const { smoothVelocity } = useScrollVelocity();

  const skewY = useTransform(smoothVelocity, (v) => {
    const skew = v * skewFactor;
    return Math.max(-10, Math.min(10, skew));
  });

  const scale = useTransform(smoothVelocity, (v) => {
    const s = 1 + Math.abs(v) * scaleFactor * 0.0001;
    return Math.min(1.05, s);
  });

  const opacity = useTransform(smoothVelocity, (v) => {
    const o = 1 - Math.abs(v) * opacityFactor;
    return Math.max(0.7, o);
  });

  return { skewY, scale, opacity };
}
