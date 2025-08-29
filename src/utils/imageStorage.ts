import { supabase } from './supabase'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export class ImageStorage {
  private bucketName = 'portfolio-images'

  /**
   * رفع صورة إلى Supabase Storage
   */
  async uploadImage(file: File, path?: string): Promise<UploadResult> {
    try {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        return { success: false, error: 'الملف يجب أن يكون صورة' }
      }

      // التحقق من حجم الملف (5MB كحد أقصى)
      if (file.size > 5 * 1024 * 1024) {
        return { success: false, error: 'حجم الصورة يجب أن يكون أقل من 5MB' }
      }

      // إنشاء اسم فريد للملف
      const fileExt = file.name.split('.').pop()
      const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // رفع الملف
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        // عرض تفاصيل الخطأ الحقيقية
        let errorMessage = 'فشل في رفع الصورة'
        if (error.message) {
          if (error.message.includes('not found')) {
            errorMessage = 'Bucket "portfolio-images" غير موجود. يرجى إنشاؤه أولاً'
          } else if (error.message.includes('Unauthorized')) {
            errorMessage = 'غير مصرح لك بالرفع. تحقق من الصلاحيات'
          } else if (error.message.includes('exceeded')) {
            errorMessage = 'حجم الملف كبير جداً'
          } else {
            errorMessage = `خطأ في الرفع: ${error.message}`
          }
        }
        return { success: false, error: errorMessage }
      }

      // الحصول على رابط الصورة العام
      const { data: { publicUrl } } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(data.path)

      return { success: true, url: publicUrl }

    } catch (error) {
      console.error('Upload error:', error)
      return { success: false, error: 'حدث خطأ غير متوقع' }
    }
  }

  /**
   * حذف صورة من Storage
   */
  async deleteImage(path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([path])

      if (error) {
        console.error('Delete error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Delete error:', error)
      return false
    }
  }

  /**
   * الحصول على قائمة الصور
   */
  async listImages(): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list()

      if (error) {
        console.error('List error:', error)
        return []
      }

      return data?.map(file => file.name) || []
    } catch (error) {
      console.error('List error:', error)
      return []
    }
  }
}

/**
 * فئة لرفع الملفات العامة (غير الصور)
 */
export class FileStorage {
  private bucketName = 'env-files'

  /**
   * رفع ملف عام إلى Supabase Storage
   */
  async uploadFile(file: File | string, fileName: string, options?: {
    contentType?: string
    makePublic?: boolean
  }): Promise<UploadResult> {
    try {
      let fileData: File | Blob
      let contentType = options?.contentType || 'text/plain'

      // إذا كان المعامل نص، نحوله إلى Blob
      if (typeof file === 'string') {
        fileData = new Blob([file], { type: contentType })
      } else {
        fileData = file
        contentType = file.type || contentType
      }

      // التحقق من حجم الملف (10MB كحد أقصى للملفات العامة)
      if (fileData.size > 10 * 1024 * 1024) {
        return { success: false, error: 'حجم الملف يجب أن يكون أقل من 10MB' }
      }

      // رفع الملف
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, fileData, {
          contentType,
          upsert: true
        })

      if (error) {
        console.error('Upload error:', error)
        let errorMessage = 'فشل في رفع الملف'
        if (error.message.includes('not found')) {
          errorMessage = `Bucket "${this.bucketName}" غير موجود. يرجى إنشاؤه أولاً`
        } else if (error.message.includes('Unauthorized')) {
          errorMessage = 'غير مصرح لك بالرفع. تحقق من الصلاحيات'
        } else {
          errorMessage = `خطأ في الرفع: ${error.message}`
        }
        return { success: false, error: errorMessage }
      }

      // الحصول على الرابط
      let fileUrl: string
      if (options?.makePublic) {
        const { data: { publicUrl } } = supabase.storage
          .from(this.bucketName)
          .getPublicUrl(data.path)
        fileUrl = publicUrl
      } else {
        // رابط خاص (يتطلب authentication)
        fileUrl = data.path
      }

      return { success: true, url: fileUrl }

    } catch (error) {
      console.error('Upload error:', error)
      return { success: false, error: 'حدث خطأ غير متوقع' }
    }
  }

  /**
   * رفع ملف .env
   */
  async uploadEnvFile(envContent: string): Promise<UploadResult> {
    const fileName = `env-${Date.now()}.local`
    return this.uploadFile(envContent, fileName, {
      contentType: 'text/plain',
      makePublic: false
    })
  }

  /**
   * قراءة ملف من Storage
   */
  async downloadFile(fileName: string): Promise<{ success: boolean, content?: string, error?: string }> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .download(fileName)

      if (error) {
        console.error('Download error:', error)
        return { success: false, error: `خطأ في تحميل الملف: ${error.message}` }
      }

      const content = await data.text()
      return { success: true, content }

    } catch (error) {
      console.error('Download error:', error)
      return { success: false, error: 'حدث خطأ غير متوقع' }
    }
  }

  /**
   * حذف ملف من Storage
   */
  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .remove([fileName])

      if (error) {
        console.error('Delete error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Delete error:', error)
      return false
    }
  }

  /**
   * الحصول على قائمة الملفات
   */
  async listFiles(): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list()

      if (error) {
        console.error('List error:', error)
        return []
      }

      return data?.map(file => file.name) || []
    } catch (error) {
      console.error('List error:', error)
      return []
    }
  }
}

// إنشاء instances للاستخدام في المشروع
export const imageStorage = new ImageStorage()
export const fileStorage = new FileStorage()
