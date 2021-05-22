import { useMemo }                from 'react'
import { FC }                     from 'react'

import { FormFieldMessagesProps } from './form-field-messages.interfaces'
import { useForm }                from '../form'

export const FormFieldMessages: FC<FormFieldMessagesProps> = ({ name, children }) => {
  const form = useForm()

  if (!form) {
    throw new Error('Missing <FormProvider>')
  }

  const field = useMemo(() => form.getField(name), [name, form])

  if (typeof children === 'function' && field?.messages) {
    return children(field.messages)
  }

  return null
}
