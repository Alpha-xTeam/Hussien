'use client'

import { useState, useEffect, useRef } from 'react'
import { Rocket } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
  gradient: string
}

const projects: Project[] = []

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setTimeout(() => {
                setVisibleProjects(prev => new Set([...prev, index]))
              }, index * 150)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 hover-scale scroll-fade-in-up">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto hover:text-gray-200 transition-colors duration-300 scroll-fade-in-up stagger-2">
            A collection of projects I've worked on that showcase my development skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-fade-in-up stagger-3">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4 float text-red-400">
                <Rocket className="w-16 h-16 mx-auto animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2 gradient-text">Coming Soon...</h3>
              <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">My projects will appear here soon</p>
            </div>
          ) : (
            projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el }}
              className={`group relative bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10 card-modern card-3d glass-modern ${
                visibleProjects.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+Cg=='
                  }}
                />

                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/60 backdrop-blur-md text-gray-200 text-xs px-3 py-1 rounded-full font-medium border border-white/20 hover-scale">
                    {project.category}
                  </span>
                </div>

                {/* Enhanced Hover Actions */}
                <div className={`absolute inset-0 flex items-center justify-center space-x-4 rtl:space-x-reverse transition-all duration-500 ${
                  hoveredProject === project.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                }`}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-2xl hover-scale glass-modern"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl hover-scale btn-modern"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Enhanced Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-white transition-colors duration-300 hover-scale">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Enhanced Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-700/60 backdrop-blur-sm text-gray-300 text-xs px-3 py-1 rounded-full hover:bg-gray-600/60 hover:text-gray-200 transition-all duration-300 hover-scale border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800/80 backdrop-blur-sm text-white text-center py-3 px-4 rounded-xl hover:bg-gray-700/80 transition-all duration-300 text-sm font-medium glass-modern hover-scale"
                  >
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 text-sm font-medium btn-modern shadow-lg"
                  >
                    Demo
                  </a>
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        <div className="text-center mt-12 scroll-fade-in-up stagger-4">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-500 shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-2 btn-modern glass-modern"
          >
            <span>View All Projects</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
