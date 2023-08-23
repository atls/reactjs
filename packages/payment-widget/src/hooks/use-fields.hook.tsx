import { Condition }     from '@atls-ui-parts/condition'
import { Layout }        from '@atls-ui-parts/layout'

import React             from 'react'
import { useState }      from 'react'
import { useIntl }       from 'react-intl'

import { FieldsErrors }  from '../interfaces'
import { FieldsNames }   from '../interfaces'
import { ValidateField } from '../interfaces'
import { Field }         from '../interfaces'
import { Input }         from '../ui'
import { handleChange }  from '../utils'
import { translate }     from '../utils/translate.util'

export const useFields = (
  fields: Field[],
  errors: FieldsErrors,
  validateField: ValidateField,
  inputGaps?: number
) => {
  const initialState: Record<FieldsNames, string> = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<FieldsNames, string>
  )
  const [fieldsState, setFieldsState] = useState<Record<FieldsNames, string>>(initialState)

  const intl = useIntl()

  return fields.map((field, index, currentFields) => {
    const translatePlaceholder = translate(intl, field.placeholder, field.placeholder)
    const translateError = translate(intl, errors[field.name], errors[field.name])
    const isNotLastField = index !== currentFields.length - 1

    return (
      <React.Fragment key={field.name}>
        <Input
          type={field.type ?? 'text'}
          name={field.name}
          placeholder={translatePlaceholder}
          required={field.required ?? false}
          value={fieldsState[field.name]}
          errorText={translateError}
          onChange={(value) => handleChange(field.name, value, setFieldsState)}
          onBlur={(e) => validateField(field.name, e.target.value, field.required)}
        />
        <Condition match={isNotLastField}>
          <Layout flexBasis={inputGaps} flexShrink={0} />
        </Condition>
      </React.Fragment>
    )
  })
}
