import type { FormEventHandler } from 'react'
import type { FormEvent }        from 'react'

import type { Receipt }          from '../interfaces'
import type { ReceiptSettings }  from '../interfaces'

import { convertToPenny }        from './convert-to-penny.util'

type PayFunction = (form: HTMLFormElement) => void

interface CustomWindow extends Window {
  pay: PayFunction
}

export const makePayment: FormEventHandler<HTMLFormElement> = (
  event: FormEvent<HTMLFormElement>
) => {
  const { pay } = window as unknown as CustomWindow
  pay(event.target as HTMLFormElement)
}

export const makePaymentWithCheck = (
  event: FormEvent<HTMLFormElement>,
  receiptSettings: ReceiptSettings
): void => {
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

  const { pay } = window as unknown as CustomWindow
  pay(form)
}
