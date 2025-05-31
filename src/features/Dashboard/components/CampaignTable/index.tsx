"use client"
import React, { useEffect } from 'react';

type Props = {
  campaigns: any,
}

const CampaignTable = (props: Props) => {
  const { campaigns } = props;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 border-b text-xs uppercase">
          <tr className="text-gray-600">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Budget</th>
            <th className="py-3 px-4">Start</th>
            <th className="py-3 px-4">End</th>
            <th className="py-3 px-4">Performance</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {campaigns.map((c: any, i: any) => (
            <tr key={i} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 font-medium">{c.campaignName}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                  {c.status}
                </span>
              </td>
              <td className="py-3 px-4">{c.budget}</td>
              <td className="py-3 px-4">{c.startDate}</td>
              <td className="py-3 px-4">{c.endDate}</td>
              <td className="py-3 px-4 w-48">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${c.performance}%` }}
                  />
                </div>
                <span className="text-xs ml-2 text-gray-500">{c.performance}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignTable;