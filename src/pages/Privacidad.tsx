import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { company } from '@/config/company';
import { SEO, getLegalPageSchemas } from '@/components/seo';

export function Privacidad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <SEO
        title="Política de Privacidad"
        description="Política de privacidad y protección de datos de cdo.solutions."
        canonical="https://cdo.solutions/privacidad"
        schemas={getLegalPageSchemas('privacidad')}
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
              Política de Privacidad
            </h1>

            <div className="prose prose-invert prose-green max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  1. Responsable del tratamiento
                </h2>
                <p>
                  <strong className="text-foreground">Identidad:</strong> {company.legalName}
                </p>
                <p>
                  <strong className="text-foreground">CIF:</strong> {company.cif}
                </p>
                <p>
                  <strong className="text-foreground">Dirección:</strong> {company.address}
                </p>
                <p>
                  <strong className="text-foreground">Sitio web:</strong> {company.websiteUrl}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  2. Datos que recopilamos
                </h2>
                <p>
                  Recopilamos la información que nos proporcionas directamente a través
                  de nuestro formulario de contacto:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nombre</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Nombre de la empresa (opcional)</li>
                  <li>Mensaje o consulta</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  3. Finalidad del tratamiento
                </h2>
                <p>Los datos personales que nos facilites serán utilizados para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responder a tus consultas y solicitudes</li>
                  <li>Enviarte información sobre nuestros servicios si lo has solicitado</li>
                  <li>Gestionar la relación comercial</li>
                  <li>Cumplir con las obligaciones legales aplicables</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  4. Base legal del tratamiento
                </h2>
                <p>
                  La base legal para el tratamiento de tus datos es el consentimiento
                  que nos otorgas al enviar el formulario de contacto, así como el
                  interés legítimo de {company.legalName} en atender tus consultas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  5. Conservación de los datos
                </h2>
                <p>
                  Los datos personales serán conservados mientras se mantenga la
                  relación comercial y durante el tiempo necesario para cumplir con
                  las obligaciones legales.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  6. Destinatarios de los datos
                </h2>
                <p>
                  No se cederán datos a terceros, salvo obligación legal. No se
                  realizan transferencias internacionales de datos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  7. Derechos del usuario
                </h2>
                <p>Puedes ejercer los siguientes derechos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-foreground">Acceso:</strong> conocer qué
                    datos personales tenemos sobre ti
                  </li>
                  <li>
                    <strong className="text-foreground">Rectificación:</strong> solicitar
                    la corrección de datos inexactos
                  </li>
                  <li>
                    <strong className="text-foreground">Supresión:</strong> solicitar
                    la eliminación de tus datos
                  </li>
                  <li>
                    <strong className="text-foreground">Oposición:</strong> oponerte al
                    tratamiento de tus datos
                  </li>
                  <li>
                    <strong className="text-foreground">Portabilidad:</strong> recibir
                    tus datos en un formato estructurado
                  </li>
                  <li>
                    <strong className="text-foreground">Limitación:</strong> solicitar
                    la limitación del tratamiento
                  </li>
                </ul>
                <p className="mt-4">
                  Para ejercer estos derechos, puedes contactarnos a través del
                  formulario de contacto de nuestra web.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  8. Seguridad
                </h2>
                <p>
                  {company.legalName} ha adoptado las medidas técnicas y organizativas
                  necesarias para garantizar la seguridad de los datos personales y
                  evitar su alteración, pérdida, tratamiento o acceso no autorizado.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  9. Modificaciones
                </h2>
                <p>
                  Nos reservamos el derecho de modificar esta política de privacidad
                  para adaptarla a novedades legislativas o jurisprudenciales. Los
                  cambios serán publicados en esta página.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
