import Button from './Button'
import Screen from './Screen'

interface Props {
  names: string[]
  onDone: () => void
}

export default function OrderScreen({ names, onDone }: Props) {
  return (
    <Screen>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-white/40">Spreekvolgorde</p>
        <h1 className="mb-8 text-2xl font-black text-white">Wie zegt wat na wie?</h1>
        <div className="flex w-full flex-col gap-3">
          {names.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="text-lg font-bold text-white">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={onDone}>Beginnen met omschrijven</Button>
    </Screen>
  )
}
