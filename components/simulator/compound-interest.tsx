'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

function parseNumber(value: string): number {
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

// FV = PV * (1 + i)^n + P * ((1 + i)^n - 1) / i
function calculateFutureValue(initialValue: number, monthlyPayment: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return initialValue + (monthlyPayment * months)
  const compoundedInitial = initialValue * Math.pow(1 + monthlyRate, months)
  const compoundedPayments = monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  return compoundedInitial + compoundedPayments
}

export function CompoundInterestSimulator() {
  const [initialValueStr, setInitialValueStr] = useState('0')
  const [monthlyValueStr, setMonthlyValueStr] = useState('500')
  const [timeValueStr, setTimeValueStr] = useState('10')
  const [timeUnit, setTimeUnit] = useState<'anos' | 'meses'>('anos')
  const [interestRate, setInterestRate] = useState('1')

  const initialValue = parseNumber(initialValueStr)
  const monthlyValue = parseNumber(monthlyValueStr)
  const timeValue = parseNumber(timeValueStr)

  const months = timeUnit === 'anos' ? timeValue * 12 : timeValue
  const totalInvested = initialValue + (monthlyValue * months)
  const monthlyRate = parseNumber(interestRate) / 100

  const futureValue = useMemo(() => {
    return calculateFutureValue(initialValue, monthlyValue, monthlyRate, months)
  }, [initialValue, monthlyValue, monthlyRate, months])

  const gain = futureValue - totalInvested
  const gainPercentage = totalInvested > 0 ? ((gain / totalInvested) * 100).toFixed(0) : 0

  const timeLabel = timeUnit === 'anos' 
    ? `${timeValue} ${timeValue === 1 ? 'ano' : 'anos'}` 
    : `${timeValue} ${timeValue === 1 ? 'mês' : 'meses'}`

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Simulador de Juros Compostos</h2>
        <p className="text-muted-foreground">Veja o poder dos juros compostos nos seus investimentos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure sua simulação</CardTitle>
          <CardDescription>Ajuste os valores para ver a projeção do seu patrimônio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="initial-value" className="text-base">Valor Inicial (R$)</Label>
              <Input
                id="initial-value"
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={initialValueStr}
                onChange={(e) => setInitialValueStr(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">Quanto você já tem para investir</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-value" className="text-base">Aporte Mensal (R$)</Label>
              <Input
                id="monthly-value"
                type="text"
                inputMode="decimal"
                placeholder="500"
                value={monthlyValueStr}
                onChange={(e) => setMonthlyValueStr(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">Quanto você vai investir por mês</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="time-value" className="text-base">Tempo de Investimento</Label>
              <div className="flex gap-2">
                <Input
                  id="time-value"
                  type="text"
                  inputMode="numeric"
                  placeholder="10"
                  value={timeValueStr}
                  onChange={(e) => setTimeValueStr(e.target.value)}
                  className="text-lg flex-1"
                />
                <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as 'anos' | 'meses')}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anos">Anos</SelectItem>
                    <SelectItem value="meses">Meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">Por quanto tempo você vai investir</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate" className="text-base">Taxa de Juros Mensal (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="interest-rate"
                  type="text"
                  inputMode="decimal"
                  placeholder="1,0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="text-lg"
                />
                <span className="text-muted-foreground whitespace-nowrap">% a.m.</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Exemplos: Renda fixa ~0,8% | FIIs ~0,7% | Ações ~1,0%
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total investido:</span>
              <span className="text-lg font-semibold">{formatCurrency(totalInvested)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Resultado da Simulação</CardTitle>
          <CardDescription>Com taxa de {interestRate}% ao mês durante {timeLabel}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-background rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Total Investido</span>
              <p className="text-xl font-bold">{formatCurrency(totalInvested)}</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Patrimônio Final</span>
              <p className="text-2xl font-bold text-primary">{formatCurrency(futureValue)}</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Ganho Projetado</span>
              <p className="text-xl font-bold text-[oklch(0.55_0.17_160)]">
                +{formatCurrency(gain)} ({gainPercentage}%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Fórmula utilizada:</strong> FV = PV × (1 + i)^n + P × ((1 + i)^n - 1) / i
            <br />
            <span className="text-xs">
              Onde FV = Valor Futuro, PV = Valor Inicial, P = Aporte Mensal, i = Taxa de Juros, n = Número de Períodos
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
