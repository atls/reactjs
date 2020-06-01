import React       from 'react'

import { Context } from './Context'

export const WithouthUser = ({ children }: any) => {
  const user = React.useContext(Context)

  if (user) {
    return null
  }

  return children
}
