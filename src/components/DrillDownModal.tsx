"use client"

import { motion } from "framer-motion"
import { X, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { BudgetSection } from "@/types/budget"
import { formatMd, formatPct, getEfficiencyStatus } from "@/lib/calculations"

interface Props {
  section: BudgetSection
  onClose: () => void
}

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#c084fc", "#67e8f9", "#fb923c"]

function ChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { fill: string } }> }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "rgba(20,20,23,0.95)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: "#f0f0f3", fontSize: 13, fontWeight: 600, margin: 0 }}>{payload[0].name}</p>
      <p className="font-mono" style={{ color: payload[0].payload.fill, fontSize: 15, fontWeight: 700, margin: "4px 0 0" }}>
        {formatMd(payload[0].value)}
      </p>
    </div>
  )
}

export default function DrillDownModal({ section, onClose }: Props) {
  const status = getEfficiencyStatus(section.efficiency)
  const chartData = section.items.map((item, i) => ({
    name: item.label,
    value: item.amount,
    fill: COLORS[i % COLORS.length],
  }))

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: "rgba(0,0,0,0.6)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bt-card"
        style={{ maxWidth: 620, width: "100%", maxHeight: "90vh", overflowY: "auto", borderTop: `2px solid ${section.color}` }}
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{section.title}</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{section.description}</p>
          </div>
          <button
            onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Total + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <p className="metric-value" style={{ fontSize: 28, color: section.color }}>{formatMd(section.totalAmount)}</p>
          <span className={`badge ${status.badgeClass}`}>Efficience : {section.efficiency}/100</span>
        </div>

        {/* Chart + Items */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 20, marginBottom: 24 }}>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={42} outerRadius={72} dataKey="value" stroke="none">
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {section.items.map((item, i) => {
              const pct = section.totalAmount > 0 ? ((item.amount / section.totalAmount) * 100).toFixed(1) : "0"
              return (
                <motion.div
                  key={item.id}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "var(--bg-surface)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{item.label}</span>
                      <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{formatMd(item.amount)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
                        {pct}% du poste{item.description && ` · ${item.description}`}
                      </span>
                      {item.trend !== undefined && (
                        <span className="font-mono" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 3, color: item.trend > 0 ? "var(--color-green)" : "var(--color-red)" }}>
                          {item.trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {formatPct(item.trend, true)}
                        </span>
                      )}
                    </div>
                    <div className="progress-track" style={{ marginTop: 6 }}>
                      <motion.div
                        className="progress-fill"
                        style={{ background: COLORS[i % COLORS.length], boxShadow: `0 0 6px ${COLORS[i % COLORS.length]}44` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* OECD note */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 12, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
          <ArrowRight size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Efficience France ({section.efficiency}/100) vs Moyenne OCDE ({section.oecdAverage}/100) :{" "}
            <span className="font-mono" style={{ fontWeight: 600, color: section.efficiency >= section.oecdAverage ? "var(--color-green)" : "var(--color-red)" }}>
              {section.efficiency >= section.oecdAverage ? "+" : ""}{section.efficiency - section.oecdAverage} points
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
