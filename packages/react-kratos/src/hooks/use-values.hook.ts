import type { ValuesStore } from '../providers/index.js'

import { useContext }       from 'react'

import { ValuesContext }    from '../providers/index.js'

export const useValues = (): ValuesStore => {
  const values = useContext(ValuesContext)

  return values
}
