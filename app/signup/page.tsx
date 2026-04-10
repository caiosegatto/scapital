"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Conta criada!")
    window.location.href = "/login"
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f172a",
      color: "white"
    }}>
      <div style={{
        background: "#1e293b",
        padding: 30,
        borderRadius: 10,
        width: 300
      }}>
        <h2>Criar conta</h2>

        <input
          placeholder="Email"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{ width: "100%", padding: 10, background: "#3b82f6", border: "none" }}
          onClick={handleSignup}
        >
          Criar conta
        </button>

        <p style={{ marginTop: 10 }}>
          Já tem conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  )
}