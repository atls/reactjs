import { ReactNode } from 'react'

import { Field }     from './fields.interfaces'

export type NameField = Pick<Field, 'name'>

export interface CustomElements {
  customFields: ReactNode[]
  customButton: ReactNode
  isGenerateReceiptField: boolean
  isGenerateRequiredField: boolean
  nameFields: Field[]
}
