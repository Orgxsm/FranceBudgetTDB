"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { BUDGET_DATA, AVAILABLE_YEARS } from "@/data/budget"

const COLORS: Record<string, string> = {
  recettes: "#34d399", souverainete: "#60a5fa", education: "#c084fc",
  social: "#f87171", economie: "#67e8f9", dette: "#fb923c", fonctionnement: "#fbbf24",
}
const LABELS: Record<string, string> = {
  recettes: "Recettes", souverainete: "Souveraineté", education: "Éducation",
  social: "Prot. Sociale", economie: "Économie", dette: "Dette", fonctionnement: "Fonct.",
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "rgba(20,20,23,0.95)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 14px", maxWidth: 240 }}>
      <p style={{ color: "#f0f0f3", fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>PLF {label}</p>
      {payload.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
          <span style={{ color: e.color, fontSize: 11 }}>{LABELS[e.name] || e.name}</span>
          <span className="font-mono" style={{ color: e.color, fontSize: 11, fontWeight: 600 }}>{e.value} Md€</span>
        </div>
      ))}
    </div>
  )
}

export default function TrendChart() {
  const sectionIds = BUDGET_DATA[2025].sections.map((s) => s.id)
  const data = AVAILABLE_YEARS.map((year) => {
    const row: Record<string, number | string> = { year: year.toString() }
    BUDGET_DATA[year].sections.forEach((s) => { row[s.id] = s.totalAmount })
    return row
  })

  return (
    <motion.div
      className="bt-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
        Évolution 2023 → 2025
      </h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={{ stroke: "var(--border-subtle)" }} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} axisLine={{ stroke: "var(--border-subtle)" }} tickLine={false} width={38} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: 10, color: "var(--text-secondary)" }} formatter={(v: string) => LABELS[v] || v} />
            {sectionIds.map((id) => (
              <Line key={id} type="monotone" dataKey={id} name={id} stroke={COLORS[id]} strokeWidth={2} dot={{ r: 3, fill: COLORS[id] }} activeDot={{ r: 5 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
