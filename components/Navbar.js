import Link from 'next/link'
import { useStore } from '@/store/useStore'

export default function Navbar() {
  const { user, logout } = useStore()

  return (
    <nav className="bg-white border-b border-powder-blue px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-bold text-deep-navy">FitCV</Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-sapphire hover:text-deep-navy font-medium transition-colors">Dashboard</Link>
          <Link href="/profiles" className="text-sapphire hover:text-deep-navy font-medium transition-colors">Profiles</Link>
          <Link href="/generate" className="text-sapphire hover:text-deep-navy font-medium transition-colors">Generate</Link>
          <Link href="/submissions" className="text-sapphire hover:text-deep-navy font-medium transition-colors">Submissions</Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-sapphire">{user.email}</span>
            <button 
              onClick={logout}
              className="bg-ice-blue text-deep-navy px-4 py-2 rounded-lg font-medium hover:bg-powder-blue transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sapphire hover:text-deep-navy font-medium">Login</Link>
            <Link 
              href="/register" 
              className="bg-sapphire text-white px-5 py-2 rounded-lg font-medium hover:bg-deep-navy transition-all shadow-md"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
