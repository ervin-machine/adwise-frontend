import React from 'react'
import Card from '@/components/Card'

type Props = {
  campaigns: any
}

const StatsCards = (props: Props) => {
  const { campaigns } = props
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
        <Card title="Active Campaigns" value={campaigns?.filter((c: any) => c.status === "active").length} />
        <Card title="Inactive Campaigns" value={campaigns?.filter((c: any) => c.status === "inactive").length} />
        <Card title="Total Budget" value="$2000" />
    </div>
  )
}

export default StatsCards