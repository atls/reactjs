import React       from 'react'

import { Context } from './Context'

export const useAuth = () => React.useContext(Context)
