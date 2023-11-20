import React                 from 'react'
import { FC }                from 'react'

import { HandleBlurField }   from './fields.interfaces'
import { HandleChangeField } from './fields.interfaces'

interface CustomInputProps {
  type: string
  name: string
  placeholder: string
  required: boolean
  value: string
  errorText: string
  onChangeNative: HandleChangeField
  onBlur: HandleBlurField
}

export interface CustomButtonProps {
  type: string
  disabled: boolean
  children?: React.ReactNode
}

export type CustomInput = FC<CustomInputProps>
export type CustomButton = FC<CustomButtonProps>

export interface CustomElements {
  input?: CustomInput
  button?: CustomButton
}
