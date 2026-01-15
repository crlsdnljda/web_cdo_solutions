import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

const COOKIE_CONSENT_KEY = 'cdo-cookie-consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 md:p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Cookie className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    Usamos cookies
                  </h3>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación,
                  analizar el tráfico del sitio y personalizar el contenido.
                  {!isExpanded && (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-primary hover:underline ml-1"
                    >
                      Más información
                    </button>
                  )}
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-muted/50 rounded-xl space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">
                            Cookies esenciales
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">
                            Cookies analíticas
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Nos ayudan a entender cómo interactúas con el sitio para mejorarlo.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">
                            Cookies de preferencias
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Guardan tus preferencias como el tema y el idioma.
                          </p>
                        </div>
                        <Link
                          to="/cookies"
                          className="inline-block text-xs text-primary hover:underline mt-2"
                        >
                          Ver política de cookies completa →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="flex-1 sm:flex-none"
                >
                  Rechazar
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none"
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
