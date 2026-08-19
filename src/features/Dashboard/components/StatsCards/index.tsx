import React from 'react'
import Card from '@/components/Card'

type Props = {
  campaigns: any
}

const StatsCards = (props: Props) => {
  const { campaigns } = props
  const active = campaigns?.filter((c: any) => (c.status || '').toLowerCase() === "active").length ?? 0;
  const paused = campaigns?.filter((c: any) => (c.status || '').toLowerCase() === "paused").length ?? 0;
  const totalBudget = campaigns?.reduce((sum: number, c: any) => sum + (parseFloat(c.budget) || 0), 0) ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Card title="Active Campaigns" value={String(active)} />
        <Card title="Paused Campaigns" value={String(paused)} />
        <Card title="Total Budget" value={`$${totalBudget.toLocaleString()}`} />
    </div>
  )
}

export default StatsCards