'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail01, Lock01, ArrowRight } from '@untitledui/icons'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useStore()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Set user in store
      setUser(data.user)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-blue via-white to-powder-blue/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 py-16">
        {/* Document Container */}
        <div className="w-full max-w-2xl">
          {/* Paper Document */}
          <div className="bg-white shadow-2xl relative">
            {/* Document Header - Letterhead Style */}
            <div className="border-b-4 border-sapphire bg-gradient-to-r from-sapphire/5 to-transparent px-12 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-black text-deep-navy tracking-tight mb-1">FitCV</h1>
                  <p className="text-xs font-bold text-sapphire uppercase tracking-widest">CV Generation Platform</p>
                </div>
                <div className="w-16 h-16 bg-sapphire/10 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-sapphire/20 rounded-full flex items-center justify-center">
                    <Lock01 className="w-6 h-6 text-sapphire" />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="px-12 py-10">
              {/* Document Title */}
              <div className="mb-8">
                <div className="flex items-baseline space-x-3 mb-2">
                  <h2 className="text-2xl font-black text-deep-navy tracking-tight">Access Request</h2>
                  <span className="text-xs font-bold text-sapphire/40 uppercase tracking-widest">Form 001</span>
                </div>
                <div className="h-1 w-24 bg-sapphire"></div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500">
                  <p className="text-red-700 text-sm font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-8">
                {/* Email Field - Document Style */}
                <div className="border-b-2 border-dotted border-powder-blue pb-6">
                  <label className="block text-xs font-black text-deep-navy/60 uppercase tracking-widest mb-3 flex items-center space-x-2">
                    <Mail01 className="w-4 h-4" />
                    <span>Email Address</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full text-lg font-semibold text-deep-navy bg-transparent border-none outline-none placeholder:text-deep-navy/30 placeholder:font-normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Password Field - Document Style */}
                <div className="border-b-2 border-dotted border-powder-blue pb-6">
                  <label className="block text-xs font-black text-deep-navy/60 uppercase tracking-widest mb-3 flex items-center space-x-2">
                    <Lock01 className="w-4 h-4" />
                    <span>Password</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-full text-lg font-semibold text-deep-navy bg-transparent border-none outline-none placeholder:text-deep-navy/30 placeholder:font-normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Document Footer Actions */}
                <div className="pt-6 space-y-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full py-4 text-base font-bold shadow-lg flex items-center justify-center space-x-2 group"
                    disabled={loading}
                  >
                    <span>{loading ? 'Verifying credentials...' : 'Submit Access Request'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="text-deep-navy/60 font-medium">Need an account?</span>
                    <Link href="/register" className="font-black text-sapphire hover:text-deep-navy transition-colors underline">
                      Register New Account
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            {/* Document Footer - Reference Number */}
            <div className="border-t border-ice-blue bg-ice-blue/20 px-12 py-4">
              <div className="flex items-center justify-between text-xs text-deep-navy/40">
                <span className="font-bold uppercase tracking-widest">Confidential Access Form</span>
                <span className="font-mono">REF: {new Date().getFullYear()}-LOGIN</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
