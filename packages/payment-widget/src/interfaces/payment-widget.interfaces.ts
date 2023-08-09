import { AdditionalFieldsProps } from './payment-fields.interfaces'
import { ReceiptSettings }       from './payment-receipt.interfaces'
import { PaymentSettingsProps }  from './payment-settings.interfaces'

export interface PaymentWidgetProps {
  settings: PaymentSettingsProps
  receipt?: ReceiptSettings
  additionalFields?: AdditionalFieldsProps[]
}
