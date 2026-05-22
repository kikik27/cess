import { cn } from '@/src/lib/utils'
import type { HTMLAttributes } from 'react'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[var(--border)] bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-2)]',
        className,
      )}
      {...props}
    />
  )
}
