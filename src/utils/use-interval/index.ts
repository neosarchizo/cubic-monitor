import {useRef, useEffect} from 'react'

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(() => {})

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      const {current} = savedCallback

      current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return () => {}
  }, [delay])
}

export const useIntervalOnlyEffect = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(callback, delay)
      return () => clearInterval(id)
    }
    return () => {}
  }, [delay, callback])
}
