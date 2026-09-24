import type { ContextSubmit } from '../providers/index.js'
import type { Body }          from '../providers/index.js'

import { useContext }         from 'react'

import { SubmitContext }      from '../providers/index.js'

export const useSubmit = <T extends Body>(): ContextSubmit<T> => {
  const submit = useContext(SubmitContext)

  return submit
}
