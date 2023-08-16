/* eslint-disable no-shadow */
import { ButtonProps } from '@atls-ui-parts/button'

export enum DirectionFields {
  Row = 'row',
  Column = 'column',
}

export interface PaymentStyles {
  direction?: DirectionFields
  inputGaps?: number
  button?: ButtonProps
}
