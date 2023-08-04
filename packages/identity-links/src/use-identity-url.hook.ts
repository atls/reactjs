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

export const useIdentityUrl = ({ type = 'login', returnTo = false }: UseIdentityUrlProps = {}):
  | string
  | null => {
  const [url, setUrl] = useState<string | null>(null)

  useBrowserEffect(() => {
    const { hostname, origin, href, protocol, pathname } = window.location
    const path = identityUrlTypes[type]

    if (hostname === 'localhost') {
      setUrl(`${protocol}//localhost:3000${path}`)
    } else {
      const domain = getDomain(hostname)

      if (returnTo === false) {
        setUrl(`${protocol}//accounts.${domain}${path}`)
      } else if (returnTo === true) {
        setUrl(`${protocol}//accounts.${domain}${path}?return_to=${href}`)
      } else {
        const returnToOrigin = returnTo.subdomain
          ? `${protocol}//${returnTo.subdomain}.${domain}`
          : origin
        const returnToValue = `${returnToOrigin}${returnTo.pathname ? returnTo.pathname : pathname}`

        setUrl(`${protocol}//accounts.${domain}${path}?return_to=${returnToValue}`)
      }
    }
  }, [type, returnTo])

  return url
}
