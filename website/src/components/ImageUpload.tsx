'use client'

import { useState, useRef } from 'react'
import { imageStorage, UploadResult } from '@/utils/imageStorage'
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'

interface ImageUploadProps {
  onUploadSuccess?: (url: string) => void
  onUploadError?: (error: string) => void
  className?: string
  maxSize?: number // بالبايت
  acceptedTypes?: string[]
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  className = '',
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      await handleFileUpload(files[0])
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // التحقق من نوع الملف
    if (!acceptedTypes.includes(file.type)) {
      const error = 'نوع الملف غير مدعوم. يرجى اختيار صورة'
      setUploadResult({ success: false, error })
      onUploadError?.(error)
      return
    }

    // التحقق من حجم الملف
    if (file.size > maxSize) {
      const error = `حجم الملف كبير جداً. الحد الأقصى ${Math.round(maxSize / 1024 / 1024)}MB`
      setUploadResult({ success: false, error })
      onUploadError?.(error)
      return
    }

    setIsUploading(true)
    setUploadResult(null)

    // إنشاء preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // رفع الملف
    const result = await imageStorage.uploadImage(file)

    setIsUploading(false)
    setUploadResult(result)

    if (result.success && result.url) {
      onUploadSuccess?.(result.url)
    } else {
      const errorMsg = result.error || 'فشل في رفع الصورة'
      console.error('Upload error details:', errorMsg)
      onUploadError?.(errorMsg)
    }
  }

  const clearUpload = () => {
    setUploadResult(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* منطقة رفع الصور */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-red-400 bg-red-500/10 scale-105'
            : 'border-gray-600 hover:border-red-400 hover:bg-black/5'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto rounded-xl object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                clearUpload()
              }}
              className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded-full hover:bg-black transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-200">
                {isUploading ? 'جاري رفع الصورة...' : 'اسحب وأفلت الصورة هنا'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                أو انقر لاختيار صورة من جهازك
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WEBP, GIF • حد أقصى {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
          </div>
        )}
      </div>

      {/* نتيجة الرفع */}
      {uploadResult && (
        <div className={`mt-4 p-4 rounded-xl flex items-center space-x-3 ${
          uploadResult.success
            ? 'bg-green-500/10 border border-green-500/20'
            : 'bg-red-500/10 border border-red-500/20'
        }`}>
          {uploadResult.success ? (
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              uploadResult.success ? 'text-green-400' : 'text-red-400'
            }`}>
              {uploadResult.success ? 'تم رفع الصورة بنجاح!' : 'فشل في رفع الصورة'}
            </p>
            {uploadResult.url && (
              <p className="text-xs text-gray-400 mt-1 break-all">
                {uploadResult.url}
              </p>
            )}
            {uploadResult.error && (
              <p className="text-xs text-red-300 mt-1">
                {uploadResult.error}
              </p>
            )}
          </div>
          {uploadResult.success && (
            <button
              onClick={() => navigator.clipboard.writeText(uploadResult.url!)}
              className="text-xs bg-black/50 hover:bg-black px-3 py-1 rounded-lg transition-colors"
            >
              نسخ الرابط
            </button>
          )}
        </div>
      )}
    </div>
  )
}
