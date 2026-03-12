'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'

export default function GeneratePage() {
  const { profiles, fetchProfiles, isGenerating, setIsGenerating } = useStore()
  const router = useRouter()
  
  const [selectedProfileId, setSelectedProfileId] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  useEffect(() => {
    if (profiles.length > 0 && !selectedProfileId) {
      const defaultProfile = profiles.find(p => p.is_default) || profiles[0]
      setSelectedProfileId(defaultProfile.id)
    }
  }, [profiles, selectedProfileId])

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!selectedProfileId || !jobDescription) {
      setError('Please select a profile and paste the job description')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const res = await fetch('/api/v1/generate/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile_id: selectedProfileId,
          job_description: jobDescription,
          company_name: companyName,
          job_title: jobTitle
        })
      })

      const data = await res.json()

      if (res.ok) {
        // Redirect to the view page (to be implemented)
        router.push(`/generate/${data.document_id}`)
      } else {
        setError(data.error || 'Failed to generate CV')
      }
    } catch (err) {
      console.error("Generate error:", err)
      setError('An unexpected error occurred during generation')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-ice-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-deep-navy tracking-tight mb-4">Generate Tailored CV</h1>
          <p className="text-xl text-sapphire font-medium">Gemini AI will perfectly align your experience with this role</p>
        </div>

        <Card className="shadow-2xl rounded-3xl overflow-hidden border-none p-0">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row min-h-[600px]">
            {/* Left Column: Settings */}
            <div className="md:w-1/3 bg-deep-navy p-8 text-white border-r border-white/10">
              <h2 className="text-xl font-bold mb-8 flex items-center">
                <span className="bg-sapphire text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Settings
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-3">Select Profile</label>
                  <select 
                    value={selectedProfileId}
                    onChange={(e) => setSelectedProfileId(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all"
                  >
                    {profiles.map(p => (
                      <option key={p.id} value={p.id} className="bg-deep-navy text-white">
                        {p.full_name} {p.is_default ? '(Default)' : ''}
                      </option>
                    ))}
                  </select>
                  {profiles.length === 0 && (
                    <p className="mt-2 text-xs text-red-400 font-medium">No profiles found. Create one first!</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-3">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Google"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-3">Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Frontend Dev"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-12 p-4 bg-sapphire/20 border border-sapphire/30 rounded-xl">
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  <span className="text-sapphire font-black block mb-1">PRO TIP:</span>
                  The more complete your base profile is, the better Gemini can tailor your CV to this specific role.
                </p>
              </div>
            </div>

            {/* Right Column: Job Description */}
            <div className="flex-1 p-8 bg-white flex flex-col">
              <h2 className="text-xl font-bold text-deep-navy mb-8 flex items-center">
                <span className="bg-sapphire text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Job Requirements
              </h2>

              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-black text-sapphire/40 uppercase tracking-widest mb-3">Paste Job Description Here</label>
                <textarea 
                  required
                  placeholder="Paste the full job description or requirements here..."
                  className="flex-1 w-full px-6 py-5 rounded-2xl bg-ice-blue/20 border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all resize-none text-deep-navy font-medium leading-relaxed placeholder:text-sapphire/30"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-in slide-in-from-top-2 duration-200">
                  ⚠️ {error}
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                <p className="text-xs text-sapphire/60 font-medium">Gemini Pro will analyze and rewrite your content.</p>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="rounded-xl px-12 py-4 shadow-xl shadow-sapphire/20"
                  isLoading={isGenerating}
                  disabled={profiles.length === 0}
                >
                  {isGenerating ? 'Generating...' : 'Start Tailoring'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
