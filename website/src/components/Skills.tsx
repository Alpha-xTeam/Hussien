'use client'

import { useState, useEffect, useRef } from 'react'
import { FolderOpen, Clock, Star, Wrench } from 'lucide-react'

const skills = [
  { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500' },
  { name: 'Next.js', level: 85, color: 'from-red-800 to-red-900' },
  { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-800' },
  { name: 'Node.js', level: 75, color: 'from-green-500 to-green-700' },
  { name: 'Python', level: 70, color: 'from-yellow-500 to-yellow-700' },
  { name: 'PostgreSQL', level: 65, color: 'from-blue-700 to-indigo-800' },
  { name: 'Tailwind CSS', level: 85, color: 'from-teal-400 to-cyan-500' },
  { name: 'Git', level: 80, color: 'from-red-500 to-red-700' },
]

export default function Skills() {
  const [visibleSkills, setVisibleSkills] = useState<Set<number>>(new Set())
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = skillRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setTimeout(() => {
                setVisibleSkills(prev => new Set([...prev, index]))
              }, index * 100)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    skillRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 hover-scale scroll-fade-in-up">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto hover:text-gray-200 transition-colors duration-300 scroll-fade-in-up stagger-2">
            A collection of technologies and tools I work with to create outstanding digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-fade-in-up stagger-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => { skillRefs.current[index] = el }}
              className={`group relative bg-gray-800/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 card-modern card-3d glass-modern ${
                visibleSkills.has(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors duration-300 hover-scale">
                  {skill.name}
                </h3>
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-300 bg-gray-700/50 px-2 py-1 rounded-full">
                  {skill.level}%
                </span>
              </div>

              <div className="relative">
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden glass-modern">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} shadow-lg transition-all duration-1000 ease-out`}
                    style={{
                      width: visibleSkills.has(index) ? `${skill.level}%` : '0%'
                    }}
                  ></div>
                </div>
                {/* Animated progress glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </div>

              {/* Enhanced skill level indicator */}
              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span className="hover:text-gray-400 transition-colors duration-300">Beginner</span>
                <span className="hover:text-gray-400 transition-colors duration-300">Intermediate</span>
                <span className="hover:text-gray-400 transition-colors duration-300">Expert</span>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 scroll-fade-in-up stagger-4">
          {[
            { number: '50+', label: 'Completed Projects', icon: FolderOpen },
            { number: '3+', label: 'Years Experience', icon: Clock },
            { number: '100%', label: 'Client Satisfaction', icon: Star },
            { number: '24/7', label: 'Technical Support', icon: Wrench }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 card-modern card-3d glass-modern hover-scale stagger-item stagger-1"
            >
              <div className="text-3xl mb-2 float">
                <stat.icon className="w-8 h-8 mx-auto text-red-400" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1 hover-scale">{stat.number}</div>
              <div className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
