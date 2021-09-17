import { useEffect }           from 'react'
import { useState }            from 'react'

import { UseIdentityUrlProps } from './identity-url.interfaces'

export const IdentityUrlTypes = {
  login: '/auth/login',
  registration: '/auth/registration',
  verification: '/auth/verification',
  recovery: '/auth/recovery',
  logout: '/auth/logout',
  settings: '/profile/settings',
}

export const useIdentityUrl = ({
  type = 'login',
  subdomain = 'accounts',
  returnTo,
  substractHost,
}: UseIdentityUrlProps = {}): string | null => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { hostname, origin, href } = window.location
      const path = IdentityUrlTypes[type]

      let host = hostname

      if (substractHost && host.startsWith(substractHost)) {
        host = host.replace(substractHost.endsWith('.') ? substractHost : `${substractHost}.`, '')
      }

      if (subdomain) {
        host = `${subdomain}.${host}`
      }

      if (returnTo === false) {
        setUrl(`https://${host}${path}`)
      } else {
        let returnToValue = href

        if (returnTo) {
          if (returnTo.startsWith('http')) {
            returnToValue = returnTo
          } else if (returnTo.startsWith('/')) {
            returnToValue = `${origin}${returnTo}`
          }
        }

        setUrl(`https://${host}${path}?return_to=${returnToValue}`)
      }
    }
  }, [type, subdomain, returnTo, substractHost])

  return url
}
