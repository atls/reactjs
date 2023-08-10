/* eslint-disable no-shadow */
export enum TaxationType {
  Osn = 'osn',
  UsnIncome = 'usn_income',
  UsnIncomeOutcome = 'usn_income_outcome',
  Patent = 'patent',
  Envd = 'envd',
  Esn = 'esn',
}

export enum PaymentMethodType {
  FullPayment = 'full_payment',
  FullPrepayment = 'full_prepayment',
  Prepayment = 'prepayment',
  Advance = 'advance',
  PartialPayment = 'partial_payment',
  Credit = 'credit',
  CreditPayment = 'credit_payment',
}

export enum PaymentObjectType {
  Commodity = 'commodity',
  Excise = 'excise',
  Job = 'job',
  Service = 'service',
  GamblingBet = 'gambling_bet',
  GamblingPrize = 'gambling_prize',
  Lottery = 'lottery',
  LotteryPrize = 'lottery_prize',
  IntellectualActivity = 'intellectual_activity',
  Payment = 'payment',
  AgentCommission = 'agent_commission',
  Composite = 'composite',
  Another = 'another',
}

export enum TaxType {
  None = 'none',
  Vat0 = 'vat0',
  Vat10 = 'vat10',
  Vat20 = 'vat20',
  Vat110 = 'vat110',
  Vat120 = 'vat120',
}

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
