import type { FC }                from 'react'

import type { AdditionalField }   from '../../interfaces'
import type { FormProviderProps } from '../../interfaces'

import { useMemo }                from 'react'
import React                      from 'react'

import { Provider }               from './form.context'
import { requiredFields }         from '../../data'
import { useFieldsState }         from '../../hooks'
import { useInit }                from '../../hooks'
import { useValidate }            from '../../hooks'
import { addReceiptFieldsUtil }   from '../../utils'

export const FormProvider: FC<FormProviderProps> = ({
  additionalFields,
  nameFields,
  isGenerateReceipt,
  isGenerateRequiredField,
  disabled,
  children,
}) => {
  const { errors, validateField, isValidate } = useValidate()

  const processedFields =
    additionalFields && isGenerateReceipt
      ? addReceiptFieldsUtil(additionalFields as Array<AdditionalField>)
      : nameFields
  const fields = useMemo(
    () =>
      additionalFields && isGenerateRequiredField
        ? [...requiredFields, ...processedFields]
        : [...processedFields],
    [additionalFields, isGenerateRequiredField, processedFields]
  )

  const { fieldsState, handleChange, handleBlur } = useFieldsState(validateField, fields)

  const isLoaded = useInit()

  const value = useMemo(
    () => ({
      fields,
      fieldsState,
      handleChange,
      handleBlur,
      errors,
      validateField,
      isValidate,
      disabled,
      isLoaded,
    }),
    [
      fields,
      fieldsState,
      handleChange,
      handleBlur,
      errors,
      validateField,
      isValidate,
      disabled,
      isLoaded,
    ]
  )

  return <Provider value={value}>{children}</Provider>
}
