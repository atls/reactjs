import { AdditionalFieldsProps } from '../interfaces'
import { RequiredFieldsProps }   from '../interfaces'

export const mergeFields = (
  requiredFields: RequiredFieldsProps[],
  additionalFields?: AdditionalFieldsProps[]
) => (additionalFields ? [...requiredFields, ...additionalFields] : requiredFields)
