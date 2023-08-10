/* eslint-disable no-shadow */
interface AutoPaymentConfig {
  customerKey: string
  reccurentPayment: boolean
}

export enum Languages {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
}

export interface Settings {
  storeId: string
  language?: Languages
  isNewWindow?: boolean
  autopayment?: AutoPaymentConfig
  generateReceipt?: boolean
}
