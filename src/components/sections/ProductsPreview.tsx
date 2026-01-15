import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageCircle,
  Globe,
  FileText,
  Truck,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Button } from '@/components/ui/button';

const products = [
  { id: 'mautic', name: 'Mautic E-commerce', icon: Mail, color: 'from-orange-500 to-red-500' },
  { id: 'whatsapp', name: 'WhatsApp Bots', icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
  { id: 'vuki', name: 'Vuki.es', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { id: 'ticketbai', name: 'API TicketBAI', icon: FileText, color: 'from-purple-500 to-violet-500' },
  { id: 'verifactu', name: 'API Verifactu', icon: ShoppingCart, color: 'from-pink-500 to-rose-500' },
  { id: 'transportistas', name: 'App Transportistas', icon: Truck, color: 'from-amber-500 to-yellow-500' },
];

export function ProductsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: smoothBackgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="text-primary font-medium mb-4 block"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Soluciones
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Nuestros <span className="gradient-text">Productos</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Herramientas propias diseñadas para impulsar tu e-commerce.
          </motion.p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {product.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button asChild size="lg">
            <Link to="/productos">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
