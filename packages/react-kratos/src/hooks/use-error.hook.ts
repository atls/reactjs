import type { ContextError } from '../providers/index.js'

import { useContext }        from 'react'

import { ErrorContext }      from '../providers/index.js'

export const useError = (): ContextError => {
  const error = useContext(ErrorContext)

  return error
}
