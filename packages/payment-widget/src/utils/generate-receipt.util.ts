import { AdditionalFields }      from '../interfaces'
import { AdditionalFieldsNames } from '../interfaces'
import { receiptFields }         from '../data'

export const generateReceipt = (
  additionalFields: AdditionalFields[],
  isGenerateReceipt: boolean
) => {
  if (!additionalFields && isGenerateReceipt) return receiptFields

  if (!additionalFields) return []

  const areReceiptFieldsMissing =
    isGenerateReceipt &&
    !additionalFields.some(
      (field) =>
        field.name === AdditionalFieldsNames.Email || field.name === AdditionalFieldsNames.Phone
    )

  if (areReceiptFieldsMissing) return [...additionalFields, ...receiptFields]

  return additionalFields
}
