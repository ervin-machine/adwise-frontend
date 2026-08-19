import React from 'react'

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-amber-100 text-amber-700',
  ended: 'bg-slate-200 text-slate-600',
}

type Props = {
  status: string
}

const StatusBadge = ({ status }: Props) => {
  const key = (status || '').toLowerCase()
  const style = STATUS_STYLES[key] || 'bg-slate-200 text-slate-600'

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status || 'Unknown'}
    </span>
  )
}

export default StatusBadge
