"use client"

import { motion } from "framer-motion"
import { TrendingDown, AlertTriangle, Percent, Activity } from "lucide-react"
import ProgressCircle from "./ProgressCircle"
import { formatPct, budgetHealthScore } from "@/lib/calculations"
import { YearData } from "@/types/budget"

interface HeaderScoreProps {
  data: YearData
}

export default function HeaderScore({ data }: HeaderScoreProps) {
  const avgEff = data.sections.reduce((s, x) => s + x.efficiency, 0) / data.sections.length
  const health = budgetHealthScore(data.deficit, data.debtRatio, avgEff)
  const gap = data.totalDepenses - data.totalRecettes

  const metrics = [
    {
      label: "Déficit",
      value: formatPct(data.deficit),
      sub: `du PIB (${gap.toFixed(0)} Md€)`,
      color: "var(--color-red)",
      dim: "var(--color-red-dim)",
      icon: <TrendingDown size={18} />,
      badge: { text: "Critique", cls: "badge-critical" },
    },
    {
      label: "Dette / PIB",
      value: `${data.debtRatio}%`,
      sub: data.debtRatio > 100 ? "Maastricht dépassé" : "Sous surveillance",
      color: "var(--color-orange)",
      dim: "var(--color-orange-dim)",
      icon: <Activity size={18} />,
      badge: { text: data.debtRatio > 100 ? "Risque" : "Attention", cls: data.debtRatio > 100 ? "badge-critical" : "badge-warning" },
    },
    {
      label: "Prélèvements",
      value: `${data.taxBurden}%`,
      sub: `+${data.taxBurden - 34} pts vs OCDE (34%)`,
      color: "var(--color-amber)",
      dim: "var(--color-amber-dim)",
      icon: <Percent size={18} />,
      badge: { text: "1er OCDE", cls: "badge-warning" },
    },
    {
      label: "Santé budgétaire",
      value: `${health}/100`,
      sub: health >= 60 ? "Budget maîtrisé" : health >= 40 ? "Sous tension" : "Dégradée",
      color: health >= 60 ? "var(--color-green)" : health >= 40 ? "var(--color-amber)" : "var(--color-red)",
      dim: health >= 60 ? "var(--color-green-dim)" : health >= 40 ? "var(--color-amber-dim)" : "var(--color-red-dim)",
      icon: <AlertTriangle size={18} />,
      badge: null,
      circle: { score: health, color: health >= 60 ? "var(--color-green)" : health >= 40 ? "var(--color-amber)" : "var(--color-red)" },
    },
  ]

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          className="bt-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: m.dim, display: "flex", alignItems: "center", justifyContent: "center", color: m.color }}>
              {m.icon}
            </div>
            {m.badge && <span className={`badge ${m.badge.cls}`}>{m.badge.text}</span>}
          </div>
          <p className="metric-label" style={{ marginBottom: 8 }}>{m.label}</p>
          <p className="metric-value" style={{ fontSize: 26, color: m.color }}>{m.value}</p>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>{m.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}
