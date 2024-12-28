import type { AdditionalField } from '../interfaces/index.js'

import { AdditionalFieldsType } from '../enums/index.js'
import { receiptFields }        from '../data/index.js'

export const addReceiptFieldsUtil = (
  additionalFields: Array<AdditionalField>
): Array<AdditionalField> => {
  const missingReceiptFields = !additionalFields.some(
    (field) =>
      field.name === AdditionalFieldsType.Email || field.name === AdditionalFieldsType.Phone
  )

  return missingReceiptFields ? [...receiptFields, ...additionalFields] : additionalFields
}
