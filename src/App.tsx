import { Routes, Route } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { Servicios } from '@/pages/Servicios';
import { Nosotros } from '@/pages/Nosotros';
import { Contacto } from '@/pages/Contacto';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />

      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        declineButtonText="Rechazar"
        enableDeclineButton
        cookieName="cdo-solutions-consent"
        style={{
          background: 'hsl(0 0% 6%)',
          borderTop: '1px solid hsl(0 0% 15%)',
          padding: '1rem',
        }}
        buttonStyle={{
          background: 'hsl(151 100% 42%)',
          color: 'black',
          fontWeight: '500',
          borderRadius: '0.5rem',
          padding: '0.5rem 1.5rem',
        }}
        declineButtonStyle={{
          background: 'transparent',
          border: '1px solid hsl(0 0% 30%)',
          color: 'hsl(0 0% 64%)',
          fontWeight: '500',
          borderRadius: '0.5rem',
          padding: '0.5rem 1.5rem',
        }}
        expires={365}
      >
        <span className="text-sm">
          Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.{' '}
          <a
            href="/cookies"
            className="text-primary hover:underline"
          >
            Más información
          </a>
        </span>
      </CookieConsent>
    </div>
  );
}

export default App;
