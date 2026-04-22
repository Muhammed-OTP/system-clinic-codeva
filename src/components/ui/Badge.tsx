import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

type BadgeVariant = 'scheduled' | 'waiting' | 'cancelled' | 'completed' | 'active' | 'onleave' | 'blue' | 'purple' | 'green'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const styles: Record<BadgeVariant, string> = {
  scheduled: 'bg-[#D1FAE5] text-[#059669]',
  waiting: 'bg-[#FEF3C7] text-[#D97706]',
  cancelled: 'bg-[#FEE2E2] text-[#DC2626]',
  completed: 'bg-primary-subtle text-primary',
  active: 'bg-[#D1FAE5] text-[#059669]',
  onleave: 'bg-[#FEF3C7] text-[#D97706]',
  blue: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
  purple: 'bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]',
  green: 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]',
}

export function Badge({ variant = 'scheduled', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full', styles[variant], className)}>
      {children}
    </span>
  )
}
