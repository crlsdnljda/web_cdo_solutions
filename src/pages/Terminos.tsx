import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { company } from '@/config/company';
import { useContactModal } from '@/context/ContactModalContext';
import { SEO, getLegalPageSchemas } from '@/components/seo';

export function Terminos() {
  const { openModal } = useContactModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <SEO
        title="Términos y Condiciones"
        description="Términos y condiciones de uso de los servicios de cdo.solutions."
        canonical="https://cdo.solutions/terminos"
        schemas={getLegalPageSchemas('terminos')}
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
              Términos y Condiciones
            </h1>

            <div className="prose prose-invert prose-green max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  1. Información general
                </h2>
                <p>
                  El presente documento establece los términos y condiciones de uso
                  del sitio web {company.websiteUrl}, propiedad de {company.legalName},
                  con CIF {company.cif} y domicilio en {company.address}.
                </p>
                <p>
                  El acceso y uso de este sitio web implica la aceptación expresa
                  de todos los términos y condiciones aquí establecidos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  2. Servicios ofrecidos
                </h2>
                <p>
                  {company.legalName} ofrece servicios de desarrollo web, marketing
                  digital, e-commerce, diseño gráfico y consultoría técnica para
                  empresas de comercio electrónico.
                </p>
                <p>
                  Los servicios específicos, plazos y condiciones económicas se
                  establecerán en contratos individuales con cada cliente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  3. Condiciones económicas
                </h2>
                <p>
                  Los servicios se facturan por hora trabajada. El precio por hora
                  se establece en el contrato según las características del proyecto.
                </p>
                <p>
                  Todos los precios indicados no incluyen IVA, salvo que se indique
                  expresamente lo contrario.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  4. Propiedad intelectual
                </h2>
                <p>
                  Todos los contenidos de este sitio web, incluyendo textos, imágenes,
                  logotipos, diseños y software, son propiedad de {company.legalName}
                  o de terceros que han autorizado su uso.
                </p>
                <p>
                  Queda prohibida la reproducción, distribución o modificación de
                  cualquier contenido sin autorización expresa por escrito.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  5. Responsabilidades
                </h2>
                <p>
                  {company.legalName} se compromete a prestar sus servicios con la
                  máxima diligencia y profesionalidad.
                </p>
                <p>
                  No nos hacemos responsables de:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Interrupciones temporales del servicio por mantenimiento o
                    causas técnicas
                  </li>
                  <li>
                    Daños derivados del uso inadecuado de los servicios contratados
                  </li>
                  <li>
                    Contenidos de sitios web de terceros enlazados desde nuestra web
                  </li>
                  <li>
                    Resultados comerciales derivados del uso de nuestros servicios
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  6. Confidencialidad
                </h2>
                <p>
                  Nos comprometemos a mantener la confidencialidad de toda la
                  información proporcionada por nuestros clientes en el desarrollo
                  de los proyectos.
                </p>
                <p>
                  Esta obligación de confidencialidad permanecerá vigente incluso
                  después de finalizada la relación comercial.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  7. Resolución de conflictos
                </h2>
                <p>
                  Para cualquier controversia derivada de estos términos y condiciones,
                  las partes se someten a los juzgados y tribunales de la ciudad
                  donde tiene su domicilio {company.legalName}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  8. Modificaciones
                </h2>
                <p>
                  {company.legalName} se reserva el derecho de modificar estos
                  términos y condiciones en cualquier momento. Los cambios entrarán
                  en vigor desde su publicación en esta página.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  9. Contacto
                </h2>
                <p>
                  Para cualquier consulta sobre estos términos y condiciones, puedes
                  contactarnos a través del{' '}
                  <button onClick={openModal} className="text-primary hover:underline cursor-pointer">
                    formulario de contacto
                  </button>{' '}
                  de nuestra web.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
