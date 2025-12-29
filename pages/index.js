import Head from 'next/head'
import ImageGallery from '@/components/ImageGallery'

export default function Home() {
  return (
    <>
      <Head>
        <title>Galerie Foto</title>
        <meta name="description" content="Galerie de poze cu Next.js și Supabase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8">
            Galeria mea de poze
          </h1>
          <ImageGallery />
        </div>
      </main>
    </>
  )
}
