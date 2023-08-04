import React  from 'react'
import { FC } from 'react'

interface PaymentFieldsProps {
  fields: JSX.Element[]
}

export const PaymentFields: FC<PaymentFieldsProps> = ({ fields }) => (
  <>
    {fields.map((field) => (
      <React.Fragment key={field.key}>{field}</React.Fragment>
    ))}
  </>
)
