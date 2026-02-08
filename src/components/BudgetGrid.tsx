"use client"

import { motion } from "framer-motion"
import { BudgetSection } from "@/types/budget"
import BudgetCard from "./BudgetCard"

interface BudgetGridProps {
  sections: BudgetSection[]
  onSectionClick: (section: BudgetSection) => void
  totalBudget: number
}

export default function BudgetGrid({ sections, onSectionClick, totalBudget }: BudgetGridProps) {
  return (
    <motion.div
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {sections.map((section, i) => (
        <BudgetCard
          key={section.id}
          section={section}
          index={i}
          onClick={() => onSectionClick(section)}
          totalBudget={totalBudget}
        />
      ))}
    </motion.div>
  )
}
