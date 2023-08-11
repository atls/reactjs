import { Condition }           from '@atls-ui-parts/condition'
import { HiddenInput }         from '@atls-ui-parts/hidden-input'

import React                   from 'react'
import { FC }                  from 'react'

import { PaymentFieldsProps }  from '../interfaces'
import { RequiredFieldsNames } from '../interfaces'
import { requiredFields }      from '../data'
import { useFields }           from '../hooks'
import { generateReceipt }     from '../utils'

export const PaymentFields: FC<PaymentFieldsProps> = ({
  amount,
  additionalFields = [],
  isGenerateReceipt = false,
  fieldStyle,
}) => {
  const fieldsWithReceipt = useFields(
    generateReceipt(additionalFields, isGenerateReceipt),
    fieldStyle
  )

  return (
    <>
      <Condition match={!!amount}>
        <HiddenInput name={RequiredFieldsNames.Amount} defaultValue={amount} disabled readOnly />
      </Condition>
      <Condition match={!amount}>{useFields(requiredFields, fieldStyle)}</Condition>
      {fieldsWithReceipt}
    </>
  )
}
