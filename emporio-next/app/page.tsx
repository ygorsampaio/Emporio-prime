// Server Component: executado no servidor, sem JavaScript enviado ao cliente
// Ideal para data fetching — o HTML já chega com dados ao browser

import { createServerClient } from '@/lib/supabase'
import { LOCAL_PRODUCTS } from '@/lib/products'
import type { Product } from '@/types'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

async function getProducts(): Promise<Product[]> {
  // Se as env vars não existirem, usa os dados locais (útil em dev inicial)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return LOCAL_PRODUCTS
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('category')
      .order('name')

    if (error) throw error
    return data as Product[]
  } catch {
    // Em caso de erro no Supabase, não quebra a loja
    return LOCAL_PRODUCTS
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <>
      <Navbar />
      <main>
        <Hero totalProducts={products.length} />
        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  )
}
