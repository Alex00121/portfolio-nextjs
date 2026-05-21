import { getProductById, products } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = getProductById(Number(params.id))
  if (!product) return { title: 'Produit introuvable' }
  return { title: `${product.name} — ShopNext`, description: product.description }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(Number(params.id))
  if (!product) notFound()
  return <ProductDetail product={product} />
}
