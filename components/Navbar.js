'use client'

import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { User01, LogOut02 } from '@untitledui/icons'

export default function Navbar() {
  const { user, logout } = useStore()

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-powder-blue/50 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-black text-deep-navy tracking-tight hover:text-sapphire transition-colors">
          FitCV
        </Link>
        
        {user && (
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-sapphire hover:text-deep-navy font-semibold transition-colors text-sm uppercase tracking-wider">
              Dashboard
            </Link>
            <Link href="/profiles" className="text-sapphire hover:text-deep-navy font-semibold transition-colors text-sm uppercase tracking-wider">
              Profiles
            </Link>
            <Link href="/generate" className="text-sapphire hover:text-deep-navy font-semibold transition-colors text-sm uppercase tracking-wider">
              Generate
            </Link>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-sapphire/80">
              <User01 className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">{user.email}</span>
            </div>
            <button 
              onClick={logout}
              className="flex items-center space-x-2 bg-ice-blue text-deep-navy px-4 py-2 rounded-lg font-semibold hover:bg-powder-blue transition-all"
            >
              <LogOut02 className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sapphire hover:text-deep-navy font-semibold text-sm uppercase tracking-wider">
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-sapphire text-white px-5 py-2 rounded-lg font-bold hover:bg-deep-navy transition-all shadow-md text-sm uppercase tracking-wider"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
