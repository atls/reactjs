interface autoPaymentConfig {
    reccurentPayment: boolean
    customerKey: string
}

export interface PaymentSettingsProps {
    storeId: string
    language?: string
    isNewWindow?: boolean
    autopayment?: autoPaymentConfig
    generateReceipt?: boolean
}