import type { ReactNode }     from 'react'

import type { FieldsProps }   from '../interfaces/index.js'

import { Condition }          from '@atls-ui-parts/condition'
import { HiddenInput }        from '@atls-ui-parts/hidden-input'
import { Box }                from '@atls-ui-parts/layout'
import { Column }             from '@atls-ui-parts/layout'
import { Layout }             from '@atls-ui-parts/layout'
import { Row }                from '@atls-ui-parts/layout'
import React                  from 'react'

import { RequiredFieldsType } from '../enums/index.js'
import { DirectionFields }    from '../interfaces/index.js'
import { useFieldsRenderer }  from '../hooks/index.js'
import { useForm }            from './form/index.js'

export const Fields = ({
  amount,
  direction = DirectionFields.Column,
  inputGaps = 16,
  useCustomFields,
}: FieldsProps): ReactNode => {
  const { fields, fieldsState, handleChange, handleBlur, errors } = useForm()

  const fieldsForRender = useCustomFields ? [] : fields

  const renderedFields = useFieldsRenderer(
    fieldsForRender,
    errors,
    fieldsState,
    handleChange,
    handleBlur,
    inputGaps
  )
  const Direction = direction === DirectionFields.Column ? Column : Row

  return (
    <Box flexDirection='column'>
      <Layout flexBasis={inputGaps} flexShrink={0} />
      <Direction>
        <Condition match={Boolean(amount)}>
          <HiddenInput disabled readOnly name={RequiredFieldsType.Amount} defaultValue={amount} />
        </Condition>
        {renderedFields}
      </Direction>
      <Layout flexBasis={inputGaps} flexShrink={0} />
    </Box>
  )
}
