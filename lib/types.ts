export type ExpenseCategory = 'alimentacao' | 'transporte' | 'lazer' | 'moradia' | 'outros'

export type InvestmentType = 'renda_fixa' | 'renda_variavel' | 'cripto'

export interface Expense {
  id: string
  value: number
  category: ExpenseCategory
  description?: string
  date: string
}

export interface Investment {
  id: string
  value: number
  type: InvestmentType
  description?: string
  date: string
}

export interface FinanceData {
  expenses: Expense[]
  investments: Investment[]
}

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; color: string }> = {
  alimentacao: { label: 'Alimentação', color: 'hsl(var(--chart-2))' },
  transporte: { label: 'Transporte', color: 'hsl(var(--chart-3))' },
  lazer: { label: 'Lazer', color: 'hsl(var(--chart-4))' },
  moradia: { label: 'Moradia', color: 'hsl(var(--chart-5))' },
  outros: { label: 'Outros', color: 'hsl(var(--chart-1))' },
}

export const INVESTMENT_TYPES: Record<InvestmentType, { label: string; category: 'renda_fixa' | 'renda_variavel' | 'cripto' }> = {
  renda_fixa: { label: 'Renda Fixa', category: 'renda_fixa' },
  renda_variavel: { label: 'Renda Variável', category: 'renda_variavel' },
  cripto: { label: 'Criptomoedas', category: 'cripto' },
}
