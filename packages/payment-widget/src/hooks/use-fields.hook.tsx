import { Input }         from '@atls-ui-proto/input'

import React             from 'react'
import { useState }      from 'react'
import { useIntl }       from 'react-intl'

import { FieldsNames }   from '../interfaces'
import { Fields }        from '../interfaces'
import { handleChange }  from '../utils'
import { prepareFields } from '../utils'

export const useFields = (fields: Fields[], shouldGenerateReceipt?: boolean) => {
  const preparedFields: Fields[] = prepareFields(fields, shouldGenerateReceipt)
  const initialState: Record<FieldsNames, string> = preparedFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [fieldsState, setFieldsState] = useState<Record<FieldsNames, string>>(initialState)

  const intl = useIntl()

  return preparedFields.map((field) => {
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
        value={fieldsState[field.name]}
        onChange={(value) => handleChange(field.name, value, setFieldsState)}
      />
    )
  })
}
