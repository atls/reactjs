import { AdditionalFields } from './payment-fields.interfaces'
import { ReceiptSettings }  from './payment-receipt.interfaces'
import { PaymentSettings }  from './payment-settings.interfaces'

export interface PaymentWidgetProps {
  amount: number
  settings: PaymentSettings
  receipt?: ReceiptSettings
  additionalFields?: AdditionalFields[]
}
