import {useRef, useEffect} from 'react'

const Main = (callback, delay: number | null) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      const {current} = savedCallback

      if (current !== undefined && current !== null) {
        const cb = current as () => void
        cb()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return () => {}
  }, [delay])
}

export default Main
