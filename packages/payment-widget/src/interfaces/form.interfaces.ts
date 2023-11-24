import { ReactNode }       from 'react'

import { FieldsValidator } from './fields.interfaces'
import { WidgetProps }     from './widget.interfaces'

export interface FormProps extends WidgetProps {
  useCustomButton: boolean
  isGenerateReceipt: boolean
  children: ReactNode | ReactNode[]
}

export interface FormProviderProps {
  disabled: boolean
  children: ReactNode | ReactNode[]
}

export interface FormContext extends FieldsValidator {
  disabled: boolean
}
