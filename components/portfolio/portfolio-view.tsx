'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useFinance } from '@/lib/finance-context'
import { type InvestmentType } from '@/lib/types'
import { Landmark, LineChart, Bitcoin } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function PortfolioView() {
  const { data, totalInvestments } = useFinance()

 const investmentsByType = (data?.investments || []).reduce((acc: any, inv: any) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.value
    return acc
  }, {} as any) 

  const rendaFixa = investmentsByType['renda_fixa'] || 0
  const rendaVariavel = investmentsByType['renda_variavel'] || 0
  const cripto = investmentsByType['cripto'] || 0

  const getPercentage = (value: number) => totalInvestments > 0 ? (value / totalInvestments) * 100 : 0

  const categories = [
    {
      title: 'Renda Fixa',
      description: 'Investimentos de baixo risco com rentabilidade previsível',
      value: rendaFixa,
      percentage: getPercentage(rendaFixa),
      icon: Landmark,
      color: 'bg-blue-500',
    },
    {
      title: 'Renda Variável',
      description: 'Investimentos com maior potencial de retorno',
      value: rendaVariavel,
      percentage: getPercentage(rendaVariavel),
      icon: LineChart,
      color: 'bg-amber-500',
    },
    {
      title: 'Criptomoedas',
      description: 'Ativos digitais descentralizados',
      value: cripto,
      percentage: getPercentage(cripto),
      icon: Bitcoin,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Minha Carteira</h2>
        <p className="text-muted-foreground">Patrimônio total: {formatCurrency(totalInvestments)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{cat.title}</CardTitle>
                  <CardDescription>{cat.description}</CardDescription>
                </div>
                <cat.icon className={`h-8 w-8 p-1.5 rounded-lg text-white ${cat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold">{formatCurrency(cat.value)}</span>
                    <span className="text-sm text-muted-foreground">{cat.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={cat.percentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalInvestments === 0 && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              Você ainda não possui investimentos registrados. Use o botão {"\"Registrar Investimento\""} para começar!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
