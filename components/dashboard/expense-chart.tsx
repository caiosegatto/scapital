'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useFinance } from '@/lib/finance-context'
import { EXPENSE_CATEGORIES, type ExpenseCategory } from '@/lib/types'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#ef4444', '#3b82f6', '#eab308', '#8b5cf6', '#10b981']

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0)
}

export function ExpenseChart() {
  const finance = useFinance()

  // ✅ BLINDAGEM TOTAL (NUNCA undefined)
  const expenses = finance?.expenses || []
  const selectedMonth = finance?.selectedMonth || 'all'

  // ✅ FILTRO SEGURO
  const filteredExpenses =
    selectedMonth === 'all'
      ? expenses
      : expenses.filter((e) => e.date?.startsWith(selectedMonth))

  // ✅ REDUCE SEGURO
  const expensesByCategory = filteredExpenses.reduce(
    (acc: Record<string, number>, expense) => {
      const category = expense?.category || 'outros'
      const value = Number(expense?.value) || 0

      acc[category] = (acc[category] || 0) + value
      return acc
    },
    {}
  )

  // ✅ MAP SEGURO
  const chartData = Object.entries(expensesByCategory).map(([category, value], index) => ({
    name: EXPENSE_CATEGORIES[category as ExpenseCategory]?.label || 'Outros',
    value: Number(value) || 0,
    color: COLORS[index % COLORS.length],
  }))

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
          <CardDescription>Distribuição das suas despesas</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">
            Nenhum gasto registrado neste período
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Categoria</CardTitle>
        <CardDescription>Distribuição das suas despesas</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent || 0) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}