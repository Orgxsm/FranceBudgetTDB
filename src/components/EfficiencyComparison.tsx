"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { BudgetSection } from "@/types/budget"

interface Props {
  sections: BudgetSection[]
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "rgba(20,20,23,0.95)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: "#f0f0f3", fontSize: 12, fontWeight: 600, margin: "0 0 6px" }}>{label}</p>
      {payload.map((e, i) => (
        <p key={i} className="font-mono" style={{ color: e.color, fontSize: 12, margin: "2px 0" }}>{e.name} : {e.value}/100</p>
      ))}
    </div>
  )
}

export default function EfficiencyComparison({ sections }: Props) {
  const data = sections.map((s) => ({
    name: s.title.length > 10 ? s.title.slice(0, 10) + "…" : s.title,
    France: s.efficiency,
    OCDE: s.oecdAverage,
  }))

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
        Efficience France vs OCDE
      </h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 20 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} axisLine={{ stroke: "var(--border-subtle)" }} tickLine={false} angle={-25} textAnchor="end" height={50} />
            <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} axisLine={{ stroke: "var(--border-subtle)" }} tickLine={false} domain={[0, 100]} width={32} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
            <Legend wrapperStyle={{ fontSize: 11, color: "var(--text-secondary)" }} />
            <Bar dataKey="France" fill="var(--color-amber)" radius={[5, 5, 0, 0]} maxBarSize={24} />
            <Bar dataKey="OCDE" fill="var(--color-green)" radius={[5, 5, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
