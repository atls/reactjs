/* eslint-disable no-shadow */
import { ButtonProps } from '@atls-ui-parts/button'

export enum DirectionFields {
  Row = 'row',
  Column = 'column',
}

export interface Styles {
  direction?: DirectionFields
  inputGaps?: number
  button?: ButtonProps
}
