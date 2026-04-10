'use client'

import { FinanceProvider } from '@/lib/finance-context'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { ExpenseChart } from '@/components/dashboard/expense-chart'

export default function Page() {
  return (
    <FinanceProvider>
      <main className="min-h-screen bg-white text-gray-900 p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-600">
            SCAPITAL 💰
          </h1>
          <p className="text-gray-500">
            Controle financeiro simples e eficiente
          </p>
        </div>

        {/* CARDS */}
        <div className="mb-6">
          <SummaryCards />
        </div>

        {/* GRÁFICO */}
        <div className="mb-6">
          <ExpenseChart />
        </div>

        {/* LISTA */}
        <div className="mb-20">
          <TransactionsList />
        </div>

      </main>
    </FinanceProvider>
  )
}