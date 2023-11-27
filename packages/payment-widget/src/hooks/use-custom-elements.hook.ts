import { Children }              from 'react'
import { ReactNode }             from 'react'
import { JSXElementConstructor } from 'react'
import { isValidElement }        from 'react'

import { AdditionalFieldsType }  from '../enums'
import { RequiredFieldsType }    from '../enums'
import { CustomElements }        from '../interfaces'
import { Field }                 from '../interfaces'

export const useCustomElements = (
  existAmount: boolean,
  existReceipt: boolean,
  existAdditionalFields: boolean,
  nodes: ReactNode
): CustomElements => {
  const nodeArray = Children.toArray(nodes)

  const isCastomElement = (nameNode: string, node: ReactNode): boolean =>
    isValidElement(node)
      ? (node.type as JSXElementConstructor<any>).name === nameNode &&
        typeof node.props.children === 'function'
      : false
  const isAdditionalField = (node: ReactNode): boolean =>
    isValidElement(node) ? Object.values(AdditionalFieldsType).includes(node.props.name) : false
  const isRequiredField = (node: ReactNode): boolean =>
    isValidElement(node) ? node.props.name === RequiredFieldsType.Amount && !existAmount : false

  const customFields = nodeArray.filter(
    (node) =>
      isCastomElement('InputWrapper', node) && (isAdditionalField(node) || isRequiredField(node))
  )
  const nameFields = customFields.reduce<Field[]>((acc, field) => {
    if (isValidElement(field))
      acc.push({
        name: AdditionalFieldsType[field.props.name] || RequiredFieldsType[field.props.name],
      })
    return acc
  }, [])

  const customButton = nodeArray.find((node) => isCastomElement('ButtonWrapper', node))

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
    customButton,
    isGenerateReceiptField,
    isGenerateRequiredField,
    nameFields,
  }
}
