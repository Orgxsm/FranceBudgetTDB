import { CountryData } from "@/types/budget"

/**
 * Données fiscales internationales — Sources :
 * OECD Revenue Statistics 2025, IMF WEO 2024, Eurostat 2024,
 * Legatum Prosperity Index 2023, FREOPP Healthcare Index 2024
 */
export const COUNTRIES: CountryData[] = [
  // ── France ──
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    taxBurden: 43.5,
    debtRatio: 113,
    deficit: -5.8,
    publicSpendingPct: 57,
    serviceQualityIndex: 72,
    sectionBenchmarks: {
      recettes: 68,
      souverainete: 72,
      education: 58,
      social: 62,
      economie: 55,
      dette: 25,
      fonctionnement: 48,
    },
  },

  // ── Allemagne ──
  {
    id: "allemagne",
    name: "Allemagne",
    flag: "🇩🇪",
    taxBurden: 38,
    debtRatio: 62,
    deficit: -2.7,
    publicSpendingPct: 49,
    serviceQualityIndex: 82,
    sectionBenchmarks: {
      recettes: 75,
      souverainete: 80,
      education: 73,
      social: 76,
      economie: 72,
      dette: 65,
      fonctionnement: 68,
    },
  },

  // ── États-Unis ──
  {
    id: "usa",
    name: "États-Unis",
    flag: "🇺🇸",
    taxBurden: 25.5,
    debtRatio: 124,
    deficit: -8,
    publicSpendingPct: 38,
    serviceQualityIndex: 62,
    sectionBenchmarks: {
      recettes: 60,
      souverainete: 85,
      education: 65,
      social: 45,
      economie: 70,
      dette: 20,
      fonctionnement: 55,
    },
  },

  // ── Suède ──
  {
    id: "suede",
    name: "Suède",
    flag: "🇸🇪",
    taxBurden: 42.5,
    debtRatio: 34,
    deficit: -1.6,
    publicSpendingPct: 50,
    serviceQualityIndex: 88,
    sectionBenchmarks: {
      recettes: 82,
      souverainete: 75,
      education: 85,
      social: 90,
      economie: 78,
      dette: 85,
      fonctionnement: 80,
    },
  },

  // ── Royaume-Uni ──
  {
    id: "uk",
    name: "Royaume-Uni",
    flag: "🇬🇧",
    taxBurden: 35.3,
    debtRatio: 94,
    deficit: -5.7,
    publicSpendingPct: 44.5,
    serviceQualityIndex: 75,
    sectionBenchmarks: {
      recettes: 70,
      souverainete: 82,
      education: 74,
      social: 68,
      economie: 66,
      dette: 35,
      fonctionnement: 60,
    },
  },

  // ── Japon ──
  {
    id: "japon",
    name: "Japon",
    flag: "🇯🇵",
    taxBurden: 33.7,
    debtRatio: 237,
    deficit: -2.5,
    publicSpendingPct: 44,
    serviceQualityIndex: 80,
    sectionBenchmarks: {
      recettes: 72,
      souverainete: 70,
      education: 78,
      social: 75,
      economie: 74,
      dette: 10,
      fonctionnement: 65,
    },
  },

  // ── Canada ──
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    taxBurden: 34.9,
    debtRatio: 111,
    deficit: -2,
    publicSpendingPct: 44,
    serviceQualityIndex: 76,
    sectionBenchmarks: {
      recettes: 73,
      souverainete: 72,
      education: 80,
      social: 72,
      economie: 68,
      dette: 30,
      fonctionnement: 62,
    },
  },

  // ── Italie ──
  {
    id: "italie",
    name: "Italie",
    flag: "🇮🇹",
    taxBurden: 42.4,
    debtRatio: 135,
    deficit: -3.4,
    publicSpendingPct: 50,
    serviceQualityIndex: 65,
    sectionBenchmarks: {
      recettes: 62,
      souverainete: 65,
      education: 55,
      social: 60,
      economie: 50,
      dette: 15,
      fonctionnement: 42,
    },
  },

  // ── Espagne ──
  {
    id: "espagne",
    name: "Espagne",
    flag: "🇪🇸",
    taxBurden: 37.3,
    debtRatio: 102,
    deficit: -3.2,
    publicSpendingPct: 45.5,
    serviceQualityIndex: 70,
    sectionBenchmarks: {
      recettes: 66,
      souverainete: 68,
      education: 62,
      social: 65,
      economie: 60,
      dette: 28,
      fonctionnement: 55,
    },
  },

  // ── Pays-Bas ──
  {
    id: "paysbas",
    name: "Pays-Bas",
    flag: "🇳🇱",
    taxBurden: 39.7,
    debtRatio: 44,
    deficit: -0.9,
    publicSpendingPct: 44,
    serviceQualityIndex: 87,
    sectionBenchmarks: {
      recettes: 80,
      souverainete: 78,
      education: 82,
      social: 85,
      economie: 80,
      dette: 78,
      fonctionnement: 75,
    },
  },

  // ── Danemark ──
  {
    id: "danemark",
    name: "Danemark",
    flag: "🇩🇰",
    taxBurden: 45.2,
    debtRatio: 31,
    deficit: 4.5, // surplus
    publicSpendingPct: 48,
    serviceQualityIndex: 90,
    sectionBenchmarks: {
      recettes: 88,
      souverainete: 82,
      education: 88,
      social: 92,
      economie: 82,
      dette: 90,
      fonctionnement: 85,
    },
  },

  // ── Corée du Sud ──
  {
    id: "coree",
    name: "Corée du Sud",
    flag: "🇰🇷",
    taxBurden: 28.9,
    debtRatio: 47,
    deficit: -0.8,
    publicSpendingPct: 35,
    serviceQualityIndex: 73,
    sectionBenchmarks: {
      recettes: 74,
      souverainete: 70,
      education: 82,
      social: 58,
      economie: 78,
      dette: 72,
      fonctionnement: 68,
    },
  },
]

export const OECD_AVERAGES: Record<string, number> = {
  recettes: 72,
  souverainete: 75,
  education: 73,
  social: 70,
  economie: 68,
  dette: 48,
  fonctionnement: 63,
}
