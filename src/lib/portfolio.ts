export type Property = {
  id: string; name: string; location: string; type: "Apartment" | "Holiday home" | "Studio";
  value: number; mortgageBalance: number; monthlyIncome: number; monthlyCosts: number; monthlyMortgage: number; occupancy: number;
};

export const portfolio: Property[] = [
  { id: "lake", name: "Lakeview Apartment", location: "Zürich, Switzerland", type: "Apartment", value: 820000, mortgageBalance: 465000, monthlyIncome: 2450, monthlyCosts: 410, monthlyMortgage: 1040, occupancy: 100 },
  { id: "alpine", name: "Alpine Retreat", location: "Laax, Switzerland", type: "Holiday home", value: 640000, mortgageBalance: 328000, monthlyIncome: 3100, monthlyCosts: 720, monthlyMortgage: 980, occupancy: 76 },
  { id: "city", name: "City Studio", location: "Basel, Switzerland", type: "Studio", value: 390000, mortgageBalance: 214000, monthlyIncome: 1780, monthlyCosts: 290, monthlyMortgage: 1160, occupancy: 98 },
];

export function summarizePortfolio(properties: Property[]) {
  const totalValue = properties.reduce((sum, property) => sum + property.value, 0);
  const mortgageBalance = properties.reduce((sum, property) => sum + property.mortgageBalance, 0);
  const monthlyIncome = properties.reduce((sum, property) => sum + property.monthlyIncome, 0);
  const monthlyExpenses = properties.reduce((sum, property) => sum + property.monthlyCosts + property.monthlyMortgage, 0);
  const monthlyNet = monthlyIncome - monthlyExpenses;
  const annualNet = monthlyNet * 12;
  return { totalValue, mortgageBalance, equity: totalValue - mortgageBalance, equityRatio: totalValue === 0 ? 0 : ((totalValue - mortgageBalance) / totalValue) * 100, monthlyIncome, monthlyExpenses, monthlyNet, annualNet, netYield: totalValue === 0 ? 0 : (annualNet / totalValue) * 100 };
}

export function projectPortfolioValue(currentValue: number, annualGrowthRate: number, years: number, startYear: number) {
  return Array.from({ length: years + 1 }, (_, year) => ({ year: startYear + year, value: Math.round(currentValue * (1 + annualGrowthRate) ** year) }));
}

export const portfolioSummary = summarizePortfolio(portfolio);
export const projection = projectPortfolioValue(portfolioSummary.totalValue, 0.03, 5, 2025);
