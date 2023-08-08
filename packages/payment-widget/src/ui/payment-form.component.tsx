import { Button }             from '@atls-ui-proto/button'

import React                  from 'react'
import { FC }                 from 'react'
import { FormattedMessage }   from 'react-intl'

import { PaymentWidgetProps } from '../interfaces'
import { PaymentSettings }    from './payment-settings.component'
import { useFields }           from '../hooks'
import { handlerPay }          from '../utils'

export const PaymentForm: FC<PaymentWidgetProps> = ({ settings, additionalFields }) => {
  const fields = useFields(additionalFields)

  return (
    <form name='payform-tinkoff' onSubmit={handlerPay}>
      <PaymentSettings {...settings} />
      {fields}
      <Button type='submit'>
        <FormattedMessage id='payment-widget.pay' defaultMessage='Оплатить' />
      </Button>
    </form>
  )
}
