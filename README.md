# 🌿 Empório Prime — Next.js + Supabase

> **Projeto Freelancer Real:** E-commerce de produtos naturais desenvolvido para uma loja local localizada no bairro de Peixinhos, em Olinda - PE, Brasil.

---

## Stack
- **Next.js 14** (App Router) — framework React com SSR/SSG
- **TypeScript** — tipagem estática
- **Tailwind CSS** — utility-first CSS
- **Framer Motion** — animações
- **Zustand** — estado global do carrinho
- **Supabase** — banco de dados PostgreSQL na nuvem
- **Sonner** — notificações toast

---

## Como rodar

### 1. Instalar dependências
npm install

### 2. Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase

### 3. Configurar banco de dados (opcional)
No painel do Supabase → SQL Editor, rode o arquivo `supabase/schema.sql`.
Sem isso, a loja usa os produtos locais em `lib/products.ts`.

### 4. Rodar em desenvolvimento
npm run dev
# Acesse http://localhost:3000

### 5. Build de produção
npm run build
npm start

---

## Estrutura
app/
  layout.tsx          # Layout raiz: fontes, providers globais
  page.tsx            # Página principal (Server Component)
  globals.css         # Tailwind + estilos base
  api/products/       # API Route (Node.js handler)

components/
  Navbar.tsx          # Navegação com filtros e carrinho
  Hero.tsx            # Seção hero animada
  ProductGrid.tsx     # Grid com filtro/busca/sort (Client)
  ProductCard.tsx     # Card de produto com animação
  CartDrawer.tsx      # Drawer do carrinho com checkout
  Footer.tsx          # Rodapé

lib/
  supabase.ts         # Clientes Supabase (server e browser)
  store.ts            # Zustand: estado do carrinho
  products.ts         # Dados locais de fallback

types/index.ts        # Interfaces TypeScript
supabase/schema.sql   # Schema + seed do banco
public/images/        # Fotos dos produtos

---

## Deploy (Vercel / Netlify)
1. Suba o projeto no GitHub
2. Conecte à sua plataforma de hospedagem (Vercel ou Netlify)
3. Adicione as variáveis de ambiente (`env vars`) no painel da plataforma
4. Deploy automático ✅
