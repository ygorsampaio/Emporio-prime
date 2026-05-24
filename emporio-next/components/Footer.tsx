import { Leaf, MapPin, Clock, Instagram, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cream-200 mt-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest-500 text-white">
              <Leaf size={18} />
            </span>
            <span className="font-display text-xl font-semibold">
              Empório <em className="text-forest-500 not-italic">Prime</em>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Mude sua saúde com produtos naturais. Qualidade, sabor e bem-estar em cada produto.
          </p>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-display font-semibold text-gray-800 mb-3">Contato</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="https://wa.me/5581997153027" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 hover:text-forest-500 transition-colors">
                <Phone size={13} /> (81) 99715-3027
              </a>
            </li>
            <li>
              <a href="https://instagram.com/emporioprimeolinda" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 hover:text-forest-500 transition-colors">
                <Instagram size={13} /> @emporioprimeolinda
              </a>
            </li>
          </ul>
        </div>

        {/* Endereço / Horário */}
        <div>
          <h4 className="font-display font-semibold text-gray-800 mb-3">Onde estamos</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <MapPin size={13} className="mt-0.5 shrink-0" />
              Av. Antônio da C. Azevedo, 719 — Peixinhos, Olinda/PE
            </li>
            <li className="flex items-start gap-2">
              <Clock size={13} className="mt-0.5 shrink-0" />
              Seg–Sáb: 7h30–17h<br />Dom: 7h–12h
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-200 px-6 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Empório Prime. Todos os direitos reservados.
      </div>
    </footer>
  )
}
