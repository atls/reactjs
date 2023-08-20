import React                    from 'react'
import { FormEventHandler }     from 'react'
import { FormattedMessage }     from 'react-intl'

import { PaymentWidgetProps }   from '../interfaces'
import { PaymentButton }        from './payment-button/payment-button.component'
import { PaymentFields }        from './payment-fields.component'
import { PaymentSettings }      from './payment-settings.component'
import { useInit }              from '../hooks'
import { useValidate }          from '../hooks'
import { makePayment }          from '../utils'
import { makePaymentWithCheck } from '../utils'

export const PaymentForm = ({
  settings,
  amount,
  receipt,
  styles,
  additionalFields,
}: PaymentWidgetProps) => {
  const isLoaded = useInit()
  const { errors, validateField, isValidate } = useValidate()
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
      <PaymentSettings {...settings} isGenerateReceipt={!!receipt} />
      <PaymentFields
        errors={errors}
        validateField={validateField}
        amount={amount}
        isGenerateReceipt={!!receipt}
        additionalFields={additionalFields}
        direction={styles?.direction}
        inputGaps={styles?.inputGaps}
      />
      <PaymentButton type='submit' disabled={!isLoaded} {...styles?.button}>
        <FormattedMessage id='payment_widget.pay' defaultMessage='Оплатить' />
      </PaymentButton>
    </form>
  )
}
