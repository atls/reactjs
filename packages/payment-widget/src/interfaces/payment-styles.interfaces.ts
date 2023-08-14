/* eslint-disable no-shadow */
export enum DirectionFields {
  Row = 'row',
  Column = 'column',
}

export interface PaymentStyles {
  direction?: DirectionFields
  inputGaps?: number
}
