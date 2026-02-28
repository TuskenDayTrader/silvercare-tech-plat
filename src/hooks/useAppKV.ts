import { useState, useCallback } from 'react'
import { useKV as useSparkKV } from '@github/spark/hooks'

type KVSetValue<T> = (valueOrUpdater: T | ((prev: T) => T)) => void
type KVDeleteValue = () => void

function readFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item !== null ? (JSON.parse(item) as T) : defaultValue
  } catch {
    return defaultValue
  }
}

function writeToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable, silently ignore
  }
}

function useLocalKV<T>(key: string, defaultValue: T): [T, KVSetValue<T>, KVDeleteValue] {
  const [value, setValueState] = useState<T>(() => readFromLocalStorage(key, defaultValue))

  const setValue: KVSetValue<T> = useCallback(
    (valueOrUpdater) => {
      setValueState((prev) => {
        const next =
          typeof valueOrUpdater === 'function'
            ? (valueOrUpdater as (prev: T) => T)(prev)
            : valueOrUpdater
        writeToLocalStorage(key, next)
        return next
      })
    },
    [key]
  )

  const deleteValue: KVDeleteValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
    setValueState(defaultValue)
  }, [key, defaultValue])

  return [value, setValue, deleteValue]
}

function useSparkKVWrapper<T>(key: string, defaultValue: T): [T, KVSetValue<T>, KVDeleteValue] {
  const [value, setValue] = useSparkKV<T>(key, defaultValue)
  // Spark KV does not expose a client-side delete; the no-op is intentional.
  const deleteValue: KVDeleteValue = () => {
    // no-op: deletion managed by Spark runtime
  }
  return [value, setValue as KVSetValue<T>, deleteValue]
}

// VITE_DEMO_MODE is statically replaced with a literal string at build time by Vite,
// making DEMO_MODE a true compile-time constant. Only one branch is ever reachable
// per build, so the eslint-disable comments below are intentional and safe.
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

export function useAppKV<T>(key: string, defaultValue: T): [T, KVSetValue<T>, KVDeleteValue] {
  if (DEMO_MODE) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useLocalKV(key, defaultValue)
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSparkKVWrapper(key, defaultValue)
}
