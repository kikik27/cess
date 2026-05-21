'use client'

import { useEffect, useRef } from 'react'

interface BattleLogProps {
  log: string[]
}

export default function BattleLog({ log }: BattleLogProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [log])

  return (
    <div
      ref={ref}
      className="mt-1.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 px-2.5 py-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px] max-h-[56px] overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-label="Log pertempuran"
    >
      {log.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  )
}
