import { useContext } from 'react'

import { Context }    from './user.context'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUser = (): any => useContext(Context)
