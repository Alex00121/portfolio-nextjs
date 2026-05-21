import { products } from '@/lib/products'
import ProductsClient from '@/components/ProductsClient'

export const metadata = {
  title: 'Produits — ShopNext',
  description: 'Explorez notre catalogue de produits.',
}

export default function ProductsPage() {
  return <ProductsClient products={products} />
}
