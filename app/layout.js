import './globals.css'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
  title: 'FitCV - AI Powered CV Generator',
  description: 'Generate tailored CVs based on job descriptions using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
