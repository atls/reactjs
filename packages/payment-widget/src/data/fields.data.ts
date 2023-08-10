import { AdditionalFieldsNames } from '../interfaces'
import { AdditionalFields }      from '../interfaces'
import { RequiredFields }        from '../interfaces'

export const requiredFields: RequiredFields[] = []

export const receiptFields: AdditionalFields[] = [
  {
    type: 'text',
    name: AdditionalFieldsNames.Email,
    placeholder: 'payment_widget.email',
    required: true,
  },
]
