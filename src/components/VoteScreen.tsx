import { useState } from 'react'
import type { Player } from '../types'
import Button from './Button'
import Screen from './Screen'

interface Props {
  players: Player[]
  onDone: (votes: Record<number, number>) => void
}

export default function VoteScreen({ players, onDone }: Props) {
  const alive = players.filter((p) => p.alive)
  const [voterIndex, setVoterIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [votes, setVotes] = useState<Record<number, number>>({})

  const voter = alive[voterIndex]
  const isLast = voterIndex === alive.length - 1

  const handleConfirm = () => {
    if (selected === null) return
    const next = { ...votes, [voter.id]: selected }
    setVotes(next)
    if (isLast) {
      onDone(next)
      return
    }
    setRevealed(false)
    setSelected(null)
    setVoterIndex((i) => i + 1)
  }

  if (!revealed) {
    return (
      <Screen>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/40">Geef de telefoon aan</p>
          <h1 className="mb-10 text-4xl font-black text-white">{voter.name}</h1>
          <p className="mb-10 text-white/60">Stem privé op wie volgens jou liegt.</p>
        </div>
        <Button onClick={() => setRevealed(true)}>Tik om te stemmen</Button>
      </Screen>
    )
  }

  return (
    <Screen>
      <h1 className="mb-1 text-center text-lg font-bold text-white">{voter.name}, wie verdenk je?</h1>
      <p className="mb-6 text-center text-sm text-white/50">Tik op een naam en bevestig.</p>

      <div className="mb-6 flex flex-1 flex-col gap-3 overflow-y-auto">
        {alive
          .filter((p) => p.id !== voter.id)
          .map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition-all ${
                selected === p.id
                  ? 'border-indigo-400 bg-indigo-500 text-white'
                  : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              {p.name}
            </button>
          ))}
      </div>

      <Button onClick={handleConfirm} disabled={selected === null}>
        {isLast ? 'Bevestig stem & bekijk resultaten' : 'Bevestig stem & geef telefoon door'}
      </Button>
    </Screen>
  )
}
