
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import InteractiveMotion from './components/InteractiveMotion'
import RollingCookie from './components/RollingCookie'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Story from './pages/Story'
import Journal from './pages/Journal'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

export default function App() {
  const location = useLocation()

  return (
    <>
      {/* Global animations: available across all pages */}
      <InteractiveMotion />
      <RollingCookie />

      {/* Main navigation */}
      <Navbar />

      {/* Page routes and transitions */}
      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/shop"
            element={
              <PageTransition>
                <Shop />
              </PageTransition>
            }
          />

          <Route
            path="/product/:id"
            element={
              <PageTransition>
                <ProductDetails />
              </PageTransition>
            }
          />

          <Route
            path="/story"
            element={
              <PageTransition>
                <Story />
              </PageTransition>
            }
          />

          <Route
            path="/journal"
            element={
              <PageTransition>
                <Journal />
              </PageTransition>
            }
          />

          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />

          <Route
            path="/cart"
            element={
              <PageTransition>
                <Cart />
              </PageTransition>
            }
          />

          {/* 404 page */}
          <Route
            path="*"
            element={
              <PageTransition>
                <main className="not-found section-pad">
                  <p className="eyebrow">
                    404 — A LITTLE DETOUR
                  </p>

                  <h1>This page is still brewing.</h1>

                  <a
                    className="button button-dark"
                    href="/"
                  >
                    Back home
                  </a>
                </main>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </>
  )
}
