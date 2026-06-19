'use client'

import { Toaster } from 'react-hot-toast'
import Navbar       from './Navbar'
import Hero         from './Hero'
import Services     from './Services'
import WhyUs        from './WhyUs'
import Process      from './Process'
import TechStack    from './TechStack'
import Testimonials from './Testimonials'
import Team         from './Team'
import Contact      from './Contact'
import Footer       from './Footer'

const HomePage = () => (
  <>
    <Navbar />

    <main id="main-content">
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <TechStack />
      <Testimonials />
      <Team />
      <Contact />
    </main>

    <Footer />

    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--bg-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
        },
        success: {
          iconTheme: { primary: '#00C9A7', secondary: '#07070F' },
        },
      }}
    />
  </>
)

export default HomePage
