import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/src/components/ui/Badge'
import { Button } from '@/src/components/ui/Button'
import { Swords } from 'lucide-react'

const FX_PARTICLES = [
  { src: '/assets/ui/icons/icon-01.png', cls: 'particle p1' },
  { src: '/assets/ui/icons/icon-02.png', cls: 'particle p2' },
  { src: '/assets/ui/icons/icon-04.png', cls: 'particle p3' },
  { src: '/assets/ui/icons/icon-05.png', cls: 'particle p4' },
  { src: '/assets/ui/icons/icon-06.png', cls: 'particle p5' },
  { src: '/assets/ui/icons/icon-07.png', cls: 'particle p6' },
]

export default function Home() {
  return (
    <div className="landing-bg game-scroll app-frame-outer">
      <div className="mobile-shell relative overflow-hidden">
        <div className="landing-overlay" />

        {FX_PARTICLES.map((p, i) => (
          <Image key={i} src={p.src} alt="" width={16} height={16} className={p.cls} aria-hidden />
        ))}

        <section className="relative z-10 flex min-h-[72dvh] flex-col items-center justify-center gap-4 px-5 text-center">
          <div className="relic-frame logo-drop relative h-24 w-24 overflow-hidden rounded-2xl p-1">
            <Image src="/logo.png" alt="CETAS" fill className="object-contain p-1" priority />
          </div>

          <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#fff2d2]">Dark Fantasy Auto Battler</p>
          <h1 className="font-heading text-[38px] leading-[0.95] text-[#ffe7a8] text-shadow-gold">CETAS</h1>
          <p className="max-w-[300px] text-[13px] leading-relaxed text-[#fff6e4]">
            Build squad. Fight realm. Earn glory.
          </p>

          <div className="flex gap-2">
            <Badge>Phase I</Badge>
            <Badge>Mobile Mini App</Badge>
          </div>

          <Link href="/game" className="mt-2 w-full max-w-[320px]">
            <Button variant="gold" size="lg" className="w-full anim-glow">
              <Swords className="h-4 w-4" /> MULAI BERMAIN
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}
