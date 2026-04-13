'use client'

import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
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

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

function isInSelectedMonth(dateIso: string, selectedMonth: string) {
  if (selectedMonth === 'all') return true

  const [yearStr, monthStr] = selectedMonth.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr)

  if (!year || !month) return true

  const date = new Date(dateIso)
  return date.getFullYear() === year && date.getMonth() + 1 === month
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [allExpenses, setAllExpenses] = useState<Expense[]>([])
  const [allInvestments, setAllInvestments] = useState<Investment[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(true)

  async function fetchData() {
    try {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setAllExpenses([])
        setAllInvestments([])
        return
      }

      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar dados:', error)
        setAllExpenses([])
        setAllInvestments([])
        return
      }

      const safeData = data || []

      const gastos = safeData.filter((t) => t.tipo === 'gasto')
      const investimentosData = safeData.filter((t) => t.tipo === 'investimento')

      setAllExpenses(
        gastos.map((t) => ({
          id: t.id,
          value: Number(t.valor) || 0,
          category: t.categoria || 'outros',
          description: t.descricao || '',
          date: t.created_at || new Date().toISOString(),
        }))
      )

      setAllInvestments(
        investimentosData.map((t) => ({
          id: t.id,
          value: Number(t.valor) || 0,
          type: t.tipo_investimento || 'renda_fixa',
          description: t.descricao || '',
          date: t.created_at || new Date().toISOString(),
        }))
      )
    } catch (err) {
      console.error('Erro inesperado:', err)
      setAllExpenses([])
      setAllInvestments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const expenses = useMemo(
    () => allExpenses.filter((expense) => isInSelectedMonth(expense.date, selectedMonth)),
    [allExpenses, selectedMonth]
  )

  const investments = useMemo(
    () => allInvestments.filter((investment) => isInSelectedMonth(investment.date, selectedMonth)),
    [allInvestments, selectedMonth]
  )

  async function addExpense(value: number, category: ExpenseCategory, description?: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const hoje = new Date()

    const { error } = await supabase.from('transacoes').insert({
      user_id: user.id,
      tipo: 'gasto',
      valor: value,
      descricao: description || '',
      categoria: category,
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear(),
    })

    if (error) {
      console.error('Erro ao salvar gasto:', error)
      return
    }

    await fetchData()
  }

  async function addInvestment(value: number, type: InvestmentType, description?: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const hoje = new Date()

    const { error } = await supabase.from('transacoes').insert({
      user_id: user.id,
      tipo: 'investimento',
      valor: value,
      descricao: description || '',
      tipo_investimento: type,
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear(),
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
        loading,
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