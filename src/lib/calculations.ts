import { BudgetSection, CountryData } from "@/types/budget"

/**
 * Tax-to-Service Ratio: (Service Quality Index / Fiscal Pressure)
 * Higher = better (more service per tax euro)
 * France scores lower than Scandinavia due to high taxes + declining service quality
 */
export function taxToServiceRatio(
  serviceQualityIndex: number,
  taxBurden: number
): number {
  if (taxBurden === 0) return 0
  return Number(((serviceQualityIndex / taxBurden) * 100).toFixed(1))
}

/**
 * Savings Opportunity: How much France would save with another country's spending ratio
 */
export function savingsOpportunity(
  francePct: number,
  comparePct: number,
  gdp: number = 2800 // France GDP ~2800 Md€
): number {
  const delta = francePct - comparePct
  return Number(((delta / 100) * gdp).toFixed(1))
}

/**
 * Efficiency delta between France and a comparison country for a specific section
 */
export function efficiencyDelta(
  franceScore: number,
  compareScore: number
): { delta: number; status: "better" | "worse" | "equal" } {
  const delta = franceScore - compareScore
  return {
    delta,
    status: delta > 2 ? "better" : delta < -2 ? "worse" : "equal",
  }
}

/**
 * Calculate section % of total budget
 */
export function sectionPercentage(
  sectionAmount: number,
  totalAmount: number
): number {
  if (totalAmount === 0) return 0
  return Number(((sectionAmount / totalAmount) * 100).toFixed(1))
}

/**
 * Simulate budget reallocation: move X Md€ from source to target
 * Returns new sections with adjusted amounts and estimated efficiency changes
 */
export function simulateReallocation(
  sections: BudgetSection[],
  sourceId: string,
  targetId: string,
  amount: number
): {
  newSections: BudgetSection[]
  sourceImpact: string
  targetImpact: string
} {
  const newSections = sections.map((s) => {
    if (s.id === sourceId) {
      const newTotal = Math.max(0, s.totalAmount - amount)
      const reduction = s.totalAmount > 0 ? (amount / s.totalAmount) * 100 : 0
      return {
        ...s,
        totalAmount: Number(newTotal.toFixed(1)),
        efficiency: Math.max(0, Math.min(100, s.efficiency - reduction * 0.3)),
      }
    }
    if (s.id === targetId) {
      const newTotal = s.totalAmount + amount
      const increase = s.totalAmount > 0 ? (amount / s.totalAmount) * 100 : 0
      return {
        ...s,
        totalAmount: Number(newTotal.toFixed(1)),
        efficiency: Math.min(100, s.efficiency + increase * 0.2),
      }
    }
    return s
  })

  const source = sections.find((s) => s.id === sourceId)
  const target = sections.find((s) => s.id === targetId)

  return {
    newSections,
    sourceImpact: source
      ? `${source.title} : -${amount} Md€ (${((amount / source.totalAmount) * 100).toFixed(1)}%)`
      : "",
    targetImpact: target
      ? `${target.title} : +${amount} Md€ (${((amount / target.totalAmount) * 100).toFixed(1)}%)`
      : "",
  }
}

/**
 * Get status color based on efficiency score
 */
export function getEfficiencyStatus(score: number): {
  label: string
  color: string
  colorDim: string
  badgeClass: string
} {
  if (score >= 75)
    return {
      label: "Performant",
      color: "var(--color-green)",
      colorDim: "var(--color-green-dim)",
      badgeClass: "badge-good",
    }
  if (score >= 50)
    return {
      label: "Modéré",
      color: "var(--color-amber)",
      colorDim: "var(--color-amber-dim)",
      badgeClass: "badge-warning",
    }
  return {
    label: "Critique",
    color: "var(--color-red)",
    colorDim: "var(--color-red-dim)",
    badgeClass: "badge-critical",
  }
}

/**
 * Format amount in Md€ with French locale
 */
export function formatMd(amount: number): string {
  if (amount >= 1000) return `${(amount / 1000).toFixed(1).replace(".", ",")} T€`
  if (Number.isInteger(amount)) return `${amount} Md€`
  return `${amount.toFixed(1).replace(".", ",")} Md€`
}

/**
 * Format percentage
 */
export function formatPct(pct: number, showSign = false): string {
  const sign = showSign && pct > 0 ? "+" : ""
  return `${sign}${pct.toFixed(1).replace(".", ",")}%`
}

/**
 * Calculate overall budget health score (0-100)
 */
export function budgetHealthScore(
  deficit: number,
  debtRatio: number,
  avgEfficiency: number
): number {
  // Deficit score: 0% = 100, -3% = 70, -5% = 40, -7%+ = 10
  const deficitScore = Math.max(10, 100 + deficit * 12)
  // Debt score: <60% = 100, 60-90% = 70, 90-120% = 40, >120% = 10
  const debtScore =
    debtRatio < 60
      ? 100
      : debtRatio < 90
        ? 70
        : debtRatio < 120
          ? 40
          : 10
  // Weighted average
  return Math.round(deficitScore * 0.35 + debtScore * 0.3 + avgEfficiency * 0.35)
}
