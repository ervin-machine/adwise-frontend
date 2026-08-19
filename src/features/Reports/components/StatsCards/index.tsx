import React from 'react'
import Card from '@/components/Card';

type MetricPoint = {
  date: string
  impressions: number
  clicks: number
  cost: number
  conversions: number
}

type Props = {
  metrics: MetricPoint[]
}

const sumWindow = (points: MetricPoint[]) =>
  points.reduce(
    (acc, p) => ({
      impressions: acc.impressions + p.impressions,
      clicks: acc.clicks + p.clicks,
      cost: acc.cost + p.cost,
    }),
    { impressions: 0, clicks: 0, cost: 0 }
  );

const pctChange = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};

const formatDelta = (pct: number) => `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}% vs prior week`;

const StatsCards = ({ metrics }: Props) => {
  const sorted = [...(metrics || [])].sort((a, b) => a.date.localeCompare(b.date));

  const totalImpressions = sorted.reduce((s, p) => s + p.impressions, 0);
  const totalClicks = sorted.reduce((s, p) => s + p.clicks, 0);
  const totalSpend = sorted.reduce((s, p) => s + p.cost, 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  // Real week-over-week comparison, only shown once there's a full prior
  // week of data to compare against - no fabricated "0%" placeholders.
  const last14 = sorted.slice(-14);
  const currentWindow = last14.slice(-7);
  const previousWindow = last14.slice(0, Math.max(0, last14.length - 7));
  const hasComparison = previousWindow.length > 0;
  const current = sumWindow(currentWindow);
  const previous = sumWindow(previousWindow);

  const stats = [
    {
      title: "Total Impressions",
      value: totalImpressions.toLocaleString(),
      delta: hasComparison ? pctChange(current.impressions, previous.impressions) : null,
    },
    {
      title: "Total Clicks",
      value: totalClicks.toLocaleString(),
      delta: hasComparison ? pctChange(current.clicks, previous.clicks) : null,
    },
    {
      title: "Avg. CTR",
      value: `${avgCtr.toFixed(2)}%`,
      delta: null,
    },
    {
      title: "Spend",
      value: `$${totalSpend.toFixed(2)}`,
      delta: hasComparison ? pctChange(current.cost, previous.cost) : null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {stats.map((stat, i) => (
        <Card
          key={i}
          title={stat.title}
          value={stat.value}
          text={stat.delta !== null ? formatDelta(stat.delta) : undefined}
          textColor={stat.delta !== null ? (stat.delta < 0 ? 'text-red-500' : 'text-emerald-600') : undefined}
        />
      ))}
    </div>
  )
}

export default StatsCards;
