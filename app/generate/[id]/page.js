'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

// Use dynamic import for PDF components to avoid SSR issues
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
)
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)
const CVDocument = dynamic(
  () => import('@/components/pdf/CVDocument').then(mod => mod.CVDocument),
  { ssr: false }
)

export default function CVPreviewPage() {
  const { id } = useParams()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDocument() {
      try {
        const res = await fetch(`/api/v1/generate/${id}`)
        const data = await res.json()
        if (res.ok) {
          setDocument(data)
        } else {
          setError(data.error || 'Failed to fetch document')
        }
      } catch (err) {
        setError('An error occurred while loading the document')
      } finally {
        setLoading(false)
      }
    }
    fetchDocument()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-ice-blue flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-sapphire border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sapphire font-black uppercase tracking-widest text-xs">Loading Preview...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-ice-blue flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-md text-center p-12">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl font-black text-deep-navy mb-4 tracking-tight">Oops!</h2>
          <p className="text-sapphire/80 font-medium mb-8">{error}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </Card>
      </main>
    </div>
  )

  const cvData = document.content
  const profile = document.submission.profile

  return (
    <div className="min-h-screen bg-ice-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-deep-navy tracking-tight">CV Tailored!</h1>
            <p className="text-xl text-sapphire font-medium mt-2">
              Preview your AI-tailored CV for <span className="text-deep-navy font-black">{document.submission.company_name || 'the role'}</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <PDFDownloadLink 
              document={<CVDocument data={cvData} profile={profile} />} 
              fileName={`CV_${document.submission.company_name || 'Tailored'}.pdf`}
            >
              {({ blob, url, loading: dlLoading, error: dlError }) => (
                <Button size="lg" className="rounded-xl px-10 py-4 shadow-xl shadow-sapphire/20" isLoading={dlLoading}>
                  {dlLoading ? 'Preparing PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          <Card className="p-0 overflow-hidden bg-deep-navy/5 border-none shadow-2xl h-[900px]">
            <PDFViewer className="w-full h-full border-none">
              <CVDocument data={cvData} profile={profile} />
            </PDFViewer>
          </Card>
        </div>
      </main>
    </div>
  )
}
