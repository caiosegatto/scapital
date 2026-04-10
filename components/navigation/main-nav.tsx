'use client'

import { cn } from '@/lib/utils'
import { LayoutDashboard, Wallet, Calculator, GraduationCap, PiggyBank } from 'lucide-react'

export type TabType = 'dashboard' | 'carteira' | 'simulador' | 'aprender' | 'planejador'

interface MainNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'carteira' as const, label: 'Carteira', icon: Wallet },
  { id: 'simulador' as const, label: 'Simulador', icon: Calculator },
  { id: 'aprender' as const, label: 'Aprender', icon: GraduationCap },
  { id: 'planejador' as const, label: '50/30/20', icon: PiggyBank },
]

export function MainNav({ activeTab, onTabChange }: MainNavProps) {
  return (
    <nav className="border-b bg-card sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">SCAPITAL</span>
          </div>
          
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
