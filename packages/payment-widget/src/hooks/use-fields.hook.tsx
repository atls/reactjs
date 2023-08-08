import { Input }                 from '@atls-ui-proto/input'

import React                     from 'react'
import { useState }              from 'react'
import { useIntl }               from 'react-intl'

import { AdditionalFieldsProps } from '../interfaces'
import { FieldsNames }           from '../interfaces'
import { FieldsProps }           from '../interfaces'
import { RequiredFieldsNames }   from '../interfaces'
import { RequiredFieldsProps }   from '../interfaces'
import { handleChange }          from '../utils'
import { mergeFields }           from '../utils'

const requiredFields: RequiredFieldsProps[] = [
  {
    name: RequiredFieldsNames.Amount,
    placeholder: 'Сумма заказа',
    required: true,
  },
]

export const useFields = (additionalFields?: AdditionalFieldsProps[]) => {
  const mergedFields: FieldsProps[] = mergeFields(requiredFields, additionalFields)
  const initialFormState: Record<FieldsNames, string> = mergedFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [formState, setFormState] = useState<Record<FieldsNames, string>>(initialFormState)
  const intl = useIntl()

  const fields = mergedFields.map((field) => {
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

  return { fields, formState }
}
