import { AdditionalField } from './payment-fields.interfaces'
import { ReceiptSettings } from './payment-receipt.interfaces'
import { PaymentSettings } from './payment-settings.interfaces'
import { PaymentStyles }   from './payment-styles.interfaces'

export interface PaymentWidgetProps {
  settings: PaymentSettings
  amount?: number
  receipt?: ReceiptSettings
  styles?: PaymentStyles
  additionalFields?: AdditionalField[]
}
