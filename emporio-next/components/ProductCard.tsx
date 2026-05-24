'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
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
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCartStore()

  function handleAdd() {
    addItem(product)
    toast(`✓ ${product.name} adicionado`, { duration: 2000 })
  }

  return (
    // motion.article: animação de entrada com stagger baseado no index
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      layout
      className="group bg-white rounded-xl2 border border-cream-200 overflow-hidden shadow-card hover:shadow-card-hover hover:border-forest-300 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3.5] bg-cream-100 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.is_new  && <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-400 border border-amber-200">Novo</span>}
          {product.is_sale && <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-500 border border-red-200">Promoção</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Tag + category */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${CATEGORY_STYLES[product.category] ?? 'bg-gray-100 text-gray-500'}`}>
            {product.tag}
          </span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{product.weight}</span>
        </div>

        <h3 className="font-display text-[1.05rem] font-semibold text-gray-900 leading-snug mb-1.5">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            {product.old_price && (
              <span className="block text-xs text-gray-300 line-through">
                R$ {product.old_price.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="font-display text-xl font-bold text-forest-500">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-forest-500 hover:bg-forest-700 text-white transition-colors shadow-sm"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus size={17} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
