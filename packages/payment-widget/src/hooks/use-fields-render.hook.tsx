import type { ReactElement }      from 'react'

import type { Field }             from '../interfaces'
import type { NameField }         from '../interfaces'
import type { HandleBlurField }   from '../interfaces'
import type { FieldState }        from '../interfaces'
import type { HandleChangeField } from '../interfaces'
import type { FieldsErrors }      from '../interfaces'

import { Condition }              from '@atls-ui-parts/condition'
import { Layout }                 from '@atls-ui-parts/layout'
import { useIntl }                from 'react-intl'
import React                      from 'react'

import { MemoizedInput }          from '../ui'
import { ThemeProvider }          from '../ui/theme/src'
import { translate }              from '../utils/translate.util'

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
        const translatePlaceholder = translate(
          intl,
          // @ts-expect-error
          field.placeholder as string,
          // @ts-expect-error
          field.placeholder as string
        )
        const translateError = translate(intl, errors[field.name], errors[field.name])
        const isNotLastField = index !== currentFields.length - 1

        return (
          <React.Fragment key={field.name}>
            <MemoizedInput
              // @ts-expect-error
              type={field.type ?? 'text'}
              name={field.name}
              placeholder={translatePlaceholder}
              // @ts-expect-error
              required={field.required ?? false}
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
