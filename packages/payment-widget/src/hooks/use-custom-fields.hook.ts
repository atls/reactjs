import type { ReactNode }         from 'react'

import type { CustomFields }      from '../interfaces/index.js'
import type { CustomFieldsProps } from '../interfaces/index.js'

import { isValidElement }         from 'react'

import { AdditionalFieldsType }   from '../enums/index.js'
import { NameWrapperComponent }   from '../enums/index.js'
import { RequiredFieldsType }     from '../enums/index.js'
import { isCustomElement }        from '../utils/index.js'

export const useCustomFields = ({
  existAmount,
  existReceipt,
  existAdditionalFields,
  nodeArray,
}: CustomFieldsProps): CustomFields => {
  const isAdditionalField = (node: ReactNode): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isValidElement(node) ? Object.values(AdditionalFieldsType).includes(node.props.name) : false
  const isRequiredField = (node: ReactNode): boolean =>
    isValidElement(node) ? node.props.name === RequiredFieldsType.Amount && !existAmount : false

  const customFields = nodeArray.filter(
    (node) =>
      isCustomElement(NameWrapperComponent.InputWrapper, node) &&
      (isAdditionalField(node) || isRequiredField(node))
  )

  const isGenerateReceiptField = existReceipt && !customFields.length

  const isGenerateRequiredField = !existAmount && existAdditionalFields

  const existCustomAmountField = customFields.some(
    (field) => isValidElement(field) && field.props.name === RequiredFieldsType.Amount
  )
  const existCustomReceiptField = customFields.some(
    (field) =>
      isValidElement(field) &&
      (field.props.name === AdditionalFieldsType.Email ||
        field.props.name === AdditionalFieldsType.Phone)
  )

  if (existAdditionalFields && customFields.length)
    throw new Error('Don`t use additionalFields property with InputWrapper component')

  if (customFields.length && !existAmount && !existCustomAmountField)
    throw new Error(
      'If you use InputWrapper component and don`t set amount property, you mast use InputWrapper componnet with property name equal RequiredFieldsType.Amount'
    )

  if (customFields.length && existReceipt && !existCustomReceiptField)
    throw new Error(
      'If you set receipt property whith InputWrapper component, you mast use InputWrapper componnet with property name equal AdditionalFieldsType.Phone or AdditionalFieldsType.Email'
    )

  return {
    customFields,
    isGenerateReceiptField,
    isGenerateRequiredField,
  }
}
