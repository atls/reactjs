import type { FC }        from 'react'
import type { ReactNode } from 'react'

import { useContext }     from 'react'

import { Context }        from './user.context'

export interface WithUserLoadingProps {
  children: ReactNode
}

export const WithUserLoading: FC<WithUserLoadingProps> = ({ children }) => {
  const user = useContext(Context)

  if (typeof user !== 'undefined') {
    return null
  }

  return children
}
