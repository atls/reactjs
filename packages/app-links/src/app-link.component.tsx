import { FC }           from 'react'

import { AppLinkProps } from './app-url.interfaces'
import { useAppUrl }    from './use-app-url.hook'

export const AppLink: FC<AppLinkProps> = ({ children, subdomain, pathname }) => {
  const url = useAppUrl({ subdomain, pathname })

  if (!children || !url) return null

  if (typeof children !== 'function') throw new Error('AppLink - children must be a function.')

  return children(url)
}
