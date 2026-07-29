import { useEffect, useState } from 'react'
import type { Player } from '../types'
import Button from './Button'
import Screen from './Screen'

interface Props {
  players: Player[]
  round: number
  turnTimerSeconds: number | null
  onDone: () => void
}

export default function DescribeScreen({ players, round, turnTimerSeconds, onDone }: Props) {
  const alive = players.filter((p) => p.alive)
  const [turnIndex, setTurnIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(turnTimerSeconds ?? 0)

  useEffect(() => {
    setSecondsLeft(turnTimerSeconds ?? 0)
  }, [turnIndex, turnTimerSeconds])

  useEffect(() => {
    if (turnTimerSeconds === null) return
    if (secondsLeft <= 0) return
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft, turnTimerSeconds])

  const isLast = turnIndex === alive.length - 1
  const current = alive[turnIndex]

  const handleNext = () => {
    if (isLast) {
      onDone()
      return
    }
    setTurnIndex((i) => i + 1)
  }

  return (
    <Screen>
      <p className="mb-1 text-center text-sm uppercase tracking-widest text-white/40">Ronde {round} · Omschrijffase</p>
      <h1 className="mb-8 text-center text-2xl font-bold text-white">Geef één aanwijzing over je woord</h1>

      <div className="mb-8 flex flex-1 flex-col items-center justify-center">
        <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-indigo-500 text-center text-2xl font-black text-white shadow-lg shadow-indigo-500/40">
          {current.name}
        </div>
        <p className="text-white/60">{current.name} is aan de beurt om hardop een aanwijzing te geven.</p>
        {turnTimerSeconds !== null && (
          <p className={`mt-4 text-4xl font-black ${secondsLeft <= 5 ? 'text-red-400' : 'text-white'}`}>{secondsLeft}s</p>
        )}
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {alive.map((p, i) => (
          <span
            key={p.id}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              i === turnIndex ? 'bg-indigo-500 text-white' : i < turnIndex ? 'bg-white/10 text-white/40' : 'bg-white/5 text-white/60'
            }`}
          >
            {p.name}
          </span>
        ))}
      </div>

      <Button onClick={handleNext}>{isLast ? 'Iedereen heeft omschreven — Naar stemmen' : `${current.name} klaar — Volgende speler`}</Button>
    </Screen>
  )
}
