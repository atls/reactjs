import { useContext }  from 'react'

import { FormContext } from '../../interfaces'
import { Context }     from './form.context'

export const useForm = (): FormContext => {
  const context = useContext(Context)

  if (!context) throw new Error('Missing form context provider')

  return context
}
