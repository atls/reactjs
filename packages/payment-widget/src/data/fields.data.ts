import { AdditionalFields }      from '../interfaces'
import { AdditionalFieldsNames } from '../interfaces'
import { RequiredFields }        from '../interfaces'
import { RequiredFieldsNames }   from '../interfaces'

export const requiredFields: RequiredFields[] = [
  {
    type: 'text',
    name: RequiredFieldsNames.Amount,
    placeholder: 'payment_widget.order_price',
    required: true,
  },
]

export const receiptFields: AdditionalFields[] = [
  {
    type: 'text',
    name: AdditionalFieldsNames.Email,
    placeholder: 'payment_widget.email',
    required: true,
  },
]
