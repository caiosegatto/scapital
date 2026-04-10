'use client'

import { createClient } from '@supabase/supabase-js'

// Pegamos as variáveis sem o "!" para podermos validar antes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Se as chaves não existirem, avisamos no console em vez de quebrar o site com um erro fatal
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Atenção: Variáveis do Supabase não encontradas. Verifique o painel do Render.")
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)