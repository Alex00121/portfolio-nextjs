import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string
  trend: string
  trendUp: boolean
  borderColor: string
  icon: ReactNode
}

export default function KpiCard({ label, value, trend, trendUp, borderColor, icon }: KpiCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border-t-4 ${borderColor} p-6 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      </div>
      <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
        {trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        <span>{trend} vs mois dernier</span>
      </div>
    </div>
  )
}
