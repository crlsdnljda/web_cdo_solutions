import emailjs from '@emailjs/browser';

// Configuración de EmailJS desde variables de entorno
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

/**
 * Envía el formulario de contacto usando EmailJS
 */
export async function sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
  // Verificar que las credenciales estén configuradas
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS no está configurado. Configurar variables VITE_EMAILJS_* en .env');
    // En desarrollo, simular envío exitoso
    if (import.meta.env.DEV) {
      console.log('Datos del formulario:', data);
      return {
        success: true,
        message: 'Modo desarrollo: Email simulado correctamente',
      };
    }
    return {
      success: false,
      message: 'El servicio de email no está configurado',
    };
  }

  try {
    // Preparar los parámetros del template
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      company: data.company || 'No especificada',
      service: getServiceLabel(data.service),
      message: data.message,
      reply_to: data.email,
    };

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Email enviado correctamente',
      };
    }

    return {
      success: false,
      message: 'Error al enviar el email',
    };
  } catch (error) {
    console.error('Error enviando email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Convierte el valor del servicio a su etiqueta legible
 */
function getServiceLabel(service: string): string {
  const labels: Record<string, string> = {
    desarrollo: 'Desarrollo Web',
    marketing: 'Marketing Digital',
    ecommerce: 'E-commerce',
    diseno: 'Diseño Gráfico',
    consultoria: 'Consultoría',
    otro: 'Otro',
  };
  return labels[service] || service || 'No especificado';
}
