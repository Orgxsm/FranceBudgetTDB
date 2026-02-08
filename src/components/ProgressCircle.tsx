"use client"

import { motion } from "framer-motion"

interface ProgressCircleProps {
  score: number
  size?: number
  strokeWidth?: number
  color: string
  label?: string
  suffix?: string
  delay?: number
}

export default function ProgressCircle({
  score,
  size = 120,
  strokeWidth = 6,
  color,
  label,
  suffix = "",
  delay = 0,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.min(score, 100) / 100)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: `drop-shadow(0 0 6px ${color}33)` }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 1.2,
              delay,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="metric-value"
            style={{ fontSize: size * 0.22, color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.4 }}
          >
            {typeof score === "number" && score % 1 !== 0
              ? score.toFixed(1)
              : score}
            {suffix}
          </motion.span>
        </div>
      </div>
      {label && (
        <span className="metric-label text-center" style={{ maxWidth: size }}>
          {label}
        </span>
      )}
    </div>
  )
}
