import { ReactNode } from 'react'

import { Field }     from './fields.interfaces'

export type NameField = Pick<Field, 'name'>

export interface CustomFields {
  customFields: ReactNode[]
  isGenerateReceiptField: boolean
  isGenerateRequiredField: boolean
}

export interface CustomFieldsProps {
  existAmount: boolean
  existReceipt: boolean
  existAdditionalFields: boolean
  nodeArray: ReactNode[]
}
