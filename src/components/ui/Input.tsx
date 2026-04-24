import { cn } from '@/utils/cn'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#334155]">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-3.5 py-2.5 text-sm text-accent bg-white border border-[#E2E8F0] rounded-lg',
          'placeholder:text-[#94A3B8] outline-none transition-colors duration-150',
          'focus:border-primary focus:ring-2 focus:ring-primary/10',
          error && 'border-error focus:border-error focus:ring-error/10',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#334155]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full px-3.5 py-2.5 text-sm text-accent bg-white border border-[#E2E8F0] rounded-lg',
          'placeholder:text-[#94A3B8] outline-none transition-colors duration-150 resize-none',
          'focus:border-primary focus:ring-2 focus:ring-primary/10',
          error && 'border-error focus:border-error focus:ring-error/10',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}
