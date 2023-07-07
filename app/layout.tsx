import './globals.css'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ weight: ['400', '700'], style: ['normal', 'italic'], subsets: ['latin'] })

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
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
