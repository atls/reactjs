import { useContext } from 'react'

import { Context }    from './Context'

export const useUser = () => useContext(Context)
