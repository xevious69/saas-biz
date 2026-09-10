import { describe, expect, it } from "vitest";
import { projectPortfolioValue, summarizePortfolio, type Property } from "./portfolio";

const property: Property = { id: "one", name: "Test", location: "Bern", type: "Apartment", purchasePrice: 450000, value: 500000, mortgageBalance: 300000, monthlyIncome: 2500, monthlyCosts: 500, monthlyMortgage: 1000, occupancy: 100, annualGrowthRate: 3, purchasedOn: "2020-01-01" };

describe("portfolio calculations", () => {
  it("summarizes value, equity, cash flow and yield", () => {
    expect(summarizePortfolio([property])).toMatchObject({ totalValue: 500000, equity: 200000, monthlyIncome: 2500, monthlyExpenses: 1500, monthlyNet: 1000, annualNet: 12000, netYield: 2.4 });
  });
  it("handles an empty portfolio without dividing by zero", () => {
    expect(summarizePortfolio([])).toMatchObject({ totalValue: 0, equityRatio: 0, netYield: 0 });
  });
  it("compounds portfolio projections annually", () => {
    expect(projectPortfolioValue(100000, 0.03, 2, 2025)).toEqual([{ year: 2025, value: 100000 }, { year: 2026, value: 103000 }, { year: 2027, value: 106090 }]);
  });
});
