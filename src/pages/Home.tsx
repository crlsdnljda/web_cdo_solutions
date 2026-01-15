import { useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Services } from '@/components/sections/Services';
import { ProductsPreview } from '@/components/sections/ProductsPreview';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Partners } from '@/components/sections/Partners';
import { CTA } from '@/components/sections/CTA';
import { useScrollAnimation } from '@/hooks/useParallax';
import { SEO, getHomePageSchemas } from '@/components/seo';

export function Home() {
  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <SEO schemas={getHomePageSchemas()} />
      <Hero />
      <TechMarquee />
      <Services />
      <ProductsPreview />
      <HowWeWork />
      <Partners />
      <CTA />
    </main>
  );
}
