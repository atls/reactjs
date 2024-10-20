import { AdditionalFieldsType } from '../enums'
import { AdditionalField }      from '../interfaces'
import { receiptFields }        from '../data'

export const addReceiptFieldsUtil = (additionalFields: AdditionalField[]) => {
  const missingReceiptFields = !additionalFields.some(
    (field) =>
      field.name === AdditionalFieldsType.Email || field.name === AdditionalFieldsType.Phone
  )

  return missingReceiptFields ? [...receiptFields, ...additionalFields] : additionalFields
}
