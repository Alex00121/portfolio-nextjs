import type { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { demoUsers } from '@/lib/data'
import { ShieldCheck, User, Eye } from 'lucide-react'

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: ReactNode }> = {
  admin: {
    label: 'Admin',
    color: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    icon: <ShieldCheck className="w-3 h-3" />,
  },
  member: {
    label: 'Membre',
    color: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: <User className="w-3 h-3" />,
  },
  viewer: {
    label: 'Visiteur',
    color: 'bg-slate-100 text-slate-600 border border-slate-200',
    icon: <Eye className="w-3 h-3" />,
  },
}

export default async function UsersPage() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role

  if (!session) redirect('/login')
  if (role !== 'admin') redirect('/dashboard')

  return (
    <div className="p-8 fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Utilisateurs</h1>
        <p className="text-slate-500 mt-1 text-sm">{demoUsers.length} utilisateurs enregistrés (accès admin requis)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-4">Utilisateur</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Rôle</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Statut</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {demoUsers.map((user) => {
              const roleConf = ROLE_CONFIG[user.role] || ROLE_CONFIG.viewer
              const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
              const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500']
              const color = colors[parseInt(user.id) % colors.length]
              return (
                <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${roleConf.color}`}>
                      {roleConf.icon}
                      {roleConf.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-500">{new Date(user.joined).toLocaleDateString('fr-FR')}</p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
