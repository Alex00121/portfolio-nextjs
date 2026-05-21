'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, CreditCard, MapPin, User } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const STEPS = [
  { id: 1, label: 'Contact', icon: User },
  { id: 2, label: 'Livraison', icon: MapPin },
  { id: 3, label: 'Paiement', icon: CreditCard },
]

type FormData = {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  zip: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardName: string
}

const INITIAL: FormData = {
  email: '', firstName: '', lastName: '', phone: '',
  address: '', city: '', zip: '', country: 'France',
  cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { subtotal, items } = useCartStore()
  const sub = subtotal()
  const total = sub + (sub >= 50 ? 0 : 5.99) + sub * 0.2

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validateStep1() {
    const e: Partial<FormData> = {}
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Email invalide'
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Partial<FormData> = {}
    if (!form.address.trim()) e.address = 'Requis'
    if (!form.city.trim()) e.city = 'Requis'
    if (!form.zip.match(/^\d{5}$/)) e.zip = 'Code postal invalide (5 chiffres)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep3() {
    const e: Partial<FormData> = {}
    const cardClean = form.cardNumber.replace(/\s/g, '')
    if (!cardClean.match(/^\d{16}$/)) e.cardNumber = 'Numéro de carte invalide (16 chiffres)'
    if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/)) e.cardExpiry = 'Format MM/AA'
    if (!form.cardCvc.match(/^\d{3,4}$/)) e.cardCvc = 'CVC invalide'
    if (!form.cardName.trim()) e.cardName = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  async function handleSubmit() {
    if (!validateStep3()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    useCartStore.getState().clearCart()
    router.push('/order-confirmation')
  }

  function formatCard(v: string) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(v: string) {
    return v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2')
  }

  if (items.length === 0 && step === 1) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h1>
        <a href="/products" className="text-indigo-600 hover:underline">Retour au catalogue</a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Paiement</h1>

      {/* Stepper */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                  step > s.id
                    ? 'bg-green-500 text-white'
                    : step === s.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block transition-colors ${
                  step >= s.id ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 transition-colors ${step > s.id ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fadeIn">
        {/* Step 1: Contact */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informations de contact</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="vous@exemple.com"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.lastName ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>
          </div>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Adresse de livraison</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
              <input
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder="15 rue de la Paix"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                <input
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  placeholder="Paris"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
                <input
                  value={form.zip}
                  onChange={(e) => update('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="75001"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.zip ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <select
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              >
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Luxembourg</option>
                <option>Canada</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-2">Options de livraison</p>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" defaultChecked className="accent-gray-900" />
                <span className="flex-1 text-gray-700">Livraison standard (3-5 jours)</span>
                <span className="font-semibold">{sub >= 50 ? 'Gratuite' : '5,99€'}</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informations de paiement</h2>
            <div className="flex gap-2 mb-2">
              {['💳 Visa', '💳 MC', '💳 Amex'].map((c) => (
                <span key={c} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">{c}</span>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte *</label>
              <input
                value={form.cardNumber}
                onChange={(e) => update('cardNumber', formatCard(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className={`w-full border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.cardNumber ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration *</label>
                <input
                  value={form.cardExpiry}
                  onChange={(e) => update('cardExpiry', formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  className={`w-full border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.cardExpiry ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC *</label>
                <input
                  value={form.cardCvc}
                  onChange={(e) => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  className={`w-full border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.cardCvc ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte *</label>
              <input
                value={form.cardName}
                onChange={(e) => update('cardName', e.target.value)}
                placeholder="ALEXANDRE MARTIN"
                className={`w-full border rounded-xl px-4 py-3 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-gray-900 transition ${errors.cardName ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm flex justify-between font-bold">
              <span>Total à payer</span>
              <span>{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Retour
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-gray-900 text-white py-3 rounded-2xl font-semibold text-sm hover:bg-gray-800 transition-colors active:scale-95"
            >
              Continuer
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gray-900 text-white py-3 rounded-2xl font-semibold text-sm hover:bg-gray-800 transition-colors active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Traitement...
                </>
              ) : (
                '🔒 Confirmer le paiement'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
