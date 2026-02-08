export interface BudgetItem {
  id: string
  label: string
  amount: number // in Md€ (milliards)
  description?: string
  trend?: number // % change from previous year
}

export interface BudgetSection {
  id: string
  title: string
  icon: string // lucide icon name
  color: string
  colorDim: string
  totalAmount: number // Md€
  items: BudgetItem[]
  efficiency: number // 0-100
  oecdAverage: number // 0-100
  description: string
}

export interface YearData {
  year: number
  deficit: number // % du PIB (negative)
  debtRatio: number // % du PIB
  totalRecettes: number // Md€
  totalDepenses: number // Md€
  taxBurden: number // % prélèvements obligatoires
  sections: BudgetSection[]
}

export interface CountryData {
  id: string
  name: string
  flag: string
  taxBurden: number // %
  debtRatio: number // % PIB
  deficit: number // % PIB
  publicSpendingPct: number // % PIB
  serviceQualityIndex: number // 0-100
  sectionBenchmarks: Record<string, number> // efficiency per section
}

export interface SimulationState {
  sourceId: string
  targetId: string
  amount: number // Md€
}
