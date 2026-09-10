import { useEffect, useState } from 'react'

export function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (!stored) return fallback
      const parsed = JSON.parse(stored)
      return parsed.version === fallback.version ? parsed : fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
