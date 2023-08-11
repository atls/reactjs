/* eslint-disable no-shadow */
interface AutoPaymentConfig {
  reccurentPayment: boolean
  customerKey: string
}

export enum Languages {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
}

export interface PaymentSettings {
  storeId: string
  language?: Languages
  isNewWindow?: boolean
  autopayment?: AutoPaymentConfig
}

export interface PaymentSettingsProps extends PaymentSettings {
  isGenerateReceipt?: boolean
}
