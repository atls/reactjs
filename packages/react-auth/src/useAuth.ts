import { useContext } from 'react'

import { Context }    from './Context'

export const useAuth = () => useContext(Context)
