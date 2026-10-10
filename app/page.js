'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Star06, File01, Target01, Download01, ArrowRight, CheckCircle, Zap } from '@untitledui/icons';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-ice-blue via-white to-powder-blue/30">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Value Proposition */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sapphire/5 border border-sapphire/20 text-sapphire rounded-full text-sm font-bold backdrop-blur-sm">
                <Star06 className="w-4 h-4" />
                <span>AI-POWERED TAILORING</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-deep-navy leading-[1.1] tracking-tight">
                Every job deserves<br />
                <span className="text-sapphire relative">
                  its own CV
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C50 5 100 2 150 5C200 8 250 6 298 10" stroke="#0F52BA" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-deep-navy/70 leading-relaxed max-w-xl">
                Stop sending generic CVs. Our AI analyzes job descriptions and reshapes your experience to match—increasing your interview rate by up to 3×.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="px-8 py-6 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group">
                    <span>Start Tailoring Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-base font-bold rounded-xl border-2 flex items-center space-x-2">
                    <span>Sign In</span>
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-8 pt-8 border-t border-powder-blue/50">
                <div>
                  <div className="text-3xl font-black text-sapphire">2,400+</div>
                  <div className="text-sm text-deep-navy/60 font-semibold uppercase tracking-wider">CVs Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-sapphire">78%</div>
                  <div className="text-sm text-deep-navy/60 font-semibold uppercase tracking-wider">Interview Rate</div>
                </div>
              </div>
            </div>

            {/* Right: Visual Demo */}
            <div className="relative">
              {/* Before/After Cards */}
              <div className="space-y-6">
                {/* Generic CV - Before */}
                <div className="bg-white/60 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-deep-navy/20 rounded mb-3"></div>
                      <div className="h-3 w-1/2 bg-deep-navy/10 rounded mb-2"></div>
                      <div className="h-3 w-2/3 bg-deep-navy/10 rounded"></div>
                    </div>
                    <div className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase">Generic</div>
                  </div>
                  <div className="space-y-3 opacity-40">
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-deep-navy/10 rounded"></div>
                      <div className="h-2 w-full bg-deep-navy/10 rounded"></div>
                      <div className="h-2 w-4/5 bg-deep-navy/10 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-deep-navy/10 rounded"></div>
                      <div className="h-2 w-3/4 bg-deep-navy/10 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Tailored CV - After */}
                <div className="bg-gradient-to-br from-white to-sapphire/5 border-2 border-sapphire/30 rounded-2xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sapphire/5 rounded-full blur-3xl"></div>
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-sapphire/40 rounded mb-3"></div>
                      <div className="h-3 w-1/2 bg-sapphire/20 rounded mb-2"></div>
                      <div className="h-3 w-2/3 bg-sapphire/20 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                      <CheckCircle className="w-3 h-3" />
                      <span>Tailored</span>
                    </div>
                  </div>
                  <div className="space-y-3 relative z-10">
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-sapphire/30 rounded"></div>
                      <div className="h-2 w-full bg-sapphire/30 rounded"></div>
                      <div className="h-2 w-4/5 bg-sapphire/30 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-sapphire/30 rounded"></div>
                      <div className="h-2 w-3/4 bg-sapphire/30 rounded"></div>
                    </div>
                  </div>
                  <div className="absolu bottom-4 right-4 z-10">
                    <Zap className="w-6 h-6 text-sapphire animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-sapphire text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12 animate-bounce-slow">
                Instant Match
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-20 px-6 border-y border-powder-blue/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-4 bg-sapphire/5 border border-sapphire/20 text-sapphire rounded-full text-xs font-bold uppercase tracking-wider">
                Simple Process
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-deep-navy tracking-tight">
                From profile to perfect CV
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines for desktop */}
              <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-sapphire/20 via-sapphire/40 to-sapphire/20"></div>
              
              {[
                {
                  icon: File01,
                  title: "Build Your Profile",
                  desc: "Add work history, education, skills once. Create multiple profiles for different career paths.",
                  highlight: "One-time setup"
                },
                {
                  icon: Target01,
                  title: "Paste Job Details",
                  desc: "Copy the job description. Our AI analyzes requirements, keywords, and priorities.",
                  highlight: "Smart analysis"
                },
                {
                  icon: Download01,
                  title: "Get Your CV",
                  desc: "Preview tailored content. Download as PDF. Apply with confidence.",
                  highlight: "Ready in seconds"
                }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="flex flex-col items-start p-8 rounded-2xl bg-gradient-to-br from-ice-blue/40 to-transparent border-2 border-powder-blue/50 transition-all hover:border-sapphire/50 hover:shadow-xl h-full">
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-sapphire text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                      <step.icon className="w-7 h-7 text-sapphire" />
                    </div>
                    
                    <div className="inline-block px-3 py-1 bg-sapphire/10 text-sapphire text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                      {step.highlight}
                    </div>
                    
                    <h3 className="text-2xl font-black text-deep-navy mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-deep-navy/70 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-sapphire to-deep-navy rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Stop applying with<br />the same old CV
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join professionals who tailor their application to every opportunity
                </p>
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="px-12 py-6 text-lg font-bold rounded-xl bg-white text-sapphire hover:bg-ice-blue transition-all shadow-xl hover:shadow-2xl flex items-center space-x-3 mx-auto"
                  >
                    <span>Create Your First CV</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <p className="text-white/60 text-sm mt-6 font-medium">
                  Free to start. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep-navy py-12 px-6 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-2xl font-black tracking-tight">FitCV</div>
          <p className="text-white/60 text-sm font-medium">
            &copy; 2026 FitCV. Powered by AI.
          </p>
          <div className="flex space-x-8">
            <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
              Privacy
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
