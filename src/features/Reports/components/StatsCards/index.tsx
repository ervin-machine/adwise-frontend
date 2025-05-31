import React from 'react'
import Card from '@/components/Card';
type Props = {}

const stats = [
    { title: "Total Impressions", value: "0", change: "0%" },
    { title: "Total Clicks", value: "0", change: "0%" },
    { title: "Avg. CTR", value: "0%", change: "0%" },
    { title: "Spend", value: "0", change: "0%" },
  ];

const StatsCards = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
      {stats.map((stat, i) => (
        <Card key={i} title={stat.title} value={stat.value} text={`vs last period: ${stat.change}`} textColor={`${stat.change.includes('-') ? 'text-red-500' : 'text-green-600'}`} />
      ))}
    </div>
  )
}

export default StatsCards;