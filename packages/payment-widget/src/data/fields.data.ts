import type { AdditionalField } from '../interfaces/index.js'
import type { RequiredField }   from '../interfaces/index.js'

import { AdditionalFieldsType } from '../enums/index.js'
import { RequiredFieldsType }   from '../enums/index.js'

export const requiredFields: Array<RequiredField> = [
  {
    type: 'text',
    name: RequiredFieldsType.Amount,
    placeholder: 'payment_widget.order_price',
    required: true,
  },
]

export const receiptFields: Array<AdditionalField> = [
  {
    type: 'email',
    name: AdditionalFieldsType.Email,
    placeholder: 'payment_widget.email',
    required: true,
  },
]
