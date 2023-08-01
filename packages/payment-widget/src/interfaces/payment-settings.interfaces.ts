interface AutoPaymentConfig {
  reccurentPayment: boolean
  customerKey: string
}

export interface PaymentSettingsProps {
  storeId: string
  language?: string
  isNewWindow?: boolean
  autopayment?: AutoPaymentConfig
  generateReceipt?: boolean
}
