'use client';

import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EmptyState from '@/components/EmptyState';

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

const formatDateTick = (value: string) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const PerfomanceChart = (props: Props) => {
  const { metrics } = props
  const isEmpty = !metrics || metrics.length === 0;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Over Time</h3>
      {isEmpty ? (
        <EmptyState
          title="No performance data yet"
          description="This fills in once your campaigns have real traffic - Google Ads reports data with a short delay, and freshly-created campaigns won't have any until they've actually run."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tickFormatter={formatDateTick} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={formatDateTick} />
                <Legend />
                <Line type="monotone" dataKey="impressions" stroke="#4740d1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tickFormatter={formatDateTick} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip labelFormatter={formatDateTick} formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="cost" name="Spend" fill="#4740d1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerfomanceChart
