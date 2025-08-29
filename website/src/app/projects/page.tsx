'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/utils/supabase'
import { FolderOpen, Image } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  image_url?: string
  project_url?: string
  github_url?: string
  technologies: string[]
  featured: boolean
  created_at: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter === 'featured') {
        query = query.eq('featured', true)
      }

      const { data, error } = await query

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [filter])

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-16">
                <section className="py-32 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
                My Projects
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A collection of projects that showcase my development skills
              </p>
            </div>

            {/* فلتر المشاريع */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    filter === 'all'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:text-gray-100'
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setFilter('featured')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    filter === 'featured'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:text-gray-100'
                  }`}
                >
                  Featured Projects
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center text-gray-400 py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                <div className="text-6xl mb-4 text-red-400">
                  <FolderOpen className="w-16 h-16 mx-auto" />
                </div>
                {filter === 'featured' ? 'No featured projects yet' : 'No projects yet'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="group relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-700/50 hover:border-gray-600/50 transform hover:-translate-y-2">
                    <div className="h-48 bg-gray-700 flex items-center justify-center rounded-xl mb-4 overflow-hidden relative">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRjNGNEY2IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+Cg=='
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-4xl mb-2 text-red-400">
                            <Image className="w-8 h-8 mx-auto" />
                          </div>
                          <div className="text-sm">No image</div>
                        </div>
                      )}

                      {project.featured && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className="text-gray-400 text-xs">
                          {new Date(project.created_at).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-4 rtl:space-x-reverse">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-700 text-gray-200 text-center py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300 font-medium"
                        >
                          Code
                        </a>
                      )}
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-600 text-gray-100 text-center py-3 px-4 rounded-lg hover:bg-gray-500 transition-all duration-300 font-medium"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
