'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useStore()
  const router = useRouter()

  const handleMockRegister = (e) => {
    e.preventDefault()
    // Mock user for Day 5 testing
    setUser({ id: '00000000-0000-0000-0000-000000000001', email: email || 'test@fitcv.com' })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-ice-blue flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl p-10 border-none bg-white/80 backdrop-blur-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-deep-navy tracking-tight mb-2">Create Account</h1>
            <p className="text-sapphire font-medium">Join FitCV and start tailoring your CV</p>
          </div>

          <form onSubmit={handleMockRegister} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-sapphire/40 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-xl border border-powder-blue outline-none focus:ring-2 focus:ring-sapphire focus:border-transparent transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-xl py-4 shadow-xl shadow-sapphire/20">
              Create Account
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
              Already have an account? <Link href="/login" className="font-black hover:underline">Log In</Link>
            </p>
          </form>
        </Card>
      </main>
    </div>
  )
}
