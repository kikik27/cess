// Shared types used across all layers

export type GamePhase = 'prep' | 'battle'

export interface FloatText {
  txt: string
  rise: number
  life: number
  color: string
}

export type UnitAnimState = 'idle' | 'walk' | 'attack' | 'hurt' | 'death'

/** A live unit instance on the board or bench */
export interface Unit {
  // identity
  uid: number
  id: string
  name: string
  cost: number
  stars: number
  enemy: boolean
  trait: string
  /** Tiny Swords sprite sheet type — explicit, no guessing */
  spriteType: string
  // stats
  maxHp: number
  curHp: number
  atkVal: number
  spd: number
  // rendering hints (used by canvas renderer)
  color: string
  accent: string
  body: number[][]
  // sprite animation state (managed by renderer)
  animState: UnitAnimState
  animFrame: number
  animElapsed: number
  animDone: boolean
  // legacy bob anim (kept for fallback)
  anim: number
  animDir: number
  shake: number
  attackTimer: number
  dead: boolean
  floats: FloatText[]
}

export interface GridPosition {
  row: number
  col: number
}

export type BoardGrid = (Unit | null)[][]

export type BenchSlots = (Unit | null)[]

export interface ShopItem {
  id: string
  name: string
  cost: number
  atk: number
  hp: number
  spd: number
  color: string
  accent: string
  trait: string
  spriteType: string
  body: number[][]
  sold: boolean
}

export type SelectedSource =
  | { src: 'board'; r: number; c: number }
  | { src: 'bench'; idx: number }
  | null

export interface GameState {
  round: number
  hp: number
  gold: number
  phase: GamePhase
  maxBoardSlots: number
  board: BoardGrid
  bench: BenchSlots
  shop: ShopItem[]
  selected: SelectedSource
  battleRunning: boolean
  /** Elapsed battle time in ms */
  battleTimeMs: number
  /** True when 30s elapsed — combat runs at 3× speed until someone wins */
  speedUp: boolean
  log: string[]
}
