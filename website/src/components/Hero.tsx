export default function Hero() {
  return (
    <section className="relative bg-black py-32 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background with Morphing Blobs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        
        {/* Floating Morphing Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blob opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blob opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blob opacity-30" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
        <div className="mb-12">
          <div className="relative inline-block mb-8 group scroll-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img
              src="/Hussien.JPG"
              alt="حسين"
              className="relative w-48 h-48 rounded-full mx-auto object-cover border-4 border-white/20 dark:border-gray-700/50 shadow-2xl hover:scale-105 transition-all duration-500 card-3d"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 dark:from-red-400/30 dark:to-purple-400/30 animate-pulse"></div>
          </div>

          <div className="space-y-6 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent leading-tight hover:scale-105 transition-transform duration-500 scroll-fade-in-up">
              Hi, I'm{' '}
              <span className="gradient-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-300 hover:to-red-500 transition-all duration-500">
                Hussein
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed hover:text-gray-200 transition-colors duration-300 scroll-fade-in-up stagger-2">
              A web developer specializing in creating{' '}
              <span className="font-semibold text-red-400 hover:text-red-300 transition-colors duration-300">
                exceptional digital experiences
              </span>{' '}
              and responsive solutions for clients
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed hover:text-gray-300 transition-colors duration-300 scroll-fade-in-up stagger-3">
              Alpha Team Leader • I love turning ideas into reality using the latest technologies and tools
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 scroll-fade-in-up stagger-4">
          <a
            href="/projects"
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg btn-modern glass-modern shadow-2xl hover:shadow-red-500/25 transition-all duration-500 card-3d"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
          <a
            href="/contact"
            className="group relative border-2 border-red-600 text-red-300 px-10 py-4 rounded-2xl font-semibold text-lg hover:border-red-500 hover:text-red-200 hover:bg-red-500/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-gray-800/80 backdrop-blur-sm btn-modern"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Me
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </a>
        </div>

        <div className="flex justify-center space-x-8 rtl:space-x-reverse scroll-fade-in-up stagger-5">
          {[
            { href: 'https://github.com', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', label: 'GitHub' },
            { href: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' },
            { href: 'mailto:hussein@example.com', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email' }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className={`group relative p-4 bg-black/10 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover-scale card-modern stagger-item stagger-${index + 1} glass-modern`}
              aria-label={social.label}
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon}/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 dark:from-red-400/30 dark:to-red-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
