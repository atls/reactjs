import { AdditionalFieldsNames } from '../interfaces'
import { AdditionalFields }      from '../interfaces'
import { RequiredFields }        from '../interfaces'
import { receiptFields }         from '../data'

const deleteDuplicateFields = (fields: (RequiredFields | AdditionalFields)[]) => {
  const uniqueNames = new Set<string>()
  return fields.filter((field) => !uniqueNames.has(field.name) && uniqueNames.add(field.name))
}

export const mergeFields = (
  requiredFields: RequiredFields[],
  additionalFields?: AdditionalFields[],
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
