'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, ShoppingBag, Tag, Weight, Flame, Leaf } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/types'
import { useEffect } from 'react'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const CATEGORY_COLOR: Record<string, string> = {
  temperos:     'bg-forest-50 text-forest-700 border-forest-200',
  naturais:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  suplementos:  'bg-blue-50 text-blue-700 border-blue-200',
  descartaveis: 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCartStore()

  // Fecha com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Trava scroll do body quando modal aberto
  useEffect(() => {
    if (product) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [product])

  function handleAdd() {
    if (!product) return
    addItem(product)
    toast(`✓ ${product.name} adicionado`, { duration: 2000 })
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay */}
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-cream-200 text-gray-500 hover:text-gray-900 shadow-sm transition-colors"
                aria-label="Fechar"
              >
                <X size={15} />
              </motion.button>

              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {product.is_new  && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-500 border border-amber-200 shadow-sm">✨ Novo</span>}
                {product.is_sale && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-500 border border-red-200 shadow-sm">🔥 Promoção</span>}
              </div>

              {/* Imagem */}
              <div className="relative h-52 bg-cream-100 overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 480px) 100vw, 448px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                {/* Tag + categoria */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${CATEGORY_COLOR[product.category] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {product.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-medium uppercase tracking-wide">
                    <Weight size={11} />
                    {product.weight}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 leading-snug">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Infos extras */}
                <div className="flex gap-3 mb-5 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cream-100 rounded-lg text-xs text-gray-600 font-medium">
                    <Leaf size={12} className="text-forest-500" />
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cream-100 rounded-lg text-xs text-gray-600 font-medium">
                    <Tag size={12} className="text-forest-500" />
                    {product.tag}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cream-100 rounded-lg text-xs text-gray-600 font-medium">
                    <Flame size={12} className="text-amber-500" />
                    {product.weight}
                  </div>
                </div>

                {/* Preço + botão */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.old_price && (
                      <span className="block text-xs text-gray-300 line-through">
                        R$ {product.old_price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <span className="font-display text-3xl font-bold text-forest-500">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-5 py-3 bg-forest-500 hover:bg-forest-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
                  >
                    <ShoppingBag size={16} />
                    Adicionar
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
