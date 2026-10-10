'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import Link from 'next/link'
import { 
  File06,
  Mail01,
  FileCheck01, 
  Clock, 
  User01, 
  Briefcase01, 
  TrendUp01, 
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Folder,
  Award01
} from '@untitledui/icons'

export default function DashboardPage() {
  const { profiles, submissions, pagination, stats, fetchProfiles, fetchSubmissions } = useStore()

  useEffect(() => {
    fetchProfiles()
    fetchSubmissions(1, 5)
  }, [fetchProfiles, fetchSubmissions])

  const handlePageChange = (newPage) => {
    fetchSubmissions(newPage, pagination.limit)
  }

  const getDocIcon = (type) => {
    switch (type) {
      case 'cv': return File06;
      case 'cover_letter': return Mail01;
      case 'summary': return FileCheck01;
      default: return File06;
    }
  }

  const getDocLabel = (type) => {
    switch (type) {
      case 'cv': return 'CV';
      case 'cover_letter': return 'Cover Letter';
      case 'summary': return 'Summary';
      default: return 'Document';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-blue/30 via-white to-powder-blue/20 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Header Section - Document Style */}
        <div className="bg-white border-l-4 border-sapphire shadow-lg mb-12 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sapphire/5 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Folder className="w-8 h-8 text-sapphire" />
                <h1 className="text-4xl font-black text-deep-navy tracking-tight">Command Center</h1>
              </div>
              <p className="text-sapphire font-semibold text-lg">Manage your professional documents</p>
            </div>
            <Link href="/generate">
              <Button size="lg" className="rounded-xl shadow-lg px-8 py-4 flex items-center space-x-2 group">
                <Plus className="w-5 h-5" />
                <span>Create Tailored CV</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid - Document Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { 
              label: 'Active Profiles', 
              value: profiles.length, 
              icon: User01,
              color: 'text-sapphire',
              bg: 'bg-sapphire/10',
              desc: 'Professional profiles'
            },
            { 
              label: 'Tailored CVs', 
              value: stats.cv || 0, 
              icon: File06,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              desc: 'Generated documents'
            },
            { 
              label: 'Cover Letters', 
              value: stats.cover_letter || 0, 
              icon: Mail01,
              color: 'text-purple-600',
              bg: 'bg-purple-50',
              desc: 'Personalized letters'
            },
            { 
              label: 'Total Applications', 
              value: submissions.length || 0,
              icon: Award01,
              color: 'text-green-600',
              bg: 'bg-green-50',
              desc: 'Submissions tracked'
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-powder-blue/50 hover:border-sapphire/50 transition-all hover:shadow-lg group">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendUp01 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <span className="text-xs font-black text-deep-navy/40 uppercase tracking-widest block mb-1">{stat.label}</span>
                  <span className="text-3xl font-black text-deep-navy tracking-tight">{stat.value}</span>
                </div>
                <p className="text-xs text-deep-navy/60 font-medium">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Recent Submissions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Header - Document Style */}
            <div className="flex items-center space-x-3 pb-4 border-b-2 border-powder-blue">
              <Clock className="w-6 h-6 text-sapphire" />
              <h2 className="text-2xl font-black text-deep-navy tracking-tight">Recent Activity</h2>
              <div className="flex-1"></div>
              <span className="text-xs font-bold text-sapphire/60 uppercase tracking-widest">{submissions.length} Total</span>
            </div>
            
            {submissions.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-powder-blue rounded-2xl p-16 text-center">
                <div className="w-20 h-20 bg-ice-blue/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <File06 className="w-10 h-10 text-sapphire/40" />
                </div>
                <h3 className="text-xl font-black text-deep-navy mb-3 tracking-tight">No Activity Yet</h3>
                <p className="text-deep-navy/60 mb-8 max-w-sm mx-auto leading-relaxed font-medium">
                  Your generated CVs and cover letters will appear here. Start by creating your first tailored document.
                </p>
                <Link href="/generate">
                  <Button className="px-8 py-3 flex items-center space-x-2 mx-auto">
                    <Plus className="w-5 h-5" />
                    <span>Generate First Document</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="bg-white border border-powder-blue hover:border-sapphire transition-all hover:shadow-lg group">
                      <div className="p-6 space-y-4">
                        {/* Submission Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-sapphire/10 to-sapphire/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-sapphire/20 group-hover:to-sapphire/10 transition-all">
                              <Briefcase01 className="w-6 h-6 text-sapphire" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-black text-deep-navy group-hover:text-sapphire transition-colors truncate">
                                {sub.job_title || 'Untitled Position'}
                              </h4>
                              <p className="text-sm text-sapphire/80 font-semibold mt-1">
                                {sub.company_name || 'Company Not Specified'}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs font-bold text-deep-navy/40 uppercase tracking-wider flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/generate/${sub.id}`}>
                            <Button size="sm" variant="ghost" className="flex items-center space-x-1 group/btn">
                              <span className="text-xs font-bold uppercase tracking-wider">View</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                        
                        {/* Document Tags */}
                        {sub.documents && sub.documents.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-ice-blue/50">
                            <span className="text-[10px] font-black text-deep-navy/40 uppercase tracking-widest mr-2 flex items-center">
                              Documents:
                            </span>
                            {sub.documents.map((doc) => {
                              const DocIcon = getDocIcon(doc.type);
                              return (
                                <Link key={doc.id} href={`/generate/${sub.id}?type=${doc.type}`}>
                                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-ice-blue/30 hover:bg-sapphire/10 border border-powder-blue/50 hover:border-sapphire/30 transition-all cursor-pointer group/doc">
                                    <DocIcon className="w-4 h-4 text-sapphire group-hover/doc:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                                      {getDocLabel(doc.type)}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8 pt-6 border-t border-powder-blue">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={pagination.page === 1}
                      onClick={() => handlePageChange(pagination.page - 1)}
                      className="flex items-center space-x-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>
                    <div className="flex items-center space-x-1">
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={pagination.page === i + 1 ? 'default' : 'ghost'}
                          size="sm"
                          className="w-10 h-10 p-0 font-black"
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
                      className="flex items-center space-x-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar: Quick Profiles */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center space-x-3 pb-4 border-b-2 border-powder-blue">
              <User01 className="w-6 h-6 text-sapphire" />
              <h2 className="text-2xl font-black text-deep-navy tracking-tight">Profiles</h2>
            </div>
            
            <div className="space-y-3">
              {profiles.slice(0, 3).map((profile) => (
                <Link href={`/profiles/${profile.id}`} key={profile.id}>
                  <div className="bg-white border border-powder-blue hover:border-sapphire transition-all hover:shadow-md group">
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-black text-deep-navy group-hover:text-sapphire transition-colors truncate">
                            {profile.full_name || 'Unnamed Profile'}
                          </h4>
                          <p className="text-xs text-sapphire font-semibold mt-1 truncate">
                            {profile.title || 'No title specified'}
                          </p>
                        </div>
                        {profile.is_default && (
                          <span className="text-[9px] font-black uppercase text-white bg-sapphire px-2 py-1 rounded-full tracking-wider flex-shrink-0 ml-2">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-[10px] text-deep-navy/60 font-bold uppercase tracking-widest pt-2 border-t border-ice-blue/50">
                        <span className="flex items-center space-x-1">
                          <Briefcase01 className="w-3 h-3" />
                          <span>{profile.experiences?.length || 0} Exp</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Award01 className="w-3 h-3" />
                          <span>{profile.skills?.length || 0} Skills</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              <Link href="/profiles" className="block">
                <Button variant="outline" className="w-full py-4 font-bold tracking-tight border-2 flex items-center justify-center space-x-2 group">
                  <User01 className="w-4 h-4" />
                  <span>Manage All Profiles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}