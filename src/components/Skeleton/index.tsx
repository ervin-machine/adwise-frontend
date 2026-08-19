import React from 'react'

type Props = {
  className?: string
}

export const Skeleton = ({ className = '' }: Props) => (
  <div className={`animate-pulse rounded bg-slate-200 ${className}`} aria-hidden="true" />
)

type TableRowsSkeletonProps = {
  rows?: number
  columns: number
}

export const TableRowsSkeleton = ({ rows = 5, columns }: TableRowsSkeletonProps) => (
  <>
    {Array.from({ length: rows }).map((_, r) => (
      <tr key={r} className="border-b">
        {Array.from({ length: columns }).map((__, c) => (
          <td key={c} className="px-4 py-3">
            <Skeleton className="h-4 w-full" />
          </td>
        ))}
      </tr>
    ))}
  </>
)

export default Skeleton
