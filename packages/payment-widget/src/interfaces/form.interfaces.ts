import { ReactNode }       from 'react'

import { NameField }       from './custom-elements.iterfaces'
import { Field }           from './fields.interfaces'
import { FieldsState }     from './fields.interfaces'
import { FieldsValidator } from './fields.interfaces'
import { WidgetProps }     from './widget.interfaces'

export interface FormProps extends WidgetProps {
  useCustomFields: boolean
  useCustomButton: boolean
}

export interface FormProviderProps {
  additionalFields?: Field[]
  nameFields: Field[]
  isGenerateReceipt: boolean
  isGenerateRequiredField: boolean
  disabled: boolean
  children: ReactNode
}

export interface FormContext extends FieldsValidator, FieldsState {
  fields: Field[] | NameField[]
  disabled: boolean
  isLoaded: boolean
}
