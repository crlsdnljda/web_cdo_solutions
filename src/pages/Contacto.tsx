import { useEffect, useState, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation, useMouseParallax } from '@/hooks/useParallax';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@cdo.solutions',
    href: 'mailto:info@cdo.solutions',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: '8:00 - 23:00h (L-V)',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'España',
    href: null,
  },
];

export function Contacto() {
  const formRef = useRef<HTMLFormElement>(null);
  const mousePosition = useMouseParallax(0.015);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 geometric-bg opacity-20" />

        {/* Floating elements */}
        <div
          className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-medium mb-4 block">
              Contacto
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hablemos de tu{' '}
              <span className="gradient-text">proyecto</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor
              solución para tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="animate-on-scroll">
              <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-medium">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing info */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Tarifas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Entre <span className="text-primary font-medium">30€ y 60€/h</span> según
                    la complejidad y el volumen de trabajo.
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    *Descuentos para proyectos a largo plazo
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 animate-on-scroll [animation-delay:200ms]">
              <Card>
                <CardContent className="p-6 md:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">
                        ¡Mensaje enviado!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Gracias por contactar con nosotros. Te responderemos lo
                        antes posible.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            company: '',
                            service: '',
                            message: '',
                          });
                        }}
                      >
                        Enviar otro mensaje
                      </Button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                          >
                            Nombre *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium mb-2"
                          >
                            Empresa
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium mb-2"
                          >
                            Servicio de interés
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          >
                            <option value="">Selecciona un servicio</option>
                            <option value="desarrollo">
                              Desarrollo Web y Automatización
                            </option>
                            <option value="marketing">
                              Marketing Digital
                            </option>
                            <option value="ecommerce">
                              E-commerce y Envíos
                            </option>
                            <option value="diseno">Diseño Gráfico</option>
                            <option value="consultoria">
                              Consultoría Técnica
                            </option>
                            <option value="otro">Otro</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                        >
                          Mensaje *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                          placeholder="Cuéntanos sobre tu proyecto..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
