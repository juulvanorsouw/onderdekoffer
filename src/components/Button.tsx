import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
}

const variantClasses: Record<string, string> = {
  primary: 'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30',
  secondary: 'bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20',
  danger: 'bg-red-500 hover:bg-red-400 active:bg-red-600 text-white shadow-lg shadow-red-500/30',
  ghost: 'bg-transparent hover:bg-white/10 text-white/80',
}

export default function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`w-full rounded-2xl px-6 py-4 text-lg font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
