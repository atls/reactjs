import type { FormEvent }         from 'react'

import type { Field }             from '../interfaces/index.js'
import type { FieldsState }       from '../interfaces/index.js'
import type { HandleBlurField }   from '../interfaces/index.js'
import type { FieldState }        from '../interfaces/index.js'
import type { HandleChangeField } from '../interfaces/index.js'
import type { FieldsNames }       from '../interfaces/index.js'
import type { ValidateField }     from '../interfaces/index.js'

import { useCallback }            from 'react'
import { useState }               from 'react'

export const useFieldsState = (validateField: ValidateField, fields: Array<Field>): FieldsState => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  const [fieldsState, setFieldsState] = useState<FieldState>(initialState as FieldState)

  const handleChange: HandleChangeField = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const name = e.currentTarget.name as FieldsNames
      const { value } = e.currentTarget
      setFieldsState((prevFields) => ({ ...prevFields, [name]: value }))
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
