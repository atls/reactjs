import type { ReactElement }      from 'react'

import type { Field }             from '../interfaces/index.js'
import type { NameField }         from '../interfaces/index.js'
import type { HandleBlurField }   from '../interfaces/index.js'
import type { FieldState }        from '../interfaces/index.js'
import type { HandleChangeField } from '../interfaces/index.js'
import type { FieldsErrors }      from '../interfaces/index.js'

import { Condition }              from '@atls-ui-parts/condition'
import { Layout }                 from '@atls-ui-parts/layout'
import { useIntl }                from 'react-intl'
import React                      from 'react'

import { MemoizedInput }          from '../ui/index.js'
import { ThemeProvider }          from '../ui/theme/src/index.js'
import { translate }              from '../utils/translate.util.js'

export const useFieldsRenderer = (
  fields: Array<Field> | Array<NameField>,
  errors: FieldsErrors,
  fieldsState: FieldState,
  handleChange: HandleChangeField,
  handleBlur: HandleBlurField,
  inputGaps: number
): ReactElement => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      {fields.map((field, index, currentFields) => {
        const translatePlaceholder =
          'placeholder' in field && field.placeholder
            ? translate(intl, field.placeholder, field.placeholder)
            : ''
        const translateError = translate(intl, errors[field.name], errors[field.name])
        const isNotLastField = index !== currentFields.length - 1

        return (
          <React.Fragment key={field.name}>
            <MemoizedInput
              type={'type' in field ? field.type : 'text'}
              name={field.name}
              placeholder={translatePlaceholder}
              // eslint-disable-next-line react/jsx-no-leaked-render
              required={'required' in field ? field.required : false}
              value={fieldsState[field.name]}
              errorText={translateError}
              onChangeNative={handleChange}
              onBlur={handleBlur}
            />
            <Condition match={isNotLastField}>
              <Layout flexBasis={inputGaps} flexShrink={0} />
            </Condition>
          </React.Fragment>
        )
      })}
    </ThemeProvider>
  )
}
