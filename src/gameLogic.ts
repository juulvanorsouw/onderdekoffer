import { WORD_PAIRS } from './data/wordPairs'
import type { GameSettings, Player, Role } from './types'

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function assignRoles(
  names: string[],
  settings: GameSettings,
  lastContinent?: string | null,
): { players: Player[]; civilianWord: string; undercoverWord: string; continent: string | null } {
  const categoryPool = settings.category === 'Alle categorieën' ? WORD_PAIRS : WORD_PAIRS.filter((p) => p.category === settings.category)
  const otherContinentPool = lastContinent ? categoryPool.filter((p) => p.continent !== lastContinent) : categoryPool
  const pool = otherContinentPool.length > 0 ? otherContinentPool : categoryPool
  const pair = pool[Math.floor(Math.random() * pool.length)]
  const [civilianWord, undercoverWord] = Math.random() < 0.5 ? [pair.a, pair.b] : [pair.b, pair.a]

  const roles: Role[] = []
  for (let i = 0; i < settings.undercoverCount; i++) roles.push('undercover')
  if (settings.includeMrWhite) roles.push('mrwhite')
  while (roles.length < names.length) roles.push('civilian')

  const shuffledRoles = shuffle(roles)
  const order = shuffle(names.map((_, i) => i))

  const players: Player[] = names.map((name, i) => {
    const roleIndex = order.indexOf(i)
    const role = shuffledRoles[roleIndex]
    const word = role === 'civilian' ? civilianWord : role === 'undercover' ? undercoverWord : null
    return {
      id: i,
      name,
      role,
      word,
      alive: true,
      hasRevealed: false,
    }
  })

  return {
    players: shuffle(players).map((p, i) => ({ ...p, id: i })),
    civilianWord,
    undercoverWord,
    continent: pair.continent ?? null,
  }
}
