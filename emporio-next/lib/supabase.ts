import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente para uso em Server Components (sem cache compartilhado)
export function createServerClient() {
  return createClient(url, anon, {
    auth: { persistSession: false },
  })
}

// Cliente singleton para uso no browser (Client Components)
export const supabase = createClient(url, anon)
