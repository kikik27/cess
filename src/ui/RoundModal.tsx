'use client'

interface RoundModalProps {
  show: boolean
  title: string
  titleColor: string
  description: string
  buttonLabel: string
  onNext: () => void
}

export default function RoundModal({
  show,
  title,
  titleColor,
  description,
  buttonLabel,
  onNext,
}: RoundModalProps) {
  if (!show) return null

  return (
    <div
      className="mt-1.5 min-h-[200px] bg-black/50 rounded-lg flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-zinc-900 rounded-xl px-7 py-5 text-center min-w-[220px] shadow-xl">
        <h3
          id="modal-title"
          className="text-lg font-medium mb-1.5"
          style={{ color: titleColor }}
        >
          {title}
        </h3>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mb-3.5">
          {description}
        </p>
        <button
          onClick={onNext}
          autoFocus
          className="px-5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
