import React                 from 'react'
import { FC }                from 'react'
import { useMemo }           from 'react'

import { FormProviderProps } from '../../interfaces'
import { Provider }          from './form.context'
import { useValidate }       from '../../hooks'

const FormProvider: FC<FormProviderProps> = ({ disabled, children }) => {
  const { errors, validateField, isValidate } = useValidate()
  const value = useMemo(
    () => ({ errors, validateField, isValidate, disabled }),
    [errors, validateField, isValidate, disabled]
  )

  return <Provider value={value}>{children}</Provider>
}

export default FormProvider
