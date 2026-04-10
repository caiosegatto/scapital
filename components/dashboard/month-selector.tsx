'use client'

import { Button } from '@/components/ui/button'
import { useFinance } from '@/lib/finance-context'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

// 🔥 FUNÇÃO SEGURA PRA QUEBRAR STRING
function safeSplitMonth(monthStr?: string): [number, number] {
  if (!monthStr || monthStr === 'all') return [0, 0]

  const parts = monthStr.split('-')
  if (parts.length !== 2) return [0, 0]

  return [Number(parts[0]), Number(parts[1])]
}

function formatMonthLabel(monthStr?: string): string {
  if (!monthStr || monthStr === 'all') return 'Todo o período'

  const [year, month] = safeSplitMonth(monthStr)

  if (!year || !month) return 'Todo o período'

  const date = new Date(year, month - 1, 1)
  const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

function getAdjacentMonth(direction: 'prev' | 'next', currentMonth?: string): string {
  if (!currentMonth || currentMonth === 'all') {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const [year, month] = safeSplitMonth(currentMonth)

  const date = new Date(year || 0, (month || 1) - 1, 1)

  if (direction === 'prev') {
    date.setMonth(date.getMonth() - 1)
  } else {
    date.setMonth(date.getMonth() + 1)
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function isCurrentMonth(monthStr?: string): boolean {
  if (!monthStr || monthStr === 'all') return false

  const now = new Date()
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  return monthStr === current
}

function isFutureMonth(monthStr?: string): boolean {
  if (!monthStr || monthStr === 'all') return false

  const [year, month] = safeSplitMonth(monthStr)

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (year > currentYear) return true
  if (year === currentYear && month > currentMonth) return true

  return false
}

export function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useFinance()

  const handlePrevMonth = () => {
    setSelectedMonth(getAdjacentMonth('prev', selectedMonth))
  }

  const handleNextMonth = () => {
    const nextMonth = getAdjacentMonth('next', selectedMonth)
    if (!isFutureMonth(nextMonth)) {
      setSelectedMonth(nextMonth)
    }
  }

  const handleShowAll = () => {
    setSelectedMonth('all')
  }

  const nextMonth = getAdjacentMonth('next', selectedMonth)
  const disableNext = isFutureMonth(nextMonth)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Período:</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevMonth}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-[180px] text-center">
          <span className="text-base font-semibold">
            {formatMonthLabel(selectedMonth)}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          disabled={disableNext}
          className="h-9 w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {selectedMonth !== 'all' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShowAll}
          className="text-primary hover:text-primary"
        >
          Ver todo o período
        </Button>
      )}
    </div>
  )
}