import { PaymentMethodType } from '../enums'
import { PaymentObjectType } from '../enums'
import { TaxType }           from '../enums'
import { TaxationType }      from '../enums'

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
  Items: ReceiptItem[]
}

export interface ReceiptSettings {
  Taxation: TaxationType
  Items: ReceiptItem[]
  EmailCompany?: string
}
