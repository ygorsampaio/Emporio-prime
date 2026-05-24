// API Route: roda no Node.js do servidor, nunca exposta ao cliente diretamente
// Útil para operações protegidas (validações, webhooks, integrações externas)
// Acesso via: GET /api/products  ou  GET /api/products?category=temperos

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { LOCAL_PRODUCTS } from '@/lib/products'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const data = category
      ? LOCAL_PRODUCTS.filter((p) => p.category === category)
      : LOCAL_PRODUCTS
    return NextResponse.json({ data })
  }

  const supabase = createServerClient()
  let query = supabase.from('products').select('*').eq('active', true)

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}

// Futuramente: POST para admin adicionar produto (com autenticação)
// export async function POST(request: NextRequest) { ... }
