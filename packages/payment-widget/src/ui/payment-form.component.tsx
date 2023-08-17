import React                    from 'react'
import { FormEvent }      from 'react'
import { FC }                   from 'react'
import { FormattedMessage }     from 'react-intl'

import { PaymentWidgetProps }   from '../interfaces'
import { PaymentButton }        from './payment-button/payment-button.component'
import { PaymentFields }        from './payment-fields.component'
import { PaymentSettings }      from './payment-settings.component'
import { useInit }              from '../hooks'
import { makePayment }          from '../utils'
import { makePaymentWithCheck } from '../utils'

export const PaymentForm: FC<PaymentWidgetProps> = ({
  settings,
  amount,
  receipt,
  styles,
  additionalFields,
}) => {
  const isLoaded = useInit()
  const pay = receipt
    ? (e: FormEvent<HTMLFormElement>) => makePaymentWithCheck(e, receipt)
    : makePayment

  return (
    <form name='payform-tinkoff' onSubmit={pay}>
      <PaymentSettings {...settings} isGenerateReceipt={!!receipt} />
      <PaymentFields
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
