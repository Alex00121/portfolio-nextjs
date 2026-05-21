'use client'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { useMemo } from 'react'

function generateOrderNumber() {
  return 'SN-' + Math.random().toString(36).toUpperCase().slice(2, 10)
}

export default function OrderConfirmation() {
  const orderNumber = useMemo(generateOrderNumber, [])
  const estimatedDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 4)
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fadeIn">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-green-500" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3">
        Commande confirmée !
      </h1>
      <p className="text-gray-500 mb-8">
        Merci pour votre achat. Vous recevrez un email de confirmation dans quelques minutes.
      </p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Package size={20} className="text-indigo-600" />
          <h2 className="font-semibold text-gray-900">Détails de la commande</h2>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Numéro de commande</span>
            <span className="font-mono font-semibold text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Livraison estimée</span>
            <span className="font-medium text-gray-900 capitalize">{estimatedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Statut</span>
            <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
              ✓ Confirmé
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { step: '1', label: 'Commande reçue', active: true },
          { step: '2', label: 'En préparation', active: false },
          { step: '3', label: 'En livraison', active: false },
        ].map((item) => (
          <div key={item.step} className="text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2 ${
                item.active ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {item.active ? '✓' : item.step}
            </div>
            <p className={`text-xs font-medium ${item.active ? 'text-gray-900' : 'text-gray-400'}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors active:scale-95"
      >
        Continuer mes achats
        <ArrowRight size={18} />
      </Link>
    </div>
  )
}
