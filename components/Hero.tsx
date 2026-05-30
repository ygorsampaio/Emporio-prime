'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Clock } from 'lucide-react'

interface HeroProps {
  totalProducts: number
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] },
  }),
}

const floatingCards = [
  { icon: '🫙', text: 'Temperos Premium',   delay: 0    },
  { icon: '📲', text: 'Pedido via WhatsApp', delay: 0.2  },
  { icon: '🛒', text: 'Entrega Rápida',      delay: 0.4  },
]

export default function Hero({ totalProducts }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-cream-300">
      {/* Gradients de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-forest-50 blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50 blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Esquerda */}
          <div>
            {/* Logo como foco principal — mix-blend-multiply remove o fundo preto */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-7"
            >
              <Image
                src="/logo.png"
                alt="Empório Prime"
                width={260}
                height={104}
                className="object-contain mix-blend-multiply"
                priority
              />
            </motion.div>

            <motion.div
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-sm font-semibold mb-5"
            >
              <MapPin size={13} />
              Olinda · Peixinhos, PE
            </motion.div>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base text-gray-500 leading-relaxed max-w-md mb-7"
            >
              Temperos artesanais, produtos naturais, suplementos e muito mais.
              Qualidade e sabor em cada embalagem.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-3 flex-wrap"
            >
              <motion.a
                href="#catalogo"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-500 hover:bg-forest-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
              >
                Ver catálogo <ArrowDown size={15} />
              </motion.a>
              <motion.a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '5581986078322'}`}
                target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cream-200 hover:bg-cream-300 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                📲 WhatsApp
              </motion.a>
            </motion.div>

            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-1.5 mt-6 text-sm text-gray-400"
            >
              <Clock size={13} />
              Seg–Sáb 7h30–17h &nbsp;·&nbsp; Dom 7h–12h
            </motion.div>
          </div>

          {/* Direita — cards flutuantes */}
          <div className="hidden lg:flex items-center justify-center relative h-72">
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -12, 0],
                  transition: {
                    opacity: { delay: card.delay + 0.5, duration: 0.5 },
                    y: {
                      delay: card.delay + 0.5,
                      duration: 3.2 + i * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  },
                }}
                style={{
                  position: 'absolute',
                  left: `${12 + i * 26}%`,
                  top:  `${8 + (i % 2) * 44}%`,
                }}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-card border border-cream-200 whitespace-nowrap"
              >
                <span className="text-2xl">{card.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{card.text}</span>
              </motion.div>
            ))}

            {/* Badge total de produtos */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 280, damping: 22 }}
              className="absolute bottom-0 right-4 flex flex-col items-center justify-center w-24 h-24 rounded-full bg-forest-500 text-white shadow-lg"
            >
              <span className="font-display text-3xl font-bold leading-none">{totalProducts}</span>
              <span className="text-xs font-medium opacity-80 mt-0.5">produtos</span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-forest-500 text-white px-6 py-3">
        {/*<div className="max-w-6xl mx-auto flex items-center justify-center gap-6 flex-wrap text-sm font-medium">
          <span>🚚 Peça sem sair de casa</span>
          <span className="opacity-40">·</span>
          <span>🔒 Compra segura</span>
          <span className="opacity-40">·</span>
          <span>📲 Finaliza pelo WhatsApp</span>
        </div>*/}
      </div>
    </section>
  )
}
