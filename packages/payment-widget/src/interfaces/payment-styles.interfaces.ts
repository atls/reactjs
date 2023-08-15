/* eslint-disable no-shadow */
import { ButtonProps } from './payment-button.interfaces'

export enum DirectionFields {
  Row = 'row',
  Column = 'column',
}

export interface PaymentStyles {
  direction?: DirectionFields
  inputGaps?: number
  button?: ButtonProps
}
