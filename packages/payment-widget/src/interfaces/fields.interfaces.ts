import { HTMLInputTypeAttribute } from 'react'

import { AdditionalFieldsType }   from '../enums'
import { RequiredFieldsType }     from '../enums'
import { DirectionFields }        from './styles.interfaces'

export type FieldsNames = RequiredFieldsType | AdditionalFieldsType
export type FieldState = Record<FieldsNames, string>
export type HandleChangeField = (fieldName: FieldsNames, value: string) => void

export interface Field {
  name: FieldsNames
  placeholder: string
  required?: boolean
  type?: HTMLInputTypeAttribute
}

export interface AdditionalField extends Field {
  name: AdditionalFieldsType
}

export interface RequiredField extends Field {
  name: RequiredFieldsType
}

export type FieldsErrors = {
  [key in FieldsNames]: string
}

export type ValidateField = (name: FieldsNames, value: string, required?: boolean) => void

export interface FieldsProps {
  errors: FieldsErrors
  validateField: ValidateField
  amount?: number
  direction?: DirectionFields
  inputGaps?: number
  isGenerateReceipt?: boolean
  additionalFields?: AdditionalField[]
}
