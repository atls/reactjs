import type { ReactNode } from 'react'

import type { Field }     from './fields.interfaces'

export type NameField = Pick<Field, 'name'>

export interface CustomFields {
  customFields: Array<ReactNode>
  isGenerateReceiptField: boolean
  isGenerateRequiredField: boolean
}

export interface CustomFieldsProps {
  existAmount: boolean
  existReceipt: boolean
  existAdditionalFields: boolean
  nodeArray: Array<ReactNode>
}
