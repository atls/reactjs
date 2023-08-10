import { AdditionalFieldsNames } from '../interfaces'
import { Fields }                from '../interfaces'
import { AdditionalFields }      from '../interfaces'
import { RequiredFields }        from '../interfaces'
import { receiptFields }         from '../data'

const deleteDuplicateFields = (fields: (RequiredFields | AdditionalFields)[]) => {
  const uniqueNames = new Set<string>()
  return fields.filter((field) => !uniqueNames.has(field.name) && uniqueNames.add(field.name))
}

export const prepareFields = (fields: Fields[], generateReceipt?: boolean) => {
  const resultFields: Fields[] = []

  const areRequiredCheckFieldsMissing =
    generateReceipt &&
    !fields.some(
      (field) =>
        field.name === AdditionalFieldsNames.Email || field.name === AdditionalFieldsNames.Phone
    )

  if (areRequiredCheckFieldsMissing) {
    resultFields.push(...receiptFields)
  }

  return deleteDuplicateFields(resultFields)
}
