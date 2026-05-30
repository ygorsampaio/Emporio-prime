'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore, cartTotal, cartQuantity } from '@/lib/store'
import { createBrowserClient, isSupabaseConfigured } from '@/lib/supabase'
import type { CartItem } from '@/types'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, clear } = useCartStore()
  const total = cartTotal(items)
  const qty   = cartQuantity(items)
  const [saving, setSaving] = useState(false)

  async function saveOrder(): Promise<string | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase não configurado — pedido não será salvo.')
      return null
    }

    try {
      const supabase = createBrowserClient()

      const { error: orderError } = await supabase
        .from('orders')
        .insert({ total, status: 'pending' })

      if (orderError) {
        console.error('Erro ao criar pedido:', orderError)
        toast.error(`Erro ao registrar pedido: ${orderError.message}`)
        return null
      }

      const { data: lastOrder, error: fetchError } = await supabase
        .from('orders')
        .select('id')
        .eq('total', total)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (fetchError || !lastOrder) {
        console.warn('Pedido salvo, mas ID não recuperado:', fetchError)
        return 'OK'
      }

      const orderId = lastOrder.id

      const orderItems = items.map((i) => ({
        order_id:     orderId,
        product_id:   i.id,
        product_name: i.name,
        quantity:     i.quantity,
        unit_price:   i.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Erro ao salvar itens:', itemsError)
        toast.error(`Erro ao salvar itens: ${itemsError.message}`)
        return null
      }

      return String(orderId)

    } catch (err: any) {
      console.error('Erro inesperado:', err)
      toast.error(`Erro inesperado: ${err?.message ?? 'Tente novamente'}`)
      return null
    }
  }

  async function handleCheckout() {
    if (!items.length) return

    setSaving(true)
    const orderId = await saveOrder()
    setSaving(false)

    const lines = items
      .map((i) => `• ${i.quantity}x ${i.name} (${i.weight}) — R$ ${(i.price * i.quantity).toFixed(2).replace('.', ',')}`)
      .join('%0A')

    const orderRef = orderId && orderId !== 'OK' ? `%0A%0APedido%20%23${orderId}` : ''
    const msg = `Olá, Empório Prime!%0A%0APedido:%0A${lines}%0A%0A*Total: R$ ${total.toFixed(2).replace('.', ',')}*${orderRef}`
    const wa  = process.env.NEXT_PUBLIC_WHATSAPP || '5581997153027'

    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
    setOpen(false)

    if (orderId && orderId !== 'OK') {
      toast(`✓ Pedido #${orderId} registrado`, { duration: 3000 })
    } else if (orderId === 'OK') {
      toast('✓ Pedido enviado pelo WhatsApp!', { duration: 3000 })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 z-50 flex flex-col h-dvh w-full max-w-[400px] bg-white shadow-drawer"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-forest-500" />
                <h2 className="font-display text-lg font-semibold">Carrinho</h2>
                {qty > 0 && (
                  <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-forest-500 text-white text-xs font-bold">
                    {qty}
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-cream-100 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Fechar carrinho"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 text-center text-gray-400"
                  >
                    <ShoppingBag size={32} strokeWidth={1.5} className="mb-3 opacity-40" />
                    <p className="font-medium">Carrinho vazio</p>
                    <p className="text-sm mt-1">Adicione produtos para começar.</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <CartItemRow key={item.id} item={item} onRemove={removeItem} onQty={updateQty} />
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-cream-200 space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Frete</span>
                  <span className="text-forest-500 font-semibold">Grátis acima de R$100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="font-display text-2xl font-bold text-gray-900">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  disabled={saving}
                  className="w-full py-3.5 bg-forest-500 hover:bg-forest-700 disabled:opacity-60 text-white rounded-xl font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><Loader2 size={16} className="animate-spin" /> Registrando…</>
                  ) : (
                    'Finalizar pelo WhatsApp 📲'
                  )}
                </motion.button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function CartItemRow({
  item, onRemove, onQty,
}: {
  item: CartItem
  onRemove: (id: number) => void
  onQty: (id: number, qty: number) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 items-start"
    >
      <div className="relative w-16 h-16 rounded-xl bg-cream-100 overflow-hidden shrink-0">
        <Image src={item.image_url} alt={item.name} fill className="object-contain p-1.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wide">{item.tag}</p>
        <p className="text-sm font-semibold text-gray-900 leading-snug">{item.name}</p>
        <p className="font-display text-base font-bold text-forest-500 mt-0.5">
          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-300 hover:text-red-400 transition-colors"
          aria-label="Remover item"
        >
          <Trash2 size={13} />
        </button>
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-cream-300 bg-cream-50">
          <button onClick={() => onQty(item.id, item.quantity - 1)} className="text-gray-500 hover:text-forest-500 transition-colors"><Minus size={12} /></button>
          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
          <button onClick={() => onQty(item.id, item.quantity + 1)} className="text-gray-500 hover:text-forest-500 transition-colors"><Plus size={12} /></button>
        </div>
      </div>
    </motion.div>
  )
}