import { createServerClient, isSupabaseConfigured } from '@/lib/supabase'
import { LOCAL_PRODUCTS } from '@/lib/products'
import type { Product } from '@/types'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
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
    if (!data || data.length === 0) return LOCAL_PRODUCTS
    return data as Product[]
  } catch (err) {
    return LOCAL_PRODUCTS
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <>
      <main>
        <Hero totalProducts={products.length} />
        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  )
}
