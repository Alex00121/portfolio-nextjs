'use client'

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { Save, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name)
    if (session?.user?.email) setEmail(session.user.email)
  }, [session])

  const rawInitials = name.split(' ').filter(Boolean).map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  const initials = rawInitials || 'U'

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    await update({ name, email })
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-8 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Paramètres</h1>
        <p className="text-slate-500 mt-1 text-sm">Gérez votre profil et vos préférences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Avatar */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Photo de profil</h2>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-2xl font-bold">{initials}</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Avatar généré depuis vos initiales.</p>
              <p className="text-xs text-slate-400">Modifiez votre nom pour changer l'avatar.</p>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Informations personnelles</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {saved && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
                Modifications enregistrées avec succès.
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-100">
          <h2 className="text-base font-semibold text-red-700 mb-2">Zone de danger</h2>
          <p className="text-sm text-slate-500 mb-4">Ces actions sont irréversibles. Soyez prudent.</p>
          <button className="text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2 rounded-xl transition-all duration-200">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  )
}
