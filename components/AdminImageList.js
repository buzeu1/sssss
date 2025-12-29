import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function AdminImageList({ onDeleteSuccess }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setImages(data || [])
    } catch (error) {
      console.error('Eroare la preluarea pozelor:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(image) {
    if (!confirm(`Sigur vrei să ștergi "${image.title || 'această imagine'}"?`)) {
      return
    }

    setDeleting(image.id)

    try {
      // 1. Șterge din Storage (dacă imaginea e pe Supabase Storage)
      if (image.url.includes('.supabase.co/storage')) {
        const urlParts = image.url.split('/storage/v1/object/public/images/')
        if (urlParts[1]) {
          const filePath = urlParts[1]
          const { error: storageError } = await supabase.storage
            .from('images')
            .remove([filePath])
          
          if (storageError) console.error('Eroare la ștergerea din storage:', storageError)
        }
      }

      // 2. Șterge din baza de date
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', image.id)

      if (dbError) throw dbError

      // Success - refresh lista
      setImages(images.filter(img => img.id !== image.id))
      
      if (onDeleteSuccess) {
        onDeleteSuccess()
      }

    } catch (error) {
      console.error('Eroare la ștergere:', error)
      alert('Eroare la ștergere: ' + error.message)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Eroare: {error}</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Nu există poze încă. Upload prima poză!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Image */}
          <div className="relative aspect-square">
            <Image
              src={image.url}
              alt={image.title || 'Imagine'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 truncate">
              {image.title || 'Fără titlu'}
            </h3>
            {image.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {image.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mb-3">
              {new Date(image.created_at).toLocaleDateString('ro-RO')}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(image)}
              disabled={deleting === image.id}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 transition-colors text-sm"
            >
              {deleting === image.id ? 'Se șterge...' : '🗑️ Șterge'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
