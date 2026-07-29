import type { ReactNode } from 'react'

export default function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-6">
      {children}
    </div>
  )
}
