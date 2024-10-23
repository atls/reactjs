import type { FormContext } from '../../interfaces'

import { useContext }       from 'react'

import { Context }          from './form.context'

export const useForm = (): FormContext => {
  const context = useContext(Context)

  if (!context) throw new Error('Missing form context provider')

  return context
}
