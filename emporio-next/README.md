# 🌿 Empório Prime — Next.js + Supabase

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
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase
```

### 3. Configurar banco de dados (opcional)
No painel do Supabase → SQL Editor, rode o arquivo `supabase/schema.sql`.
Sem isso, a loja usa os produtos locais em `lib/products.ts`.

### 4. Rodar em desenvolvimento
```bash
npm run dev
# Acesse http://localhost:3000
```

### 5. Build de produção
```bash
npm run build
npm start
```

---

## Estrutura
```
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
```

---

## Deploy (Vercel)
1. Suba o projeto no GitHub
2. Conecte ao Vercel
3. Adicione as env vars no painel do Vercel
4. Deploy automático ✅
