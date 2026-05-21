'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projets', icon: FolderKanban },
  { href: '/dashboard/users', label: 'Utilisateurs', icon: Users, adminOnly: true },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role
  const initials = session?.user?.name?.split(' ').filter(Boolean).map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const visibleItems = navItems.filter((item) => !item.adminOnly || role === 'admin')

  return (
    <aside className="w-64 flex-shrink-0 bg-[#1e293b] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow shadow-indigo-500/30">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Dashboard</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {visibleItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-indigo-600 text-white shadow shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 pb-4 border-t border-slate-700/50 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{session?.user?.name}</p>
            <p className="text-slate-400 text-xs capitalize">{role}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
