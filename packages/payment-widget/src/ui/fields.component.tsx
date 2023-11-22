import { Condition }            from '@atls-ui-parts/condition'
import { HiddenInput }          from '@atls-ui-parts/hidden-input'
import { Box }                  from '@atls-ui-parts/layout'
import { Column }               from '@atls-ui-parts/layout'
import { Layout }               from '@atls-ui-parts/layout'
import { Row }                  from '@atls-ui-parts/layout'

import React                    from 'react'

import { RequiredFieldsType }   from '../enums'
import { FieldState }           from '../interfaces'
import { FieldsProps }          from '../interfaces'
import { DirectionFields }      from '../interfaces'
import { requiredFields }       from '../data'
import { useFieldsState }       from '../hooks'
import { useFieldsRenderer }    from '../hooks'
import { addReceiptFieldsUtil } from '../utils'

export const Fields = ({
  errors,
  validateField,
  amount,
  additionalFields = [],
  isGenerateReceipt = false,
  direction = DirectionFields.Column,
  inputGaps = 16,
  customInput,
}: FieldsProps) => {
  const processedFields = isGenerateReceipt
    ? addReceiptFieldsUtil(additionalFields)
    : additionalFields
  const fields = !amount ? [...requiredFields, ...processedFields] : [...processedFields]
  const { fieldsState, handleChange, handleBlur } = useFieldsState(validateField, fields)
  const renderedFields = useFieldsRenderer(
    fields,
    errors,
    fieldsState as FieldState,
    handleChange,
    handleBlur,
    inputGaps,
    customInput
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
