import { AdditionalFieldsProps } from '../interfaces/payment-fields.interfaces'
import { useFields }             from './use-fields.hook'
import { usePay }                from './use-pay.hook'

export const usePayment = (additionalFields?: AdditionalFieldsProps[]) => {
  const { fields, formState } = useFields(additionalFields)
  const pay = usePay(formState)

  return { fields, pay }
}
