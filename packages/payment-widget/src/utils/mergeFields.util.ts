import { AdditionalFieldsProps } from '../interfaces'
import { RequiredFieldsProps }   from '../interfaces'

const deleteDuplicateFields = (fields: (RequiredFieldsProps | AdditionalFieldsProps)[]) => {
  const uniqueNames = new Set<string>()
  return fields.filter((field) => !uniqueNames.has(field.name) && uniqueNames.add(field.name))
}

export const mergeFields = (
  requiredFields: RequiredFieldsProps[],
  additionalFields?: AdditionalFieldsProps[]
) => {
  const mergedFields = additionalFields ? [...requiredFields, ...additionalFields] : requiredFields
  return deleteDuplicateFields(mergedFields)
}
