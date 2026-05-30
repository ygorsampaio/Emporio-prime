'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/types'

const CATEGORY_STYLES: Record<string, string> = {
  temperos:     'bg-forest-50 text-forest-700',
  naturais:     'bg-emerald-50 text-emerald-700',
  suplementos:  'bg-blue-50 text-blue-700',
  descartaveis: 'bg-amber-50 text-amber-700',
}

interface ProductCardProps {
  product: Product
  index: number
  onOpenModal: (product: Product) => void
}

export default function ProductCard({ product, index, onOpenModal }: ProductCardProps) {
  const { addItem } = useCartStore()

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    addItem(product)
    toast(`✓ ${product.name} adicionado`, { duration: 2000 })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      layout
      layoutId={`card-${product.id}`}
      onClick={() => onOpenModal(product)}
      className="group bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-card hover:shadow-card-hover hover:border-forest-200 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer will-change-transform"
    >
      {/* Image */}
      <div className="relative aspect-square bg-cream-100 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Hover overlay com "Ver detalhes" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-forest-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-forest-600 shadow-sm">
            <Eye size={12} />
            Ver detalhes
          </span>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_new  && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-500 border border-amber-200">Novo</span>}
          {product.is_sale && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-500 border border-red-200">Promoção</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${CATEGORY_STYLES[product.category] ?? 'bg-gray-100 text-gray-500'}`}>
            {product.tag}
          </span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{product.weight}</span>
        </div>

        <h3 className="font-display text-[0.95rem] font-semibold text-gray-900 leading-snug mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            {product.old_price && (
              <span className="block text-[10px] text-gray-300 line-through">
                R$ {product.old_price.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="font-display text-lg font-bold text-forest-500">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            onClick={handleAdd}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-forest-500 hover:bg-forest-700 text-white transition-colors shadow-sm"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus size={15} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
