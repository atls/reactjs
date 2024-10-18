import type { FC }        from 'react'
import type { ReactNode } from 'react'

import { useContext }     from 'react'

import { Context }        from './user.context'

export interface WithoutUserProps {
  children: ReactNode
}

export const WithoutUser: FC<WithoutUserProps> = ({ children }: WithoutUserProps) => {
  const user = useContext(Context)

  if (user) {
    return null
  }

  return children
}
