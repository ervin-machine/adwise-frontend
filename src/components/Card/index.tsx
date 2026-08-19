import React from 'react'

type Props = {
    title?: string
    value?: string
    text?: string
    textColor?: string
}

const Card = (props: Props) => {
  const { title, value, text, textColor } = props
  return (
    <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl text-center">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1 tabular-nums">{value}</p>
      {text && (
        <p className={`text-sm mt-1 ${textColor || 'text-slate-400'}`}>
          {text}
        </p>
      )}
    </div>
  )
}

export default Card