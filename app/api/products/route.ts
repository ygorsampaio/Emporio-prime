// API Route: roda no Node.js do servidor, nunca exposta ao cliente diretamente
// Acesso via: GET /api/products  ou  GET /api/products?category=temperos

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, isSupabaseConfigured } from '@/lib/supabase'
import { LOCAL_PRODUCTS } from '@/lib/products'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  // Fallback para dados locais quando Supabase não está configurado
  if (!isSupabaseConfigured()) {
    const data = category
      ? LOCAL_PRODUCTS.filter((p) => p.category === category)
      : LOCAL_PRODUCTS
    return NextResponse.json({ data })
  }

  try {
    const supabase = createServerClient()
    let query = supabase.from('products').select('*').eq('active', true)

    if (category) query = query.eq('category', category)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// Futuramente: POST para admin adicionar produto (com autenticação)
// export async function POST(request: NextRequest) { ... }
