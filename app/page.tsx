'use client'

import { useState } from 'react'
import { ExpenseChart } from '@/components/dashboard/expense-chart'
import { MonthSelector } from '@/components/dashboard/month-selector'
import { QuickRegister } from '@/components/dashboard/quick-register'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { LearnToInvest } from '@/components/education/learn-to-invest'
import { MainNav, type TabType } from '@/components/navigation/main-nav'
import { PortfolioView } from '@/components/portfolio/portfolio-view'
import { BudgetPlanner } from '@/components/planner/budget-planner'
import { CompoundInterestSimulator } from '@/components/simulator/compound-interest'
import { Card, CardContent } from '@/components/ui/card'
import { FinanceProvider, useFinance } from '@/lib/finance-context'
import { ArrowDown, ArrowUp, Eye } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0)
}

function DashboardOverviewCard() {
  const { expenses, investments, selectedMonth } = useFinance()

  const totalExpenses = expenses.reduce((sum, item) => sum + (item.value || 0), 0)
  const totalInvestments = investments.reduce((sum, item) => sum + (item.value || 0), 0)
  const balance = totalInvestments - totalExpenses

  const monthLabel =
    selectedMonth === 'all'
      ? 'Todo o período'
      : new Date(`${selectedMonth}-01`).toLocaleDateString('pt-BR', {
          month: 'long',
          year: 'numeric',
        })

  return (
    <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-500">SCAPITAL</p>
            <h1 className="text-2xl font-bold capitalize">{monthLabel}</h1>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">Painel ativo</span>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">Saldo do período</p>
          <p className="text-4xl font-extrabold tracking-tight text-slate-800">{formatCurrency(balance)}</p>
          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-400">
            <Eye className="h-3.5 w-3.5" />
            Valores reais do backend
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <div className="mb-1 flex items-center gap-2 text-emerald-700">
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm">Investimentos</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalInvestments)}</p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4">
            <div className="mb-1 flex items-center gap-2 text-rose-700">
              <ArrowDown className="h-4 w-4" />
              <span className="text-sm">Despesas</span>
            </div>
            <p className="text-2xl font-bold text-rose-500">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  return (
    <FinanceProvider>
      <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
        <MainNav activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <DashboardOverviewCard />
              <MonthSelector />
              <SummaryCards />
              <ExpenseChart />
              <TransactionsList />
            </div>
          )}

          {activeTab === 'carteira' && <PortfolioView />}
          {activeTab === 'simulador' && <CompoundInterestSimulator />}
          {activeTab === 'aprender' && <LearnToInvest />}
          {activeTab === 'planejador' && <BudgetPlanner />}
        </div>

        <QuickRegister />
      </main>
    </FinanceProvider>
  )
}