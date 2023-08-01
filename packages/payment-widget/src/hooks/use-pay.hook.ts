import { MouseEventHandler } from 'react'

import { FieldsNames }       from '../interfaces/payment-fields.interfaces'
import { useInit }           from './use-init.hook'

export const usePay = (formFields: Record<FieldsNames, string>) => {
  const payRef = useInit()

  const pay: MouseEventHandler<HTMLButtonElement> = (event) => {
    try {
      if (payRef.current) {
        event.preventDefault()
        payRef.current(formFields)
      }
    } catch (e) {
      // This is where the error handling should be
      // console.error(e)
    }
  }

  return pay
}
