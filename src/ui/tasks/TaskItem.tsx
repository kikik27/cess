'use client'

import React from 'react'
import {
  Swords, Shield, Trophy, Zap, Star, Flame,
  CheckCircle2, Circle,
  type LucideProps,
} from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { useHomeStore, DAILY_TASK_DEFS, type TaskIconId, type DailyTaskDef } from '@/src/lib/homeStore'

// Icon map — rendered inside component, never stored as JSX
const ICONS: Record<TaskIconId, (p: LucideProps) => React.ReactElement> = {
  swords: p => <Swords {...p} />,
  shield: p => <Shield {...p} />,
  trophy: p => <Trophy {...p} />,
  zap:    p => <Zap    {...p} />,
  star:   p => <Star   {...p} />,
  flame:  p => <Flame  {...p} />,
}

interface Props {
  def: DailyTaskDef
}

export default function TaskItem({ def }: Props) {
  const { taskStates, claimTask } = useHomeStore()
  const state    = taskStates.find(t => t.id === def.id) ?? { id: def.id, progress: 0, done: false }
  const canClaim = state.progress >= def.total && !state.done
  const pct      = Math.min(100, Math.round((state.progress / def.total) * 100))
  const Icon     = ICONS[def.iconId]

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all',
        state.done
          ? 'border-[rgba(61,186,106,0.15)] bg-[rgba(61,186,106,0.03)] opacity-55'
          : canClaim
          ? 'border-[rgba(200,146,42,0.35)] bg-[rgba(200,146,42,0.04)] shadow-[0_0_16px_rgba(200,146,42,0.07)]'
          : 'border-[var(--border)] bg-[rgba(255,255,255,0.02)]'
      )}
    >
      {/* Icon badge */}
      <div
        className={cn(
          'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border',
          state.done
            ? 'border-[rgba(61,186,106,0.3)] bg-[rgba(61,186,106,0.1)] text-[var(--ok)]'
            : canClaim
            ? 'border-[rgba(200,146,42,0.4)] bg-[rgba(200,146,42,0.1)] text-[var(--gold-mid)]'
            : 'border-[var(--border)] bg-white/[0.04] text-[var(--text-3)]'
        )}
      >
        {state.done
          ? <CheckCircle2 className="h-5 w-5" />
          : <Icon className="h-5 w-5" />
        }
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            'font-display text-[12px] font-bold uppercase leading-tight tracking-wider',
            state.done ? 'text-[var(--text-3)] line-through' : 'text-[var(--text-1)]'
          )}>
            {def.label}
          </p>
          <span className={cn(
            'flex-shrink-0 font-display text-[11px] font-bold',
            state.done ? 'text-[var(--ok)]' : 'text-[var(--gold-mid)]'
          )}>
            +{def.reward}pts
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-[var(--text-3)]">{def.desc}</p>

        {/* Progress bar for multi-step tasks */}
        {def.total > 1 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="stat-bar flex-1" style={{ height: 5 }}>
              <div
                className={cn(
                  'stat-bar-fill',
                  state.done
                    ? 'bg-[var(--ok)]'
                    : 'bg-gradient-to-r from-[var(--ally)] to-[#a0d8ff]'
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="flex-shrink-0 tabular-nums text-[9px] text-[var(--text-3)]">
              {state.done ? def.total : state.progress}/{def.total}
            </span>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex-shrink-0">
        {state.done ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full
                          border border-[rgba(61,186,106,0.3)] bg-[rgba(61,186,106,0.12)]">
            <CheckCircle2 className="h-4 w-4 text-[var(--ok)]" />
          </div>
        ) : canClaim ? (
          <button
            onClick={() => claimTask(def.id)}
            className="whitespace-nowrap rounded-lg border border-[rgba(200,146,42,0.5)]
                       bg-[rgba(200,146,42,0.12)] px-3 py-1.5
                       font-display text-[9px] font-bold uppercase tracking-[0.12em]
                       text-[var(--gold-hi)] transition-all
                       hover:bg-[rgba(200,146,42,0.22)] hover:shadow-[0_0_12px_rgba(200,146,42,0.2)]"
          >
            Claim
          </button>
        ) : (
          <Circle className="h-5 w-5 text-[var(--text-dim)]" />
        )}
      </div>
    </div>
  )
}
