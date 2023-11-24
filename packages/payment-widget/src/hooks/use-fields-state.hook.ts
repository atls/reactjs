import { FormEvent }         from 'react'
import { useCallback }       from 'react'
import { useState }          from 'react'

import { Field }             from '../interfaces'
import { FieldsState }       from '../interfaces'
import { HandleBlurField }   from '../interfaces'
import { FieldState }        from '../interfaces'
import { HandleChangeField } from '../interfaces'
import { FieldsNames }       from '../interfaces'
import { ValidateField }     from '../interfaces'

export const useFieldsState = (validateField: ValidateField, fields?: Field[]): FieldsState => {
  const initialState = fields
    ? fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    : ''
  const [fieldsState, setFieldsState] = useState<FieldState | string>(
    initialState as FieldState | string
  )

  const handleChange: HandleChangeField = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const name = e.currentTarget.name as FieldsNames
      const { value } = e.currentTarget
      setFieldsState((prevFields) =>
        typeof prevFields === 'object' ? { ...prevFields, [name]: value } : value)
    },
    [setFieldsState]
  )

  const handleBlur: HandleBlurField = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const inputElement = e.target as HTMLInputElement
      validateField(inputElement.name as FieldsNames, inputElement.value, inputElement.required)
    },
    [validateField]
  )

  return { fieldsState, handleChange, handleBlur }
}
