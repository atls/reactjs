import { useContext } from 'react'

import { Context }    from './Context'

export const WithUser = ({ children }: any) => {
  const user = useContext(Context)

  if (!user) {
    return null
  }

  return children
}
