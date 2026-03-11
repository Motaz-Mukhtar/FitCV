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
  const [newProfile, setNewProfile] = useState({ name: '', title: '', summary: '' })
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
        setNewProfile({ name: '', title: '', summary: '' })
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
                title={profile.name}
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
                <div className="mt-6 flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-sapphire/40 uppercase tracking-widest">Experiences</span>
                    <span className="text-lg font-bold text-deep-navy">{profile.experiences?.length || 0}</span>
                  </div>
                  <div className="w-px h-8 bg-ice-blue"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-sapphire/40 uppercase tracking-widest">Skills</span>
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
            
            <form onSubmit={handleCreateProfile} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-black text-deep-navy uppercase tracking-widest mb-2">Profile Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Frontend Engineer"
                  className="w-full px-4 py-3 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-deep-navy uppercase tracking-widest mb-2">Professional Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-4 py-3 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all"
                  value={newProfile.title}
                  onChange={(e) => setNewProfile({ ...newProfile, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-deep-navy uppercase tracking-widest mb-2">Base Summary</label>
                <textarea 
                  rows="4"
                  placeholder="A brief overview of your career..."
                  className="w-full px-4 py-3 rounded-xl border border-powder-blue focus:ring-2 focus:ring-sapphire focus:border-transparent outline-none transition-all resize-none"
                  value={newProfile.summary}
                  onChange={(e) => setNewProfile({ ...newProfile, summary: e.target.value })}
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1 rounded-xl py-3" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 rounded-xl py-3 shadow-lg shadow-sapphire/20"
                  isLoading={isSubmitting}
                >
                  Create Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
