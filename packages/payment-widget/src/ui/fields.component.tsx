import { Condition }          from '@atls-ui-parts/condition'
import { HiddenInput }        from '@atls-ui-parts/hidden-input'
import { Box }                from '@atls-ui-parts/layout'
import { Column }             from '@atls-ui-parts/layout'
import { Layout }             from '@atls-ui-parts/layout'
import { Row }                from '@atls-ui-parts/layout'

import React                  from 'react'

import { RequiredFieldsType } from '../enums'
import { FieldsProps }        from '../interfaces'
import { DirectionFields }    from '../interfaces'
import { useFieldsRenderer }  from '../hooks'
import { useForm }            from './form'

export const Fields = ({
  amount,
  direction = DirectionFields.Column,
  inputGaps = 16,
  useCustomFields,
}: FieldsProps) => {
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
          <HiddenInput name={RequiredFieldsType.Amount} defaultValue={amount} disabled readOnly />
        </Condition>
        {renderedFields}
      </Direction>
      <Layout flexBasis={inputGaps} flexShrink={0} />
    </Box>
  )
}
