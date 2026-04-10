'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

import { FinanceProvider } from '@/lib/finance-context'
import { MainNav } from '@/components/navigation/main-nav'
import { MonthSelector } from '@/components/dashboard/month-selector'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { ExpenseChart } from '@/components/dashboard/expense-chart'
import { QuickRegister } from '@/components/dashboard/quick-register'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { PortfolioView } from '@/components/portfolio/portfolio-view'
import { CompoundInterestSimulator } from '@/components/simulator/compound-interest'
import { LearnToInvest } from '@/components/education/learn-to-invest'
import { BudgetPlanner } from '@/components/planner/budget-planner'

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe suas finanças de forma simples
        </p>
      </div>

      <MonthSelector />
      <SummaryCards />
      <ExpenseChart />
      <TransactionsList />
    </div>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'carteira' | 'simulador' | 'aprender' | 'planejador'>('dashboard')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8 pb-32">
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'carteira' && <PortfolioView />}
        {activeTab === 'simulador' && <CompoundInterestSimulator />}
        {activeTab === 'aprender' && <LearnToInvest />}
        {activeTab === 'planejador' && <BudgetPlanner />}
      </main>

      <QuickRegister />
    </div>
  )
}

// O segredo está aqui: o Suspense ajuda o Render a não travar no build
export default function Home() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FinanceProvider>
        <AppContent />
      </FinanceProvider>
    </Suspense>
  )
}