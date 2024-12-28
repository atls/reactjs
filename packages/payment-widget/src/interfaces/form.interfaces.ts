import type { ReactNode }       from 'react'

import type { NameField }       from './custom-fields.iterfaces.js'
import type { Field }           from './fields.interfaces.js'
import type { FieldsState }     from './fields.interfaces.js'
import type { FieldsValidator } from './fields.interfaces.js'
import type { WidgetProps }     from './widget.interfaces.js'

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
