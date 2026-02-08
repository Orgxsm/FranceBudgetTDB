"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Calendar, Landmark } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { AVAILABLE_YEARS, type BudgetYear } from "@/data/budget"

interface MobileNavProps {
  selectedYear: BudgetYear
  onYearChange: (year: BudgetYear) => void
}

export default function MobileNav({
  selectedYear,
  onYearChange,
}: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2">
          <Landmark size={18} style={{ color: "var(--color-blue)" }} />
          <span
            className="font-mono"
            style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}
          >
            BudgetTDB
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-mono badge badge-info"
            style={{ fontSize: 11 }}
          >
            PLF {selectedYear}
          </span>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
              padding: 6,
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute top-14 left-0 right-0 p-4"
              style={{
                background: "var(--bg-surface)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                }}
              >
                Année fiscale
              </p>
              <div className="flex gap-2 mb-4">
                {[...AVAILABLE_YEARS].reverse().map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      onYearChange(year)
                      setOpen(false)
                    }}
                    className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-lg"
                    style={{
                      background:
                        selectedYear === year
                          ? "var(--color-blue-dim)"
                          : "var(--glass-bg)",
                      border: `1px solid ${selectedYear === year ? "rgba(10,132,255,0.2)" : "var(--border-subtle)"}`,
                      color:
                        selectedYear === year
                          ? "var(--color-blue)"
                          : "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    <Calendar size={14} />
                    {year}
                  </button>
                ))}
              </div>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: 52 }} />
    </div>
  )
}
