import { HiddenInput }          from '@atls-ui-parts/hidden-input'
import { Button }               from '@atls-ui-proto/button'

import React                    from 'react'
import { FC }                   from 'react'
import { MouseEvent }           from 'react'
import { FormattedMessage }     from 'react-intl'

import { PaymentWidgetProps }   from '../interfaces'
import { RequiredFieldsNames }  from '../interfaces'
import { PaymentSettings }      from './payment-settings.component'
import { useFields }            from '../hooks'
import { useInit }              from '../hooks'
import { makePayment }          from '../utils'
import { makePaymentWithCheck } from '../utils'

export const PaymentForm: FC<PaymentWidgetProps> = ({
  amount,
  settings,
  additionalFields,
  receipt,
}) => {
  const isLoaded = useInit()
  const fields = useFields(additionalFields, !!receipt)

  const buttonType = receipt ? 'button' : 'submit'
  const payHandler = receipt ? undefined : makePayment
  const payWithCheck = receipt
    ? (e: MouseEvent<HTMLButtonElement>) => makePaymentWithCheck(e, receipt)
    : undefined

  return (
    <form name='payform-tinkoff' onSubmit={payHandler}>
      <PaymentSettings {...settings} generateReceipt={!!receipt} />
      <HiddenInput name={RequiredFieldsNames.Amount} defaultValue={amount} disabled />
      {fields}
      <Button type={buttonType} disabled={!isLoaded} onClick={payWithCheck}>
        <FormattedMessage id='payment-widget.pay' defaultMessage='Оплатить' />
      </Button>
    </form>
  )
}
