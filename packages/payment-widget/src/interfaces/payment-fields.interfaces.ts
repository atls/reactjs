/* eslint-disable no-shadow */
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

export interface FieldsProps {
  name: FieldsNames
  placeholder: string
  required?: boolean
  type?: string
}

export interface AdditionalFieldsProps extends FieldsProps {
  name: AdditionalFieldsNames
}

export interface RequiredFieldsProps extends FieldsProps {
  name: RequiredFieldsNames
}
