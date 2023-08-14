import React                from 'react'

import { AdditionalFields } from './payment-fields.interfaces'
import { ReceiptSettings }  from './payment-receipt.interfaces'
import { PaymentSettings }  from './payment-settings.interfaces'

interface PaymentWidgetStyles {
  formStyle?: React.CSSProperties
  fieldStyle?: React.CSSProperties
  buttonStyle?: React.CSSProperties
}

export interface PaymentWidgetProps {
  settings: PaymentSettings
  amount?: number
  receipt?: ReceiptSettings
  styles?: PaymentWidgetStyles
  additionalFields?: AdditionalFields[]
}
