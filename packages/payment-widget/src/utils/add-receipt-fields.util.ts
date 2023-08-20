import { AdditionalFieldsType } from '../enums'
import { AdditionalFields }     from '../interfaces'
import { receiptFields }        from '../data'

export const addReceiptFieldsUtil = (additionalFields: AdditionalFields[]) => {
  const missingReceiptFields = !additionalFields.some(
    (field) =>
      field.name === AdditionalFieldsType.Email || field.name === AdditionalFieldsType.Phone
  )

  if (missingReceiptFields) return [...receiptFields, ...additionalFields]

  return additionalFields
}
