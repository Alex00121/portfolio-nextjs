'use client'

import { useState } from 'react'
import { fakeProjects } from '@/lib/data'
import { MoreHorizontal, Plus, CheckCircle2, Clock, PauseCircle } from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  active: {
    label: 'Actif',
    color: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: <Clock className="w-3 h-3" />,
  },
  completed: {
    label: 'Terminé',
    color: 'bg-blue-100 text-blue-700 border border-blue-200',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  paused: {
    label: 'En pause',
    color: 'bg-amber-100 text-amber-700 border border-amber-200',
    icon: <PauseCircle className="w-3 h-3" />,
  },
}

export default function ProjectsPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <div className="p-8 fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projets</h1>
          <p className="text-slate-500 mt-1 text-sm">{fakeProjects.length} projets au total</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow shadow-indigo-200">
          <Plus className="w-4 h-4" />
          Nouveau projet
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-4">Projet</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Client</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Statut</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Budget</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Échéance</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-4">Responsable</th>
              <th className="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {fakeProjects.map((project) => {
              const status = STATUS_CONFIG[project.status]
              return (
                <tr key={project.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{project.name}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600">{project.client}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-700 font-medium">{project.budget.toLocaleString('fr-FR')} €</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600">{new Date(project.dueDate).toLocaleDateString('fr-FR')}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600">{project.lead}</p>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === project.id ? null : project.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {openMenu === project.id && (
                      <div className="absolute right-6 top-10 z-10 bg-white rounded-xl shadow-lg border border-slate-100 py-1 w-36">
                        <button className="w-full text-left text-sm text-slate-700 hover:bg-slate-50 px-4 py-2 transition-colors">Voir</button>
                        <button className="w-full text-left text-sm text-slate-700 hover:bg-slate-50 px-4 py-2 transition-colors">Modifier</button>
                        <button className="w-full text-left text-sm text-red-600 hover:bg-red-50 px-4 py-2 transition-colors">Supprimer</button>
                      </div>
                    )}
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
