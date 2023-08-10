import { Input }            from '@atls-ui-proto/input'

import React                from 'react'
import { useState }         from 'react'
import { useIntl }          from 'react-intl'

import { AdditionalFields } from '../interfaces'
import { FieldsNames }      from '../interfaces'
import { Fields }           from '../interfaces'
import { requiredFields }   from '../data'
import { handleChange }     from '../utils'
import { mergeFields }      from '../utils'

export const useFields = (additionalFields?: AdditionalFields[], generateReceipt?: boolean) => {
  const mergedFields: Fields[] = mergeFields(requiredFields, additionalFields, generateReceipt)
  const initialFormState: Record<FieldsNames, string> = mergedFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [formState, setFormState] = useState<Record<FieldsNames, string>>(initialFormState)
  const intl = useIntl()

  return mergedFields.map((field) => {
    const translatePlaceholder = intl.messages[field.placeholder]
      ? intl.formatMessage({ id: field.placeholder })
      : field.placeholder
    return (
      <Input
        key={field.name}
        type={field.type ?? 'text'}
        name={field.name}
        placeholder={translatePlaceholder}
        required={field.required ?? false}
        value={formState[field.name]}
        onChange={(value) => handleChange(field.name, value, setFormState)}
      />
    )
  })
}
