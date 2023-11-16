import { FormEvent }              from 'react'
import { HTMLInputTypeAttribute } from 'react'

import { AdditionalFieldsType }   from '../enums'
import { RequiredFieldsType }     from '../enums'
import { DirectionFields }        from './styles.interfaces'
import { InputStyles }            from './styles.interfaces'

export type FieldsNames = RequiredFieldsType | AdditionalFieldsType
export type FieldState = Record<FieldsNames, string>
export type ValidateField = (name: FieldsNames, value: string, required?: boolean) => void
export type HandleChangeField = (e: FormEvent<HTMLInputElement>) => void
export type HandleBlurField = (e: FormEvent<HTMLInputElement>) => void

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

export interface FieldsProps {
  errors: FieldsErrors
  validateField: ValidateField
  amount?: number
  direction?: DirectionFields
  inputGaps?: number
  isGenerateReceipt?: boolean
  additionalFields?: AdditionalField[]
  styles?: InputStyles
}
