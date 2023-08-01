import { useEffect } from 'react'
import { useRef }    from 'react'

const TINKOFF_SCRIPT_URL = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'

export const useInit = () => {
  const payRef = useRef<Function | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = TINKOFF_SCRIPT_URL
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      payRef.current = (window as any).pay as Function
    }

    script.onerror = () => {
      // // This is where the error handling should be
      // console.error('Failed to load Tinkoff Cashier script.')
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return payRef
}
