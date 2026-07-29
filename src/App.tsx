import { useState } from 'react'
import milanBg from './assets/milan.jpg'
import OrderScreen from './components/OrderScreen'
import RevealScreen from './components/RevealScreen'
import SetupScreen from './components/SetupScreen'
import { assignRoles, shuffle } from './gameLogic'
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
  const [speakOrder, setSpeakOrder] = useState<string[]>([])

  const startGame = (playerNames: string[], gameSettings: GameSettings) => {
    const { players: newPlayers, continent } = assignRoles(playerNames, gameSettings, lastContinent)
    setNames(playerNames)
    setSettings(gameSettings)
    setPlayers(newPlayers)
    setLastContinent(continent)
    setSpeakOrder(shuffle(playerNames))
    setScreen('reveal')
  }

  const handleRevealDone = () => setScreen('order')

  const handleOrderDone = () => setScreen('setup')

  return (
    <div
      className="min-h-dvh bg-slate-900 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${milanBg})` }}
    >
      {screen === 'setup' && <SetupScreen initialNames={names} settings={settings} onStart={startGame} />}
      {screen === 'reveal' && <RevealScreen players={players} onDone={handleRevealDone} />}
      {screen === 'order' && <OrderScreen names={speakOrder} onDone={handleOrderDone} />}
    </div>
  )
}
