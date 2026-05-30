import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, Instagram, Leaf, Heart, Star, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nós | Empório Prime',
  description: 'Conheça a história do Empório Prime — temperos artesanais e produtos naturais em Olinda-PE.',
}

const stats = [
  { icon: Star,  value: '+50',   label: 'Produtos'       },
  { icon: Users, value: '+500',  label: 'Clientes'       },
  { icon: Heart, value: '100%',  label: 'Natural'        },
  { icon: Leaf,  value: '5+',    label: 'Anos no mercado'},
]

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-cream-100">

      {/* Header */}
      <div className="bg-forest-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo.png"
              alt="Empório Prime"
              width={160}
              height={64}
              className="object-contain drop-shadow-md mx-auto brightness-0 invert"
            />
          </Link>
          <h1 className="font-display text-4xl font-bold mb-3">Sobre Nós</h1>
          <p className="text-forest-100 text-lg max-w-xl mx-auto">
            Conheça a história e os valores que guiam o Empório Prime.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-16">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-5 text-center shadow-card border border-cream-200">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center">
                  <Icon size={18} className="text-forest-500" />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* História */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-cream-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center">
              <Leaf size={18} className="text-forest-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Nossa História</h2>
          </div>
          {/* ✏️ EDITE o texto abaixo com a história real do estabelecimento */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              O Empório Prime nasceu da paixão por temperos naturais e produtos de qualidade.
              Fundado em Olinda-PE, no bairro de Peixinhos, o estabelecimento surgiu com o
              objetivo de levar sabor e saúde para a mesa das famílias pernambucanas.
            </p>
            <p>
              {/* ✏️ Adicione aqui a história do dono */}
              <em className="text-gray-400 text-sm">[Adicione aqui a história do fundador e como tudo começou…]</em>
            </p>
            <p>
              {/* ✏️ Missão e valores */}
              <em className="text-gray-400 text-sm">[Missão, visão e valores do Empório Prime…]</em>
            </p>
          </div>
        </div>

        {/* Dono / Equipe */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-cream-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center">
              <Heart size={18} className="text-forest-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">O Fundador</h2>
          </div>
          <div className="flex gap-6 items-start flex-wrap sm:flex-nowrap">
            {/* ✏️ Substitua pela foto real */}
            <div className="w-24 h-24 rounded-2xl bg-cream-200 flex items-center justify-center shrink-0 border-2 border-dashed border-cream-300">
              <span className="text-3xl">👤</span>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p className="font-semibold text-gray-900 text-lg">
                {/* ✏️ Nome do fundador */}
                <em className="text-gray-400 font-normal text-base">[Nome do fundador]</em>
              </p>
              <p>
                {/* ✏️ Mini bio */}
                <em className="text-gray-400 text-sm">[História do dono: de onde veio, motivação para criar o Empório, experiência com temperos e produtos naturais…]</em>
              </p>
            </div>
          </div>
        </div>

        {/* Contato e localização */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-cream-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center">
              <MapPin size={18} className="text-forest-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Onde nos encontrar</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl">
              <MapPin size={16} className="text-forest-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Endereço</p>
                <p className="text-sm text-gray-500">Peixinhos, Olinda — PE</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl">
              <Clock size={16} className="text-forest-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Horário</p>
                <p className="text-sm text-gray-500">Seg–Sáb: 7h30 – 17h</p>
                <p className="text-sm text-gray-500">Dom: 7h – 12h</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl">
              <Phone size={16} className="text-forest-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">WhatsApp</p>
                <a
                  href="https://wa.me/5581986078322"
                  target="_blank" rel="noreferrer"
                  className="text-sm text-forest-500 hover:underline font-medium"
                >
                  (81) 98607-8322
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl">
              <Instagram size={16} className="text-forest-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Instagram</p>
                {/* ✏️ Coloque o @ real */}
                <p className="text-sm text-gray-400 italic">[@emporioprime — adicionar link]</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA volta */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest-500 hover:bg-forest-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
          >
            🛒 Ver catálogo de produtos
          </Link>
        </div>
      </div>
    </main>
  )
}
