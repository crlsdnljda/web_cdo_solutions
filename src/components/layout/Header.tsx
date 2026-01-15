import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useContactModal } from '@/context/ContactModalContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/productos', label: 'Productos' },
  { href: '/nosotros', label: 'Nosotros' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useContactModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'bg-background border-b border-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              alt="cdo.solutions"
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl md:text-2xl font-bold text-primary hidden sm:block">
              cdo.solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-primary relative',
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <a href="https://crm.cdo.solutions/" target="_blank" rel="noopener noreferrer">
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar sesión
              </a>
            </Button>
            <Button size="sm" onClick={openModal}>
              Contactar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
          {/* Navigation Links */}
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-base font-medium py-3 px-2 rounded-lg transition-colors duration-200',
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-border my-3" />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button asChild variant="outline" size="lg" className="w-full justify-center">
              <a href="https://crm.cdo.solutions/" target="_blank" rel="noopener noreferrer">
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar sesión
              </a>
            </Button>
            <Button size="lg" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); openModal(); }}>
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
