'use client'

import { FinanceProvider } from '@/lib/finance-context'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { ExpenseChart } from '@/components/dashboard/expense-chart'
import { QuickRegister } from '@/components/dashboard/quick-register'
import { TransactionsList } from '@/components/dashboard/transactions-list'
import { Button } from '@/components/ui/button'
import { FinanceProvider } from '@/lib/finance-context'
import { BarChart3, PiggyBank, Wallet } from 'lucide-react'

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
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-100 text-slate-900">
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">SCAPITAL</p>

            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  Seu painel financeiro claro, bonito e fácil de usar
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Registre gastos e investimentos em poucos cliques, acompanhe seus números em tempo real e
                  visualize seu progresso com gráficos intuitivos.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <a href="#graficos">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ver gráficos
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-slate-300">
                  <a href="#transacoes">
                    <Wallet className="mr-2 h-4 w-4" />
                    Ver transações
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-xl bg-emerald-50 px-4 py-3">
                <p className="font-semibold text-emerald-700">Clique para registrar gasto</p>
                <p>Use o botão vermelho no canto da tela.</p>
              </div>
              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="font-semibold text-blue-700">Clique para investir</p>
                <p>Use o botão verde e preencha os dados.</p>
              </div>
              <div className="rounded-xl bg-violet-50 px-4 py-3">
                <p className="font-semibold text-violet-700">Veja seus gráficos</p>
                <p>As categorias de gastos são atualizadas automaticamente.</p>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-2 text-slate-700">
            <PiggyBank className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Resumo financeiro</h2>
          </div>

          <div className="mb-8">
            <SummaryCards />
          </div>

          <div id="graficos" className="mb-8 scroll-mt-24">
            <ExpenseChart />
          </div>

          <div id="transacoes" className="mb-20 scroll-mt-24">
            <TransactionsList />
          </div>
        </section>

        <QuickRegister />
      </main>
    </FinanceProvider>
  )
}
}