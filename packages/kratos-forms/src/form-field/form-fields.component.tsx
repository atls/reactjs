import { useMemo }         from 'react'
import { FC }              from 'react'

import { FormFieldsProps } from './form-field.interfaces'
import { useForm }         from '../form'

export const FormFields: FC<FormFieldsProps> = ({ name, children }) => {
  const form = useForm()

  if (!form) {
    throw new Error('Missing <FormProvider>')
  }

  const fields = useMemo(() => form.getFields(name), [name, form])

  if (typeof children === 'function') {
    return children(fields)
  }

  return null
}
