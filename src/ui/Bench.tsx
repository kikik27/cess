'use client'

import { useEffect, useRef } from 'react'
import type { BenchSlots, SelectedSource } from '../game/core/types'
import { drawUnitPreview } from '../game/renderer/PixiBoard'

interface BenchProps {
  bench: BenchSlots
  selected: SelectedSource
  onSlotClick: (idx: number) => void
}

export default function Bench({ bench, selected, onSlotClick }: BenchProps) {
  return (
    <div className="mt-1.5">
      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
        Bangku cadangan (8 slot)
      </p>
      <div className="flex gap-1">
        {bench.map((unit, i) => (
          <BenchSlot
            key={i}
            unit={unit}
            isSelected={selected?.src === 'bench' && (selected as { src: 'bench'; idx: number }).idx === i}
            onClick={() => onSlotClick(i)}
          />
        ))}
      </div>
    </div>
  )
}

function BenchSlot({
  unit,
  isSelected,
  onClick,
}: {
  unit: BenchSlots[number]
  isSelected: boolean
  onClick: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!unit || !canvasRef.current) return
    drawUnitPreview(canvasRef.current, unit, 44)
  }, [unit])

  return (
    <button
      onClick={onClick}
      title={unit ? `${unit.name} ⭐${unit.stars} | ATK:${unit.atkVal} HP:${unit.curHp}` : 'Kosong'}
      className={`w-[52px] h-[52px] rounded-md flex items-center justify-center flex-shrink-0 transition-colors
        ${unit
          ? 'border border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
          : 'border border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50'
        }
        ${isSelected ? 'ring-2 ring-emerald-500 bg-emerald-100 dark:bg-emerald-800/50' : ''}
      `}
      aria-label={unit ? `${unit.name} bintang ${unit.stars}` : `Slot bangku ${unit} kosong`}
      aria-pressed={isSelected}
    >
      {unit && (
        <canvas
          ref={canvasRef}
          width={52}
          height={52}
          className="block"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
