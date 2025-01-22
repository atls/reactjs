import type { FormEventHandler } from 'react'
import type { JSX }              from 'react'

import type { FormProps }        from '../../interfaces/index.js'

import { FormattedMessage }      from 'react-intl'
import React                     from 'react'

import { Button }                from '../button/button.component.js'
import { Fields }                from '../fields.component.js'
import { Settings }              from '../settings.component.js'
import { makePayment }           from '../../utils/index.js'
import { makePaymentWithCheck }  from '../../utils/index.js'
import { useForm }               from './use-form.hook.js'

export const Form = ({
  settings,
  amount,
  receipt,
  styles,
  useCustomButton,
  useCustomFields,
  children,
}: FormProps): JSX.Element => {
  const { isValidate, disabled, isLoaded } = useForm()
  const payHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (!isValidate) return

    if (receipt) {
      makePaymentWithCheck(event, receipt)
    } else {
      makePayment(event)
    }
  }

  return (
    <form name='payform-tinkoff' onSubmit={payHandler}>
      <Settings {...settings} isGenerateReceipt={!!receipt} />
      <Fields
        amount={amount}
        direction={styles?.direction}
        inputGaps={styles?.inputGaps}
        useCustomFields={useCustomFields}
      />
      {children}
      {!useCustomButton && (
        <Button type='submit' disabled={!isLoaded || disabled} {...styles?.button}>
          <FormattedMessage id='payment_widget.pay' defaultMessage='Оплатить' />
        </Button>
      )}
    </form>
  )
}
