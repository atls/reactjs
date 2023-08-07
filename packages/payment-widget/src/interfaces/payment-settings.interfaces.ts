/* eslint-disable no-shadow */
interface AutoPaymentConfig {
  reccurentPayment: boolean
  customerKey: string
}

export enum Languages {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
}

export interface PaymentSettingsProps {
  storeId: string
  language?: Languages
  isNewWindow?: boolean
  autopayment?: AutoPaymentConfig
  generateReceipt?: boolean
}
