import { FormEventHandler } from 'react'

import { init }            from './init.util'

export const handlerPay: FormEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault()
  const pay = await init()
  pay(event.target)
}
