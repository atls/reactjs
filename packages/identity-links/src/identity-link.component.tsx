import { FC }                  from 'react'

import { UseIdentityUrlProps } from './identity-url.interfaces'
import { useIdentityUrl }      from './use-identity-url.hook'

export const IdentityLink: FC<UseIdentityUrlProps> = ({ children, type, returnTo }) => {
  const url = useIdentityUrl({ type, returnTo })

  if (!children || !url) {
    return null
  }

  if (typeof children !== 'function') {
    throw new Error('IdentityLink - children must be a function.')
  }

  return children(url)
}
