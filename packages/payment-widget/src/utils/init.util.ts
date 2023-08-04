export const init = () => {
  const TINKOFF_SCRIPT_URL = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'

  const existingScript = document.querySelector(`script[src='${TINKOFF_SCRIPT_URL}']`)
  if (existingScript) {
    return (window as any).pay
  }

  return new Promise<Function>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = TINKOFF_SCRIPT_URL
    script.async = true

    script.onload = () => {
      const pay = (window as any).pay as Function
      resolve(pay)
    }

    script.onerror = () => {
      reject(new Error('Failed to load Tinkoff Cashier script.'))
    }

    document.body.appendChild(script)
  })
}
