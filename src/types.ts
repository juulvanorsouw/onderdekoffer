export type Role = 'civilian' | 'undercover' | 'mrwhite'

export interface Player {
  id: number
  name: string
  role: Role
  word: string | null
  alive: boolean
  hasRevealed: boolean
}

export type Screen = 'setup' | 'reveal'

export interface GameSettings {
  undercoverCount: number
  includeMrWhite: boolean
  category: string | 'Alle categorieën'
}
