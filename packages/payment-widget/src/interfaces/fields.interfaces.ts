import { FormEvent }              from 'react'
import { HTMLInputTypeAttribute } from 'react'

import { AdditionalFieldsType }   from '../enums'
import { RequiredFieldsType }     from '../enums'
import { DirectionFields }        from './styles.interfaces'

export type FieldsNames = RequiredFieldsType | AdditionalFieldsType
export type FieldState = Record<FieldsNames, string>
export type ValidateField = (name: FieldsNames, value: string, required?: boolean) => void
export type HandleChangeField = (e: FormEvent<HTMLInputElement>) => void
export type HandleBlurField = (e: FormEvent<HTMLInputElement>) => void

export interface Field {
  name: FieldsNames
  placeholder?: string
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

export interface FieldsProps {
  amount?: number
  direction?: DirectionFields
  inputGaps?: number
  useCustomFields: boolean
}

export interface FieldsValidator {
  errors: FieldsErrors
  validateField: ValidateField
  isValidate: boolean
}

export interface FieldsState {
  fieldsState: FieldState
  handleChange: HandleChangeField
  handleBlur: HandleBlurField
}
