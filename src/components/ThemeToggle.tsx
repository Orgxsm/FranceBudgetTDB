"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("budgettdb-theme")
    if (saved === "light") {
      setIsDark(false)
      document.documentElement.setAttribute("data-theme", "light")
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.removeAttribute("data-theme")
      localStorage.setItem("budgettdb-theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("budgettdb-theme", "light")
    }
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200"
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-secondary)",
      }}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span style={{ fontSize: 13 }}>{isDark ? "Clair" : "Sombre"}</span>
    </button>
  )
}
