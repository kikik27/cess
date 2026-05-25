'use client'

import Image from 'next/image'
import { Modal } from '@/src/components/ui/Modal'
import { cn } from '@/src/lib/utils'

const AVATAR_COUNT = 25

interface Props {
  open:     boolean
  current:  number
  onClose:  () => void
  onSelect: (idx: number) => void
}

export default function AvatarPicker({ open, current, onClose, onSelect }: Props) {
  return (
    <Modal show={open} onClose={onClose}>
      <div className="rpg-modal-bar" />
      <div className="relative z-10 flex flex-col gap-4 px-4 py-5">
        <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--gold-hi)] text-center">
          Choose Avatar
        </h2>

        <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
          {Array.from({ length: AVATAR_COUNT }, (_, i) => i + 1).map(n => {
            const pad    = String(n).padStart(2, '0')
            const active = current === n
            return (
              <button
                key={n}
                onClick={() => { onSelect(n); onClose() }}
                className={cn(
                  'relative overflow-hidden rounded-lg border-2 transition-all',
                  active
                    ? 'border-[var(--gold-mid)] shadow-[0_0_12px_rgba(200,146,42,0.6)]'
                    : 'border-[var(--border)] hover:border-[var(--border-gold)]'
                )}
              >
                <Image
                  src={`/assets/ui/avatars/avatar-${pad}.png`}
                  alt={`Avatar ${n}`}
                  width={52} height={52}
                  className="pixel w-full h-auto"
                />
                {active && (
                  <div className="absolute inset-0 bg-[rgba(200,146,42,0.15)]" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
