'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Plus } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/lib/products'
import { getProductImageUrl } from '@/lib/products'
import { useCartStore } from '@/store/cart'

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product, product.colors[0], product.sizes?.[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const ratingColor =
    product.rating >= 4.5
      ? 'text-green-600 bg-green-50'
      : product.rating >= 4
      ? 'text-amber-600 bg-amber-50'
      : 'text-orange-600 bg-orange-50'

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col animate-fadeIn"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={getProductImageUrl(product.imageIds[0])}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            {product.badge}
          </span>
        )}
        {product.isNew && !product.badge && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            Nouveau
          </span>
        )}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 p-2 rounded-xl transition-all duration-200 active:scale-95 shadow-md ${
            added
              ? 'bg-green-500 text-white scale-110'
              : 'bg-white text-gray-800 hover:bg-gray-900 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          {added ? <Plus size={18} className="rotate-45" /> : <ShoppingCart size={18} />}
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">{product.category}</p>
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${ratingColor}`}>
            <Star size={11} className="fill-current" />
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">({product.reviewCount} avis)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
          {product.stock < 10 && (
            <span className="text-xs text-orange-500 font-medium">Plus que {product.stock} en stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}
