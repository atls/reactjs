import type { ReactNode } from 'react'
import type { FC }        from 'react'

import { useContext }     from 'react'

import { Context }        from './user.context'

export interface WithUserProps {
  children: ReactNode | ((user: any) => ReactNode)
}

export const WithUser: FC<WithUserProps> = ({ children }) => {
  const user = useContext(Context)

  if (!user) {
    return null
  }

  if (typeof children === 'function') {
    return children(user)
  }

  return children
}
