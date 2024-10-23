import { useEffect } from 'react'
import { useState }  from 'react'

export const useInit = (): boolean => {
  const [isLoaded, setIsLoaded] = useState(false)
  const TINKOFF_SCRIPT_URL = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'

  useEffect(() => {
    if (document.querySelector(`script[src="${TINKOFF_SCRIPT_URL}"]`)) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = TINKOFF_SCRIPT_URL
    script.async = true

    script.onload = (): void => {
      setIsLoaded(true)
    }
    script.onerror = (): void => {
      /* eslint-disable no-console */
      console.error('Ошибка загрузки скрипта:', TINKOFF_SCRIPT_URL)
    }

    document.body.appendChild(script)

    /* eslint-disable consistent-return */
    return () => {
      document.body.removeChild(script)
    }
  }, [TINKOFF_SCRIPT_URL])

  return isLoaded
}
