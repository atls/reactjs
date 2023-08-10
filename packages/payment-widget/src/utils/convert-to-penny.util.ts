import { ReceiptItem } from '../interfaces'

export const convertToPenny = (products: ReceiptItem[]) =>
  products.map((product) => ({
    ...product,
    Amount: product.Amount * 100,
    Price: product.Price * 100,
  }))
