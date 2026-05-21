'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Product } from '@/lib/products'
import FilterSidebar from './FilterSidebar'
import ProductGrid from './ProductGrid'
import { X } from 'lucide-react'

type Filters = {
  categories: string[]
  minPrice: number
  maxPrice: number
  minRating: number
  colors: string[]
}

const DEFAULT_FILTERS: Filters = {
  categories: [],
  minPrice: 0,
  maxPrice: 500,
  minRating: 0,
  colors: [],
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Filters>(() => {
    const cat = searchParams.get('category')
    return cat ? { ...DEFAULT_FILTERS, categories: [cat] } : DEFAULT_FILTERS
  })
  const [sort, setSort] = useState('newest')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setFilters((f) => ({ ...f, categories: [cat] }))
  }, [searchParams])

  const filtered = products
    .filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
      if (p.rating < filters.minRating) return false
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c))) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return b.id - a.id
    })

  const handleFilterChange = useCallback((f: Filters) => setFilters(f), [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Catalogue</h1>
        <p className="text-gray-500 mt-1">Découvrez notre sélection de produits de qualité</p>
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={handleFilterChange} />
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-50 rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filtres</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={22} />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={handleFilterChange} />
            </div>
          </div>
        )}

        <ProductGrid
          products={filtered}
          sort={sort}
          onSortChange={setSort}
          onMobileFilterOpen={() => setMobileFiltersOpen(true)}
        />
      </div>
    </div>
  )
}
