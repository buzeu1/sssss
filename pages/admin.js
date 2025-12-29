import Head from 'next/head'
import { useState } from 'react'
import AdminUpload from '@/components/AdminUpload'
import AdminImageList from '@/components/AdminImageList'

export default function Admin() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleUploadSuccess = () => {
    // Trigger refresh pentru lista de imagini
    setRefreshTrigger(prev => prev + 1)
  }

  const handleDeleteSuccess = () => {
    // Trigger refresh pentru lista de imagini
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <>
      <Head>
        <title>Admin - Galerie Foto</title>
        <meta name="description" content="Admin panel pentru gestionarea pozelor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <a 
              href="/"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              ← Înapoi la Galerie
            </a>
          </div>

          {/* Secțiune Upload */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Upload Poză Nouă</h2>
            <AdminUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Secțiune Listă Poze */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Poze Existente</h2>
            <AdminImageList 
              key={refreshTrigger} 
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
        </div>
      </main>
    </>
  )
}
