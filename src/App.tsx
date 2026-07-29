import { useState } from 'react'
import milanBg from './assets/milan.jpg'
import RevealScreen from './components/RevealScreen'
import SetupScreen from './components/SetupScreen'
import { assignRoles } from './gameLogic'
import type { GameSettings, Player, Screen as ScreenName } from './types'

const DEFAULT_SETTINGS: GameSettings = {
  undercoverCount: 1,
  includeMrWhite: false,
  category: 'Alle categorieën',
}

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('setup')
  const [names, setNames] = useState<string[]>([])
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS)
  const [players, setPlayers] = useState<Player[]>([])
  const [lastContinent, setLastContinent] = useState<string | null>(null)

  const startGame = (playerNames: string[], gameSettings: GameSettings) => {
    const { players: newPlayers, continent } = assignRoles(playerNames, gameSettings, lastContinent)
    setNames(playerNames)
    setSettings(gameSettings)
    setPlayers(newPlayers)
    setLastContinent(continent)
    setScreen('reveal')
  }

  const handleRevealDone = () => setScreen('setup')

  return (
    <div
      className="min-h-dvh bg-slate-900 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${milanBg})` }}
    >
      {screen === 'setup' && <SetupScreen initialNames={names} settings={settings} onStart={startGame} />}
      {screen === 'reveal' && <RevealScreen players={players} onDone={handleRevealDone} />}
    </div>
  )
}
