"use client"

import { motion } from "framer-motion"
import { Landmark, Calendar, BarChart3, Info } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { AVAILABLE_YEARS, type BudgetYear } from "@/data/budget"

interface SidebarProps {
  selectedYear: BudgetYear
  onYearChange: (year: BudgetYear) => void
}

export default function Sidebar({ selectedYear, onYearChange }: SidebarProps) {
  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 px-1">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 32,
            height: 32,
            background: "var(--color-blue-dim)",
            flexShrink: 0,
          }}
        >
          <Landmark size={16} style={{ color: "var(--color-blue)" }} />
        </div>
        <div className="min-w-0">
          <h1
            className="font-mono"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            BudgetTDB
          </h1>
          <p style={{ fontSize: 10, color: "var(--text-tertiary)" }}>
            Budget Public FR
          </p>
        </div>
      </div>

      {/* Fiscal Years */}
      <div className="mb-4">
        <p
          className="px-2 mb-1"
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Année fiscale
        </p>
        <div className="flex flex-col gap-1">
          {[...AVAILABLE_YEARS].reverse().map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`sidebar-btn ${selectedYear === year ? "sidebar-btn-active" : ""}`}
            >
              <Calendar size={16} />
              <span>PLF {year}</span>
              {year === 2025 && (
                <span
                  className="ml-auto badge badge-info"
                  style={{ fontSize: 9, padding: "2px 6px" }}
                >
                  Actuel
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-4">
        <p
          className="px-2 mb-1"
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Navigation
        </p>
        <div className="flex flex-col gap-1">
          <a href="#overview" className="sidebar-btn">
            <BarChart3 size={16} />
            <span>Vue d&apos;ensemble</span>
          </a>
          <a href="#comparison" className="sidebar-btn">
            <BarChart3 size={16} />
            <span>Comparaisons</span>
          </a>
          <a href="#simulation" className="sidebar-btn">
            <BarChart3 size={16} />
            <span>Simulateur</span>
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Info */}
      <div
        className="glass-card-static p-3 mb-4"
        style={{ borderRadius: "var(--radius-md)" }}
      >
        <div className="flex items-start gap-2">
          <Info size={14} style={{ color: "var(--text-tertiary)", marginTop: 2 }} />
          <p style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
            Source : PLF 2025, INSEE, OCDE. Données indicatives.
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </motion.aside>
  )
}
