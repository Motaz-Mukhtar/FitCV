'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail01, Lock01, CheckCircle, ArrowRight } from '@untitledui/icons'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useStore()
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
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
                    <CheckCircle className="w-6 h-6 text-sapphire" />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="px-12 py-10">
              {/* Document Title */}
              <div className="mb-8">
                <div className="flex items-baseline space-x-3 mb-2">
                  <h2 className="text-2xl font-black text-deep-navy tracking-tight">Account Application</h2>
                  <span className="text-xs font-bold text-sapphire/40 uppercase tracking-widest">Form 002</span>
                </div>
                <div className="h-1 w-24 bg-sapphire"></div>
                <p className="text-sm text-deep-navy/60 mt-3 font-medium">
                  Complete the following information to establish your account
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500">
                  <p className="text-red-700 text-sm font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-8">
                {/* Email Field - Document Style */}
                <div className="border-b-2 border-dotted border-powder-blue pb-6">
                  <label className="block text-xs font-black text-deep-navy/60 uppercase tracking-widest mb-3 flex items-center space-x-2">
                    <Mail01 className="w-4 h-4" />
                    <span>Email Address</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your professional email"
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
                    <span className="text-[10px] font-semibold text-sapphire/60 normal-case tracking-normal">(minimum 8 characters)</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="Create a secure password"
                    className="w-full text-lg font-semibold text-deep-navy bg-transparent border-none outline-none placeholder:text-deep-navy/30 placeholder:font-normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={8}
                  />
                </div>

                {/* Confirm Password Field - Document Style */}
                <div className="border-b-2 border-dotted border-powder-blue pb-6">
                  <label className="block text-xs font-black text-deep-navy/60 uppercase tracking-widest mb-3 flex items-center space-x-2">
                    <Lock01 className="w-4 h-4" />
                    <span>Confirm Password</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="Re-enter your password"
                    className="w-full text-lg font-semibold text-deep-navy bg-transparent border-none outline-none placeholder:text-deep-navy/30 placeholder:font-normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Terms Section - Document Style */}
                <div className="bg-ice-blue/30 border-l-4 border-sapphire p-4">
                  <p className="text-xs text-deep-navy/70 leading-relaxed font-medium">
                    By submitting this application, you agree to the terms of service and confirm that the information provided is accurate and complete.
                  </p>
                </div>

                {/* Document Footer Actions */}
                <div className="pt-6 space-y-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full py-4 text-base font-bold shadow-lg flex items-center justify-center space-x-2 group"
                    disabled={loading}
                  >
                    <span>{loading ? 'Processing application...' : 'Submit Application'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="text-deep-navy/60 font-medium">Already registered?</span>
                    <Link href="/login" className="font-black text-sapphire hover:text-deep-navy transition-colors underline">
                      Sign In
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            {/* Document Footer - Reference Number */}
            <div className="border-t border-ice-blue bg-ice-blue/20 px-12 py-4">
              <div className="flex items-center justify-between text-xs text-deep-navy/40">
                <span className="font-bold uppercase tracking-widest">New Account Registration</span>
                <span className="font-mono">REF: {new Date().getFullYear()}-REG-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
