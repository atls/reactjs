import {PaymentSettingsProps} from './payment-settings.interfaces'
import {AdditionalFieldsProps} from './payment-fields.interfaces'

export interface PaymentWidgetProps {
    settings: PaymentSettingsProps
    additionalFields?: AdditionalFieldsProps[]
}