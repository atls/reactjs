/* eslint-disable no-shadow */

import { ReactElement }    from 'react'
import { FormEvent }       from 'react'

import { KratosFormField } from '../form'

export type OnFormFieldChangeCallback = (event: FormEvent<HTMLInputElement> | string | any) => void

export interface FormFieldProps {
  name: string
  children: (
    field: KratosFormField,
    value: string | any,
    OnFormFieldChangeCallback
  ) => ReactElement<any>
}

export interface FormFieldsProps {
  name: string
  children: (fields: KratosFormField[]) => ReactElement<any>
}
