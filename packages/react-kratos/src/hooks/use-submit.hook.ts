import type { ContextSubmit } from '../providers'
import type { Body }          from '../providers'

import { useContext }         from 'react'

import { SubmitContext }      from '../providers'

export const useSubmit = <T extends Body>(): ContextSubmit<T> => {
  const submit = useContext(SubmitContext)

  if (!submit) {
    throw new Error('Missing <SubmitProvider>')
  }

  return submit
}
