'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Leaf, Search } from 'lucide-react'
import { useCartStore, cartQuantity } from '@/lib/store'

export type CategoryFilter = 'all' | 'temperos' | 'naturais' | 'suplementos' | 'descartaveis'

interface NavbarProps {
  activeCategory: CategoryFilter
  onCategoryChange: (cat: CategoryFilter) => void
  onSearch: (q: string) => void
}

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all',          label: 'Tudo'         },
  { id: 'temperos',     label: '🌿 Temperos'  },
  { id: 'naturais',     label: '🌱 Naturais'  },
  { id: 'suplementos',  label: '💊 Suplementos'},
  { id: 'descartaveis', label: '🥤 Descartáveis'},
]

export default function Navbar({ activeCategory, onCategoryChange, onSearch }: NavbarProps) {
  const [scrolled,     setScrolled]     = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [searchValue,  setSearchValue]  = useState('')

  const { items, setOpen } = useCartStore()
  const qty = cartQuantity(items)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleSearch(value: string) {
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <header
      className={`
        sticky top-0 z-50 h-[68px] flex items-center justify-between px-6 lg:px-10 gap-4
        bg-cream-100/90 backdrop-blur-md border-b border-cream-300
        transition-shadow duration-300
        ${scrolled ? 'shadow-card' : ''}
      `}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 shrink-0 group">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest-500 text-white shadow-sm group-hover:scale-105 transition-transform">
          <Leaf size={18} />
        </span>
        <span className="font-display text-xl font-semibold text-gray-900 leading-none">
          Empório <em className="text-forest-500 not-italic">Prime</em>
        </span>
      </a>

      {/* Category pills — hidden on mobile */}
      <nav className="hidden md:flex items-center gap-1.5 no-scrollbar overflow-x-auto">
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
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search toggle */}
        <div className="flex items-center">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
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
              flex items-center justify-center w-10 h-10 rounded-full border border-cream-300
              text-gray-500 hover:text-forest-500 hover:border-forest-300 transition-colors
              ${searchOpen ? 'rounded-l-none border-l-0 bg-cream-200' : ''}
            `}
          >
            <Search size={16} />
          </button>
        </div>

        {/* Cart button */}
        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center justify-center w-10 h-10 rounded-full border border-cream-300 text-gray-500 hover:text-forest-500 hover:border-forest-300 transition-colors"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag size={17} />
          <AnimatePresence>
            {qty > 0 && (
              <motion.span
                key={qty}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
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
