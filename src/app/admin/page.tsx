'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageUpload from '@/components/ImageUpload'
import { supabase } from '@/utils/supabase'
import { fileStorage } from '@/utils/imageStorage'
import { useScrollAnimation } from '@/utils/useScrollAnimation'

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
  updated_at: string
}

export default function Admin() {
  useScrollAnimation()

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    image_url: '',
    project_url: '',
    github_url: '',
    technologies: '',
    featured: false
  })

  // State لإدارة الملفات
  const [files, setFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [fileContent, setFileContent] = useState<string>('')
  const [uploadStatus, setUploadStatus] = useState<string>('')

  useEffect(() => {
    fetchProjects()
    fetchFiles()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  // وظائف إدارة الملفات
  const fetchFiles = async () => {
    try {
      const fileList = await fileStorage.listFiles()
      setFiles(fileList)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploadStatus('جاري رفع الملف...')
    try {
      const result = await fileStorage.uploadFile(file, file.name)
      if (result.success) {
        setUploadStatus('تم رفع الملف بنجاح!')
        fetchFiles() // تحديث القائمة
      } else {
        setUploadStatus(`فشل في الرفع: ${result.error}`)
      }
    } catch (error) {
      setUploadStatus('حدث خطأ غير متوقع')
      console.error('Upload error:', error)
    }
  }

  const handleEnvUpload = async () => {
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=${process.env.NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`

    setUploadStatus('جاري رفع ملف .env...')
    try {
      const result = await fileStorage.uploadEnvFile(envContent)
      if (result.success) {
        setUploadStatus('تم رفع ملف .env بنجاح!')
        fetchFiles()
      } else {
        setUploadStatus(`فشل في الرفع: ${result.error}`)
      }
    } catch (error) {
      setUploadStatus('حدث خطأ غير متوقع')
      console.error('Upload error:', error)
    }
  }

  const handleFileDownload = async (fileName: string) => {
    try {
      const result = await fileStorage.downloadFile(fileName)
      if (result.success) {
        setFileContent(result.content || '')
        setSelectedFile(fileName)
      } else {
        alert(`فشل في تحميل الملف: ${result.error}`)
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('حدث خطأ غير متوقع')
    }
  }

  const handleFileDelete = async (fileName: string) => {
    if (!confirm(`هل أنت متأكد من حذف الملف "${fileName}"؟`)) return

    try {
      const success = await fileStorage.deleteFile(fileName)
      if (success) {
        setFiles(files.filter(f => f !== fileName))
        if (selectedFile === fileName) {
          setSelectedFile('')
          setFileContent('')
        }
        alert('تم حذف الملف بنجاح')
      } else {
        alert('فشل في حذف الملف')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('حدث خطأ غير متوقع')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      }

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData])

        if (error) throw error
      }

      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description || '',
      image_url: project.image_url || '',
      project_url: project.project_url || '',
      github_url: project.github_url || '',
      technologies: project.technologies.join(', '),
      featured: project.featured
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const resetForm = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      description: '',
      long_description: '',
      image_url: '',
      project_url: '',
      github_url: '',
      technologies: '',
      featured: false
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-16">
                <section className="py-32 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 scroll-fade-in-up">
                Admin Dashboard - Project Management
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto scroll-fade-in-up stagger-2">
                Add, update, and delete your projects from here
              </p>
            </div>

            {/* نموذج إضافة/تحديث المشروع */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700/50 scroll-fade-in-up stagger-3">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                {editingProject ? 'Update Project' : 'Add New Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* منطقة رفع الصور */}
                <div>
                  <label className="block text-gray-300 mb-2">أو ارفع صورة جديدة</label>
                  <ImageUpload
                    onUploadSuccess={(url) => setFormData({...formData, image_url: url})}
                    onUploadError={(error) => console.error('Upload error:', error)}
                    className="mb-4"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Short Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Detailed Description</label>
                  <textarea
                    value={formData.long_description}
                    onChange={(e) => setFormData({...formData, long_description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Project URL</label>
                    <input
                      type="url"
                      value={formData.project_url}
                      onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="mr-3"
                  />
                  <label htmlFor="featured" className="text-gray-300">Featured Project</label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingProject ? 'Update' : 'Add'}
                  </button>

                  {editingProject && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* قائمة المشاريع */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 scroll-fade-in-up stagger-4">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Current Projects</h2>

              {loading ? (
                <div className="text-center text-gray-400">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="text-center text-gray-400">No projects yet</div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-100">{project.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {new Date(project.created_at).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-3">{project.description}</p>

                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.featured && (
                        <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-600/30">
                          Featured Project
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* قسم إدارة الملفات */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700/50 scroll-fade-in-up stagger-5">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">إدارة الملفات في Supabase Storage</h2>

              {/* رفع الملفات */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">رفع ملفات جديدة</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* رفع ملف عام */}
                  <div>
                    <label className="block text-gray-300 mb-2">اختر ملف للرفع</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file)
                      }}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                    />
                  </div>

                  {/* رفع ملف .env */}
                  <div>
                    <label className="block text-gray-300 mb-2">رفع ملف .env الحالي</label>
                    <button
                      onClick={handleEnvUpload}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      رفع ملف .env
                    </button>
                  </div>
                </div>

                {/* حالة الرفع */}
                {uploadStatus && (
                  <div className={`p-4 rounded-lg mb-4 ${
                    uploadStatus.includes('نجاح') ? 'bg-green-600/20 border border-green-600/30' :
                    uploadStatus.includes('فشل') ? 'bg-red-600/20 border border-red-600/30' :
                    'bg-blue-600/20 border border-blue-600/30'
                  }`}>
                    <p className="text-gray-100">{uploadStatus}</p>
                  </div>
                )}
              </div>

              {/* قائمة الملفات */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* قائمة الملفات */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">الملفات المرفوعة</h3>
                  {files.length === 0 ? (
                    <p className="text-gray-400">لا توجد ملفات مرفوعة</p>
                  ) : (
                    <div className="space-y-2">
                      {files.map((fileName) => (
                        <div key={fileName} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                          <span className="text-gray-100 truncate">{fileName}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleFileDownload(fileName)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                            >
                              عرض
                            </button>
                            <button
                              onClick={() => handleFileDelete(fileName)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* محتوى الملف المحدد */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">
                    {selectedFile ? `محتوى الملف: ${selectedFile}` : 'اختر ملف لعرض محتواه'}
                  </h3>
                  {fileContent ? (
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <pre className="text-gray-100 text-sm whitespace-pre-wrap overflow-x-auto">
                        {fileContent}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-gray-400">انقر على "عرض" لرؤية محتوى الملف</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
