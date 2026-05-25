import LandingClient from '@/src/ui/LandingClient'
import AppHeader from '@/src/ui/hub/AppHeader'

/**
 * Shared layout for all hub pages: /home, /tasks, /leaderboard
 *
 * Structure:
 *   app-frame-outer  — full viewport, flex row, justify-center + align-start
 *   └─ mobile-shell  — max-w-[430px], flex col, min-h-dvh, scrolls vertically
 *       ├─ curtain   — fixed overlay, fades out on mount
 *       ├─ AppHeader — logo + version pill
 *       └─ main      — page content, pb-24 clears fixed BottomNav
 */
export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-frame-outer">
      <div className="mobile-shell home-bg game-scroll">

        {/* Page-transition curtain */}
        <div className="curtain" aria-hidden />

        <AppHeader />

        <main className="relative z-10 flex flex-col gap-3 px-4 pb-24 pt-2">
          {children}
        </main>

        {/* Keeps music alive when navigating between hub pages */}
        <LandingClient />

      </div>
    </div>
  )
}
