import type { AdditionalField } from '../interfaces'
import type { RequiredField }   from '../interfaces'

import { AdditionalFieldsType } from '../enums'
import { RequiredFieldsType }   from '../enums'

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
