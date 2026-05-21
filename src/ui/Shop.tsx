'use client'

import { useRef, useEffect } from 'react'
import type { ShopItem } from '../game/core/types'
import { drawUnitPreview } from '../game/renderer/PixiBoard'

interface ShopProps {
  shop: ShopItem[]
  onBuy: (idx: number) => void
}

export default function Shop({ shop, onBuy }: ShopProps) {
  return (
    <div className="mt-1.5">
      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
        Toko — klik untuk beli
      </p>
      <div className="flex gap-1">
        {shop.map((item, i) => (
          <ShopCard key={i} item={item} onBuy={() => onBuy(i)} />
        ))}
      </div>
    </div>
  )
}

function ShopCard({ item, onBuy }: { item: ShopItem; onBuy: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    drawUnitPreview(canvasRef.current, { ...item, stars: 1 }, 44)
  }, [item])

  return (
    <button
      onClick={item.sold ? undefined : onBuy}
      disabled={item.sold}
      className={`flex-1 rounded-lg border px-1 py-1.5 text-center transition-colors
        ${item.sold
          ? 'opacity-30 cursor-default border-zinc-200 dark:border-zinc-700'
          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer'
        }
      `}
      aria-label={`Beli ${item.name} seharga ${item.cost} koin${item.sold ? ' (sudah terjual)' : ''}`}
    >
      <canvas
        ref={canvasRef}
        width={48}
        height={48}
        className="block mx-auto mb-0.5"
        aria-hidden="true"
      />
      <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">{item.name}</span>
      <span className="block text-[11px] font-medium text-amber-700 dark:text-amber-400">
        🪙{item.cost}
      </span>
    </button>
  )
}
