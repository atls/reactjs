import type { AdditionalField } from '../interfaces'

import { AdditionalFieldsType } from '../enums'
import { receiptFields }        from '../data'

export const addReceiptFieldsUtil = (
  additionalFields: Array<AdditionalField>
): Array<AdditionalField> => {
  const missingReceiptFields = !additionalFields.some(
    (field) =>
      field.name === AdditionalFieldsType.Email || field.name === AdditionalFieldsType.Phone
  )

  return missingReceiptFields ? [...receiptFields, ...additionalFields] : additionalFields
}
