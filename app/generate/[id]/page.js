'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useParams } from 'next/navigation'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { CVDocument } from '@/components/pdf/CVDocument'

export default function CVPreviewPage() {
  const { id } = useParams()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
        console.error('Fetch error:', err)
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

  if (!document?.content || !document?.submission?.profile) return (
    <div className="min-h-screen bg-ice-blue flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-md text-center p-12">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-black text-deep-navy mb-4 tracking-tight">Invalid Document</h2>
          <p className="text-sapphire/80 font-medium mb-8">The generated document data is incomplete.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </Card>
      </main>
    </div>
  )

  // Parse and validate the content data - convert everything to plain strings
  const cvData = document.content
  
  const validatedData = {
    contactInfo: {
      fullName: String(cvData?.contactInfo?.fullName || ''),
      email: String(cvData?.contactInfo?.email || ''),
      phone: String(cvData?.contactInfo?.phone || ''),
      location: String(cvData?.contactInfo?.location || ''),
      linkedin: String(cvData?.contactInfo?.linkedin || ''),
    },
    title: String(cvData?.title || ''),
    summary: String(cvData?.summary || ''),
    experiences: Array.isArray(cvData?.experiences) 
      ? cvData.experiences.map(exp => ({
          company: String(exp?.company || ''),
          role: String(exp?.role || ''),
          startDate: String(exp?.startDate || ''),
          endDate: String(exp?.endDate || ''),
          bullets: Array.isArray(exp?.bullets) ? exp.bullets.map(b => String(b || '')) : []
        }))
      : [],
    education: Array.isArray(cvData?.education) 
      ? cvData.education.map(edu => ({
          institution: String(edu?.institution || ''),
          degree: String(edu?.degree || ''),
          field: String(edu?.field || ''),
          startDate: String(edu?.startDate || ''),
          endDate: String(edu?.endDate || ''),
          location: String(edu?.location || '')
        }))
      : [],
    hardSkills: Array.isArray(cvData?.hardSkills) ? cvData.hardSkills.filter(Boolean).map(s => String(s)) : [],
    softSkills: Array.isArray(cvData?.softSkills) ? cvData.softSkills.filter(Boolean).map(s => String(s)) : [],
  }

  const profile = {
    name: String(document.submission.profile.full_name || ''),
    title: String(document.submission.profile.title || '')
  }

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
            {mounted ? (
              <PDFDownloadLink
                document={<CVDocument data={validatedData} profile={profile} />}
                fileName={`CV_${document.submission.company_name || 'Tailored'}.pdf`}
              >
                {({ blob, url, loading: dlLoading, error: dlError }) => (
                  <Button size="lg" className="rounded-xl px-10 py-4 shadow-xl shadow-sapphire/20" isLoading={dlLoading}>
                    {dlLoading ? 'Preparing PDF...' : 'Download PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            ) : (
              <Button size="lg" className="rounded-xl px-10 py-4 shadow-xl shadow-sapphire/20" isLoading={true}>
                Loading...
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          <Card className="p-0 overflow-hidden bg-deep-navy/5 border-none shadow-2xl h-[calc(100vh-280px)]">
            {mounted ? (
              <PDFViewer className="w-full h-[calc(100vh-280px)] border-none">
                <CVDocument data={validatedData} profile={profile} />
              </PDFViewer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-sapphire border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
