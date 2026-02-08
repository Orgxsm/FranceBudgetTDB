"use client"

import { motion } from "framer-motion"
import {
  TrendingUp, Shield, GraduationCap, HeartPulse, Leaf, TrendingDown, Building2,
} from "lucide-react"
import { BudgetSection } from "@/types/budget"
import { formatMd, getEfficiencyStatus } from "@/lib/calculations"

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  TrendingUp, Shield, GraduationCap, HeartPulse, Leaf, TrendingDown, Building2,
}

interface BudgetCardProps {
  section: BudgetSection
  index: number
  onClick: () => void
  totalBudget: number
}

export default function BudgetCard({ section, index, onClick, totalBudget }: BudgetCardProps) {
  const Icon = ICON_MAP[section.icon] || TrendingUp
  const status = getEfficiencyStatus(section.efficiency)
  const pct = totalBudget > 0 ? ((section.totalAmount / totalBudget) * 100).toFixed(1) : "0"

  return (
    <motion.button
      className="card card-hover"
      style={{ borderTop: `2px solid ${section.color}`, textAlign: "left", width: "100%", cursor: "pointer" }}
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.05 } },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: section.colorDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={17} />
        </div>
        <span className={`badge ${status.badgeClass}`}>{status.label}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
        {section.title}
      </h3>

      {/* Amount */}
      <p className="metric-value" style={{ fontSize: 26, color: section.color, marginBottom: 6 }}>
        {formatMd(section.totalAmount)}
      </p>

      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 16 }}>
        {pct}% du budget · {section.items.length} sous-postes
      </p>

      {/* Efficiency bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Efficience</span>
          <span className="font-mono" style={{ fontSize: 12, color: status.color }}>
            {section.efficiency}/100
          </span>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            style={{ background: status.color, boxShadow: `0 0 8px ${status.color}44` }}
            initial={{ width: 0 }}
            animate={{ width: `${section.efficiency}%` }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>OCDE {section.oecdAverage}</span>
          <span className="font-mono" style={{ fontSize: 11, color: section.efficiency >= section.oecdAverage ? "var(--color-green)" : "var(--color-red)" }}>
            {section.efficiency >= section.oecdAverage ? "+" : ""}{section.efficiency - section.oecdAverage}
          </span>
        </div>
      </div>
    </motion.button>
  )
}
