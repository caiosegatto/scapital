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
  loading: boolean
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [loading, setLoading] = useState(true)

  // 🔥 BUSCAR DADOS DO BANCO (PROTEGIDO)
  async function fetchData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setExpenses([])
        setInvestments([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar dados:', error)
        setExpenses([])
        setInvestments([])
        setLoading(false)
        return
      }

      const safeData = data || []

      const gastos = safeData.filter((t) => t.tipo === 'gasto')
      const investimentos = safeData.filter((t) => t.tipo === 'investimento')

      setExpenses(
        gastos.map((t) => ({
          id: t.id,
          value: Number(t.valor) || 0,
          category: t.categoria || 'outros',
          description: t.descricao || '',
          date: t.created_at || new Date().toISOString()
        }))
      )

      setInvestments(
        investimentos.map((t) => ({
          id: t.id,
          value: Number(t.valor) || 0,
          type: t.tipo_investimento || 'renda_fixa',
          description: t.descricao || '',
          date: t.created_at || new Date().toISOString()
        }))
      )

    } catch (err) {
      console.error('Erro inesperado:', err)
      setExpenses([])
      setInvestments([])
    } finally {
      setLoading(false)
    }
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
        addInvestment,
        loading
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