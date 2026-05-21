'use client'

import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../game/state/gameStore'
import { getBoardUnitCount } from '../game/systems/boardSystem'
import { evaluateBattleEnd } from '../game/systems/combatSystem'
import PixiBoard from '../game/renderer/PixiBoard'
import TopBar from './TopBar'
import Bench from './Bench'
import Shop from './Shop'
import Controls from './Controls'
import BattleLog from './BattleLog'
import RoundModal from './RoundModal'

const BATTLE_LIMIT_MS = 30_000

export default function GameHUD() {
  const store = useGameStore()
  const {
    round, hp, gold, phase, maxBoardSlots,
    board, bench, shop, selected, battleRunning, battleTimeMs, speedUp, log,
    clickBoardCell, clickBenchSlot, buyUnit, reroll, sellSelected,
    startBattle, tickBattle, nextRound,
  } = store

  // ── Real-time battle loop with delta-time ─────────────────────────────────
  const rafRef = useRef<number>(0)
  const lastTsRef = useRef<number>(0)

  useEffect(() => {
    if (!battleRunning) {
      cancelAnimationFrame(rafRef.current)
      lastTsRef.current = 0
      return
    }

    function loop(ts: number) {
      const delta = lastTsRef.current ? Math.min(ts - lastTsRef.current, 100) : 16
      lastTsRef.current = ts
      tickBattle(delta)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [battleRunning, tickBattle])

  // ── Countdown display (seconds remaining, 0 when speed-up) ───────────────
  const secondsLeft = speedUp
    ? 0
    : Math.max(0, Math.ceil((BATTLE_LIMIT_MS - battleTimeMs) / 1000))

  // ── Modal ─────────────────────────────────────────────────────────────────
  const [modal, setModal] = useState<{
    show: boolean
    title: string
    titleColor: string
    description: string
    buttonLabel: string
  }>({ show: false, title: '', titleColor: '', description: '', buttonLabel: '' })

  useEffect(() => {
    if (phase !== 'battle' || battleRunning) return

    const result = evaluateBattleEnd(board, round)

    if (hp <= 0) {
      setModal({
        show: true,
        title: '☠️ Game Over',
        titleColor: '#D85A30',
        description: 'HP habis! Pertandingan selesai.',
        buttonLabel: 'Main Lagi',
      })
    } else if (result.win) {
      setModal({
        show: true,
        title: '🏆 Menang!',
        titleColor: '#1D9E75',
        description: `${result.aliveCount} unit selamat! +🪙${result.goldEarned} koin. Slot +1 (kini ${Math.min(maxBoardSlots + 1, 7)})`,
        buttonLabel: round >= 5 ? 'Main Lagi' : `Ronde ${round + 1} →`,
      })
    } else {
      setModal({
        show: true,
        title: '😤 Kalah!',
        titleColor: '#D85A30',
        description: `−${result.hpLost} HP. Sisa HP: ${Math.max(0, hp - result.hpLost)}`,
        buttonLabel: round >= 5 ? 'Main Lagi' : `Ronde ${round + 1} →`,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleRunning, phase])

  function handleNext() {
    setModal(m => ({ ...m, show: false }))
    nextRound()
  }

  const boardCount = getBoardUnitCount(board)

  return (
    <div className="font-sans p-2 select-none max-w-[700px] mx-auto">
      <h1 className="sr-only">Celo Tactics — auto-battler strategi roguelike berbasis grid</h1>

      <TopBar
        round={round}
        hp={hp}
        gold={gold}
        boardUnitCount={boardCount}
        maxBoardSlots={maxBoardSlots}
        phase={phase}
      />

      <PixiBoard
        board={board}
        phase={phase}
        selected={selected}
        maxBoardSlots={maxBoardSlots}
        onCellClick={clickBoardCell}
      />

      <Bench bench={bench} selected={selected} onSlotClick={clickBenchSlot} />

      <Shop shop={shop} onBuy={buyUnit} />

      <Controls
        phase={phase}
        hasSelected={selected !== null}
        battleRunning={battleRunning}
        secondsLeft={secondsLeft}
        speedUp={speedUp}
        onReroll={reroll}
        onSell={sellSelected}
        onBattle={startBattle}
      />

      <BattleLog log={log} />

      <RoundModal
        show={modal.show}
        title={modal.title}
        titleColor={modal.titleColor}
        description={modal.description}
        buttonLabel={modal.buttonLabel}
        onNext={handleNext}
      />
    </div>
  )
}
