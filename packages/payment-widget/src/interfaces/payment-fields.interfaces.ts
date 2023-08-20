import { HTMLInputTypeAttribute } from 'react'

import { AdditionalFieldsType }   from '../enums'
import { RequiredFieldsType }     from '../enums'
import { DirectionFields }        from './payment-styles.interfaces'

export type FieldsNames = RequiredFieldsType | AdditionalFieldsType

export interface Fields {
  name: FieldsNames
  placeholder: string
  required?: boolean
  type?: HTMLInputTypeAttribute
}

export interface AdditionalFields extends Fields {
  name: AdditionalFieldsType
}

export interface RequiredFields extends Fields {
  name: RequiredFieldsType
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
