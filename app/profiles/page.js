'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import Link from 'next/link'

export default function ProfilesPage() {
  const { profiles, fetchProfiles, deleteProfile } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProfile, setNewProfile] = useState({ 
    full_name: '', 
    title: '', 
    summary: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    portfolio_url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  const handleCreateProfile = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/v1/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      })
      if (res.ok) {
        fetchProfiles()
        setIsModalOpen(false)
        setNewProfile({ 
          full_name: '', 
          title: '', 
          summary: '',
          email: '',
          phone: '',
          location: '',
          linkedin_url: '',
          portfolio_url: ''
        })
      }
    } catch (error) {
      console.error("Create profile error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      try {
        const res = await fetch(`/api/v1/profiles/${id}`, { method: 'DELETE' })
        if (res.ok) deleteProfile(id)
      } catch (error) {
        console.error("Delete profile error:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-ice-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-deep-navy tracking-tight">Your Profiles</h1>
            <p className="text-sapphire mt-2 font-medium">Manage different personas for your CVs</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="rounded-xl shadow-lg shadow-sapphire/20">
            + New Profile
          </Button>
        </div>

        {profiles.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-powder-blue">
            <div className="text-6xl mb-6">📁</div>
            <h2 className="text-2xl font-bold text-deep-navy mb-4">No profiles yet</h2>
            <p className="text-sapphire/80 mb-8 max-w-md mx-auto">Create your first profile to start generating tailored CVs. You can have multiple profiles for different roles like "Frontend Developer" or "Project Manager".</p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline">Create Your First Profile</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <Card 
                key={profile.id}
                title={profile.full_name}
                subtitle={profile.title || "No title set"}
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                headerAction={
                  profile.is_default && (
                    <span className="bg-sapphire text-white text-[10px] font-black uppercase px-2 py-1 rounded-full tracking-wider">Default</span>
                  )
                }
                footer={
                  <div className="flex items-center justify-between">
                    <Link href={`/profiles/${profile.id}`} className="text-sapphire font-bold hover:underline">Edit Details</Link>
                    <button onClick={() => handleDelete(profile.id)} className="text-red-400 hover:text-red-600 font-medium transition-colors">Delete</button>
                  </div>
                }
              >
                <p className="text-sm text-deep-navy/70 line-clamp-3 italic">
                  {profile.summary || "No summary provided. Add one to help the AI tailor your CV better."}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ice-blue pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-sapphire/40 uppercase tracking-widest">Experiences</span>
                    <span className="text-lg font-bold text-deep-navy">{profile.experiences?.length || 0}</span>
                  </div>
                  <div className="flex flex-col border-l border-ice-blue pl-4">
                    <span className="text-[10px] font-black text-sapphire/40 uppercase tracking-widest">Education</span>
                    <span className="text-lg font-bold text-deep-navy">{profile.education?.length || 0}</span>
                  </div>
                  <div className="flex flex-col border-l border-ice-blue pl-4">
                    <span className="text-[10px] font-black text-sapphire/40 uppercase tracking-widest">Skills</span>
                    <span className="text-lg font-bold text-deep-navy">{profile.skills?.length || 0}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-deep-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-ice-blue">
              <h2 className="text-2xl font-black text-deep-navy tracking-tight">Create New Profile</h2>
              <p className="text-sapphire mt-1 font-medium">Set the foundation for your tailored CV</p>
            </div>
            
            <form onSubmit={handleCreateProfile} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                    value={newProfile.full_name}
                    onChange={(e) => setNewProfile({ ...newProfile, full_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Professional Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior React Developer"
                    className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                    value={newProfile.title}
                    onChange={(e) => setNewProfile({ ...newProfile, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                    value={newProfile.email}
                    onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+1 234 567 890"
                    className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                    value={newProfile.phone}
                    onChange={(e) => setNewProfile({ ...newProfile, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cairo, Egypt"
                  className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                  value={newProfile.location}
                  onChange={(e) => setNewProfile({ ...newProfile, location: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">LinkedIn URL</label>
                  <input 
                    type="url" 
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                    value={newProfile.linkedin_url}
                    onChange={(e) => setNewProfile({ ...newProfile, linkedin_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Portfolio URL</label>
                  <input 
                    type="url" 
                    placeholder="https://yourportfolio.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all text-sm"
                    value={newProfile.portfolio_url}
                    onChange={(e) => setNewProfile({ ...newProfile, portfolio_url: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Base Summary</label>
                <textarea 
                  rows="3"
                  placeholder="A brief overview of your career..."
                  className="w-full px-4 py-2.5 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all resize-none text-sm"
                  value={newProfile.summary}
                  onChange={(e) => setNewProfile({ ...newProfile, summary: e.target.value })}
                ></textarea>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-ice-blue">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 rounded-xl"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 rounded-xl shadow-lg shadow-sapphire/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
