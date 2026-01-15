import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { ContactModal } from '@/components/ContactModal';
import { CookieConsent } from '@/components/CookieConsent';
import { ContactModalProvider } from '@/context/ContactModalContext';
import { Home } from '@/pages/Home';
import { Servicios } from '@/pages/Servicios';
import { Productos } from '@/pages/Productos';
import { Nosotros } from '@/pages/Nosotros';
import { Privacidad } from '@/pages/Privacidad';
import { Terminos } from '@/pages/Terminos';
import { Cookies } from '@/pages/Cookies';

function App() {
  const location = useLocation();

  return (
    <ContactModalProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/servicios"
              element={
                <PageTransition>
                  <Servicios />
                </PageTransition>
              }
            />
            <Route
              path="/productos"
              element={
                <PageTransition>
                  <Productos />
                </PageTransition>
              }
            />
            <Route
              path="/nosotros"
              element={
                <PageTransition>
                  <Nosotros />
                </PageTransition>
              }
            />
            <Route
              path="/privacidad"
              element={
                <PageTransition>
                  <Privacidad />
                </PageTransition>
              }
            />
            <Route
              path="/terminos"
              element={
                <PageTransition>
                  <Terminos />
                </PageTransition>
              }
            />
            <Route
              path="/cookies"
              element={
                <PageTransition>
                  <Cookies />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />
        <ContactModal />
        <CookieConsent />
      </div>
    </ContactModalProvider>
  );
}

export default App;
