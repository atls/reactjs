import { AdditionalFieldsProps } from '../interfaces/payment-fields.interfaces'
import { getPay }                from '../utils'
import { useFields }             from './use-fields.hook'

export const usePayment = (additionalFields?: AdditionalFieldsProps[]) => {
  const { fields, formState } = useFields(additionalFields)
  const pay = getPay(formState)

  return { fields, pay }
}
