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
import { addReceiptFieldsUtil }    from '../utils'

export const PaymentFields: FC<PaymentFieldsProps> = ({
  errors,
  validateField,
  amount,
  additionalFields = [],
  isGenerateReceipt = false,
  direction = DirectionFields.Column,
  inputGaps = 16,
}) => {
  const processedFields = isGenerateReceipt ? addReceiptFieldsUtil(additionalFields) : additionalFields
  const fields = !amount ? [...requiredFields, ...processedFields] : [...processedFields]
  const renderedFields = useFields(fields, errors, validateField, inputGaps)
  const Direction = direction === DirectionFields.Column ? Column : Row

  return (
    <Box flexDirection='column'>
      <Layout flexBasis={inputGaps} flexShrink={0} />
      <Direction>
        <Condition match={Boolean(amount)}>
          <HiddenInput name={RequiredFieldsNames.Amount} defaultValue={amount} disabled readOnly />
        </Condition>
        {renderedFields}
      </Direction>
      <Layout flexBasis={inputGaps} flexShrink={0} />
    </Box>
  )
}
