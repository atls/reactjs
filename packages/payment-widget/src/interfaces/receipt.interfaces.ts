import type { PaymentMethodType } from '../enums'
import type { PaymentObjectType } from '../enums'
import type { TaxType }           from '../enums'
import type { TaxationType }      from '../enums'

export interface ReceiptItem {
  Name: string
  Price: number
  Quantity: number
  Amount: number
  Tax: TaxType
  PaymentMethod?: PaymentMethodType
  PaymentObject?: PaymentObjectType
  Ean13?: string
  ShopCode?: string
}

export interface Receipt {
  Email?: string
  Phone?: string
  EmailCompany?: string
  Taxation: TaxationType
  Items: Array<ReceiptItem>
}

export interface ReceiptSettings {
  Taxation: TaxationType
  Items: Array<ReceiptItem>
  EmailCompany?: string
}
