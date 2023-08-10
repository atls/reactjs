/* eslint-disable no-shadow */
import { HTMLInputTypeAttribute } from 'react'

export enum RequiredFieldsNames {
  Amount = 'amount',
}

export enum AdditionalFieldsNames {
  Name = 'name',
  Email = 'email',
  Phone = 'phone',
  Description = 'description',
  Order = 'order',
}

export type FieldsNames = RequiredFieldsNames | AdditionalFieldsNames

export interface Fields {
  name: FieldsNames
  placeholder: string
  required?: boolean
  type?: HTMLInputTypeAttribute
}

export interface AdditionalFields extends Fields {
  name: AdditionalFieldsNames
}

export interface RequiredFields extends Fields {
  name: RequiredFieldsNames
}

export interface PaymentFieldsProps {
  amount: number
  shouldGenerateReceipt: boolean
  additionalFields?: AdditionalFields[]
}
