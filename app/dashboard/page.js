'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import Link from 'next/link'

export default function DashboardPage() {
  const { profiles, submissions, pagination, stats, fetchProfiles, fetchSubmissions } = useStore()

  useEffect(() => {
    fetchProfiles()
    fetchSubmissions(1, 5)
  }, [fetchProfiles, fetchSubmissions])

  console.log(submissions)
  const handlePageChange = (newPage) => {
    fetchSubmissions(newPage, pagination.limit)
  }

  const getDocIcon = (type) => {
    switch (type) {
      case 'cv': return '📄';
      case 'cover_letter': return '✉️';
      case 'summary': return '📝';
      default: return '📄';
    }
  }

  return (
    <div className="min-h-screen bg-ice-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-deep-navy tracking-tight">Welcome Back!</h1>
            <p className="text-sapphire mt-2 font-medium">Ready to tailor another CV?</p>
          </div>
          <Link href="/generate">
            <Button size="lg" className="rounded-xl shadow-lg shadow-sapphire/20">
              Tailor a CV
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Profiles', value: profiles.length, color: 'bg-white' },
            { label: 'Tailored CVs', value: stats.cv, color: 'bg-white' },
            { label: 'Cover Letters', value: stats.cover_letter, color: 'bg-white' },
            { 
              label: 'Success Rate', 
              value: '--', // Placeholder until we implement actual success tracking
              color: 'bg-white' 
            },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} p-8 rounded-2xl shadow-sm border border-powder-blue transition-all hover:shadow-md`}>
              <span className="text-xs font-black text-sapphire/40 uppercase tracking-widest block mb-2">{stat.label}</span>
              <span className="text-4xl font-black text-deep-navy tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Recent Submissions */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-deep-navy tracking-tight flex items-center">
              <span className="mr-3">🕒</span>
              Recent Activity
            </h2>
            
            {submissions.length === 0 ? (
              <div className="bg-white/60 border-2 border-dashed border-powder-blue rounded-3xl p-20 text-center flex flex-col items-center">
                <div className="text-6xl mb-6">📄</div>
                <h3 className="text-xl font-bold text-deep-navy mb-4 tracking-tight">No submissions yet</h3>
                <p className="text-sapphire/80 mb-8 max-w-xs leading-relaxed font-medium">Once you start generating tailored CVs, they'll appear here for quick access.</p>
                <Link href="/generate">
                  <Button variant="outline">Start Your First Tailoring</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <Card key={sub.id} className="p-6 hover:border-sapphire transition-colors group">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-ice-blue rounded-xl flex items-center justify-center text-xl">💼</div>
                            <div>
                              <h4 className="text-lg font-bold text-deep-navy group-hover:text-sapphire transition-colors">{sub.job_title || 'Untitled Role'}</h4>
                              <p className="text-sm text-sapphire font-medium">{sub.company_name || 'Various Companies'}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs font-bold text-sapphire/40 px-3 py-1 bg-ice-blue/30 rounded-full">{new Date(sub.created_at).toLocaleDateString()}</span>
                            <Link href={`/generate/${sub?.documents[0]?.id}`}>
                              <Button size="sm" variant="ghost">View Details</Button>
                            </Link>
                          </div>
                        </div>
                        
                        {/* Generated Documents for this submission */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-ice-blue">
                          {sub.documents?.map((doc) => (
                            <Link key={doc.id} href={`/generate/${sub.id}?type=${doc.type}`}>
                              <div className="flex items-center space-x-2 px-3 py-1.5 bg-ice-blue/50 hover:bg-ice-blue rounded-lg transition-colors cursor-pointer border border-powder-blue/30">
                                <span className="text-sm">{getDocIcon(doc.type)}</span>
                                <span className="text-xs font-bold text-deep-navy capitalize">{doc.type.replace('_', ' ')}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={pagination.page === 1}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={pagination.page === i + 1 ? 'default' : 'ghost'}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={pagination.page === pagination.totalPages}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar: Quick Profiles */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-deep-navy tracking-tight flex items-center">
              <span className="mr-3">👤</span>
              Quick Profiles
            </h2>
            <div className="space-y-4">
              {profiles.slice(0, 3).map((profile) => (
                <Link href={`/profiles/${profile.id}`} key={profile.id}>
                  <Card className="hover:border-sapphire transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-deep-navy group-hover:text-sapphire transition-colors">
                          {profile.full_name || 'Unnamed Profile'}
                        </h4>
                        <p className="text-xs text-sapphire font-medium mt-1">
                          {profile.title || 'No title set'}
                        </p>
                        <p className="text-[10px] text-sapphire/60 font-medium mt-0.5">
                          {profile.experiences?.length || 0} Experiences • {profile.skills?.length || 0} Skills
                        </p>
                      </div>
                      {profile.is_default && (
                        <span className="text-[10px] font-black uppercase text-sapphire bg-ice-blue px-2 py-1 rounded-full">Default</span>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
              <Link href="/profiles" className="block">
                <Button variant="outline" className="w-full rounded-xl py-4 font-bold tracking-tight">Manage All Profiles</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
