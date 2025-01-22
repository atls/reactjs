import type { ValuesStore } from '../providers'

import { useContext }       from 'react'

import { ValuesContext }    from '../providers'

export const useValues = (): ValuesStore => {
  const values = useContext(ValuesContext)

  if (!values) {
    throw new Error('Missing <ValuesProvider>')
  }

  return values
}
