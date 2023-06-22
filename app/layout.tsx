import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UCLA Grade Distributions 2021-22',
  description: 'Grade distribution data was sourced through a public records request made under the California Public Records Act. We raised $131.25 from UCLA students to obtain these records.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
