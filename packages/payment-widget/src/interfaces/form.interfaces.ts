import { ReactNode }   from 'react'

import { WidgetProps } from './widget.interfaces'

export interface FormProps extends WidgetProps {
  useCustomButton: boolean
  isGenerateReceipt: boolean
  children: ReactNode | ReactNode[]
}

export interface FormProviderProps {
  children: ReactNode | ReactNode[]
}
