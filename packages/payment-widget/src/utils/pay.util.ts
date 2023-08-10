import { FormEventHandler } from 'react'
import { MouseEvent }       from 'react'

import { Receipt }          from '../interfaces'
import { ReceiptSettings }  from '../interfaces'
import { convertToPenny }   from './convert-to-penny.util'

export const makePayment: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault()
  const { pay } = window as any
  pay(event.target)
}

export const makePaymentWithCheck = (
  event: MouseEvent<HTMLButtonElement>,
  receiptSettings: ReceiptSettings
) => {
  event.preventDefault()
  const form = event.currentTarget?.parentElement

  if (!form) return
  const receiptElement = form.querySelector('input[name="receipt"]') as HTMLInputElement
  const email = form.querySelector('input[name="email"]') as HTMLInputElement
  const phone = form.querySelector('input[name="phone"]') as HTMLInputElement

  const receipt: Receipt = {
    Taxation: receiptSettings.Taxation,
    EmailCompany: receiptSettings.EmailCompany,
    Items: convertToPenny(receiptSettings.Items),
  }

  if (email?.value) {
    receipt.Email = email.value
  }

  if (phone?.value) {
    receipt.Phone = phone.value
  }

  receiptElement.value = JSON.stringify(receipt)

  const { pay } = window as any
  pay(form)
}
