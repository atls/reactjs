import type { LanguagesType } from '../enums/index.js'

interface AutoPaymentConfig {
  reccurentPayment: boolean
  customerKey: string
}

export interface Settings {
  storeId: string
  language?: LanguagesType
  isNewWindow?: boolean
  autopayment?: AutoPaymentConfig
}

export interface SettingsProps extends Settings {
  isGenerateReceipt?: boolean
}
