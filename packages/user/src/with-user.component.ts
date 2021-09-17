import { useContext } from 'react'

import { Context }    from './user.context'

export const WithUser = ({ children }) => {
  const user = useContext(Context)

  if (!user) {
    return null
  }

  if (typeof children === 'function') {
    return children(user)
  }

  return children
}
