import type { Role } from './types'

export const roleColors: Record<Role, { bg: string; ring: string; text: string; label: string }> = {
  civilian: { bg: 'bg-emerald-500', ring: 'ring-emerald-300', text: 'text-emerald-400', label: 'Burger' },
  undercover: { bg: 'bg-red-500', ring: 'ring-red-300', text: 'text-red-400', label: 'Ondercover' },
  mrwhite: { bg: 'bg-purple-500', ring: 'ring-purple-300', text: 'text-purple-400', label: 'Mr. White' },
}
