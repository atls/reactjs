import { useState }         from 'react'
import { getDomain }        from 'tldjs'

import { UseAppUrlProps }   from './app-url.interfaces'
import { useBrowserEffect } from './use-browser-effect.hook'

export const useAppUrl = ({ subdomain, pathname = '/' }: UseAppUrlProps = {}): string | null => {
  const [url, setUrl] = useState<string | null>(null)

  useBrowserEffect(() => {
    const { hostname, protocol } = window.location

    const domain = getDomain(hostname)

    const origin = subdomain ? `${protocol}//${subdomain}.${domain}` : `${protocol}//${domain}`

    setUrl(`${origin}${pathname}`)
  }, [subdomain, pathname])

  return url
}
