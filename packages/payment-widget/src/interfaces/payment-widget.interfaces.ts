import { AdditionalFields } from './payment-fields.interfaces'
import { ReceiptSettings }  from './payment-receipt.interfaces'
import { Settings }         from './payment-settings.interfaces'

export interface PaymentWidgetProps {
  settings: Settings
  receipt?: ReceiptSettings
  additionalFields?: AdditionalFields[]
}
