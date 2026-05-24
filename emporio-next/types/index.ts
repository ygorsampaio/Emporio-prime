export type Category = 'temperos' | 'naturais' | 'suplementos' | 'descartaveis'

export interface Product {
  id: number
  name: string
  category: Category
  tag: string
  description: string
  weight: string
  price: number
  old_price?: number | null
  image_url: string
  is_new: boolean
  is_sale: boolean
  active?: boolean
  created_at?: string
}

// CartItem estende Product adicionando quantidade
export interface CartItem extends Product {
  quantity: number
}
