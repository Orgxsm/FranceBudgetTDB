"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Landmark, Calendar } from "lucide-react"
import HeaderScore from "@/components/HeaderScore"
import BudgetGrid from "@/components/BudgetGrid"
import DrillDownModal from "@/components/DrillDownModal"
import EfficiencyComparison from "@/components/EfficiencyComparison"
import ComparisonMode from "@/components/ComparisonMode"
import SimulationEngine from "@/components/SimulationEngine"
import TrendChart from "@/components/TrendChart"
import ThemeToggle from "@/components/ThemeToggle"
import MobileNav from "@/components/MobileNav"
import { BUDGET_DATA, AVAILABLE_YEARS, type BudgetYear } from "@/data/budget"
import { BudgetSection } from "@/types/budget"

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState<BudgetYear>(2025)
  const [selectedSection, setSelectedSection] = useState<BudgetSection | null>(null)

  const data = BUDGET_DATA[selectedYear]
  const totalDepenses = data.sections
    .filter((s) => s.id !== "recettes")
    .reduce((sum, s) => sum + s.totalAmount, 0)

  return (
    <div className="page-wrapper">
      {/* ── Mobile Nav ── */}
      <MobileNav selectedYear={selectedYear} onYearChange={setSelectedYear} />

      {/* ── Desktop Top Bar ── */}
      <nav className="top-bar top-bar-desktop">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 38, height: 38, background: "var(--color-blue-dim)" }}
          >
            <Landmark size={20} style={{ color: "var(--color-blue)" }} />
          </div>
          <div>
            <p className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              BudgetTDB
            </p>
            <p style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
              Budget Public Français
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[...AVAILABLE_YEARS].reverse().map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 10,
                border: selectedYear === year ? "1px solid rgba(96,165,250,0.25)" : "1px solid var(--border-subtle)",
                background: selectedYear === year ? "var(--color-blue-dim)" : "transparent",
                color: selectedYear === year ? "var(--color-blue)" : "var(--text-secondary)",
                fontSize: 13,
                fontWeight: selectedYear === year ? 600 : 500,
                cursor: "pointer",
              }}
            >
              <Calendar size={14} />
              PLF {year}
            </button>
          ))}
          <div style={{ width: 1, height: 28, background: "var(--border-subtle)", margin: "0 8px" }} />
          <ThemeToggle />
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="page-content">
        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1 className="page-title" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Budget Public France{" "}
            <span style={{ color: "var(--color-blue)" }}>{selectedYear}</span>
          </h1>
          <p className="page-subtitle" style={{ fontSize: 15, color: "var(--text-secondary)", marginTop: 6 }}>
            Projet de Loi de Finances — Analyse détaillée
          </p>
        </div>

        {/* Key Metrics */}
        <HeaderScore data={data} />

        {/* Budget Cards */}
        <section className="section-mb" style={{ marginBottom: 48 }}>
          <SectionTitle title="Répartition du Budget" subtitle={`${data.sections.length} postes · ${totalDepenses.toFixed(0)} Md€ de dépenses`} />
          <BudgetGrid
            sections={data.sections}
            onSectionClick={setSelectedSection}
            totalBudget={totalDepenses + data.totalRecettes}
          />
        </section>

        {/* Charts */}
        <section className="section-mb" style={{ marginBottom: 48 }}>
          <SectionTitle title="Efficience & Tendances" subtitle="Performance France vs OCDE et évolution sur 3 ans" />
          <div className="grid-charts">
            <EfficiencyComparison sections={data.sections} />
            <TrendChart />
          </div>
        </section>

        {/* International */}
        <section className="section-mb" style={{ marginBottom: 48 }} id="comparison">
          <SectionTitle title="Comparaison Internationale" subtitle="France vs Allemagne, États-Unis, Suède" />
          <ComparisonMode franceBudget={totalDepenses} />
        </section>

        {/* Simulator */}
        <section className="section-mb" style={{ marginBottom: 48 }} id="simulation">
          <SectionTitle title="Simulateur Budgétaire" subtitle="Et si on réallouait les milliards différemment ?" />
          <SimulationEngine sections={data.sections} />
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
            BudgetTDB · Données : PLF {selectedYear}, INSEE, OCDE · Visualisation indicative
          </p>
        </footer>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedSection && (
          <DrillDownModal section={selectedSection} onClose={() => setSelectedSection(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
      <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 4 }}>{subtitle}</p>
      <div style={{ height: 1, marginTop: 12, background: "linear-gradient(90deg, var(--border-medium), transparent 60%)" }} />
    </div>
  )
}
