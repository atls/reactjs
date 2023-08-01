import React                  from 'react'
import { FC }                 from 'react'

import { PaymentWidgetProps } from '../interfaces/payment-widget.interfaces'
import { PaymentFields }      from './payment-fields.component'
import { PaymentSettings }    from './payment-settings.component'
import { usePayment }         from '../hooks'

export const PaymentWidget: FC<PaymentWidgetProps> = ({ settings, additionalFields }) => {
  const { pay } = usePayment(additionalFields)
  return (
    <form>
      <PaymentSettings storeId={settings.storeId} />
      <PaymentFields additionalFields={additionalFields} />
      <button type='button' onClick={pay}>
        Оплатить
      </button>
    </form>
  )
}
