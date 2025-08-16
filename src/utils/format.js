export const fmt = {
  pct(n){ return `${n}%` },
  k(n){ return Intl.NumberFormat('fr-FR', { notation: 'compact' }).format(n) }
}
