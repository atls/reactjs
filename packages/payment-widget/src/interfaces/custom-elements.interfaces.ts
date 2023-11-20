import { FC }                from 'react'

import { CustomButtonProps } from './button.interfaces'
import { CustomInputProps }  from './input.interfaces'

export type CustomInput = FC<CustomInputProps>
export type CustomButton = FC<CustomButtonProps>

export interface CustomElements {
  input?: CustomInput
  button?: CustomButton
}
