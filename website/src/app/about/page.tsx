'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useScrollAnimation } from '@/utils/useScrollAnimation'

export default function About() {
  useScrollAnimation()

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-16">
                <section className="py-32 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 scroll-fade-in-up">
                About Me
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto scroll-fade-in-up stagger-2">
                Web developer specializing in creating innovative digital solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 scroll-fade-in-up stagger-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl transform rotate-3"></div>
                <img
                  src="/Hussien.JPG"
                  alt="Hussein"
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-700"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-100 mb-6">
                  Hi, I'm Hussein
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  A passionate web developer specializing in creating exceptional and responsive digital experiences. I love transforming complex ideas into simple, effective solutions using cutting-edge technologies and tools.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  I have extensive experience developing web applications using React, Next.js, and Node.js. I believe in writing clean, maintainable code and creating engaging user interfaces.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  When I'm not coding, I enjoy exploring new technologies, participating in tech communities, and reading about the latest developments in the development world.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 scroll-fade-in-up stagger-4">
              <div className="text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                <div className="text-4xl font-bold text-gray-200 mb-3">3+</div>
                <div className="text-gray-400 text-lg">Years Experience</div>
              </div>
              <div className="text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                <div className="text-4xl font-bold text-gray-200 mb-3">50+</div>
                <div className="text-gray-400 text-lg">Completed Projects</div>
              </div>
              <div className="text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                <div className="text-4xl font-bold text-gray-200 mb-3">100%</div>
                <div className="text-gray-400 text-lg">Client Satisfaction</div>
              </div>
              <div className="text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                <div className="text-2xl font-bold text-gray-200 mb-3">👑</div>
                <div className="text-gray-400 text-lg">Alpha Team Leader</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
