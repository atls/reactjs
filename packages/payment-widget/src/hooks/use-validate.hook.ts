/* eslint-disable no-useless-escape */
import { useState }             from 'react'

import { AdditionalFieldsType } from '../enums'
import { RequiredFieldsType }   from '../enums'
import { FieldsErrors }         from '../interfaces'
import { FieldsNames }          from '../interfaces'
import { ValidateField }        from '../interfaces'

const validateEmail = (value: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
const validatePhone = (value: string) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)

export const useValidate = () => {
  const [errors, setErrors] = useState<FieldsErrors>({} as FieldsErrors)
  const isValidate = Object.values(errors).every((value) => value === '')

  const setError = (name: FieldsNames, errorMessage: string) => {
    setErrors((err) => ({ ...err, [name]: errorMessage }))
  }

  const validateField: ValidateField = (name, value, required = false) => {
    if (required && value.length === 0) {
      setError(name, 'payment_widget.error_required')
    } else if (!required && value.length === 0) {
      setError(name, '')
    } else if (name === RequiredFieldsType.Amount && Number(value) <= 0) {
      setError(RequiredFieldsType.Amount, 'payment_widget.error_amount')
    } else if (name === AdditionalFieldsType.Email && !validateEmail(value)) {
      setError(AdditionalFieldsType.Email, 'payment_widget.error_email')
    } else if (name === AdditionalFieldsType.Phone && !validatePhone(value)) {
      setError(AdditionalFieldsType.Phone, 'payment_widget.error_phone')
    } else {
      setError(name, '')
    }
  }

  return { errors, validateField, isValidate }
}
