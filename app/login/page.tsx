'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    window.location.href = "/"
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-[90%] max-w-sm">

        {/* LOGO */}
        <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
          SCAPITAL 💸
        </h1>

        <input
          className="w-full mb-3 p-3 rounded-lg bg-slate-700 text-white outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white outline-none"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
        >
          Entrar
        </button>

        <p className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
          Não tem conta? <a href="/signup" className="text-green-400">Criar conta</a>
        </p>

      </div>
    </div>
  )
}