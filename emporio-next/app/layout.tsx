import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import CartDrawer from '@/components/CartDrawer'

// next/font otimiza e hospeda as fontes localmente (sem requisição externa em produção)
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Empório Prime | Produtos Naturais',
  description: 'Temperos artesanais, produtos naturais, suplementos e muito mais em Olinda-PE.',
  keywords: ['temperos', 'produtos naturais', 'suplementos', 'olinda', 'pernambuco'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${playfair.variable}`}>
      <body>
        {children}

        {/* CartDrawer fica no layout para persistir entre páginas */}
        <CartDrawer />

        {/* Toaster do sonner: notificações globais */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1b3a22',
              color: '#f7f4ef',
              border: 'none',
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.875rem',
              fontWeight: 600,
            },
          }}
        />
      </body>
    </html>
  )
}
