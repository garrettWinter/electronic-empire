import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "./components/Header";
import Footer from "./components/Footer"
import Providers from './components/Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Electroinic Empire',
  description: 'A mock ecommerce website, created to learn, typescript, next, nextAuth, Prisma, and tailWind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Providers>
            <Header />
            {children}
            <Footer/>
          </Providers>
        </div>
      </body>
    </html>
  )
}
