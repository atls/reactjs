import { LanguagesType } from '../enums'

interface AutoPaymentConfig {
  reccurentPayment: boolean
  customerKey: string
}

export interface PaymentSettings {
  storeId: string
  language?: LanguagesType
  isNewWindow?: boolean
  autopayment?: AutoPaymentConfig
}

export interface PaymentSettingsProps extends PaymentSettings {
  isGenerateReceipt?: boolean
}
