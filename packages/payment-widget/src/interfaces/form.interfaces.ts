import type { ReactNode }       from 'react'

import type { NameField }       from './custom-fields.iterfaces'
import type { Field }           from './fields.interfaces'
import type { FieldsState }     from './fields.interfaces'
import type { FieldsValidator } from './fields.interfaces'
import type { WidgetProps }     from './widget.interfaces'

export interface FormProps extends WidgetProps {
  useCustomFields: boolean
  useCustomButton: boolean
}

export interface FormProviderProps {
  additionalFields?: Array<Field>
  nameFields: Array<Field>
  isGenerateReceipt: boolean
  isGenerateRequiredField: boolean
  disabled: boolean
  children: ReactNode
}

export interface FormContext extends FieldsValidator, FieldsState {
  fields: Array<Field> | Array<NameField>
  disabled: boolean
  isLoaded: boolean
}
