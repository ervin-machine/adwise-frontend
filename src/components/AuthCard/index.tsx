import React from 'react'

type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

const AuthCard = ({ title, subtitle, children, footer }: Props) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-center mb-6">
        <svg className="h-10 w-10" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#4740D1" />
          <rect x="8" y="18" width="4" height="7" rx="1.5" fill="#FFFFFF" />
          <rect x="14" y="13" width="4" height="12" rx="1.5" fill="#FFFFFF" />
          <rect x="20" y="7" width="4" height="18" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      </div>
      <h2 className="text-center text-xl font-semibold text-slate-900 mb-1">{title}</h2>
      {subtitle && <p className="text-center text-sm text-slate-500 mb-6">{subtitle}</p>}
      {children}
      {footer && <div className="text-center text-sm text-slate-500 mt-6">{footer}</div>}
    </div>
  </div>
)

export default AuthCard
