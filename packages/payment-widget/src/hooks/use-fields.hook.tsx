import { Condition }    from '@atls-ui-parts/condition'
import { Layout }       from '@atls-ui-parts/layout'
import { Input }        from '@atls-ui-proto/input'

import React            from 'react'
import { useState }     from 'react'
import { useIntl }      from 'react-intl'

import { FieldsNames }  from '../interfaces'
import { Fields }       from '../interfaces'
import { handleChange } from '../utils'

export const useFields = (fields: Fields[], inputGaps?: number) => {
  const initialState: Record<FieldsNames, string> = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [fieldsState, setFieldsState] = useState<Record<FieldsNames, string>>(initialState)

  const intl = useIntl()

  return fields.map((field, i, currentFields) => {
    const translatePlaceholder = intl.messages[field.placeholder]
      ? intl.formatMessage({ id: field.placeholder })
      : field.placeholder
    const isNotLastField = currentFields.length === 1 || i !== currentFields.length - 1

    return (
      <React.Fragment key={field.name}>
        <Input
          type={field.type ?? 'text'}
          name={field.name}
          placeholder={translatePlaceholder}
          required={field.required ?? false}
          value={fieldsState[field.name]}
          onChange={(value) => handleChange(field.name, value, setFieldsState)}
        />
        <Condition match={isNotLastField}>
          <Layout flexBasis={inputGaps} flexShrink={0} />
        </Condition>
      </React.Fragment>
    )
  })
}
