'use client'
import type { Product } from '@/lib/products'
import ProductCard from './ProductCard'
import { SlidersHorizontal } from 'lucide-react'

type Props = {
  products: Product[]
  sort: string
  onSortChange: (s: string) => void
  onMobileFilterOpen: () => void
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Meilleures notes' },
]

export default function ProductGrid({ products, sort, onSortChange, onMobileFilterOpen }: Props) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{products.length}</span> produit{products.length > 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileFilterOpen}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filtres
          </button>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-500 text-sm">Essayez de modifier vos filtres pour voir plus de résultats.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
