import { FormEvent }        from 'react'
import { FormEventHandler } from 'react'

import { Receipt }          from '../interfaces'
import { ReceiptSettings }  from '../interfaces'
import { convertToPenny }   from './convert-to-penny.util'

export const makePayment: FormEventHandler<HTMLFormElement> = (event) => {
  const { pay } = window as any
  pay(event.target)
}

export const makePaymentWithCheck = (
  event: FormEvent<HTMLFormElement>,
  receiptSettings: ReceiptSettings
) => {
  const form = event.target as HTMLFormElement
  const receiptElement = form.elements.namedItem('receipt') as HTMLInputElement
  const email = form.elements.namedItem('email') as HTMLInputElement
  const phone = form.elements.namedItem('phone') as HTMLInputElement

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
