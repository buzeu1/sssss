import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
      
      // Preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Selectează o imagine!')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // 1. Upload imaginea în Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // 2. Obține URL-ul public
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      const publicUrl = urlData.publicUrl

      // 3. Salvează în baza de date
      const { error: dbError } = await supabase
        .from('images')
        .insert([
          {
            url: publicUrl,
            title: title || null,
            description: description || null
          }
        ])

      if (dbError) throw dbError

      // Success!
      setSuccess(true)
      setFile(null)
      setPreview(null)
      setTitle('')
      setDescription('')
      
      // Reset file input
      e.target.reset()

      // Notify parent
      if (onUploadSuccess) {
        onUploadSuccess()
      }

      // Hide success message after 3s
      setTimeout(() => setSuccess(false), 3000)

    } catch (error) {
      console.error('Eroare la upload:', error)
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {/* Preview */}
      {preview && (
        <div className="mb-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-64 mx-auto rounded-lg"
          />
        </div>
      )}

      {/* File Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selectează Imaginea *
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={uploading}
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Titlu (opțional)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Apus de soare la munte"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={uploading}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descriere (opțional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Poză făcută în Bucegi, august 2024"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={uploading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ✓ Imaginea a fost uploadată cu succes!
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploading || !file}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? 'Se uploadează...' : 'Upload Imagine'}
      </button>
    </form>
  )
}
