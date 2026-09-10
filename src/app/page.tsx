import Link from "next/link";
import { portfolio, portfolioSummary, projection } from "@/lib/portfolio";

const icons: Record<string, string> = {
  overview: "M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-12h8V3h-8v6Z",
  properties: "m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z",
  money: "M12 2v20m5-16.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  reports: "M4 19V9m6 10V5m6 14v-7m4 7H2",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.08A1.7 1.7 0 0 0 4.64 8.9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.53 1.7 1.7 0 0 0 10.04 3H14v.08a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.25.62.86 1.03 1.53 1.03H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z",
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>;
}

const money = new Intl.NumberFormat("en-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 });
const compactMoney = new Intl.NumberFormat("en-CH", { style: "currency", currency: "CHF", notation: "compact", maximumFractionDigits: 1 });

export default function Home() {
  const maxProjection = Math.max(...projection.map((point) => point.value));
  const minProjection = Math.min(...projection.map((point) => point.value));
  const chartPoints = projection.map((point, index) => `${(index / (projection.length - 1)) * 100},${90 - ((point.value - minProjection) / (maxProjection - minProjection)) * 72}`).join(" ");

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">H</span><span>haven</span></div>
      <nav aria-label="Main navigation">
        <a className="nav-item active" href="#overview"><Icon name="overview" />Overview</a>
        <a className="nav-item" href="#properties"><Icon name="properties" />Properties<span className="nav-count">3</span></a>
        <a className="nav-item" href="#cashflow"><Icon name="money" />Cash flow</a>
        <a className="nav-item" href="#projection"><Icon name="reports" />Reports</a>
      </nav>
      <div className="sidebar-spacer" />
      <div className="portfolio-card"><span className="mini-label">Portfolio health</span><div className="health-row"><strong>Excellent</strong><span>92%</span></div><div className="health-track"><span /></div><small>All properties are cash-flow positive.</small></div>
      <a className="nav-item" href="#settings"><Icon name="settings" />Settings</a>
      <div className="user-row"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><span>Personal portfolio</span></div><button aria-label="Open account menu">•••</button></div>
    </aside>

    <main className="main-content" id="overview">
      <header className="topbar"><div><p className="eyebrow">Thursday, 10 September</p><h1>Your homes are having a good month <span className="heading-spark">✦</span></h1><p>Here&apos;s how your property portfolio is doing.</p></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot" /></button><button className="primary-button"><span>＋</span>Add property</button></div></header>
      <div className="sunny-note"><span className="sunny-icon">☀</span><div><strong>CHF 190K gained since you bought</strong><p>Your homes have grown 11.5% in value overall. Nice choice, past you.</p></div><a href="#properties">See the story →</a></div>
      <section className="metrics" aria-label="Portfolio summary">
        <article className="metric-card featured"><div className="metric-head"><span className="metric-icon">⌂</span><span className="positive-pill">↗ 4.8%</span></div><p>Total portfolio value</p><strong>{compactMoney.format(portfolioSummary.totalValue)}</strong><small>Across {portfolio.length} properties</small></article>
        <article className="metric-card"><div className="metric-head"><span className="metric-icon blue">↙</span><span className="positive-text">+ CHF 340</span></div><p>Monthly net income</p><strong>{money.format(portfolioSummary.monthlyNet)}</strong><small>{money.format(portfolioSummary.annualNet)} projected yearly</small></article>
        <article className="metric-card"><div className="metric-head"><span className="metric-icon amber">%</span><span className="neutral-pill">Healthy</span></div><p>Average net yield</p><strong>{portfolioSummary.netYield.toFixed(1)}%</strong><small>After mortgage &amp; costs</small></article>
        <article className="metric-card"><div className="metric-head"><span className="metric-icon rose">◇</span><span className="positive-text">+6.2%</span></div><p>Your equity</p><strong>{compactMoney.format(portfolioSummary.equity)}</strong><small>{portfolioSummary.equityRatio.toFixed(0)}% of portfolio value</small></article>
      </section>

      <section className="dashboard-grid">
        <article className="panel cashflow-panel" id="cashflow"><div className="panel-heading"><div><h2>Monthly cash flow</h2><p>Income and expenses across your portfolio</p></div><button className="select-button">Last 6 months⌄</button></div><div className="cashflow-total"><strong>{money.format(portfolioSummary.monthlyNet)}</strong><span className="positive-pill">↗ 7.4%</span><small>net this month</small></div><div className="bar-chart" aria-label="Monthly income and expense chart">{[72, 78, 76, 85, 82, 92].map((income, index) => <div className="bar-group" key={index}><span className="bar income" style={{ height: `${income}%` }} /><span className="bar expense" style={{ height: `${income - 31}%` }} /><small>{["Apr", "May", "Jun", "Jul", "Aug", "Sep"][index]}</small></div>)}</div><div className="legend"><span><i className="green-dot" />Income {money.format(portfolioSummary.monthlyIncome)}</span><span><i className="sand-dot" />Expenses {money.format(portfolioSummary.monthlyExpenses)}</span></div></article>
        <article className="panel projection-panel" id="projection"><div className="panel-heading"><div><h2>Portfolio projection</h2><p>Estimated value over 5 years</p></div><button className="more-button">•••</button></div><div className="projection-value"><strong>{compactMoney.format(projection.at(-1)?.value ?? 0)}</strong><span>by 2030</span></div><div className="line-chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Projected portfolio value rising through 2030"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#21695b" stopOpacity=".24"/><stop offset="1" stopColor="#21695b" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${chartPoints} 100,100`} fill="url(#chartFill)" /><polyline points={chartPoints} fill="none" stroke="#21695b" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg><div className="chart-labels">{projection.map((point) => <span key={point.year}>{point.year}</span>)}</div></div><p className="projection-note"><span>✦</span> Based on 3% annual appreciation and your current mortgage plans.</p></article>
      </section>

      <section className="properties-section" id="properties"><div className="section-heading"><div><h2>Your places</h2><p>Each home has its own little financial story</p></div><a href="#properties">View all properties →</a></div><div className="property-grid">{portfolio.map((property) => { const net = property.monthlyIncome - property.monthlyCosts - property.monthlyMortgage; const gain = property.value - property.purchasePrice; return <article className="property-card" key={property.id}><div className={`property-image property-${property.id}`}><span>{property.type}</span><button aria-label={`More options for ${property.name}`}>•••</button><i className="property-sun">☀</i><i className="property-cloud">☁</i></div><div className="property-body"><div className="property-title"><div><h3>{property.name}</h3><p>⌖ {property.location}</p></div><strong>{compactMoney.format(property.value)}</strong></div><div className="value-story"><span>Bought for {compactMoney.format(property.purchasePrice)}</span><b>+{compactMoney.format(gain)}</b></div><div className="property-stats"><div><span>Monthly income</span><strong>{money.format(property.monthlyIncome)}</strong></div><div><span>Net cash flow</span><strong className="positive-text">+{money.format(net)}</strong></div><div><span>Mortgage left</span><strong>{compactMoney.format(property.mortgageBalance)}</strong></div></div><div className="property-footer"><div className="occupancy"><span>Occupancy</span><strong>{property.occupancy}%</strong><div><i style={{ width: `${property.occupancy}%` }} /></div></div><Link href={`/properties/${property.id}`}>Open home →</Link></div></div></article>; })}</div></section>
      <section className="bottom-grid"><article className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Your latest portfolio movements</p></div><a href="#cashflow">See all</a></div><ul><li><span className="activity-icon income-activity">↓</span><div><strong>Rental income received</strong><small>Lakeview Apartment · Today</small></div><b className="positive-text">+ CHF 2,450</b></li><li><span className="activity-icon expense-activity">↗</span><div><strong>Mortgage payment</strong><small>City Studio · 5 Sep</small></div><b>− CHF 1,180</b></li><li><span className="activity-icon maintenance-activity">⌁</span><div><strong>Annual heating service</strong><small>Alpine Retreat · 2 Sep</small></div><b>− CHF 420</b></li></ul></article><article className="panel upcoming-panel"><div className="panel-heading"><div><h2>Coming up</h2><p>Don&apos;t let costs surprise you</p></div><button className="more-button">•••</button></div><div className="upcoming-date"><span>18<small>SEP</small></span><div><strong>Property insurance</strong><small>Lakeview Apartment</small></div><b>CHF 680</b></div><div className="upcoming-date"><span>01<small>OCT</small></span><div><strong>Mortgage payment</strong><small>All properties</small></div><b>CHF 3,180</b></div><button className="secondary-button">View cost calendar</button></article></section>
    </main>
  </div>;
}
