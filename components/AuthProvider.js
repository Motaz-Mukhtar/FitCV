'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

export default function AuthProvider({ children }) {
  const { checkAuth } = useStore()

  useEffect(() => {
    // Check authentication status when app loads
    checkAuth()
  }, [checkAuth])

  return children
}