'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, TrendingUp } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function TransactionsList() {
  const [gastos, setGastos] = useState<any[]>([])
  const [investimentos, setInvestimentos] = useState<any[]>([])

  useEffect(() => {
    async function carregar() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from("transacoes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        // BLINDAGEM: Se 'data' for nulo, usamos um array vazio [] para não quebrar o .filter
        const listaSegura = data || []

        const gastosFiltrados = listaSegura.filter((item) => item?.tipo === 'gasto')
        const investimentosFiltrados = listaSegura.filter((item) => item?.tipo === 'investimento')

        setGastos(gastosFiltrados)
        setInvestimentos(investimentosFiltrados)
      } catch (err) {
        console.error("Erro ao carregar transações:", err)
      }
    }

    carregar()
  }, []) // Aqui fechei o useEffect corretamente

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* GASTOS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {gastos.length > 0 ? (
              gastos.map((item) => (
                <div key={item.id} className="p-3 bg-muted rounded-lg">
                  <p className="font-bold text-red-500">
                    {formatCurrency(item.valor || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.descricao || 'Sem descrição'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum gasto registrado.</p>
            )}
          </div>
        </CardContent>
      </Card>

            {/* INVESTIMENTOS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Investimentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {investimentos.length > 0 ? (
                    investimentos.map((item) => (
                      <div key={item.id} className="p-3 bg-muted rounded-lg">
                        <p className="font-bold text-green-500">
                          {formatCurrency(item.valor || 0)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.descricao || 'Sem descrição'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum investimento registrado.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }