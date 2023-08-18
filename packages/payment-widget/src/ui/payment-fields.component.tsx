import { Condition }           from '@atls-ui-parts/condition'
import { HiddenInput }         from '@atls-ui-parts/hidden-input'
import { Box }                 from '@atls-ui-parts/layout'
import { Column }              from '@atls-ui-parts/layout'
import { Layout }              from '@atls-ui-parts/layout'
import { Row }                 from '@atls-ui-parts/layout'

import React                   from 'react'
import { FC }                  from 'react'

import { PaymentFieldsProps }  from '../interfaces'
import { RequiredFieldsNames } from '../interfaces'
import { DirectionFields }     from '../interfaces'
import { requiredFields }      from '../data'
import { useFields }           from '../hooks'
import { generateReceipt }     from '../utils'

export const PaymentFields: FC<PaymentFieldsProps> = ({
  errors,
  validateField,
  amount,
  additionalFields = [],
  isGenerateReceipt = false,
  direction = DirectionFields.Column,
  inputGaps = 16,
}) => {
  const baseFields = useFields(requiredFields, errors, validateField, inputGaps)
  const fieldsWithReceipt = useFields(
    generateReceipt(additionalFields, isGenerateReceipt),
    errors,
    validateField,
    inputGaps
  )
  const Direction = direction === DirectionFields.Column ? Column : Row

  return (
    <Box flexDirection='column'>
      <Layout flexBasis={inputGaps} flexShrink={0} />
      <Direction>
        <Condition match={Boolean(amount)}>
          <HiddenInput name={RequiredFieldsNames.Amount} defaultValue={amount} disabled readOnly />
        </Condition>
        <Condition match={!amount}>{baseFields}</Condition>
        {fieldsWithReceipt}
      </Direction>
      <Layout flexBasis={inputGaps} flexShrink={0} />
    </Box>
  )
}
