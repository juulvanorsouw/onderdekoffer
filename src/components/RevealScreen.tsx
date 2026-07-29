import { useState } from 'react'
import mrWhiteImg from '../assets/mrwhite.png'
import type { Player } from '../types'
import Button from './Button'
import Screen from './Screen'

interface Props {
  players: Player[]
  onDone: () => void
}

export default function RevealScreen({ players, onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const player = players[index]
  const isLast = index === players.length - 1
  const isMrWhite = player.role === 'mrwhite'

  const handleNext = () => {
    if (isLast) {
      onDone()
      return
    }
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  if (!revealed) {
    return (
      <Screen>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/40">Geef de telefoon aan</p>
          <h1 className="mb-10 text-4xl font-black text-white">{player.name}</h1>
          <p className="mb-10 text-white/60">Zorg dat niemand anders het scherm kan zien.</p>
        </div>
        <Button onClick={() => setRevealed(true)}>Tik om mijn woord te zien</Button>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {isMrWhite ? (
          <div className="animate-flip-in mb-8 flex w-full flex-col items-center justify-center rounded-3xl bg-purple-500 p-10 ring-4 ring-purple-300">
            <span className="mb-4 rounded-full bg-black/20 px-4 py-1 text-sm font-bold uppercase tracking-widest text-white">
              Jij bent: Mr. White
            </span>
            <img src={mrWhiteImg} alt="Mr. White" className="mb-2 h-40 w-40 rounded-2xl object-cover" />
            <p className="mt-4 text-sm font-medium text-white/90">
              Jij hebt geen woord — bluf mee en luister goed naar de aanwijzingen van anderen.
            </p>
          </div>
        ) : (
          <div className="animate-flip-in mb-8 flex w-full flex-col items-center justify-center rounded-3xl bg-indigo-500 p-10 ring-4 ring-indigo-300">
            <span className="text-4xl font-black text-white">{player.word}</span>
            <p className="mt-4 text-sm font-medium text-white/90">
              Dit is jouw woord. Je weet niet of anderen hetzelfde woord hebben — let goed op wat ze zeggen!
            </p>
          </div>
        )}
        <p className="text-sm text-white/50">Onthoud het en verberg het voordat je de telefoon doorgeeft.</p>
      </div>
      <Button onClick={handleNext} variant="secondary">
        {isLast ? 'Klaar, begin het spel!' : 'Verbergen & doorgeven aan volgende speler'}
      </Button>
    </Screen>
  )
}
