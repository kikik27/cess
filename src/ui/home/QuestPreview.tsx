'use client'

import Link from 'next/link'
import { CheckSquare } from 'lucide-react'
import { useHomeStore, DAILY_TASK_DEFS } from '@/src/lib/homeStore'
import { cn } from '@/src/lib/utils'

export default function QuestPreview() {
  const { taskStates } = useHomeStore()
  const completedCount = taskStates.filter(t => t.done).length

  return (
    <Link
      href="/tasks"
      className="relic-frame group flex items-center gap-3 px-4 py-3.5
                 transition-colors hover:border-[var(--border-gold)] no-underline"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center
                      rounded-xl border border-[rgba(61,186,106,0.3)] bg-[rgba(61,186,106,0.08)]">
        <CheckSquare className="h-5 w-5 text-[var(--ok)]" />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="font-display text-[12px] font-bold uppercase tracking-wider text-[var(--text-1)]">
          Daily Quests
        </p>
        <div className="mt-1 flex items-center gap-2">
          {/* Progress dots */}
          <div className="flex gap-1">
            {DAILY_TASK_DEFS.map(def => {
              const done = taskStates.find(t => t.id === def.id)?.done ?? false
              return (
                <span
                  key={def.id}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-colors',
                    done ? 'bg-[var(--ok)]' : 'bg-white/10'
                  )}
                />
              )
            })}
          </div>
          <span className="text-[10px] text-[var(--text-3)]">
            {completedCount}/{DAILY_TASK_DEFS.length} completed
          </span>
        </div>
      </div>

      {/* Arrow */}
      <span className="text-lg text-[var(--text-3)] transition-colors group-hover:text-[var(--gold-mid)]">
        ›
      </span>
    </Link>
  )
}
