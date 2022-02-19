import { useState }            from 'react'
import { getDomain }           from 'tldjs'

import { UseIdentityUrlProps } from './identity-url.interfaces'
import { useBrowserEffect }    from './use-browser-effect.hook'

export const identityUrlTypes = {
  login: '/auth/login',
  registration: '/auth/registration',
  verification: '/auth/verification',
  recovery: '/auth/recovery',
  logout: '/auth/logout',
  settings: '/profile/settings',
}

export const useIdentityUrl = ({ type = 'login', returnTo }: UseIdentityUrlProps = {}):
  | string
  | null => {
  const [url, setUrl] = useState<string | null>(null)

  useBrowserEffect(() => {
    const { hostname, origin, href, protocol } = window.location
    const path = identityUrlTypes[type]

    const domain = hostname === 'localhost' ? 'localhost:4433' : getDomain(hostname)

    if (returnTo === false) {
      setUrl(`${protocol}//accounts.${domain}${path}`)
    } else {
      let returnToValue = href

      if (returnTo) {
        if (returnTo.startsWith('http')) {
          returnToValue = returnTo
        } else if (returnTo.startsWith('/')) {
          returnToValue = `${origin}${returnTo}`
        }
      }

      setUrl(`${protocol}//accounts.${domain}${path}?return_to=${returnToValue}`)
    }
  }, [type, returnTo])

  return url
}
