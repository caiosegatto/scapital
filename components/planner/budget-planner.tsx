'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Home, Gamepad2, TrendingUp } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const categories = [
  {
    name: 'Necessidades',
    percentage: 50,
    description: 'Gastos essenciais: moradia, alimentação, transporte, saúde',
    icon: Home,
    color: 'bg-blue-500',
    progressColor: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    name: 'Desejos',
    percentage: 30,
    description: 'Lazer, entretenimento, restaurantes, hobbies',
    icon: Gamepad2,
    color: 'bg-amber-500',
    progressColor: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  {
    name: 'Investimentos',
    percentage: 20,
    description: 'Aportes em renda fixa, renda variável, criptomoedas e reserva de emergência',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    progressColor: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
]

export function BudgetPlanner() {
  const [income, setIncome] = useState('')
  const incomeValue = parseFloat(income.replace(/\D/g, '')) / 100 || 0

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const numericValue = parseInt(value) / 100
    if (!isNaN(numericValue)) {
      setIncome(formatCurrency(numericValue).replace('R$', '').trim())
    } else {
      setIncome('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Planejador 50/30/20</h2>
        <p className="text-muted-foreground">Uma regra simples para organizar seu orçamento mensal</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Qual é a sua renda mensal?</CardTitle>
          <CardDescription>Informe sua renda líquida (o que você recebe após descontos)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Label htmlFor="income" className="text-xl font-bold">R$</Label>
            <Input
              id="income"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              value={income}
              onChange={handleIncomeChange}
              className="text-2xl font-bold h-14 max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {incomeValue > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((cat) => {
            const value = (incomeValue * cat.percentage) / 100
            return (
              <Card key={cat.name} className={`${cat.bgLight} border-2`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${cat.color}`}>
                      <cat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cat.name}</CardTitle>
                      <span className={`text-2xl font-bold ${cat.textColor}`}>{cat.percentage}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Valor mensal</span>
                    </div>
                    <p className="text-3xl font-bold">{formatCurrency(value)}</p>
                  </div>
                  
                  <Progress value={cat.percentage} className={`h-3 ${cat.progressColor}`} />
                  
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-center">Como funciona a regra 50/30/20?</h3>
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">50%</span>
                </div>
                <p className="font-medium">Necessidades</p>
                <p className="text-muted-foreground text-xs">Gastos fixos e essenciais para viver</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">30%</span>
                </div>
                <p className="font-medium">Desejos</p>
                <p className="text-muted-foreground text-xs">Qualidade de vida e diversão</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">20%</span>
                </div>
                <p className="font-medium">Investimentos</p>
                <p className="text-muted-foreground text-xs">Seu futuro financeiro</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
