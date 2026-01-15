// API URL del backend - usa ruta relativa para proxy inverso
const API_URL = import.meta.env.VITE_API_URL || '';

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
 * Envía el formulario de contacto usando el backend API
 */
export async function sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company || '',
        message: `Servicio de interés: ${getServiceLabel(data.service)}\n\n${data.message}`,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Mensaje enviado correctamente',
      };
    }

    return {
      success: false,
      message: result.error || 'Error al enviar el mensaje',
    };
  } catch (error) {
    console.error('Error enviando email:', error);

    // En desarrollo, simular envío exitoso si el backend no está disponible
    if (import.meta.env.DEV) {
      console.log('Datos del formulario:', data);
      return {
        success: true,
        message: 'Modo desarrollo: Email simulado correctamente',
      };
    }

    return {
      success: false,
      message: 'Error de conexión. Inténtalo de nuevo más tarde.',
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
