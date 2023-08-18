/* eslint-disable no-shadow */
import { HTMLInputTypeAttribute } from 'react'

import { DirectionFields }        from './payment-styles.interfaces'

export enum RequiredFieldsNames {
  Amount = 'amount',
}

export enum AdditionalFieldsNames {
  Name = 'name',
  Email = 'email',
  Phone = 'phone',
  Description = 'description',
  Order = 'order',
}

export type FieldsNames = RequiredFieldsNames | AdditionalFieldsNames

export interface Fields {
  name: FieldsNames
  placeholder: string
  required?: boolean
  type?: HTMLInputTypeAttribute
}

export interface AdditionalFields extends Fields {
  name: AdditionalFieldsNames
}

export interface RequiredFields extends Fields {
  name: RequiredFieldsNames
}

export type FieldsErrors = {
  [key in FieldsNames]: string
}

export type ValidateField = (name: FieldsNames, value: string, required?: boolean) => void

export interface PaymentFieldsProps {
  errors: FieldsErrors
  validateField: ValidateField
  amount?: number
  direction?: DirectionFields
  inputGaps?: number
  isGenerateReceipt?: boolean
  additionalFields?: AdditionalFields[]
}
