'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Info } from 'lucide-react'
import { useCartStore, cartQuantity } from '@/lib/store'

export type CategoryFilter = 'all' | 'temperos' | 'naturais' | 'suplementos' | 'descartaveis'

interface NavbarProps {
  activeCategory: CategoryFilter
  onCategoryChange: (cat: CategoryFilter) => void
  onSearch: (q: string) => void
}

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all',          label: 'Tudo'          },
  { id: 'temperos',     label: '🌿 Temperos'   },
  { id: 'naturais',     label: '🥜 Naturais'   },
  { id: 'suplementos',  label: '🫙 Suplementos' },
  { id: 'descartaveis', label: '🥤 Descartáveis'},
]

export default function Navbar({ activeCategory, onCategoryChange, onSearch }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { items, setOpen } = useCartStore()
  const qty = cartQuantity(items)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleSearch(value: string) {
    setSearchValue(value)
    onSearch?.(value)
  }

  return (
    <header
      className={`
        sticky top-0 z-50 h-[68px] flex items-center justify-between px-4 lg:px-10 gap-3
        bg-cream-100/95 backdrop-blur-md border-b border-cream-300
        transition-all duration-300
        ${scrolled ? 'shadow-card' : ''}
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0 group">
        <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          <Image
            src="/logo.png"
            alt="Empório Prime"
            width={130}
            height={52}
            className="object-contain mix-blend-multiply"
            priority
          />
        </motion.div>
      </Link>

      {/* Category pills */}
      <nav className="hidden md:flex items-center gap-1 no-scrollbar overflow-x-auto flex-1 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              relative px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors
              ${activeCategory === cat.id
                ? 'text-white'
                : 'text-gray-500 hover:text-forest-500 hover:bg-forest-50'
              }
            `}
          >
            {activeCategory === cat.id && (
              <motion.span
                layoutId="pill-bg"
                className="absolute inset-0 rounded-full bg-forest-500"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <div className="flex items-center">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 160, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                autoFocus
                placeholder="Buscar…"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                onBlur={() => { if (!searchValue) setSearchOpen(false) }}
                className="text-sm bg-cream-200 rounded-l-full px-4 py-2 outline-none border border-cream-300 focus:border-forest-500"
              />
            )}
          </AnimatePresence>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className={`
              flex items-center justify-center w-9 h-9 rounded-full border border-cream-300
              text-gray-500 hover:text-forest-500 hover:border-forest-300 transition-colors
              ${searchOpen ? 'rounded-l-none border-l-0 bg-cream-200' : ''}
            `}
          >
            <Search size={15} />
          </button>
        </div>

        {/* Sobre */}
        <Link
          href="/sobre"
          className="flex items-center justify-center w-9 h-9 rounded-full border border-cream-300 text-gray-500 hover:text-forest-500 hover:border-forest-300 transition-colors"
          aria-label="Sobre nós"
        >
          <Info size={15} />
        </Link>

        {/* Cart */}
        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center justify-center w-9 h-9 rounded-full border border-cream-300 text-gray-500 hover:text-forest-500 hover:border-forest-300 transition-colors"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag size={15} />
          <AnimatePresence>
            {qty > 0 && (
              <motion.span
                key={qty}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-forest-500 text-white text-[10px] font-bold"
              >
                {qty}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}
