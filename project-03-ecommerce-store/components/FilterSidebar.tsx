'use client'
import { categories } from '@/lib/products'
import { Star } from 'lucide-react'

type Filters = {
  categories: string[]
  minPrice: number
  maxPrice: number
  minRating: number
  colors: string[]
}

type Props = {
  filters: Filters
  onChange: (f: Filters) => void
}

const COLOR_OPTIONS = [
  { hex: '#1a1a1a', label: 'Noir' },
  { hex: '#ffffff', label: 'Blanc' },
  { hex: '#c0c0c0', label: 'Argent' },
  { hex: '#e74c3c', label: 'Rouge' },
  { hex: '#1e3a5f', label: 'Marine' },
  { hex: '#2ecc71', label: 'Vert' },
  { hex: '#8B4513', label: 'Marron' },
  { hex: '#d4af37', label: 'Or' },
]

export default function FilterSidebar({ filters, onChange }: Props) {
  function toggleCategory(cat: string) {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onChange({ ...filters, categories: next })
  }

  function toggleColor(hex: string) {
    const next = filters.colors.includes(hex)
      ? filters.colors.filter((c) => c !== hex)
      : [...filters.colors, hex]
    onChange({ ...filters, colors: next })
  }

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Catégories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 accent-indigo-600"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Prix</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filters.minPrice}€</span>
              <span>{filters.maxPrice}€</span>
            </div>
            <input
              type="range"
              min={0}
              max={500}
              value={filters.maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value)
                onChange({ ...filters, maxPrice: val, minPrice: Math.min(filters.minPrice, val) })
              }}
              className="w-full accent-indigo-600"
            />
            <input
              type="range"
              min={0}
              max={500}
              value={filters.minPrice}
              onChange={(e) => {
                const val = Number(e.target.value)
                onChange({ ...filters, minPrice: val, maxPrice: Math.max(filters.maxPrice, val) })
              }}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Note minimale</h3>
          <div className="space-y-2">
            {[4.5, 4, 3.5, 0].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === r}
                  onChange={() => onChange({ ...filters, minRating: r })}
                  className="accent-indigo-600"
                />
                <span className="flex items-center gap-1 text-sm text-gray-700">
                  {r === 0 ? (
                    'Toutes'
                  ) : (
                    <>
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      {r}+
                    </>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Couleurs</h3>
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.hex}
                title={color.label}
                onClick={() => toggleColor(color.hex)}
                className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                  filters.colors.includes(color.hex)
                    ? 'border-indigo-600 scale-110'
                    : 'border-transparent hover:border-gray-300'
                } ${color.hex === '#ffffff' ? 'border-gray-200' : ''}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            onChange({ categories: [], minPrice: 0, maxPrice: 500, minRating: 0, colors: [] })
          }
          className="w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </aside>
  )
}
