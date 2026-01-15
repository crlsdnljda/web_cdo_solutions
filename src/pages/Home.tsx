import { useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Partners } from '@/components/sections/Partners';
import { CTA } from '@/components/sections/CTA';
import { useScrollAnimation } from '@/hooks/useParallax';

export function Home() {
  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <Services />
      <HowWeWork />
      <Partners />
      <CTA />
    </main>
  );
}
