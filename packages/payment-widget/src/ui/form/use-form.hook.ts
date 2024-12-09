import type { FormContext } from '../../interfaces/index.js'

import { useContext }       from 'react'

import { Context }          from './form.context.js'

export const useForm = (): FormContext => {
  const context = useContext(Context)

  if (!context) throw new Error('Missing form context provider')

  return context
}
