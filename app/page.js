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
            Stop sending the same generic CV. FitCV uses Gemini AI to perfectly align 
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
             <div className="bg-white rounded-xl shadow-inner border border-powder-blue aspect-[16/9] flex items-center justify-center text-sapphire/20 font-black text-4xl overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-ice-blue/50 via-transparent to-sapphire/5"></div>
               <div className="z-10 flex flex-col items-center space-y-4">
                 <div className="w-64 h-8 bg-ice-blue rounded-full animate-pulse"></div>
                 <div className="w-96 h-4 bg-ice-blue rounded-full animate-pulse"></div>
                 <div className="w-48 h-4 bg-ice-blue rounded-full animate-pulse"></div>
                 <div className="mt-8 grid grid-cols-3 gap-4 w-full px-12">
                   <div className="h-32 bg-ice-blue rounded-xl animate-pulse"></div>
                   <div className="h-32 bg-ice-blue rounded-xl animate-pulse delay-75"></div>
                   <div className="h-32 bg-ice-blue rounded-xl animate-pulse delay-150"></div>
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
                  desc: "Gemini AI tailored your content. Preview, tweak, and download as a professional PDF."
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
          <p className="text-white/60">&copy; 2026 FitCV. Powered by Gemini AI.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-sapphire transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-sapphire transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
