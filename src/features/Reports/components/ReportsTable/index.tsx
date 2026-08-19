import React from 'react'
import StatusBadge from '@/components/Badge';
import EmptyState from '@/components/EmptyState';
import { TableRowsSkeleton } from '@/components/Skeleton';
import convertDate from '@/utils/convertDate';

type Props = {
  reports: any
  isLoading?: boolean
}

const HEADERS = ["Campaign", "Channel", "Status", "Impressions", "Clicks", "CTR", "Spend", "Date"];

const ReportsTable = (props: Props) => {
  const { reports, isLoading } = props;
  const isEmpty = !isLoading && (!reports || reports.length === 0);

  return (
    <div className="overflow-x-auto bg-white border border-slate-200 shadow-sm rounded-xl p-6">
      {isEmpty ? (
        <EmptyState
          title="No report data yet"
          description="Once you have campaigns running, their performance will show up here."
        />
      ) : (
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead>
            <tr>
              {HEADERS.map(header => (
                <th key={header} className="px-4 py-2 text-left font-semibold text-slate-600">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableRowsSkeleton columns={HEADERS.length} />
            ) : (
              reports.map((c: any, i: any) => (
                <tr key={c._id ?? i} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium text-slate-900">{c?.campaignName}</td>
                  <td className="px-4 py-2">{c?.campaignType}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={c?.status} />
                  </td>
                  <td className="px-4 py-2">{c?.impressions?.toLocaleString() ?? 0}</td>
                  <td className="px-4 py-2">{c?.clicks?.toLocaleString() ?? 0}</td>
                  <td className="px-4 py-2">{c?.ctr}</td>
                  <td className="px-4 py-2">{c?.spend}</td>
                  <td className="px-4 py-2">{c?.endDate ? convertDate(c.endDate) : '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReportsTable;
