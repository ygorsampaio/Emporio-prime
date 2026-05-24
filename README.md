# 🌿 Empório Prime — Next.js + Supabase

> **Projeto Freelancer Real:** E-commerce de produtos naturais de alta performance, desenvolvido sob medida para uma loja local localizada no bairro de Peixinhos, em Olinda - PE, Brasil. O projeto foi estruturado com foco em velocidade de carregamento em dispositivos móveis, navegação fluida e gerenciamento dinâmico de estoque.

---

## 🚀 Funcionalidades Principais
- **Catálogo Dinâmico:** Listagem de produtos naturais com filtros avançados por categorias, busca textual e ordenação inteligente.
- **Carrinho de Compras Otimizado:** Gerenciamento de estado global rápido para adição, remoção e alteração de quantidade de itens.
- **Arquitetura Híbrida (SSR/SSG):** Páginas estáticas para máxima indexação (SEO) aliadas a atualizações dinâmicas para dados de estoque.
- **Banco de Dados Relacional:** Integração robusta com o Supabase para armazenamento seguro de produtos, categorias e pedidos.
- **Interface Responsiva & Animada:** Layout totalmente adaptado para smartphones e enriquecido com animações fluidas para melhorar a experiência do usuário.

---

## 🛠️ Stack Tecnológica
- **Next.js 14** (App Router) — Framework React com renderização híbrida avançada.
- **TypeScript** — Tipagem estática para maior segurança e escalabilidade do código.
- **Tailwind CSS** — Estilização moderna baseada em classes utilitárias.
- **Framer Motion** — Biblioteca de animações fluidas e interativas para componentes visuais.
- **Zustand** — Gerenciador de estado global leve e performático para o carrinho de compras.
- **Supabase** — Backend-as-a-Service integrado com banco de dados PostgreSQL na nuvem.
- **Sonner** — Sistema de notificações *toast* elegantes e limpas.

---

## 💻 Como rodar o projeto localmente

### 1. Instalar dependências
```bash
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
