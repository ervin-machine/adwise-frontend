import React from 'react'

type Props = {
  reports: any
}

const ReportsTable = (props: Props) => {
  const { reports } = props;
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-6">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead>
        <tr>
          {["Campaign", "Channel", "Status", "Impressions", "Clicks", "CTR", "Spend", "Date"].map(header => (
            <th key={header} className="px-4 py-2 text-left font-semibold text-gray-600">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reports.map((c: any, i: any) => (
          <tr key={i} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2">{c?.campaignName}</td>
            <td className="px-4 py-2">{c?.campaignType}</td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === "Active" ? "bg-green-100 text-green-700" : c.status === "Paused" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-600"}`}>
                {c.status}
              </span>
            </td>
            <td className="px-4 py-2">{c?.impressions.toLocaleString()}</td>
            <td className="px-4 py-2">{c?.clicks.toLocaleString()}</td>
            <td className="px-4 py-2">{c?.ctr}</td>
            <td className="px-4 py-2">{c?.spend}</td>
            <td className="px-4 py-2">{c?.endDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default ReportsTable;