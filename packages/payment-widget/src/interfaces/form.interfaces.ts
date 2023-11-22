import React           from 'react'

import { WidgetProps } from './widget.interfaces'

export interface FormProps extends WidgetProps {
  useCustomButton: boolean
  isGenerateReceipt: boolean
  children: React.ReactNode
}
