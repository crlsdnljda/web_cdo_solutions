import { useState } from 'react';
import { X, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { company } from '@/config/company';
import { useContactModal } from '@/context/ContactModalContext';
import { sendContactEmail } from '@/services/email';

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

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
    setError(null);

    const result = await sendContactEmail(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    });
  };

  const handleClose = () => {
    closeModal();
    // Reset form after modal closes
    setTimeout(() => {
      handleReset();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with strong blur */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal - Centered with flexbox */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold">Contactar</h2>
                  <p className="text-sm text-muted-foreground">
                    Cuéntanos sobre tu proyecto
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Info cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-medium text-sm">Horario</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {company.schedule}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <span className="font-medium text-sm block mb-2">Tarifas</span>
                      <p className="text-xs text-muted-foreground">
                        Cobro por <span className="text-primary font-medium">hora trabajada</span>.
                        Precio en contrato.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Gracias por contactar con nosotros. Te responderemos lo
                      antes posible.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline" onClick={handleReset}>
                        Enviar otro mensaje
                      </Button>
                      <Button onClick={handleClose}>
                        Cerrar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="modal-name"
                          className="block text-sm font-medium mb-2"
                        >
                          Nombre *
                        </label>
                        <input
                          type="text"
                          id="modal-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="modal-email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="modal-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="modal-company"
                          className="block text-sm font-medium mb-2"
                        >
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="modal-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                          placeholder="Tu empresa"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="modal-service"
                          className="block text-sm font-medium mb-2"
                        >
                          Servicio
                        </label>
                        <select
                          id="modal-service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                        >
                          <option value="">Selecciona</option>
                          <option value="desarrollo">Desarrollo Web</option>
                          <option value="marketing">Marketing Digital</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="diseno">Diseño Gráfico</option>
                          <option value="consultoria">Consultoría</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="modal-message"
                        className="block text-sm font-medium mb-2"
                      >
                        Mensaje *
                      </label>
                      <textarea
                        id="modal-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm"
                        placeholder="Cuéntanos sobre tu proyecto..."
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
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
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
