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
    <div className="p-4 bg-white shadow rounded text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-bold">{value}</p>
      <p className={`text-sm ${textColor}`}>
            {text}
      </p>
    </div>
  )
}

export default Card