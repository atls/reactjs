import { AdditionalFieldsNames } from '../interfaces'
import { AdditionalFieldsProps } from '../interfaces'
import { RequiredFieldsProps }   from '../interfaces'
import { receiptFields }         from '../data'

const deleteDuplicateFields = (fields: (RequiredFieldsProps | AdditionalFieldsProps)[]) => {
  const uniqueNames = new Set<string>()
  return fields.filter((field) => !uniqueNames.has(field.name) && uniqueNames.add(field.name))
}

export const mergeFields = (
  requiredFields: RequiredFieldsProps[],
  additionalFields?: AdditionalFieldsProps[],
  generateReceipt?: boolean
) => {
  const mergedFields = additionalFields ? [...requiredFields, ...additionalFields] : requiredFields
  const areRequiredCheckFieldsMissing =
    generateReceipt &&
    !mergedFields.some(
      (field) =>
        field.name === AdditionalFieldsNames.Email || field.name === AdditionalFieldsNames.Phone
    )

  if (areRequiredCheckFieldsMissing) {
    mergedFields.push(...receiptFields)
  }

  return deleteDuplicateFields(mergedFields)
}
