import { FormField as BaseKratosFormField } from '@ory/kratos-client'

export interface KratosFormField extends Omit<BaseKratosFormField, 'value'> {
  value?: object | string
}

export interface FormProps extends Omit<HTMLFormElement, 'method'> {
  fields?: KratosFormField[]
  method?: string
}
