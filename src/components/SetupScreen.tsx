import { useState } from 'react'
import { CATEGORIES } from '../data/wordPairs'
import type { GameSettings } from '../types'
import Button from './Button'
import Screen from './Screen'

const ALL_CATEGORIES = 'Alle categorieën'

interface Props {
  initialNames: string[]
  settings: GameSettings
  onStart: (names: string[], settings: GameSettings) => void
}

const MIN_PLAYERS = 3
const MAX_PLAYERS = 12

export default function SetupScreen({ initialNames, settings, onStart }: Props) {
  const [names, setNames] = useState<string[]>(initialNames.length ? initialNames : ['', '', ''])
  const [undercoverCount, setUndercoverCount] = useState(settings.undercoverCount)
  const [includeMrWhite, setIncludeMrWhite] = useState(settings.includeMrWhite)
  const [category, setCategory] = useState<string>(settings.category ?? ALL_CATEGORIES)
  const [error, setError] = useState('')

  const updateName = (i: number, value: string) => {
    const next = [...names]
    next[i] = value
    setNames(next)
  }

  const addPlayer = () => {
    if (names.length >= MAX_PLAYERS) return
    setNames([...names, ''])
  }

  const removePlayer = (i: number) => {
    if (names.length <= MIN_PLAYERS) return
    setNames(names.filter((_, idx) => idx !== i))
  }

  const minUndercover = includeMrWhite ? 0 : 1
  const maxUndercover = Math.max(minUndercover, names.length - (includeMrWhite ? 2 : 1))

  const handleStart = () => {
    const trimmed = names.map((n) => n.trim())
    if (trimmed.some((n) => !n)) {
      setError('Elke speler heeft een naam nodig.')
      return
    }
    if (trimmed.length < MIN_PLAYERS) {
      setError(`Je hebt minimaal ${MIN_PLAYERS} spelers nodig.`)
      return
    }
    const specialRoles = undercoverCount + (includeMrWhite ? 1 : 0)
    if (specialRoles >= trimmed.length) {
      setError('Te veel speciale rollen voor dit aantal spelers.')
      return
    }
    setError('')
    onStart(trimmed, {
      undercoverCount,
      includeMrWhite,
      category,
    })
  }

  return (
    <Screen>
      <h1 className="mb-1 text-center text-3xl font-black tracking-tight text-white">Onder de koffer 🧳</h1>
      <p className="mb-6 text-center text-sm text-white/60">Doorgeef-spel voor sociale deductie</p>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Spelers ({names.length})</h2>
        <span className="text-xs text-white/50">{MIN_PLAYERS}-{MAX_PLAYERS}</span>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        {names.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-6 text-center text-sm font-bold text-white/40">{i + 1}</span>
            <input
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`Speler ${i + 1}`}
              maxLength={20}
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-indigo-400"
            />
            <button
              onClick={() => removePlayer(i)}
              disabled={names.length <= MIN_PLAYERS}
              className="rounded-xl px-3 py-3 text-white/50 disabled:opacity-20"
              aria-label="Verwijder speler"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <Button variant="secondary" onClick={addPlayer} disabled={names.length >= MAX_PLAYERS} className="mb-6">
        + Speler toevoegen
      </Button>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-lg font-bold text-white">Categorie</h2>
        <div className="flex flex-wrap gap-2">
          {[ALL_CATEGORIES, ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                category === c ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-lg font-bold text-white">Instellingen</h2>

        <div className="flex items-center justify-between">
          <span className="text-white/80">Ondercover-spelers</span>
          <div className="flex items-center gap-3">
            <button
              className="h-9 w-9 rounded-full bg-white/10 text-white active:scale-90"
              onClick={() => setUndercoverCount((c) => Math.max(minUndercover, c - 1))}
            >
              −
            </button>
            <span className="w-5 text-center font-bold text-white">{undercoverCount}</span>
            <button
              className="h-9 w-9 rounded-full bg-white/10 text-white active:scale-90"
              onClick={() => setUndercoverCount((c) => Math.min(maxUndercover, c + 1))}
            >
              +
            </button>
          </div>
        </div>

        <label className="flex items-center justify-between">
          <span className="text-white/80">Mr. White meedoen</span>
          <input
            type="checkbox"
            checked={includeMrWhite}
            onChange={(e) => {
              const checked = e.target.checked
              setIncludeMrWhite(checked)
              if (!checked) setUndercoverCount((c) => Math.max(1, c))
            }}
            className="h-6 w-6 accent-purple-500"
          />
        </label>
      </div>

      {error && <p className="mb-4 text-center text-sm font-medium text-red-400">{error}</p>}

      <div className="mt-auto pt-2">
        <Button onClick={handleStart}>Start Spel</Button>
      </div>
    </Screen>
  )
}
