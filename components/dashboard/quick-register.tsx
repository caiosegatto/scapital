'use client'

import { supabase } from "@/lib/supabaseClient"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFinance } from '@/lib/finance-context'
import { EXPENSE_CATEGORIES, INVESTMENT_TYPES, type ExpenseCategory, type InvestmentType } from '@/lib/types'
import { Plus, TrendingDown, TrendingUp } from 'lucide-react'

async function salvarTransacao(
  tipo: string,
  valor: number,
  descricao: string,
  categoria?: string,
  tipo_investimento?: string
) {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Usuário não logado")
    return
  }

  const hoje = new Date()

  const { error } = await supabase.from("transacoes").insert({
    user_id: user.id,
    tipo,
    valor,
    descricao,
    categoria: tipo === "gasto" ? categoria : null,
    tipo_investimento: tipo === "investimento" ? tipo_investimento : null,
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear()
  })

  if (error) {
    console.error("ERRO SUPABASE:", error)
    alert(error.message)
    return
  }
}

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
      return
    }

    addExpense(value, expenseCategory, expenseDescription || undefined)

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
      return
    }

    await salvarTransacao(
      "investimento",
      value,
      investmentDescription,
      undefined,
      investmentType
    )

    addInvestment(value, investmentType, investmentDescription || undefined)

    setInvestmentValue('')
    setInvestmentDescription('')
    setInvestmentType('renda_fixa')
    setInvestmentOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

      {/* GASTO */}
      <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 text-white">
            <TrendingDown className="h-5 w-5 mr-2" />
            Gasto
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Gasto</DialogTitle>
            <DialogDescription>Adicione uma despesa</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input placeholder="Valor" value={expenseValue} onChange={(e) => setExpenseValue(e.target.value)} />

            <Select value={expenseCategory} onValueChange={(v) => setExpenseCategory(v as ExpenseCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EXPENSE_CATEGORIES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input placeholder="Descrição" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />

            <Button onClick={handleAddExpense} className="bg-red-500 hover:bg-red-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* INVESTIMENTO */}
      <Dialog open={investmentOpen} onOpenChange={setInvestmentOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white">
            <TrendingUp className="h-5 w-5 mr-2" />
            Investimento
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Investimento</DialogTitle>
            <DialogDescription>Adicione um investimento</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input placeholder="Valor" value={investmentValue} onChange={(e) => setInvestmentValue(e.target.value)} />

            <Select value={investmentType} onValueChange={(v) => setInvestmentType(v as InvestmentType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(INVESTMENT_TYPES).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input placeholder="Descrição" value={investmentDescription} onChange={(e) => setInvestmentDescription(e.target.value)} />

            <Button onClick={handleAddInvestment} className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}