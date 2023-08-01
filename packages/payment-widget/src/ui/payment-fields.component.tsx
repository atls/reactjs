import React                     from 'react'
import { FC }                    from 'react'

import { AdditionalFieldsProps } from '../interfaces/payment-fields.interfaces'
import { usePayment }            from '../hooks'

interface PaymentFieldsProps {
  additionalFields?: AdditionalFieldsProps[]
}

export const PaymentFields: FC<PaymentFieldsProps> = ({ additionalFields = [] }) => {
  const { fields } = usePayment(additionalFields)

  return <div>{fields}</div>
}

PaymentFields.defaultProps = {
  additionalFields: [],
}
