'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Expense, Investment, ExpenseCategory, InvestmentType } from './types'

interface FinanceContextType {
  expenses: Expense[]
  investments: Investment[]
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  addExpense: (value: number, category: ExpenseCategory, description?: string) => Promise<void>
  addInvestment: (value: number, type: InvestmentType, description?: string) => Promise<void>
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [selectedMonth, setSelectedMonth] = useState('all')

  // 🔥 BUSCAR DADOS DO BANCO
  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar dados:', error)
      return
    }

    if (!data) return

    const gastos = data.filter((t) => t.tipo === 'gasto')
    const investimentos = data.filter((t) => t.tipo === 'investimento')

    setExpenses(
      gastos.map((t) => ({
        id: t.id,
        value: t.valor ?? 0,
        category: t.categoria || 'outros',
        description: t.descricao || '',
        date: t.created_at || new Date().toISOString()
      }))
    )

    setInvestments(
      investimentos.map((t) => ({
        id: t.id,
        value: t.valor ?? 0,
        type: t.tipo_investimento || 'renda_fixa',
        description: t.descricao || '',
        date: t.created_at || new Date().toISOString()
      }))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 🔥 ADICIONAR GASTO
  async function addExpense(value: number, category: ExpenseCategory, description?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const hoje = new Date()

    const { error } = await supabase.from('transacoes').insert({
      user_id: user.id,
      tipo: 'gasto',
      valor: value,
      descricao: description || '',
      categoria: category,
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear()
    })

    if (error) {
      console.error('Erro ao salvar gasto:', error)
      return
    }

    await fetchData()
  }

  // 🔥 ADICIONAR INVESTIMENTO
  async function addInvestment(value: number, type: InvestmentType, description?: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const hoje = new Date()

    const { error } = await supabase.from('transacoes').insert({
      user_id: user.id,
      tipo: 'investimento',
      valor: value,
      descricao: description || '',
      tipo_investimento: type,
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear()
    })

    if (error) {
      console.error('Erro ao salvar investimento:', error)
      return
    }

    await fetchData()
  }

  return (
    <FinanceContext.Provider
      value={{
        expenses,
        investments,
        selectedMonth,
        setSelectedMonth,
        addExpense,
        addInvestment
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)

  if (!context) {
    throw new Error('useFinance deve ser usado dentro do FinanceProvider')
  }

  return context
}