'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ice-blue">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 mb-8 bg-white/80 border border-sapphire text-sapphire rounded-full text-sm font-bold shadow-sm backdrop-blur-sm animate-fade-in">
            NEW: AI-Powered Tailored CVs
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-deep-navy mb-8 leading-tight tracking-tight">
            Tailor your CV to <br />
            <span className="text-sapphire">every job</span> in seconds.
          </h1>
          
          <p className="text-xl md:text-2xl text-sapphire/80 mb-12 max-w-3xl leading-relaxed">
            Stop sending the same generic CV. FitCV uses AI to perfectly align 
            your experience with any job description, increasing your interview chances.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/register">
              <Button size="lg" className="px-10 py-4 text-lg rounded-xl shadow-xl">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-10 py-4 text-lg rounded-xl">
                Log In
              </Button>
            </Link>
          </div>
          
          {/* Dashboard Preview / Visual element */}
          <div className="mt-20 w-full max-w-5xl bg-white/40 border border-white/50 rounded-2xl shadow-2xl p-4 backdrop-blur-md transform hover:scale-[1.02] transition-transform duration-500">
             <div className="bg-white rounded-xl shadow-inner border border-powder-blue aspect-[16/9] overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-ice-blue/50 via-transparent to-sapphire/5"></div>
               
               {/* Dashboard Content Preview */}
               <div className="relative z-10 p-6 h-full flex flex-col animate-fade-in-delayed">
                 {/* Header */}
                 <div className="flex items-center justify-between mb-6">
                   <div>
                     <div className="h-6 w-40 bg-deep-navy/80 rounded mb-2"></div>
                     <div className="h-3 w-32 bg-sapphire/40 rounded"></div>
                   </div>
                   <div className="h-10 w-32 bg-sapphire rounded-lg"></div>
                 </div>

                 {/* Stats Grid */}
                 <div className="grid grid-cols-4 gap-3 mb-6">
                   {[
                     { label: 'Profiles', value: '3' },
                     { label: 'CVs', value: '12' },
                     { label: 'Letters', value: '8' },
                     { label: 'Success', value: '75%' }
                   ].map((stat, i) => (
                     <div key={i} className="bg-white/80 p-3 rounded-lg border border-powder-blue/50 shadow-sm animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                       <div className="h-2 w-16 bg-sapphire/30 rounded mb-2"></div>
                       <div className="text-lg font-black text-deep-navy">{stat.value}</div>
                     </div>
                   ))}
                 </div>

                 {/* Recent Activity Cards */}
                 <div className="flex-1 space-y-2">
                   {[1, 2].map((i) => (
                     <div key={i} className="bg-white/90 p-4 rounded-lg border border-powder-blue/50 shadow-sm flex items-center justify-between animate-slide-up" style={{ animationDelay: `${400 + i * 100}ms` }}>
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-ice-blue rounded-lg flex items-center justify-center text-lg">💼</div>
                         <div>
                           <div className="h-3 w-32 bg-deep-navy/70 rounded mb-1"></div>
                           <div className="h-2 w-24 bg-sapphire/40 rounded"></div>
                         </div>
                       </div>
                       <div className="flex space-x-1">
                         <div className="w-6 h-6 bg-ice-blue/50 rounded"></div>
                         <div className="w-6 h-6 bg-ice-blue/50 rounded"></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-24 px-6 border-t border-powder-blue">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-deep-navy mb-4 tracking-tight">How it works</h2>
              <p className="text-xl text-sapphire font-medium">Three simple steps to your dream job</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  desc: "Add your work history, skills, and base summary. Create multiple profiles for different roles."
                },
                {
                  step: "02",
                  title: "Paste Job Description",
                  desc: "Simply copy and paste the requirements for the job you're applying for."
                },
                {
                  step: "03",
                  title: "Generate & Download",
                  desc: "AI-Generated tailored your content. Preview, tweak, and download as a professional PDF."
                }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-start p-8 rounded-2xl bg-ice-blue/30 border border-ice-blue transition-all hover:shadow-lg hover:border-sapphire/30 group">
                  <span className="text-5xl font-black text-sapphire/10 group-hover:text-sapphire/20 transition-colors mb-6">{f.step}</span>
                  <h3 className="text-2xl font-bold text-deep-navy mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-sapphire/80 leading-relaxed font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep-navy py-12 px-6 text-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold mb-4 md:mb-0">FitCV</div>
          <p className="text-white/60">&copy; 2026 FitCV. Powered By AI.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-sapphire transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-sapphire transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
