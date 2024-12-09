import type { FC }                from 'react'

import type { AdditionalField }   from '../../interfaces/index.js'
import type { FormProviderProps } from '../../interfaces/index.js'

import { useMemo }                from 'react'
import React                      from 'react'

import { Provider }               from './form.context.js'
import { requiredFields }         from '../../data/index.js'
import { useFieldsState }         from '../../hooks/index.js'
import { useInit }                from '../../hooks/index.js'
import { useValidate }            from '../../hooks/index.js'
import { addReceiptFieldsUtil }   from '../../utils/index.js'

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
