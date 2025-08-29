'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

export default function TestUpload() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleUploadSuccess = (url: string) => {
    console.log('✅ تم رفع الصورة بنجاح:', url)
    setUploadedImages(prev => [...prev, url])
  }

  const handleUploadError = (error: string) => {
    console.error('❌ خطأ في رفع الصورة:', error)
    alert(`خطأ في رفع الصورة: ${error}`)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          اختبار رفع الصور
        </h1>

        <div className="bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">رفع صورة جديدة</h2>
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            className="mb-6"
          />
        </div>

        {uploadedImages.length > 0 && (
          <div className="bg-gray-900 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-4">
              الصور المرفوعة ({uploadedImages.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((url, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-gray-400 break-all">{url}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(url)}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    نسخ الرابط
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            إذا واجهت مشاكل، تحقق من:
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• أن البucket "portfolio-images" موجود وpublic</li>
            <li>• أن الصلاحيات مُعدّة بشكل صحيح</li>
            <li>• أن مفاتيح Supabase صحيحة</li>
            <li>• أن حجم الصورة أقل من 5MB</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
