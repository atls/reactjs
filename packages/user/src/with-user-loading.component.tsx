import { useContext } from 'react'

import { Context }    from './user.context'

export const WithUserLoading = ({ children }) => {
  const user = useContext(Context)

  if (typeof user !== 'undefined') {
    return null
  }

  return children
}
