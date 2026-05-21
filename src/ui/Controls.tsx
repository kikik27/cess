'use client'

interface ControlsProps {
  phase: 'prep' | 'battle'
  hasSelected: boolean
  battleRunning: boolean
  secondsLeft: number
  speedUp: boolean
  onReroll: () => void
  onSell: () => void
  onBattle: () => void
}

export default function Controls({
  phase,
  hasSelected,
  battleRunning,
  secondsLeft,
  speedUp,
  onReroll,
  onSell,
  onBattle,
}: ControlsProps) {
  const isBattle = phase === 'battle'

  // Countdown color: green → yellow → red
  const countdownColor =
    speedUp
      ? 'text-orange-400'
      : secondsLeft <= 5
      ? 'text-red-400 animate-pulse'
      : secondsLeft <= 10
      ? 'text-yellow-400'
      : 'text-emerald-400'

  return (
    <div className="flex gap-1.5 mt-1.5 flex-wrap items-center min-h-[32px]">
      {/* ── Prep phase controls ── */}
      {!isBattle && (
        <>
          <button
            onClick={onReroll}
            className="px-3 py-1 text-xs rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            🎲 Reroll −2🪙
          </button>

          {hasSelected && (
            <button
              onClick={onSell}
              className="px-3 py-1 text-xs rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              💰 Jual
            </button>
          )}

          <button
            onClick={onBattle}
            className="px-3 py-1 text-xs rounded-full font-medium bg-orange-600 hover:bg-orange-700 text-white border border-orange-700 transition-colors"
          >
            ⚔️ Mulai Pertempuran
          </button>

          <span className="ml-auto text-[11px] text-zinc-400 dark:text-zinc-500">
            Klik unit → klik sel tujuan
          </span>
        </>
      )}

      {/* ── Battle phase: countdown + speed-up indicator ── */}
      {isBattle && (
        <div className="flex items-center gap-3 w-full">
          {/* Countdown block */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-zinc-400">⏱</span>
            <span className={`font-mono font-bold text-sm tabular-nums ${countdownColor}`}>
              {speedUp ? '⚡ SPEED UP' : `${secondsLeft}s`}
            </span>
          </div>

          {/* Progress bar */}
          {!speedUp && (
            <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  secondsLeft <= 5
                    ? 'bg-red-500'
                    : secondsLeft <= 10
                    ? 'bg-yellow-400'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${(secondsLeft / 30) * 100}%` }}
              />
            </div>
          )}

          {/* Speed-up bar — animated stripes */}
          {speedUp && (
            <div className="flex-1 h-2 rounded-full overflow-hidden bg-orange-500/30">
              <div
                className="h-full w-full rounded-full bg-orange-400"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.25) 4px, rgba(255,255,255,0.25) 8px)',
                  animation: 'slide 0.4s linear infinite',
                }}
              />
            </div>
          )}

          <span className="text-[11px] text-zinc-500 shrink-0">
            {speedUp ? '3× kecepatan' : 'Pertempuran berlangsung…'}
          </span>
        </div>
      )}

      {/* Inline keyframe for stripe animation */}
      <style>{`
        @keyframes slide {
          from { background-position: 0 0; }
          to   { background-position: 16px 0; }
        }
      `}</style>
    </div>
  )
}
