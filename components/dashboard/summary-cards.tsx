'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFinance } from '@/lib/finance-context'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0)
}

export function SummaryCards() {
  const { expenses, investments, loading } = useFinance()

  // 🔥 EVITA ERRO ENQUANTO CARREGA
  if (loading) {
    return null // ou pode colocar "Carregando..."
  }

  const safeExpenses = expenses || []
  const safeInvestments = investments || []

  const totalExpenses = safeExpenses.reduce((sum, e) => sum + (e.value || 0), 0)
  const totalInvestments = safeInvestments.reduce((sum, i) => sum + (i.value || 0), 0)
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
        </CardContent>
      </Card>

    </div>
  )
}