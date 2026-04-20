'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
    <div className="min-h-screen bg-ice-blue flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl p-10 border-none bg-white/80 backdrop-blur-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-deep-navy tracking-tight mb-2">Welcome Back</h1>
            <p className="text-sapphire font-medium">Log in to your FitCV account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-sapphire/40 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-xl border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-sapphire/40 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-xl border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full rounded-xl py-4 shadow-xl shadow-sapphire/20"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ice-blue"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-sapphire/40">
                <span className="bg-white px-4 rounded-full">Or</span>
              </div>
            </div>

            <p className="text-center text-sm font-medium text-sapphire">
              Don't have an account? <Link href="/register" className="font-black hover:underline">Register</Link>
            </p>
          </form>
        </Card>
      </main>
    </div>
  )
}
