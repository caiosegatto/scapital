'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFinance } from '@/lib/finance-context'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'

function formatCurrency(value: number) {
  const safeValue = typeof value === 'number' ? value : 0
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(safeValue)
}

export function SummaryCards() {
  const finance = useFinance()

  // ✅ BLINDAGEM TOTAL
  const expenses = finance?.expenses || []
  const investments = finance?.investments || []

  const totalExpenses = expenses.reduce((sum, e) => sum + (e.value || 0), 0)
  const totalInvestments = investments.reduce((sum, i) => sum + (i.value || 0), 0)
  const balance = totalInvestments - totalExpenses

  return (
    <div className="grid gap-4 md:grid-cols-3">

      {/* Gastos */}
      <Card className="border-l-4 border-l-[oklch(0.65_0.2_30)]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Gastos
          </CardTitle>
          <TrendingDown className="h-5 w-5 text-[oklch(0.65_0.2_30)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[oklch(0.65_0.2_30)]">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total de despesas
          </p>
        </CardContent>
      </Card>

      {/* Investimentos */}
      <Card className="border-l-4 border-l-[oklch(0.55_0.17_160)]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Investimentos
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-[oklch(0.55_0.17_160)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[oklch(0.55_0.17_160)]">
            {formatCurrency(totalInvestments)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total investido
          </p>
        </CardContent>
      </Card>

      {/* Saldo */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
          <Wallet className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            balance >= 0 
              ? 'text-[oklch(0.55_0.17_160)]' 
              : 'text-[oklch(0.65_0.2_30)]'
          }`}>
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Investimentos - Gastos
          </p>
        </CardContent>
      </Card>

    </div>
  )
}