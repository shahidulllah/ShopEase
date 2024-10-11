import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NavBar from './Components/Nav/NavBar'
import Footer from './Components/Footer/Footer'
import CartProvider from '@/providers/CartProvider'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'ShopEase',
  description: 'E-commerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar></NavBar>
            <main className='flex-grow'>
              {children}
            </main>
            <Footer></Footer>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
