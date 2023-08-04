import { Input }                 from '@atls-ui-proto/input'

import React                     from 'react'
import { useState }              from 'react'

import { AdditionalFieldsProps } from '../interfaces/payment-fields.interfaces'
import { FieldsNames }           from '../interfaces/payment-fields.interfaces'
import { FieldsProps }           from '../interfaces/payment-fields.interfaces'
import { RequiredFieldsNames }   from '../interfaces/payment-fields.interfaces'
import { RequiredFieldsProps }   from '../interfaces/payment-fields.interfaces'
import { handleChange }           from '../utils'

const defaultFields: RequiredFieldsProps[] = [
  {
    name: RequiredFieldsNames.Amount,
    placeholder: 'Сумма заказа',
    required: true,
  },
]

export const useFields = (additionalFields?: AdditionalFieldsProps[]) => {
  const mergedFields: FieldsProps[] = additionalFields
    ? [...defaultFields, ...additionalFields]
    : defaultFields

  const initialFormState: Record<FieldsNames, string> = mergedFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [formState, setFormState] = useState<Record<FieldsNames, string>>(initialFormState)

  const fields = mergedFields.map((field) => (
    <Input
      key={field.name}
      type={field.type ?? 'text'}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required ?? false}
      value={formState[field.name]}
      onChange={(value) => handleChange(field.name, value, setFormState)}
    />
  ))

  return { fields, formState }
}
