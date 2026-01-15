import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { company } from '@/config/company';
import { useContactModal } from '@/context/ContactModalContext';

const footerLinks = {
  servicios: [
    { label: 'Desarrollo Web', href: '/servicios#desarrollo' },
    { label: 'Marketing Digital', href: '/servicios#marketing' },
    { label: 'E-commerce', href: '/servicios#ecommerce' },
    { label: 'Diseño Gráfico', href: '/servicios#diseno' },
    { label: 'Consultoría', href: '/servicios#consultoria' },
  ],
  productos: [
    { label: 'Mautic E-commerce', href: '/productos#mautic' },
    { label: 'WhatsApp Bots', href: '/productos#whatsapp-bots' },
    { label: 'Vuki.es', href: '/productos#vuki' },
    { label: 'API TicketBAI', href: '/productos#ticketbai' },
    { label: 'API Verifactu', href: '/productos#verifactu' },
    { label: 'App Transportistas', href: '/productos#transportistas' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '/nosotros' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '/privacidad' },
    { label: 'Términos y Condiciones', href: '/terminos' },
    { label: 'Cookies', href: '/cookies' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openModal } = useContactModal();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt={company.name}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-primary">
                {company.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Agencia de proyectos digitales. Soluciones integrales para
              empresas con tiendas online.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Productos</h3>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa y Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-foreground mb-4 mt-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Horario: {company.schedule}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{company.country}</span>
              </li>
            </ul>
            <button
              onClick={openModal}
              className="inline-block mt-4 text-sm text-primary hover:underline cursor-pointer"
            >
              Formulario de contacto →
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {company.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Agencia de Proyectos Digitales
          </p>
        </div>
      </div>
    </footer>
  );
}
