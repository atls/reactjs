import { AdditionalFieldsProps } from './payment-fields.interfaces'
import { PaymentSettingsProps }  from './payment-settings.interfaces'

export interface PaymentWidgetProps {
  settings: PaymentSettingsProps
  additionalFields?: AdditionalFieldsProps[]
}
