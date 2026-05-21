import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import KpiCard from '@/components/KpiCard'
import ActivityChart from '@/components/ActivityChart'
import { recentActivity } from '@/lib/data'
import { Users, DollarSign, FolderKanban, Star } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const name = session.user?.name?.split(' ')[0] ?? ''

  return (
    <div className="p-8 fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Bonjour, {name} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Voici un aperçu de votre activité aujourd'hui.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KpiCard
          label="Utilisateurs totaux"
          value="1 284"
          trend="+12.5%"
          trendUp={true}
          borderColor="border-indigo-500"
          icon={<Users className="w-5 h-5 text-indigo-500" />}
        />
        <KpiCard
          label="Revenus"
          value="24 500 €"
          trend="+8.2%"
          trendUp={true}
          borderColor="border-emerald-500"
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
        />
        <KpiCard
          label="Projets actifs"
          value="42"
          trend="+3"
          trendUp={true}
          borderColor="border-amber-500"
          icon={<FolderKanban className="w-5 h-5 text-amber-500" />}
        />
        <KpiCard
          label="Satisfaction client"
          value="98 %"
          trend="-0.5%"
          trendUp={false}
          borderColor="border-purple-500"
          icon={<Star className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Chart */}
        <div className="xl:col-span-3">
          <ActivityChart />
        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Activité récente</h2>
          <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{item.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700">
                    <span className="font-semibold">{item.user}</span> {item.action}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Il y a {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
