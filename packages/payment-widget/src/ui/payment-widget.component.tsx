import { Button }            from '@atls-ui-proto/button'

import React                 from 'react'
import { FC }                from 'react'

import { PaymentWidgetProps } from '../interfaces'
import { PaymentFields }     from './payment-fields.component'
import { PaymentSettings }   from './payment-settings.component'
import { usePayment }        from '../hooks'

export const PaymentWidget: FC<PaymentWidgetProps> = ({ settings, additionalFields }) => {
  const { fields, pay } = usePayment(additionalFields)

  return (
    <form name='payform-tinkoff'>
      <PaymentSettings {...settings} />
      <PaymentFields fields={fields} />
      <Button type='button' onClick={pay}>
        Оплатить
      </Button>
    </form>
  )
}