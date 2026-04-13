'use client'

import { ExpenseChart } from '@/components/dashboard/expense-chart'
import { QuickRegister } from '@/components/dashboard/quick-register'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { FinanceProvider } from '@/lib/finance-context'

export default function Page() {
  return (
    <FinanceProvider>
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-6xl">
          <header className="mb-8 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">SCAPITAL</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Painel financeiro bonito, claro e fácil de usar</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Clique para registrar gasto ou investimento e acompanhe tudo em gráficos e listas com leitura simples.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#graficos"
                aria-label="Ir para seção de gráficos"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Ver gráficos
              </a>
              <a
                href="#transacoes"
                aria-label="Ir para seção de transações"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ver transações
              </a>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">Resumo financeiro</h2>
            <SummaryCards />
          </section>

          <section id="graficos" className="mb-8 scroll-mt-24">
            <ExpenseChart />
          </section>

          <section id="transacoes" className="mb-20 scroll-mt-24">
            <TransactionsList />
          </section>
        </section>

        <QuickRegister />
      </main>
    </FinanceProvider>
  )
}