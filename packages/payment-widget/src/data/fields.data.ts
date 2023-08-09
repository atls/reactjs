import { AdditionalFieldsNames } from '../interfaces'
import { AdditionalFieldsProps } from '../interfaces'
import { RequiredFieldsNames }   from '../interfaces'
import { RequiredFieldsProps }   from '../interfaces'

export const requiredFields: RequiredFieldsProps[] = [
  {
    type: 'text',
    name: RequiredFieldsNames.Amount,
    placeholder: 'payment_widget.order_price',
    required: true,
  },
]

export const receiptFields: AdditionalFieldsProps[] = [
  {
    type: 'text',
    name: AdditionalFieldsNames.Email,
    placeholder: 'payment_widget.email',
    required: true,
  },
]
