/* eslint-disable no-useless-escape */

import { useState }              from 'react'

import { AdditionalFieldsNames } from '../interfaces'
import { FieldsErrors }          from '../interfaces'
import { FieldsNames }           from '../interfaces'
import { RequiredFieldsNames }   from '../interfaces'
import { ValidateField }         from '../interfaces'

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
    } else if (name === RequiredFieldsNames.Amount && Number(value) <= 0) {
      setError(RequiredFieldsNames.Amount, 'payment_widget.error_amount')
    } else if (name === AdditionalFieldsNames.Email && !validateEmail(value)) {
      setError(AdditionalFieldsNames.Email, 'payment_widget.error_email')
    } else if (name === AdditionalFieldsNames.Phone && !validatePhone(value)) {
      setError(AdditionalFieldsNames.Phone, 'payment_widget.error_phone')
    } else {
      setError(name, '')
    }
  }

  return { errors, validateField, isValidate }
}
