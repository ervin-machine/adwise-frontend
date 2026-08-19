import React from 'react'

export const fieldClasses =
  'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500'

export const Input = ({ className = '', ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className={`${fieldClasses} ${className}`} {...rest} />
)

export const Select = ({ className = '', ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={`${fieldClasses} bg-white ${className}`} {...rest} />
)

export default Input
