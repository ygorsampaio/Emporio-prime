'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import type { Product } from '@/types'
import type { CategoryFilter } from './Navbar'
import Navbar from './Navbar'
import ProductCard from './ProductCard'

type SortMode = 'default' | 'preco-asc' | 'preco-desc' | 'novidades'

const CATEGORY_META: Record<CategoryFilter, { title: string; desc: string }> = {
  all:          { title: 'Catálogo completo', desc: '' },
  temperos:     { title: 'Temperos',          desc: 'Temperos artesanais Temperos Prime — sabor e qualidade em cada sachê.' },
  naturais:     { title: 'Produtos Naturais', desc: 'Produtos naturais selecionados para sua saúde e bem-estar.' },
  suplementos:  { title: 'Suplementos',       desc: 'Suplementação natural para potencializar sua alimentação.' },
  descartaveis: { title: 'Descartáveis',      desc: 'Embalagens e utensílios práticos para o dia a dia.' },
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [sortMode,       setSortMode]       = useState<SortMode>('default')

  // useMemo recalcula apenas quando as dependências mudam
  const filtered = useMemo(() => {
    let list = products

    if (activeCategory !== 'all')
      list = list.filter((p) => p.category === activeCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      )
    }

    if (sortMode === 'preco-asc')  return [...list].sort((a, b) => a.price - b.price)
    if (sortMode === 'preco-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sortMode === 'novidades')  return [...list].sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
    return list
  }, [products, activeCategory, searchQuery, sortMode])

  const meta = CATEGORY_META[activeCategory]

  return (
    <>
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={(cat) => { setActiveCategory(cat); setSearchQuery('') }}
        onSearch={setSearchQuery}
      />

      <section id="catalogo" className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        {/* Section header */}
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">{meta.title}</h2>
            {meta.desc && <p className="text-sm text-gray-400 mt-1">{meta.desc}</p>}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{filtered.length} produto{filtered.length !== 1 ? 's' : ''}</span>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-cream-300 rounded-lg">
              <SlidersHorizontal size={13} className="text-gray-400" />
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="text-sm text-gray-600 bg-transparent outline-none cursor-pointer"
              >
                <option value="default">Padrão</option>
                <option value="preco-asc">Menor preço</option>
                <option value="preco-desc">Maior preço</option>
                <option value="novidades">Novidades</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-24 text-center text-gray-400"
            >
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-lg font-medium">Nenhum produto encontrado.</p>
              <p className="text-sm mt-1">Tente outro termo ou categoria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
