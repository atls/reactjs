import { AdditionalFieldsType } from '../enums'
import { RequiredFieldsType }   from '../enums'
import { AdditionalFields }     from '../interfaces'
import { RequiredFields }       from '../interfaces'

export const requiredFields: RequiredFields[] = [
  {
    type: 'text',
    name: RequiredFieldsType.Amount,
    placeholder: 'payment_widget.order_price',
    required: true,
  },
]

export const receiptFields: AdditionalFields[] = [
  {
    type: 'email',
    name: AdditionalFieldsType.Email,
    placeholder: 'payment_widget.email',
    required: true,
  },
]
