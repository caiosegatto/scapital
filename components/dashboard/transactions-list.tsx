'use client'

import { useFinance } from '@/lib/finance-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, TrendingUp } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0)
}

export function TransactionsList() {
  const { expenses, investments, loading } = useFinance()

  // 🔥 evita bug enquanto carrega
  if (loading) return null

  const safeExpenses = expenses || []
  const safeInvestments = investments || []

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* GASTOS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {safeExpenses.length > 0 ? (
              safeExpenses.map((item) => (
                <div key={item.id} className="p-3 bg-muted rounded-lg">
                  <p className="font-bold text-red-500">
                    {formatCurrency(item.value)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description || 'Sem descrição'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum gasto registrado.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* INVESTIMENTOS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {safeInvestments.length > 0 ? (
              safeInvestments.map((item) => (
                <div key={item.id} className="p-3 bg-muted rounded-lg">
                  <p className="font-bold text-green-500">
                    {formatCurrency(item.value)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description || 'Sem descrição'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum investimento registrado.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}