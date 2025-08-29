export default function Footer() {
  return (
    <footer className="bg-black text-white py-32 px-4 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold gradient-text mb-4 hover-scale">
                Hussein
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md hover:text-gray-200 transition-colors duration-300">
                Professional web developer specializing in creating exceptional digital experiences and responsive solutions for clients. I love turning ideas into reality using the latest technologies.
              </p>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-6 rtl:space-x-reverse">
              {[
                { href: 'https://github.com', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', label: 'GitHub' },
                { href: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' },
                { href: 'mailto:hussein@example.com', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group relative p-4 bg-black/10 backdrop-blur-xl rounded-2xl hover:bg-red-500/20 transition-all duration-500 hover-scale card-modern glass-modern"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon}/>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white gradient-text">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/projects', label: 'Projects' },
                { href: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block hover-scale relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white gradient-text">Services</h4>
            <ul className="space-y-3">
              {[
                'Website Development',
                'Web Applications',
                'Technical Consulting',
                'Website Maintenance'
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-white transition-all duration-300 cursor-default hover-scale inline-block group">
                    {service}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Newsletter Section */}
        <div className="bg-black/5 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20 glass-modern card-modern">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-white gradient-text">Stay Updated</h4>
            <p className="text-gray-300 mb-6 max-w-md mx-auto hover:text-gray-200 transition-colors duration-300">
              Subscribe to get the latest news and new projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none modern-input glass-modern transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-500 shadow-2xl hover:shadow-red-500/25 btn-modern glass-modern">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 hover:text-gray-300 transition-colors duration-300">
              © 2025 Hussein. All rights reserved.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-all duration-300 hover-scale relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-white transition-all duration-300 hover-scale relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
