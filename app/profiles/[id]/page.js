'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ProfileDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { profiles, fetchProfiles } = useStore()
  
  const [profile, setProfile] = useState(null)
  const [isAddingExp, setIsAddingExp] = useState(false)
  const [isAddingEdu, setIsAddingEdu] = useState(false)
  const [isEditingBase, setIsEditingBase] = useState(false)
  const [linkedinLoading, setLinkedinLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [newExp, setNewExp] = useState({ role: '', company: '', start_date: '', end_date: '', description: '' })
  const [newSkill, setNewSkill] = useState({ name: '', type: 'hard' })
  const [newEdu, setNewEdu] = useState({ institution: '', degree: '', field: '', start_date: '', end_date: '' })
  const [editProfile, setEditProfile] = useState({ 
    full_name: '', 
    title: '', 
    summary: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    portfolio_url: ''
  })

  useEffect(() => {
    fetchProfiles()
    
    // Check for success/error messages from LinkedIn callback
    const success = searchParams.get('success')
    const error = searchParams.get('error')
    
    if (success === 'linkedin_imported') {
      setMessage({ type: 'success', text: 'LinkedIn profile imported successfully!' })
      // Clear URL parameters
      router.replace(`/profiles/${id}`)
    } else if (error) {
      const errorMessages = {
        'linkedin_auth_failed': 'LinkedIn authentication failed. Please try again.',
        'linkedin_import_failed': 'Failed to import LinkedIn data. Please try again.',
        'missing_parameters': 'Invalid LinkedIn callback. Please try again.'
      }
      setMessage({ type: 'error', text: errorMessages[error] || 'An error occurred with LinkedIn integration.' })
      // Clear URL parameters
      router.replace(`/profiles/${id}`)
    }
  }, [fetchProfiles, searchParams, id, router])

  useEffect(() => {
    if (profiles.length > 0) {
      const p = profiles.find(p => p.id === id)
      if (p) {
        setProfile(p)
        setEditProfile({
          full_name: p.full_name || '',
          title: p.title || '',
          summary: p.summary || '',
          email: p.email || '',
          phone: p.phone || '',
          location: p.location || '',
          linkedin_url: p.linkedin_url || '',
          portfolio_url: p.portfolio_url || ''
        })
      }
    }
  }, [profiles, id])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/v1/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProfile)
      })
      if (res.ok) {
        fetchProfiles()
        setIsEditingBase(false)
      }
    } catch (error) {
      console.error("Update profile error:", error)
    }
  }

  const handleAddEducation = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/v1/profiles/${id}/education`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEdu)
      })
      if (res.ok) {
        fetchProfiles()
        setIsAddingEdu(false)
        setNewEdu({ institution: '', degree: '', field: '', start_date: '', end_date: '' })
      }
    } catch (error) {
      console.error("Add education error:", error)
    }
  }

  const handleAddExperience = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/v1/profiles/${id}/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp)
      })
      if (res.ok) {
        fetchProfiles()
        setIsAddingExp(false)
        setNewExp({ role: '', company: '', start_date: '', end_date: '', description: '' })
      }
    } catch (error) {
      console.error("Add experience error:", error)
    }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    if (!newSkill.name.trim()) return;
    
    try {
      // Split by comma and create array of skills
      const skillNames = newSkill.name
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0); // Remove empty strings
      
      if (skillNames.length === 0) return;

      // Create array of skill objects
      const skillsToAdd = skillNames.map(name => ({
        name,
        type: newSkill.type
      }));

      const res = await fetch(`/api/v1/profiles/${id}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillsToAdd)
      })
      
      if (res.ok) {
        fetchProfiles()
        setNewSkill({ name: '', type: 'hard' }) // Reset form
        setMessage({ 
          type: 'success', 
          text: `${skillNames.length} skill${skillNames.length > 1 ? 's' : ''} added successfully!` 
        })
        // Clear success message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      }
    } catch (error) {
      console.error("Add skill error:", error)
      setMessage({ type: 'error', text: 'Failed to add skills' })
    }
  }

  const handleDeleteSkill = async (skillId) => {
    try {
      const res = await fetch(`/api/v1/skills/${skillId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchProfiles() // Refresh to show updated skills
      }
    } catch (error) {
      console.error("Delete skill error:", error)
    }
  }

  const handleLinkedInConnect = async () => {
    setLinkedinLoading(true)
    try {
      const response = await fetch(`/api/v1/auth/linkedin?profileId=${id}`)
      const data = await response.json()
      
      if (data.success) {
        // Redirect to LinkedIn OAuth
        window.location.href = data.authUrl
      } else {
        setMessage({ type: 'error', text: 'Failed to initiate LinkedIn connection.' })
      }
    } catch (error) {
      console.error('LinkedIn connect error:', error)
      setMessage({ type: 'error', text: 'Failed to connect to LinkedIn. Please try again.' })
    } finally {
      setLinkedinLoading(false)
    }
  }

  if (!profile) return <div className="p-20 text-center text-sapphire font-black animate-pulse">Loading Profile Data...</div>

  return (
    <div className="min-h-screen bg-ice-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="mb-12 flex items-center justify-between flex-wrap">
          <div>
            <Link href="/profiles" className="text-sapphire hover:underline font-black uppercase text-xs tracking-widest mb-4 inline-block">← Back to Profiles</Link>
            <h1 className="text-4xl font-black text-deep-navy tracking-tight">{profile.full_name}</h1>
            <p className="text-xl text-sapphire font-medium mt-2">{profile.title}</p>
            <div className="flex items-center space-x-4 mt-4
                            text-sm font-medium text-sapphire/70
                            flex-wrap justify-center mb-5">
              {profile.email && <span>📧 {profile.email}</span>}
              {profile.phone && <span>📞 {profile.phone}</span>}
              {profile.location && <span>📍 {profile.location}</span>}
            </div>
          </div>
          <div className="flex space-x-4 flex-wrap gap-2 justify-center">
             <Button 
               variant="outline" 
               className="rounded-xl border-2 font-bold px-8 bg-[#0077B5] text-white border-[#0077B5] hover:bg-[#005885] transition-colors flex items-center space-x-2" 
               onClick={handleLinkedInConnect}
               disabled={linkedinLoading}
             >
               <span>🔗</span>
               <span>{linkedinLoading ? 'Connecting...' : 'Connect to LinkedIn'}</span>
             </Button>
             <Button variant="outline" className="rounded-xl border-2 font-bold px-8" onClick={() => setIsEditingBase(true)}>Edit Base Info</Button>
             <Link href="/generate">
               <Button className="rounded-xl px-8 shadow-lg shadow-sapphire/20">Generate CV</Button>
             </Link>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message.text && (
          <div className={`mb-8 p-4 rounded-xl border-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="font-medium">{message.text}</p>
            <button 
              onClick={() => setMessage({ type: '', text: '' })}
              className="mt-2 text-xs underline opacity-70 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Edit Base Info Modal */}
        {isEditingBase && (
          <div className="fixed inset-0 bg-deep-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-8 border-b border-ice-blue">
                <h2 className="text-2xl font-black text-deep-navy tracking-tight">Edit Base Info</h2>
              </div>
              <form onSubmit={handleUpdateProfile} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Full Name</label>
                    <input required type="text" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                      value={editProfile.full_name} onChange={(e) => setEditProfile({...editProfile, full_name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Professional Title</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                      value={editProfile.title} onChange={(e) => setEditProfile({...editProfile, title: e.target.value})} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Email</label>
                    <input required type="email" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                      value={editProfile.email} onChange={(e) => setEditProfile({...editProfile, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Phone</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                      value={editProfile.phone} onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Location</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                    value={editProfile.location} onChange={(e) => setEditProfile({...editProfile, location: e.target.value})} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">LinkedIn URL</label>
                    <input type="url" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                      value={editProfile.linkedin_url} onChange={(e) => setEditProfile({...editProfile, linkedin_url: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Portfolio URL</label>
                    <input type="url" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none" 
                      value={editProfile.portfolio_url} onChange={(e) => setEditProfile({...editProfile, portfolio_url: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-deep-navy uppercase tracking-widest mb-2">Summary</label>
                  <textarea rows="4" className="w-full px-4 py-2.5 rounded-xl border border-powder-blue outline-none resize-none" 
                    value={editProfile.summary} onChange={(e) => setEditProfile({...editProfile, summary: e.target.value})} />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-ice-blue">
                  <Button type="button" variant="ghost" onClick={() => setIsEditingBase(false)}>Cancel</Button>
                  <Button type="submit">Update Base Info</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Column: Experiences */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-deep-navy tracking-tight flex items-center">
                   <span className="mr-3 text-3xl">💼</span>
                   Experience
                </h2>
                <Button onClick={() => setIsAddingExp(true)} size="sm" variant="secondary" className="rounded-lg font-bold">
                   + Add Experience
                </Button>
              </div>

              {isAddingExp && (
                <Card className="mb-8 border-2 border-sapphire/30 animate-in slide-in-from-top-4 duration-300">
                  <form onSubmit={handleAddExperience} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Role</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newExp.role} onChange={(e) => setNewExp({...newExp, role: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Company</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Start Date</label>
                        <input required type="date" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newExp.start_date} onChange={(e) => setNewExp({...newExp, start_date: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">End Date (Optional)</label>
                        <input type="date" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newExp.end_date} onChange={(e) => setNewExp({...newExp, end_date: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Description / Achievements</label>
                      <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire resize-none"
                        value={newExp.description} onChange={(e) => setNewExp({...newExp, description: e.target.value})} />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button type="button" variant="ghost" onClick={() => setIsAddingExp(false)}>Cancel</Button>
                      <Button type="submit">Save Experience</Button>
                    </div>
                  </form>
                </Card>
              )}

              <div className="space-y-6">
                {profile.experiences?.length === 0 ? (
                  <p className="text-sapphire/60 italic p-12 text-center bg-white/40 rounded-2xl border-2 border-dashed border-powder-blue font-medium">No experience added yet.</p>
                ) : (
                  profile.experiences?.map((exp) => (
                    <Card key={exp.id} className="p-8 hover:border-sapphire transition-colors group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-black text-deep-navy tracking-tight group-hover:text-sapphire transition-colors">{exp.role}</h3>
                          <p className="text-sapphire font-bold mt-1 uppercase tracking-wider text-xs">{exp.company}</p>
                          <p className="text-xs text-sapphire/40 font-black mt-2 uppercase tracking-widest">
                            {new Date(exp.start_date).toLocaleDateString()} — {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                          </p>
                          {exp.description && (
                            <p className="mt-6 text-deep-navy/80 leading-relaxed font-medium whitespace-pre-line">{exp.description}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-deep-navy tracking-tight flex items-center">
                   <span className="mr-3 text-3xl">🎓</span>
                   Education
                </h2>
                <Button onClick={() => setIsAddingEdu(true)} size="sm" variant="secondary" className="rounded-lg font-bold">
                   + Add Education
                </Button>
              </div>

              {isAddingEdu && (
                <Card className="mb-8 border-2 border-sapphire/30 animate-in slide-in-from-top-4 duration-300">
                  <form onSubmit={handleAddEducation} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Institution</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newEdu.institution} onChange={(e) => setNewEdu({...newEdu, institution: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Degree</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Field of Study</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newEdu.field} onChange={(e) => setNewEdu({...newEdu, field: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Start Date</label>
                        <input required type="date" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newEdu.start_date} onChange={(e) => setNewEdu({...newEdu, start_date: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">End Date (Optional)</label>
                        <input type="date" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire" 
                          value={newEdu.end_date} onChange={(e) => setNewEdu({...newEdu, end_date: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button type="button" variant="ghost" onClick={() => setIsAddingEdu(false)}>Cancel</Button>
                      <Button type="submit">Save Education</Button>
                    </div>
                  </form>
                </Card>
              )}

              <div className="space-y-6">
                {profile.education?.length === 0 ? (
                  <p className="text-sapphire/60 italic p-12 text-center bg-white/40 rounded-2xl border-2 border-dashed border-powder-blue font-medium">No education added yet.</p>
                ) : (
                  profile.education?.map((edu) => (
                    <Card key={edu.id} className="p-8 hover:border-sapphire transition-colors group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-black text-deep-navy tracking-tight group-hover:text-sapphire transition-colors">{edu.degree} in {edu.field}</h3>
                          <p className="text-sapphire font-bold mt-1 uppercase tracking-wider text-xs">{edu.institution}</p>
                          <p className="text-xs text-sapphire/40 font-black mt-2 uppercase tracking-widest">
                            {new Date(edu.start_date).toLocaleDateString()} — {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar: Skills & Summary */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-black text-deep-navy tracking-tight flex items-center mb-8">
                 <span className="mr-3 text-3xl">🧩</span>
                 Skills
              </h2>
              
              <div className="space-y-8">
                {/* Quick Add Skills */}
                <div className="bg-white/60 border border-powder-blue rounded-2xl p-6">
                  <h3 className="text-sm font-black text-sapphire/60 uppercase tracking-widest mb-4">Quick Add Skills</h3>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, Python (comma-separated)"
                      className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire text-sm"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newSkill.name.trim()) {
                          handleAddSkill(e);
                        }
                      }}
                    />
                    <div className="flex gap-2 flex-wrap">
                      <div className="flex bg-ice-blue/50 rounded-lg p-1">
                        <button 
                          type="button" 
                          onClick={() => setNewSkill({...newSkill, type: 'hard'})} 
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${newSkill.type === 'hard' ? 'bg-white shadow-sm text-sapphire' : 'text-sapphire/60'}`}
                        >
                          Hard
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setNewSkill({...newSkill, type: 'soft'})} 
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${newSkill.type === 'soft' ? 'bg-white shadow-sm text-sapphire' : 'text-sapphire/60'}`}
                        >
                          Soft
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          if (newSkill.name.trim()) {
                            handleAddSkill(e);
                          }
                        }}
                        disabled={!newSkill.name.trim()}
                        className="px-4 py-2 bg-sapphire text-white rounded-lg text-sm font-bold hover:bg-deep-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-sapphire/60">
                    💡 Tip: Add multiple skills at once by separating them with commas
                  </p>
                </div>

                {/* Hard Skills */}
                <div>
                   <h3 className="text-xs font-black text-sapphire/40 uppercase tracking-widest mb-4">Hard Skills</h3>
                   <div className="flex flex-wrap gap-2">
                     {profile.skills?.filter(s => s.type === 'hard').map(skill => (
                       <div key={skill.id} className="group relative" title={skill.name}>
                         <span className="px-4 py-2 bg-white border border-powder-blue text-deep-navy font-bold rounded-xl text-sm shadow-sm hover:border-sapphire transition-colors pr-8 inline-block max-w-[200px] truncate">
                           {skill.name}
                         </span>
                         <button
                           onClick={() => handleDeleteSkill(skill.id)}
                           className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center"
                         >
                           ×
                         </button>
                       </div>
                     ))}
                     {profile.skills?.filter(s => s.type === 'hard').length === 0 && (
                       <p className="text-sapphire/40 italic text-sm">No hard skills added yet</p>
                     )}
                   </div>
                </div>

                {/* Soft Skills */}
                <div>
                   <h3 className="text-xs font-black text-sapphire/40 uppercase tracking-widest mb-4">Soft Skills</h3>
                   <div className="flex flex-wrap gap-2 items-center">
                     {profile.skills?.filter(s => s.type === 'soft').map(skill => (
                       <div key={skill.id} className="group relative" title={skill.name}>
                         <span className="px-4 py-2 bg-sapphire/5 border border-sapphire/20 text-sapphire font-bold rounded-xl text-sm shadow-sm hover:bg-sapphire/10 transition-colors pr-8 inline-block max-w-[200px] truncate">
                           {skill.name}
                         </span>
                         <button
                           onClick={() => handleDeleteSkill(skill.id)}
                           className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center"
                         >
                           ×
                         </button>
                       </div>
                     ))}
                     {profile.skills?.filter(s => s.type === 'soft').length === 0 && (
                       <p className="text-sapphire/40 italic text-sm">No soft skills added yet</p>
                     )}
                   </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-deep-navy tracking-tight flex items-center mb-8">
                 <span className="mr-3 text-3xl">📝</span>
                 Summary
              </h2>
              <Card className="bg-white/60 border-2 border-dashed border-powder-blue">
                <p className="text-deep-navy/70 leading-relaxed font-medium italic">
                  "{profile.summary || "No base summary set yet. A good summary helps the AI understand your unique value proposition."}"
                </p>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
