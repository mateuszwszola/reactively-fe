import { Inter } from 'next/font/google'
import './globals.css';

export const metadata = {
  title: 'Reactively',
  description: 'Platform for the Fitness Community',
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} Reactively</p>
        </footer>
        </body>
    </html>
  )
}
