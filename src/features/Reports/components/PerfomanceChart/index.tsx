'use client';

import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type Props = {
  campaigns: any
}
  
const PerfomanceChart = (props: Props) => {
  const { campaigns } = props
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold mb-4">Performance Over Time</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LineChart width={500} height={300} data={campaigns}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="impressions" stroke="#8884d8" />
        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
      </LineChart>

      <BarChart width={500} height={300} data={campaigns}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Impressions" fill="#8884d8" />
        <Bar dataKey="Clicks" fill="#82ca9d" />
      </BarChart>
    </div>
  </div>
  )
}

export default PerfomanceChart