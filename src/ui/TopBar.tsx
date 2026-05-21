'use client'

import type { GamePhase } from '../game/core/types'

interface TopBarProps {
  round: number
  hp: number
  gold: number
  boardUnitCount: number
  maxBoardSlots: number
  phase: GamePhase
}

export default function TopBar({
  round,
  hp,
  gold,
  boardUnitCount,
  maxBoardSlots,
  phase,
}: TopBarProps) {
  return (
    <div className="flex gap-1.5 items-center flex-wrap mb-2">
      <Pill label="Ronde" value={`${round}/5`} />
      <Pill label="❤️" value={String(hp)} />
      <Pill label="🪙" value={String(gold)} />
      <Pill label="Slot" value={`${boardUnitCount}/${maxBoardSlots}`} />
      <PhaseBadge phase={phase} />
    </div>
  )
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full px-2.5 py-0.5 text-xs text-zinc-500 dark:text-zinc-400">
      {label} <span className="font-medium text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  )
}

function PhaseBadge({ phase }: { phase: GamePhase }) {
  const isPrep = phase === 'prep'
  return (
    <div
      className={`ml-auto text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
        isPrep
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
      }`}
    >
      {isPrep ? 'Persiapan' : 'Pertempuran'}
    </div>
  )
}
