import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { company } from '@/config/company';
import { useContactModal } from '@/context/ContactModalContext';
import { SEO, getLegalPageSchemas } from '@/components/seo';

export function Cookies() {
  const { openModal } = useContactModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <SEO
        title="Política de Cookies"
        description="Información sobre el uso de cookies en cdo.solutions."
        canonical="https://cdo.solutions/cookies"
        schemas={getLegalPageSchemas('cookies')}
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Política de Cookies
            </h1>

            <div className="prose prose-invert prose-green max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  1. ¿Qué son las cookies?
                </h2>
                <p>
                  Las cookies son pequeños archivos de texto que los sitios web
                  almacenan en tu dispositivo (ordenador, tablet o móvil) cuando
                  los visitas. Permiten que el sitio web recuerde tus acciones y
                  preferencias durante un período de tiempo.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  2. ¿Quién utiliza las cookies?
                </h2>
                <p>
                  Este sitio web es propiedad de {company.legalName}, con CIF{' '}
                  {company.cif} y domicilio en {company.address}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  3. Tipos de cookies que utilizamos
                </h2>

                <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                  Cookies técnicas (necesarias)
                </h3>
                <p>
                  Son esenciales para el funcionamiento básico del sitio web. Sin
                  estas cookies, el sitio no puede funcionar correctamente.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestión de sesión de usuario</li>
                  <li>Preferencias de idioma</li>
                  <li>Aceptación de cookies</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
                  Cookies analíticas
                </h3>
                <p>
                  Nos permiten medir y analizar el comportamiento de los usuarios
                  en nuestro sitio web de forma anónima. Esta información nos ayuda
                  a mejorar la experiencia de navegación.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Páginas visitadas</li>
                  <li>Tiempo de permanencia</li>
                  <li>Origen del tráfico</li>
                  <li>Dispositivo utilizado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  4. Duración de las cookies
                </h2>
                <p>
                  Según su duración, las cookies pueden ser:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Cookies de sesión:</strong>{' '}
                    Se eliminan cuando cierras el navegador
                  </li>
                  <li>
                    <strong className="text-foreground">Cookies persistentes:</strong>{' '}
                    Permanecen en tu dispositivo durante un período determinado o
                    hasta que las elimines manualmente
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  5. Gestión de cookies
                </h2>
                <p>
                  Puedes configurar tu navegador para rechazar todas las cookies o
                  para que te avise cuando se envía una cookie. Sin embargo, si
                  rechazas las cookies técnicas, algunas funciones del sitio web
                  pueden no funcionar correctamente.
                </p>
                <p className="mt-4">
                  Puedes gestionar las cookies en los siguientes navegadores:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  6. Actualización de la política
                </h2>
                <p>
                  Esta política de cookies puede ser actualizada en cualquier
                  momento para adaptarse a cambios legislativos o a cambios en
                  nuestras prácticas. Te recomendamos revisar esta página
                  periódicamente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  7. Más información
                </h2>
                <p>
                  Si tienes dudas sobre nuestra política de cookies, puedes
                  contactarnos a través del{' '}
                  <button onClick={openModal} className="text-primary hover:underline cursor-pointer">
                    formulario de contacto
                  </button>
                  .
                </p>
                <p className="mt-4">
                  También puedes consultar nuestra{' '}
                  <Link to="/privacidad" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>{' '}
                  para más información sobre cómo tratamos tus datos personales.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
