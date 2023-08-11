import { Input }        from '@atls-ui-proto/input'

import React            from 'react'
import { useState }     from 'react'
import { useIntl }      from 'react-intl'

import { FieldsNames }  from '../interfaces'
import { Fields }       from '../interfaces'
import { handleChange } from '../utils'

export const useFields = (fields: Fields[], fieldStyle?: React.CSSProperties) => {
  const initialState: Record<FieldsNames, string> = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [fieldsState, setFieldsState] = useState<Record<FieldsNames, string>>(initialState)

  const intl = useIntl()

  return fields.map((field) => {
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
        style={fieldStyle}
        value={fieldsState[field.name]}
        onChange={(value) => handleChange(field.name, value, setFieldsState)}
      />
    )
  })
}
