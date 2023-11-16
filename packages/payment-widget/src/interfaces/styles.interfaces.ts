/* eslint-disable no-shadow */
import { ButtonProps } from '@atls-ui-parts/button'

export enum DirectionFields {
  Row = 'row',
  Column = 'column',
}

export interface InputStyles {
  styledArray?: any[]
  size?: string
  rounding?: {
    default: number
    active: number
  }
}

export interface ButtonStyles extends ButtonProps {
  styledArray?: any[]
  size?: string
  variant?: string
  fill?: boolean
}

export interface Styles {
  direction?: DirectionFields
  inputGaps?: number
  button?: ButtonStyles
  input?: InputStyles
}
