import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cache de performance
const perfCache = new Map<string, number>()

// Debounce utility
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Memoização para cálculos pesados
export function memoize<TArgs extends unknown[], TResult>(
  func: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => string
): typeof func {
  const cache = new Map<string, TResult>()

  return ((...args: TArgs) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args)
    const cachedResult = cache.get(key)

    if (cachedResult !== undefined) {
      return cachedResult
    }

    const result = func(...args)
    cache.set(key, result)
    return result
  }) as typeof func
}

// Medição de performance
export function measurePerformance(key: string, callback: () => void) {
  const start = performance.now()
  callback()
  const end = performance.now()
  perfCache.set(key, end - start)
}