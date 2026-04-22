import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'success'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer select-none',
        'active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary text-white shadow-[0_4px_14px_0_rgba(11,110,254,0.25)] hover:bg-primary-dark hover:-translate-y-px':
            variant === 'primary',
          'bg-white text-primary border border-primary hover:bg-primary-subtle hover:-translate-y-px':
            variant === 'secondary',
          'bg-transparent text-primary hover:bg-primary-subtle':
            variant === 'ghost',
          'bg-white text-accent border border-[#E2E8F0] hover:border-primary hover:text-primary hover:bg-primary-subtle':
            variant === 'outline',
          'bg-success text-white hover:bg-emerald-600 hover:-translate-y-px shadow-[0_4px_12px_0_rgba(16,185,129,0.25)]':
            variant === 'success',
        },
        {
          'text-xs px-3 py-1.5': size === 'sm',
          'text-sm px-5 py-2.5': size === 'md',
          'text-sm px-7 py-3.5': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
