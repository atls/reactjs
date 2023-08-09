import { ReceiptItem } from '../interfaces/payment-receipt.interfaces'

export const convertToKopecks = (products: ReceiptItem[]) =>
  products.map((product) => ({
    ...product,
    Amount: product.Amount * 100,
    Price: product.Price * 100,
  }))
