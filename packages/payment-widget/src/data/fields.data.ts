import { AdditionalFieldsType } from '../enums'
import { RequiredFieldsType }   from '../enums'
import { AdditionalField }      from '../interfaces'
import { RequiredField }        from '../interfaces'

export const requiredFields: RequiredField[] = [
  {
    type: 'text',
    name: RequiredFieldsType.Amount,
    placeholder: 'payment_widget.order_price',
    required: true,
  },
]

export const receiptFields: AdditionalField[] = [
  {
    type: 'email',
    name: AdditionalFieldsType.Email,
    placeholder: 'payment_widget.email',
    required: true,
  },
]
