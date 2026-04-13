'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFinance } from '@/lib/finance-context'
import { EXPENSE_CATEGORIES, INVESTMENT_TYPES, type ExpenseCategory, type InvestmentType } from '@/lib/types'
import { Plus, TrendingDown, TrendingUp } from 'lucide-react'

export function QuickRegister() {
  const { addExpense, addInvestment } = useFinance()

  const [expenseOpen, setExpenseOpen] = useState(false)
  const [investmentOpen, setInvestmentOpen] = useState(false)

  const [expenseValue, setExpenseValue] = useState('')
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>('outros')
  const [expenseDescription, setExpenseDescription] = useState('')

  const [investmentValue, setInvestmentValue] = useState('')
  const [investmentType, setInvestmentType] = useState<InvestmentType>('renda_fixa')
  const [investmentDescription, setInvestmentDescription] = useState('')

  // ✅ GASTO
  const handleAddExpense = async () => {
    const value = parseFloat(expenseValue.replace(',', '.'))

    if (!value || value <= 0) {
      alert("Valor inválido")
      alert('Valor inválido')
      return
    }

    await addExpense(value, expenseCategory, expenseDescription || undefined)

    setExpenseValue('')
    setExpenseDescription('')
    setExpenseCategory('outros')
    setExpenseOpen(false)
  }

  // ✅ INVESTIMENTO
  const handleAddInvestment = async () => {
    const value = parseFloat(investmentValue.replace(',', '.'))

    if (!value || value <= 0) {
      alert("Valor inválido")
      alert('Valor inválido')
      return
    }

    await addInvestment(value, investmentType, investmentDescription || undefined)

    setInvestmentValue('')
    setInvestmentDescription('')
    setInvestmentType('renda_fixa')
    setInvestmentOpen(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {/* GASTO */}
      <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full border border-red-300 bg-red-500 px-5 text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-600"
          >
            <TrendingDown className="mr-2 h-5 w-5" />
            Registrar gasto
          </Button>
        </DialogTrigger>

        <DialogContent className="border-red-100">
          <DialogHeader>
            <DialogTitle className="text-xl text-slate-900">Registrar gasto</DialogTitle>
            <DialogDescription className="text-slate-600">Preencha os dados para salvar uma despesa.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input placeholder="Valor (ex.: 250,00)" value={expenseValue} onChange={(e) => setExpenseValue(e.target.value)} />

            <Select value={expenseCategory} onValueChange={(v) => setExpenseCategory(v as ExpenseCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EXPENSE_CATEGORIES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Descrição (opcional)"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />

            <Button onClick={handleAddExpense} className="bg-red-500 text-white hover:bg-red-600">
              <Plus className="mr-2 h-4 w-4" />
              Salvar gasto
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* INVESTIMENTO */}
      <Dialog open={investmentOpen} onOpenChange={setInvestmentOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full border border-emerald-300 bg-emerald-500 px-5 text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Registrar investimento
          </Button>
        </DialogTrigger>

        <DialogContent className="border-emerald-100">
          <DialogHeader>
            <DialogTitle className="text-xl text-slate-900">Registrar investimento</DialogTitle>
            <DialogDescription className="text-slate-600">Preencha os dados para salvar um investimento.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              placeholder="Valor (ex.: 500,00)"
              value={investmentValue}
              onChange={(e) => setInvestmentValue(e.target.value)}
            />

            <Select value={investmentType} onValueChange={(v) => setInvestmentType(v as InvestmentType)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(INVESTMENT_TYPES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Descrição (opcional)"
              value={investmentDescription}
              onChange={(e) => setInvestmentDescription(e.target.value)}
            />

            <Button onClick={handleAddInvestment} className="bg-emerald-500 text-white hover:bg-emerald-600">
              <Plus className="mr-2 h-4 w-4" />
              Salvar investimento
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}