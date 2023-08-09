import { useEffect } from 'react'
import { useState }  from 'react'

export const useInit = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const TINKOFF_SCRIPT_URL = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'

    const script = document.createElement('script')
    script.src = TINKOFF_SCRIPT_URL
    script.async = true

    script.onload = () => setIsLoaded(true)

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return isLoaded
}
