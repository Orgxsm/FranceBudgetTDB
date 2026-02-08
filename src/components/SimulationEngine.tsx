"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightLeft, RotateCcw, Zap } from "lucide-react"
import { BudgetSection } from "@/types/budget"
import { simulateReallocation, formatMd } from "@/lib/calculations"

interface Props {
  sections: BudgetSection[]
}

export default function SimulationEngine({ sections }: Props) {
  const [sourceId, setSourceId] = useState("")
  const [targetId, setTargetId] = useState("")
  const [amount, setAmount] = useState(10)
  const [applied, setApplied] = useState(false)

  const source = sections.find((s) => s.id === sourceId)
  const target = sections.find((s) => s.id === targetId)
  const maxAmount = source ? Math.floor(source.totalAmount * 0.5) : 50

  const simulation = useMemo(() => {
    if (!sourceId || !targetId || sourceId === targetId || amount <= 0) return null
    return simulateReallocation(sections, sourceId, targetId, amount)
  }, [sections, sourceId, targetId, amount])

  const reset = () => {
    setSourceId("")
    setTargetId("")
    setAmount(10)
    setApplied(false)
  }

  const selectStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    background: "var(--bg-surface)",
    border: "1px solid var(--border-medium)",
    color: "var(--text-primary)",
    fontSize: 13,
    cursor: "pointer" as const,
    outline: "none",
  }

  return (
    <motion.div
      className="bt-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
            Simulateur de Réallocation
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>
            Transférez des milliards d&apos;un poste à un autre et observez l&apos;impact.
          </p>
        </div>
        <button
          onClick={reset}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 10,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
            Retirer de…
          </label>
          <select value={sourceId} onChange={(e) => { setSourceId(e.target.value); setApplied(false) }} style={selectStyle}>
            <option value="">Sélectionner…</option>
            {sections.filter((s) => s.id !== "recettes").map((s) => (
              <option key={s.id} value={s.id}>{s.title} ({formatMd(s.totalAmount)})</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
          <ArrowRightLeft size={22} style={{ color: "var(--color-blue)" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
            Ajouter à…
          </label>
          <select value={targetId} onChange={(e) => { setTargetId(e.target.value); setApplied(false) }} style={selectStyle}>
            <option value="">Sélectionner…</option>
            {sections.filter((s) => s.id !== "recettes" && s.id !== sourceId).map((s) => (
              <option key={s.id} value={s.id}>{s.title} ({formatMd(s.totalAmount)})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Slider */}
      {sourceId && targetId && sourceId !== targetId && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Montant à transférer</span>
            <span className="metric-value" style={{ fontSize: 22, color: "var(--color-blue)" }}>{amount} Md€</span>
          </div>
          <input
            type="range"
            min={1}
            max={maxAmount}
            value={amount}
            onChange={(e) => { setAmount(Number(e.target.value)); setApplied(false) }}
            className="custom-slider"
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>1 Md€</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{maxAmount} Md€</span>
          </div>
        </motion.div>
      )}

      {/* Impact */}
      <AnimatePresence>
        {simulation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div style={{ padding: 20, borderRadius: 12, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>
                <Zap size={14} style={{ display: "inline", marginRight: 6, color: "var(--color-amber)" }} />
                Impact de la simulation
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <p style={{ fontSize: 13, color: "var(--color-red)", fontWeight: 600, marginBottom: 8 }}>{simulation.sourceImpact}</p>
                  {source && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Nouvelle efficience</span>
                        <span className="font-mono" style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          {source.efficiency.toFixed(0)} → {simulation.newSections.find((s) => s.id === sourceId)?.efficiency.toFixed(0)}
                        </span>
                      </div>
                      <div className="progress-track">
                        <motion.div className="progress-fill progress-fill-red" animate={{ width: `${simulation.newSections.find((s) => s.id === sourceId)?.efficiency ?? 0}%` }} transition={{ duration: 0.5 }} />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ fontSize: 13, color: "var(--color-green)", fontWeight: 600, marginBottom: 8 }}>{simulation.targetImpact}</p>
                  {target && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Nouvelle efficience</span>
                        <span className="font-mono" style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          {target.efficiency.toFixed(0)} → {simulation.newSections.find((s) => s.id === targetId)?.efficiency.toFixed(0)}
                        </span>
                      </div>
                      <div className="progress-track">
                        <motion.div className="progress-fill progress-fill-green" animate={{ width: `${simulation.newSections.find((s) => s.id === targetId)?.efficiency ?? 0}%` }} transition={{ duration: 0.5 }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {(!sourceId || !targetId) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40, borderRadius: 12, background: "var(--bg-surface)", border: "1px dashed var(--border-medium)" }}>
          <p style={{ fontSize: 14, color: "var(--text-tertiary)", textAlign: "center" }}>
            Sélectionnez un poste source et un poste cible pour lancer la simulation
          </p>
        </div>
      )}
    </motion.div>
  )
}
