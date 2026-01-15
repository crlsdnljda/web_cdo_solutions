import { useEffect, useState, useCallback, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

export function useParallax(ref: RefObject<HTMLElement>, options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options;
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const scrolled = window.scrollY;
    const elementTop = rect.top + scrolled;
    const relativeScroll = scrolled - elementTop + window.innerHeight;

    if (relativeScroll > 0) {
      const newOffset = relativeScroll * speed * (direction === 'up' ? -1 : 1);
      setOffset(newOffset);
    }
  }, [ref, speed, direction]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return offset;
}

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
