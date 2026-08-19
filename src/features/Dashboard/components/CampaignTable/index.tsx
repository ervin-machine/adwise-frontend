"use client"
import React from 'react';
import StatusBadge from '@/components/Badge';
import EmptyState from '@/components/EmptyState';
import { TableRowsSkeleton } from '@/components/Skeleton';
import convertDate from '@/utils/convertDate';

type Props = {
  campaigns: any,
  isLoading?: boolean,
}

const COLUMN_COUNT = 6;

const CampaignTable = (props: Props) => {
  const { campaigns, isLoading } = props;
  const isEmpty = !isLoading && (!campaigns || campaigns.length === 0);

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Campaign Performance</h2>
      {isEmpty ? (
        <EmptyState
          title="No campaigns yet"
          description="Create your first campaign to see its performance here."
        />
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-slate-200 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Budget</th>
              <th className="py-3 px-4">Start</th>
              <th className="py-3 px-4">End</th>
              <th className="py-3 px-4">Performance</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {isLoading ? (
              <TableRowsSkeleton columns={COLUMN_COUNT} />
            ) : (
              campaigns?.map((c: any, i: any) => (
                <tr key={c._id ?? i} className="hover:bg-slate-50 border-b border-slate-100">
                  <td className="py-3 px-4 font-medium">{c.campaignName}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3 px-4">{c.budget}</td>
                  <td className="py-3 px-4">{c.startDate ? convertDate(c.startDate) : '—'}</td>
                  <td className="py-3 px-4">{c.endDate ? convertDate(c.endDate) : '—'}</td>
                  <td className="py-3 px-4 w-48">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-brand-600 h-2 rounded-full"
                        style={{ width: `${c.performance}%` }}
                      />
                    </div>
                    <span className="text-xs ml-2 text-slate-500">{c.performance}%</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignTable;
