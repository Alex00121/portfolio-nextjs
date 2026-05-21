'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { getProductImageUrl } from '@/lib/products'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const sub = subtotal()

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-28 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }
  const shipping = sub >= 50 ? 0 : 5.99
  const tax = sub * 0.2
  const total = sub + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">Découvrez nos produits et ajoutez-les à votre panier.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors active:scale-95"
        >
          Voir le catalogue
          <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
        Mon panier <span className="text-gray-400 font-normal text-xl">({items.length} article{items.length > 1 ? 's' : ''})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const imageUrl = getProductImageUrl(item.product.imageIds[0])
            return (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 animate-fadeIn"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <Image src={imageUrl} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2 text-sm"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.selectedSize && <span>{item.selectedSize} · </span>}
                        <span
                          className="inline-block w-3 h-3 rounded-full border border-gray-200 align-middle"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors active:scale-95"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Récapitulatif</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{sub.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'Gratuite' : shipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>TVA (20%)</span>
                <span>{tax.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                  Plus que {(50 - sub).toFixed(2)}€ pour la livraison gratuite !
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors active:scale-95"
            >
              Passer la commande
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/products"
              className="mt-3 w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors block"
            >
              ← Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
