import { useContext } from 'react'

import { Context }    from './Context'

export const WithoutUser = ({ children }: any) => {
  const user = useContext(Context)

  if (user) {
    return null
  }

  return children
}
