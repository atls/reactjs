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

export type fieldsNames = RequiredFieldsNames | AdditionalFieldsNames

export interface FieldsProps {
    name: fieldsNames
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