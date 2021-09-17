import { useContext } from 'react'

import { Context }    from './user.context'

export const useUser = () => useContext(Context)
