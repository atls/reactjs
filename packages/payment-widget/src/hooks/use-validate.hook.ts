import type { FieldsErrors }    from '../interfaces/index.js'
import type { FieldsNames }     from '../interfaces/index.js'
import type { ValidateField }   from '../interfaces/index.js'

/* eslint-disable no-useless-escape */
import { useCallback }          from 'react'
import { useState }             from 'react'

import { AdditionalFieldsType } from '../enums/index.js'
import { RequiredFieldsType }   from '../enums/index.js'

// eslint-disable-next-line security/detect-unsafe-regex
const validateEmail = (value: string): boolean => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
const validatePhone = (value: string): boolean =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)

interface UseValidateReturn {
  errors: FieldsErrors
  validateField: ValidateField
  isValidate: boolean
}

export const useValidate = (): UseValidateReturn => {
  const [errors, setErrors] = useState<FieldsErrors>({} as FieldsErrors)
  const isValidate = Object.values(errors).every((value) => value === '')

  const setError = (name: FieldsNames, errorMessage: string): void => {
    setErrors((err) => ({ ...err, [name]: errorMessage }))
  }

  const validateField: ValidateField = useCallback((name, value, required = false) => {
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
  }, [])

  return { errors, validateField, isValidate }
}
