import { AdditionalFields }      from '../interfaces'
import { AdditionalFieldsNames } from '../interfaces'
import { receiptFields }         from '../data'

export const addReceiptFieldsUtil = (additionalFields: AdditionalFields[]) => {
  const missingReceiptFields = !additionalFields.some(
    (field) =>
      field.name === AdditionalFieldsNames.Email || field.name === AdditionalFieldsNames.Phone
  )

  if (missingReceiptFields) return [...receiptFields, ...additionalFields]

  return additionalFields
}
