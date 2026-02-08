"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, TrendingDown } from "lucide-react"
import { COUNTRIES } from "@/data/countries"
import { taxToServiceRatio, savingsOpportunity } from "@/lib/calculations"

interface Props {
  franceBudget: number
}

export default function ComparisonMode({ franceBudget }: Props) {
  const [selectedId, setSelectedId] = useState("allemagne")
  const france = COUNTRIES.find((c) => c.id === "france")!
  const selected = COUNTRIES.find((c) => c.id === selectedId)
  if (!selected) return null

  const franceTSR = taxToServiceRatio(france.serviceQualityIndex, france.taxBurden)
  const selectedTSR = taxToServiceRatio(selected.serviceQualityIndex, selected.taxBurden)
  const savings = savingsOpportunity(france.publicSpendingPct, selected.publicSpendingPct)
  const sectionIds = Object.keys(france.sectionBenchmarks)

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Country tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {COUNTRIES.filter((c) => c.id !== "france").map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              border: selectedId === c.id ? "1px solid rgba(96,165,250,0.25)" : "1px solid var(--border-subtle)",
              background: selectedId === c.id ? "var(--color-blue-dim)" : "transparent",
              color: selectedId === c.id ? "var(--color-blue)" : "var(--text-secondary)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {c.flag} {c.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {/* Metrics 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <MetricCard
              label="Prélèvements obligatoires"
              left={{ value: `${france.taxBurden}%`, color: "var(--color-amber)" }}
              right={{ value: `${selected.taxBurden}%`, color: "var(--color-green)" }}
              sub={`Delta : ${france.taxBurden - selected.taxBurden} points de PIB`}
            />
            <MetricCard
              label="Dette / PIB"
              left={{ value: `${france.debtRatio}%`, color: france.debtRatio > 90 ? "var(--color-red)" : "var(--color-amber)" }}
              right={{ value: `${selected.debtRatio}%`, color: selected.debtRatio > 90 ? "var(--color-red)" : "var(--color-green)" }}
              sub={`Écart : ${Math.abs(france.debtRatio - selected.debtRatio)} points`}
            />
            <MetricCard
              label="Ratio Impôt / Service"
              left={{ value: String(franceTSR), color: franceTSR >= selectedTSR ? "var(--color-green)" : "var(--color-red)" }}
              right={{ value: String(selectedTSR), color: selectedTSR >= franceTSR ? "var(--color-green)" : "var(--color-red)" }}
              sub="Qualité de service / Pression fiscale"
            />
            <div style={{ background: savings > 0 ? "var(--color-green-dim)" : "var(--bg-surface)", border: savings > 0 ? "1px solid rgba(52,211,153,0.15)" : "1px solid var(--border-subtle)", borderRadius: 12, padding: 20 }}>
              <p className="metric-label" style={{ marginBottom: 10 }}>
                <TrendingDown size={12} style={{ display: "inline", marginRight: 4 }} />
                Économie potentielle
              </p>
              <p className="metric-value" style={{ fontSize: 24, color: savings > 0 ? "var(--color-green)" : "var(--color-red)" }}>
                {savings > 0 ? "-" : "+"}{Math.abs(savings)} Md€
              </p>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>
                Si ratio dépenses/PIB de {selected.flag} {selected.name}
              </p>
            </div>
          </div>

          {/* Efficiency bars */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12 }}>
              Efficience par secteur
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sectionIds.map((sId) => {
                const fr = france.sectionBenchmarks[sId]
                const cp = selected.sectionBenchmarks[sId]
                if (fr === undefined || cp === undefined) return null
                const delta = fr - cp
                return (
                  <div key={sId} style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderRadius: 10, background: "var(--bg-surface)" }}>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", width: 120, flexShrink: 0 }}>
                      {sId.charAt(0).toUpperCase() + sId.slice(1)}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--border-subtle)", overflow: "hidden" }}>
                          <motion.div style={{ height: "100%", borderRadius: 3, background: "var(--color-amber)" }} initial={{ width: 0 }} animate={{ width: `${fr}%` }} transition={{ duration: 0.8 }} />
                        </div>
                        <span className="font-mono" style={{ fontSize: 12, color: "var(--color-amber)", width: 24, textAlign: "right", flexShrink: 0 }}>{fr}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--border-subtle)", overflow: "hidden" }}>
                          <motion.div style={{ height: "100%", borderRadius: 3, background: "var(--color-green)" }} initial={{ width: 0 }} animate={{ width: `${cp}%` }} transition={{ duration: 0.8, delay: 0.1 }} />
                        </div>
                        <span className="font-mono" style={{ fontSize: 12, color: "var(--color-green)", width: 24, textAlign: "right", flexShrink: 0 }}>{cp}</span>
                      </div>
                    </div>
                    <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: delta >= 0 ? "var(--color-green)" : "var(--color-red)", width: 36, textAlign: "right", flexShrink: 0 }}>
                      {delta >= 0 ? "+" : ""}{delta}
                    </span>
                  </div>
                )
              })}
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
              <LegendDot color="var(--color-amber)" label="France" />
              <LegendDot color="var(--color-green)" label={`${selected.flag} ${selected.name}`} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function MetricCard({ label, left, right, sub }: {
  label: string
  left: { value: string; color: string }
  right: { value: string; color: string }
  sub: string
}) {
  return (
    <div style={{ background: "var(--bg-surface)", borderRadius: 12, padding: 20, border: "1px solid var(--border-subtle)" }}>
      <p className="metric-label" style={{ marginBottom: 10 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span className="metric-value" style={{ fontSize: 22, color: left.color }}>{left.value}</span>
        <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />
        <span className="metric-value" style={{ fontSize: 22, color: right.color }}>{right.value}</span>
      </div>
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>{sub}</p>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{label}</span>
    </div>
  )
}
