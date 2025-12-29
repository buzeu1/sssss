import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function ImageGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      setLoading(true)
      
      // Preluează toate înregistrările din tabelul 'images'
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
        <p className="text-gray-600 mt-2">Verifică conexiunea la Supabase</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Nu există poze în galerie</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Image
            src={image.url}
            alt={image.title || 'Imagine din galerie'}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {image.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
              <p className="text-sm font-medium">{image.title}</p>
              {image.description && (
                <p className="text-xs text-gray-300 mt-1">{image.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
