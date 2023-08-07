import { Button }             from '@atls-ui-proto/button'

import React                  from 'react'
import { FC }                 from 'react'
import { FormattedMessage }   from 'react-intl'

import { PaymentWidgetProps } from '../interfaces'
import { PaymentSettings }    from './payment-settings.component'
import { usePayment }         from '../hooks/use-payment-widget.hook'

export const PaymentForm: FC<PaymentWidgetProps> = ({ settings, additionalFields }) => {
  const { fields, pay } = usePayment(additionalFields)

  return (
    <form name='payform-tinkoff'>
      <PaymentSettings {...settings} />
      {fields}
      <Button type='button' onClick={pay}>
        <FormattedMessage id='payment-widget.pay' defaultMessage='Оплатить' />
      </Button>
    </form>
  )
}
