import { useCallback }       from 'react'
import { useState }          from 'react'

import { Field }             from '../interfaces'
import { FieldState }        from '../interfaces'
import { HandleChangeField } from '../interfaces'
import { FieldsNames }       from '../interfaces'
import { ValidateField }     from '../interfaces'

export const useFieldsState = (fields: Field[], validateField: ValidateField) => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  const [fieldsState, setFieldsState] = useState<FieldState>(initialState as FieldState)

  const handleChange: HandleChangeField = useCallback(
    (fieldName, value) =>
      setFieldsState((prevFieldsState) => ({ ...prevFieldsState, [fieldName]: value })),
    [setFieldsState]
  )

  const handleBlur = useCallback(
    (fieldName: FieldsNames, value: string, required = false) => {
      validateField(fieldName, value, required)
    },
    [validateField]
  )

  return { fieldsState, handleChange, handleBlur }
}
