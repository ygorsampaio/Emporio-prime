'use client'

import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Clock } from 'lucide-react'

interface HeroProps {
  totalProducts: number
}

const floatingCards = [
  { icon: '🫙', text: 'Temperos Premium',    delay: 0    },
  { icon: '🌱', text: '100% Natural',         delay: 0.15 },
  { icon: '📲', text: 'Pedido via WhatsApp',  delay: 0.3  },
]

// Variantes do framer-motion definem estados de animação reutilizáveis
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero({ totalProducts }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-cream-300">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-forest-50 blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50 blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-sm font-semibold mb-6"
            >
              <MapPin size={13} />
              Olinda · Peixinhos, PE
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-5xl lg:text-6xl font-bold leading-[1.1] text-gray-900 mb-5"
            >
              Da natureza<br />
              <span className="text-forest-500 italic">para sua mesa.</span>
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-lg text-gray-500 leading-relaxed max-w-md mb-8"
            >
              Temperos artesanais, produtos naturais e suplementos selecionados.
              Qualidade e sabor em cada embalagem.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-3 flex-wrap"
            >
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest-500 hover:bg-forest-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
              >
                Ver catálogo
                <ArrowDown size={15} />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '5581997153027'}`}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-cream-200 hover:bg-cream-300 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                📲 WhatsApp
              </a>
            </motion.div>

            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-1.5 mt-8 text-sm text-gray-400"
            >
              <Clock size={13} />
              Seg–Sáb 7h30–17h &nbsp;·&nbsp; Dom 7h–12h
            </motion.div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:flex items-center justify-center relative h-72">
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                  transition: {
                    opacity: { delay: card.delay + 0.4, duration: 0.5 },
                    y: {
                      delay: card.delay + 0.4,
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  },
                }}
                style={{
                  position: 'absolute',
                  left: `${15 + i * 25}%`,
                  top:  `${10 + (i % 2) * 45}%`,
                }}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-card border border-cream-200 whitespace-nowrap"
              >
                <span className="text-2xl">{card.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{card.text}</span>
              </motion.div>
            ))}

            {/* Product count badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
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
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 flex-wrap text-sm font-medium">
          <span>🚚 Frete grátis acima de R$100</span>
          <span className="opacity-40">·</span>
          <span>🔒 Compra segura</span>
          <span className="opacity-40">·</span>
          <span>📲 Finaliza pelo WhatsApp</span>
        </div>
      </div>
    </section>
  )
}
