import { Condition }         from '@atls-ui-parts/condition'
import { Layout }            from '@atls-ui-parts/layout'

import React                 from 'react'
import { useIntl }           from 'react-intl'

import { Field }             from '../interfaces'
import { HandleBlurField }   from '../interfaces'
import { FieldState }        from '../interfaces'
import { HandleChangeField } from '../interfaces'
import { FieldsErrors }      from '../interfaces'
import { CustomInput }       from '../interfaces/custom-elements.interfaces'
import { MemoizedInput }     from '../ui'
import { translate }         from '../utils/translate.util'

export const useFieldsRenderer = (
  fields: Field[],
  errors: FieldsErrors,
  fieldsState: FieldState,
  handleChange: HandleChangeField,
  handleBlur: HandleBlurField,
  inputGaps: number,
  customInput: CustomInput | undefined
) => {
  const intl = useIntl()

  return fields.map((field, index, currentFields) => {
    const translatePlaceholder = translate(intl, field.placeholder, field.placeholder)
    const translateError = translate(intl, errors[field.name], errors[field.name])
    const isNotLastField = index !== currentFields.length - 1
    const inputProps = {
      type: field.type ?? 'text',
      name: field.name,
      placeholder: translatePlaceholder,
      required: field.required ?? false,
      value: fieldsState[field.name],
      errorText: translateError,
      onChangeNative: handleChange,
      onBlur: handleBlur,
    }

    return (
      <React.Fragment key={field.name}>
        {customInput ? customInput(inputProps) : <MemoizedInput {...inputProps} />}
        <Condition match={isNotLastField}>
          <Layout flexBasis={inputGaps} flexShrink={0} />
        </Condition>
      </React.Fragment>
    )
  })
}
