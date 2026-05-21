'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Star, ChevronRight, Minus, Plus, Check } from 'lucide-react'
import type { Product } from '@/lib/products'
import { getProductImageUrl } from '@/lib/products'
import { useCartStore } from '@/store/cart'

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  function handleAddToCart() {
    addItem(product, selectedColor, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const images = product.imageIds.slice(0, 4).map((id) => getProductImageUrl(id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-8">
        <Link href="/products" className="hover:text-gray-900 transition-colors">Catalogue</Link>
        <ChevronRight size={14} />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-gray-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-xl">
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === i ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= Math.round(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} avis)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Color picker */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Couleur : <span className="font-normal text-gray-600">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-gray-900 scale-110' : 'border-gray-200 hover:border-gray-400'
                  } ${color === '#ffffff' ? 'border-gray-300' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size picker */}
          {product.sizes && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Taille</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Quantité</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
              >
                <Plus size={16} />
              </button>
              <span className="text-sm text-gray-400">{product.stock} disponibles</span>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {added ? (
              <>
                <Check size={20} />
                Ajouté au panier !
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Ajouter au panier
              </>
            )}
          </button>

          {/* Shipping info */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: '🚚', label: 'Livraison gratuite', sub: 'Dès 50€ d\'achat' },
              { icon: '↩️', label: 'Retour gratuit', sub: '30 jours' },
              { icon: '🔒', label: 'Paiement sécurisé', sub: 'SSL 256-bit' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{item.icon}</div>
                <p className="text-xs font-semibold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
