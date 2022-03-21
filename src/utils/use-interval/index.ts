import {useRef, useEffect} from 'react'

const Main = (callback: () => void, delay: number | null) => {
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

export default Main
