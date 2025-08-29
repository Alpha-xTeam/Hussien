'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import { useScrollAnimation } from '@/utils/useScrollAnimation'

export default function Home() {
  useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="relative">
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
