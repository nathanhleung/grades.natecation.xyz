import Link from 'next/link'
import { About } from './components/About'
import './globals.css'

export const metadata = {
  title: {
    template: '%s | UCLA Grade Distributions 2021-22',
    default: 'UCLA Grade Distributions 2021-22',
  },
  description: 'Grade distribution data was sourced through a public records request made under the California Public Records Act. We raised $131.25 from UCLA students to obtain these records.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen border-b-uclaBlue border-b-[12px]">
        <div className="flex gap-12 w-full bg-uclaBlue text-white p-2 font-bold">
          <Link href="/" className="hover:opacity-50">
            grades.natecation.xyz
          </Link>
          <Link href="/about" className="font hover:opacity-50">
            About
          </Link>
        </div>
        <div className="flex-1">
          {children}
        </div>
        <div className="flex flex-col text-center p-6 sm:p-12 md:p-16 md:max-w-[85%] lg:max-w-[60%] md:mx-auto justify-center">
          <About />
        </div>
      </body>
    </html>
  )
}
