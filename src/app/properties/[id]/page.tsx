import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolio, projectPortfolioValue } from "@/lib/portfolio";

const money = new Intl.NumberFormat("en-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-CH", { style: "currency", currency: "CHF", notation: "compact", maximumFractionDigits: 1 });

export function generateStaticParams() { return portfolio.map(({ id }) => ({ id })); }

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = portfolio.find((item) => item.id === id);
  if (!property) notFound();
  const gain = property.value - property.purchasePrice;
  const gainPercent = (gain / property.purchasePrice) * 100;
  const net = property.monthlyIncome - property.monthlyCosts - property.monthlyMortgage;
  const future = projectPortfolioValue(property.value, property.annualGrowthRate / 100, 5, 2025).at(-1)?.value ?? property.value;

  return <main className="detail-shell">
    <div className="detail-top"><Link href="/">← Back to my places</Link><div><button className="soft-button">Share</button><button className="primary-button">Edit property</button></div></div>
    <section className={`detail-hero property-${property.id}`}><span className="floating-sun">☀</span><span className="floating-cloud">☁</span><div className="hero-copy"><span>{property.type}</span><h1>{property.name}</h1><p>⌖ {property.location}</p></div><div className="hero-value"><small>Today&apos;s estimated value</small><strong>{money.format(property.value)}</strong><span>Updated this week · ~{property.annualGrowthRate}% yearly assumption</span></div></section>
    <div className="detail-grid">
      <section className="detail-main">
        <article className="story-card"><div className="story-heading"><div><span className="story-icon">⌂</span><div><h2>Your value story</h2><p>From the day you bought it to where it could go</p></div></div><span className="estimate-badge">Weekly estimate</span></div>
          <div className="value-journey"><div><small>What you paid</small><strong>{compact.format(property.purchasePrice)}</strong><span>{new Date(property.purchasedOn).toLocaleDateString("en-CH", { month: "short", year: "numeric" })}</span></div><div className="journey-line"><i style={{ width: `${Math.min(90, 58 + gainPercent)}%` }} /><b>+{gainPercent.toFixed(1)}%</b></div><div><small>Worth today</small><strong>{compact.format(property.value)}</strong><span className="positive-text">+{money.format(gain)}</span></div><div><small>Possible in 2030</small><strong>{compact.format(future)}</strong><span>at {property.annualGrowthRate}% / year</span></div></div>
          <div className="estimate-explainer"><span>✦</span><p><strong>How we estimate this</strong>Each week Haven updates the value using your chosen local appreciation rate. You can replace it with a professional valuation anytime.</p><button>Adjust assumption</button></div>
        </article>
        <article className="story-card"><div className="story-heading"><div><span className="story-icon coral">↕</span><div><h2>Money in &amp; out</h2><p>A typical month at this property</p></div></div><button className="soft-button">＋ Add entry</button></div>
          <div className="money-flow"><div className="flow-row income-flow"><span>↓</span><div><strong>Rental income</strong><small>Recurring monthly</small></div><b>+{money.format(property.monthlyIncome)}</b></div><div className="flow-row"><span>⌂</span><div><strong>Mortgage payment</strong><small>Recurring monthly</small></div><b>−{money.format(property.monthlyMortgage)}</b></div><div className="flow-row"><span>⚒</span><div><strong>Running costs</strong><small>Insurance, service &amp; utilities</small></div><b>−{money.format(property.monthlyCosts)}</b></div><div className="net-strip"><span>You keep in a typical month</span><strong>+{money.format(net)}</strong></div></div>
        </article>
      </section>
      <aside className="detail-side"><article className="mini-panel playful"><span className="tiny-house">⌂</span><small>Property health</small><strong>Looking sunny!</strong><p>Positive cash flow and growing value.</p><div className="score-ring">92<span>/100</span></div></article><article className="mini-panel"><h3>Mortgage</h3><div className="mortgage-number"><strong>{compact.format(property.mortgageBalance)}</strong><span>remaining</span></div><div className="progress-line"><i style={{ width: `${100 - (property.mortgageBalance / property.purchasePrice) * 100}%` }} /></div><div className="two-col"><div><small>Monthly</small><strong>{money.format(property.monthlyMortgage)}</strong></div><div><small>Paid off</small><strong>{(100 - (property.mortgageBalance / property.purchasePrice) * 100).toFixed(0)}%</strong></div></div><button className="secondary-button">View mortgage details</button></article><article className="mini-panel"><h3>Quick facts</h3><dl><div><dt>Occupancy</dt><dd>{property.occupancy}%</dd></div><div><dt>Net cash flow</dt><dd className="positive-text">+{money.format(net)}</dd></div><div><dt>Annual net yield</dt><dd>{((net * 12 / property.value) * 100).toFixed(1)}%</dd></div></dl></article></aside>
    </div>
  </main>;
}
