import { Button }               from '@atls-ui-proto/button'

import React                    from 'react'
import { FC }                   from 'react'
import { MouseEvent }           from 'react'
import { FormattedMessage }     from 'react-intl'

import { PaymentWidgetProps }   from '../interfaces'
import { PaymentFields }        from './payment-fields.component'
import { PaymentSettings }      from './payment-settings.component'
import { useInit }              from '../hooks'
import { makePayment }          from '../utils'
import { makePaymentWithCheck } from '../utils'

export const PaymentForm: FC<PaymentWidgetProps> = ({
  amount,
  settings,
  receipt,
  styles,
  additionalFields,
}) => {
  const isLoaded = useInit()

  const buttonType = receipt ? 'button' : 'submit'
  const payHandler = receipt ? undefined : makePayment
  const payWithCheck = receipt
    ? (e: MouseEvent<HTMLButtonElement>) => makePaymentWithCheck(e, receipt)
    : undefined

  return (
    <form name='payform-tinkoff' onSubmit={payHandler}>
      <PaymentSettings {...settings} isGenerateReceipt={!!receipt} />
      <PaymentFields
        amount={amount}
        isGenerateReceipt={!!receipt}
        additionalFields={additionalFields}
        direction={styles?.direction}
      />
      <Button type={buttonType} disabled={!isLoaded} onClick={payWithCheck}>
        <FormattedMessage id='payment-widget.pay' defaultMessage='Оплатить' />
      </Button>
    </form>
  )
}
