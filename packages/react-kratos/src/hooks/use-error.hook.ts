import type { ContextError } from '../providers'

import { useContext }        from 'react'

import { ErrorContext }      from '../providers'

export const useError = (): ContextError => {
  const error = useContext(ErrorContext)

  if (!error) {
    throw new Error('Missing <ErrorProvider>')
  }

  return error
}
