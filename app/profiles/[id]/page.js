'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfileDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { profiles, fetchProfiles } = useStore()
  
  const [profile, setProfile] = useState(null)
  const [isAddingExp, setIsAddingExp] = useState(false)
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [newExp, setNewExp] = useState({ role: '', company: '', start_date: '', end_date: '', description: '' })
  const [newSkill, setNewSkill] = useState({ name: '', type: 'hard' })

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  useEffect(() => {
    if (profiles.length > 0) {
      const p = profiles.find(p => p.id === id)
      if (p) setProfile(p)
    }
  }, [profiles, id])

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
    try {
      const res = await fetch(`/api/v1/profiles/${id}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      })
      if (res.ok) {
        fetchProfiles()
        setIsAddingSkill(false)
        setNewSkill({ name: '', type: 'hard' })
      }
    } catch (error) {
      console.error("Add skill error:", error)
    }
  }

  if (!profile) return <div className="p-20 text-center text-sapphire font-black animate-pulse">Loading Profile Data...</div>

  return (
    <div className="min-h-screen bg-ice-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <Link href="/profiles" className="text-sapphire hover:underline font-black uppercase text-xs tracking-widest mb-4 inline-block">← Back to Profiles</Link>
            <h1 className="text-4xl font-black text-deep-navy tracking-tight">{profile.name}</h1>
            <p className="text-xl text-sapphire font-medium mt-2">{profile.title}</p>
          </div>
          <div className="flex space-x-4">
             <Button variant="outline" className="rounded-xl border-2 font-bold px-8">Edit Base Info</Button>
             <Link href="/generate">
               <Button className="rounded-xl px-8 shadow-lg shadow-sapphire/20">Generate CV</Button>
             </Link>
          </div>
        </div>

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
          </div>

          {/* Sidebar: Skills & Summary */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-black text-deep-navy tracking-tight flex items-center mb-8">
                 <span className="mr-3 text-3xl">🧩</span>
                 Skills
              </h2>
              
              <div className="space-y-8">
                {/* Hard Skills */}
                <div>
                   <h3 className="text-xs font-black text-sapphire/40 uppercase tracking-widest mb-4">Hard Skills</h3>
                   <div className="flex flex-wrap gap-2">
                     {profile.skills?.filter(s => s.type === 'hard').map(skill => (
                       <span key={skill.id} className="px-4 py-2 bg-white border border-powder-blue text-deep-navy font-bold rounded-xl text-sm shadow-sm hover:border-sapphire transition-colors">
                         {skill.name}
                       </span>
                     ))}
                   </div>
                </div>

                {/* Soft Skills */}
                <div>
                   <h3 className="text-xs font-black text-sapphire/40 uppercase tracking-widest mb-4">Soft Skills</h3>
                   <div className="flex flex-wrap gap-2">
                     {profile.skills?.filter(s => s.type === 'soft').map(skill => (
                       <span key={skill.id} className="px-4 py-2 bg-sapphire/5 border border-sapphire/20 text-sapphire font-bold rounded-xl text-sm shadow-sm hover:bg-sapphire/10 transition-colors">
                         {skill.name}
                       </span>
                     ))}
                   </div>
                </div>

                <Button onClick={() => setIsAddingSkill(true)} variant="outline" className="w-full rounded-xl py-4 border-2 font-black tracking-tight text-xs uppercase">
                  + Add Skill
                </Button>

                {isAddingSkill && (
                  <Card className="animate-in zoom-in-95 duration-200">
                    <form onSubmit={handleAddSkill} className="space-y-6">
                       <div>
                         <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Skill Name</label>
                         <input required type="text" className="w-full px-4 py-2 rounded-lg border border-powder-blue outline-none" 
                           value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} />
                       </div>
                       <div>
                         <label className="block text-[10px] font-black text-sapphire/40 uppercase tracking-widest mb-2">Type</label>
                         <div className="flex bg-ice-blue/30 p-1 rounded-xl">
                            <button type="button" onClick={() => setNewSkill({...newSkill, type: 'hard'})} 
                              className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${newSkill.type === 'hard' ? 'bg-white shadow-sm text-sapphire' : 'text-sapphire/40'}`}>Hard</button>
                            <button type="button" onClick={() => setNewSkill({...newSkill, type: 'soft'})} 
                              className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${newSkill.type === 'soft' ? 'bg-white shadow-sm text-sapphire' : 'text-sapphire/40'}`}>Soft</button>
                         </div>
                       </div>
                       <div className="flex space-x-2">
                         <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingSkill(false)}>Cancel</Button>
                         <Button type="submit" size="sm" className="flex-1">Add</Button>
                       </div>
                    </form>
                  </Card>
                )}
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
