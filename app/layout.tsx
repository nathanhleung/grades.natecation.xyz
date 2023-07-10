import { About } from './components/About'
import './globals.css'
import { Navbar } from './components/Navbar'

export const metadata = {
  title: {
    template: '%s | UCLA Grade Distributions 2021-22',
    default: 'UCLA Grade Distributions 2021-22',
  },
  description: 'Grade distribution data was sourced through a public records request made under the California Public Records Act. 40+ UCLA students paid $131.25 to obtain these records.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen border-b-uclaBlue border-b-[12px]">
        <Navbar />
        <div className="flex flex-1">
          {children}
        </div>
        <div className="flex flex-col text-center p-6 sm:p-12 md:p-16 md:w-[85%] lg:w-[60%] md:mx-auto justify-center">
          <About />
        </div>
      </body>
    </html>
  )
}
