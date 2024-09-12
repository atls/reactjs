import { FormEventHandler }     from 'react'
import { FormattedMessage }     from 'react-intl'
import React                    from 'react'

import { FormProps }            from '../../interfaces'
import { Button }               from '../button/button.component'
import { Fields }               from '../fields.component'
import { Settings }             from '../settings.component'
import { makePayment }          from '../../utils'
import { makePaymentWithCheck } from '../../utils'
import { useForm }              from './use-form.hook'

export const Form = ({
  settings,
  amount,
  receipt,
  styles,
  useCustomButton,
  useCustomFields,
  children,
}: FormProps) => {
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
