import { MouseEventHandler } from 'react'

import { FieldsNames }       from '../interfaces/payment-fields.interfaces'
import { init }               from './init.util'

export const getPay = (formFields: Record<FieldsNames, string>) => {
  const handlePay: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    const pay = await init()
    pay(formFields)
  }

  return handlePay
}
