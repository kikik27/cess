import Link from 'next/link'
import { Button } from '@/src/components/ui/Button'
import { Swords } from 'lucide-react'
import LandingClient from '@/src/ui/LandingClient'

const LEAVES = [
  { src: '/assets/fx/leaf/1.png', cls: 'leaf l1', w: 22 },
  { src: '/assets/fx/leaf/3.png', cls: 'leaf l2', w: 18 },
  { src: '/assets/fx/leaf/5.png', cls: 'leaf l3', w: 24 },
  { src: '/assets/fx/leaf/2.png', cls: 'leaf l4', w: 20 },
  { src: '/assets/fx/leaf/4.png', cls: 'leaf l5', w: 16 },
  { src: '/assets/fx/leaf/6.png', cls: 'leaf l6', w: 22 },
  { src: '/assets/fx/leaf/1.png', cls: 'leaf l7', w: 18 },
  { src: '/assets/fx/leaf/3.png', cls: 'leaf l8', w: 20 },
]

/**
 * /welcome — cinematic landing page.
 * Shown to first-time users via redirect from /, or accessible directly for demo.
 */
export default function WelcomePage() {
  return (
    <div className="landing-bg game-scroll app-frame-outer mobile-shell relative overflow-hidden flex flex-col">
      <div className="curtain" aria-hidden />
      <div className="landing-overlay" aria-hidden />

      {LEAVES.map((l, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <div key={`leaf-${i}`} className={l.cls} aria-hidden>
          <img src={l.src} alt="" style={{ width: l.w, height: 'auto' }} />
        </div>
      ))}

      <section className="relative z-10 flex flex-col items-center gap-2 px-4 pt-10 pb-4">
        <p className="intro-subtitle font-display text-[10px] uppercase tracking-[0.32em] text-[rgba(245,216,120,0.7)]">
          Dark Fantasy Auto Battler
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="CETAS"
          className="intro-logo object-contain"
          style={{ width: 420, height: 'auto' }}
        />
        <div className="intro-burst" aria-hidden />
      </section>

      <section className="intro-cta relative z-10 flex flex-col gap-3 px-4 pb-6">
        <Link href="/">
          <Button variant="pixelGold" size="lg" className="w-full font-black tracking-wider">
            <Swords className="h-5 w-5" />
            ENTER
          </Button>
        </Link>
        <p className="text-center font-display text-[10px] uppercase tracking-[0.2em] text-[rgba(245,216,120,0.5)]">
          Celo Tactics · Mini App Edition
        </p>
      </section>

      <LandingClient />
    </div>
  )
}
