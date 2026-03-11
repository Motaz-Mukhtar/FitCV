import './globals.css'

export const metadata = {
  title: 'FitCV - AI Powered CV Generator',
  description: 'Generate tailored CVs based on job descriptions using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased" suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
