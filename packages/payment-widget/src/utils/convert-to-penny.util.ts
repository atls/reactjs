import type { ReceiptItem } from '../interfaces/index.js'

export const convertToPenny = (products: Array<ReceiptItem>): Array<ReceiptItem> =>
  products.map((product) => ({
    ...product,
    Amount: product.Amount * 100,
    Price: product.Price * 100,
  }))
